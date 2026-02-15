/**
 * Cosmo – Click-in-sky to select constellation (like clicking a planet in Solar System).
 * Ray from camera through pointer; if direction falls inside a constellation region, select it on click (not drag).
 */
import { useRef, useCallback, useMemo, useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import { Vector2, Vector3, Raycaster } from 'three'
import { CONSTELLATION_CATALOG } from '../../../data/constellationCatalog'
import type { ConstellationCatalogEntry } from '../../../data/constellationCatalog'
import { getStarById } from '../../../data/starCatalog'
import { raDecToCartesian } from '../../../utils/celestialSphere'

const PADDING_RAD = 0.2
const MOVE_THRESHOLD_PX = 8

type ConstellationRegion = {
  constellation: ConstellationCatalogEntry
  center: Vector3
  radiusRad: number
}

function angleBetweenUnitVectors(a: Vector3, b: Vector3): number {
  const d = Math.max(-1, Math.min(1, a.dot(b)))
  return Math.acos(d)
}

function buildConstellationRegions(): ConstellationRegion[] {
  const regions: ConstellationRegion[] = []
  const v = new Vector3()
  const sum = new Vector3(0, 0, 0)

  for (const con of CONSTELLATION_CATALOG) {
    const ids = new Set<string>()
    for (const [a, b] of con.lineSegments) {
      ids.add(a)
      ids.add(b)
    }
    sum.set(0, 0, 0)
    let n = 0
    ids.forEach((id) => {
      const star = getStarById(id)
      if (star) {
        raDecToCartesian(star.ra, star.dec, v)
        sum.add(v)
        n++
      }
    })
    if (n === 0) continue
    sum.divideScalar(n)
    const center = sum.clone().normalize()
    let maxAngle = 0
    ids.forEach((id) => {
      const star = getStarById(id)
      if (star) {
        raDecToCartesian(star.ra, star.dec, v)
        v.normalize()
        const angle = angleBetweenUnitVectors(center, v)
        if (angle > maxAngle) maxAngle = angle
      }
    })
    regions.push({
      constellation: con,
      center,
      radiusRad: maxAngle + PADDING_RAD,
    })
  }
  return regions
}

function findConstellationAtDirection(
  regions: ConstellationRegion[],
  direction: Vector3
): ConstellationCatalogEntry | null {
  let best: ConstellationCatalogEntry | null = null
  let bestAngle = Math.PI

  for (const { constellation, center, radiusRad } of regions) {
    const angle = angleBetweenUnitVectors(direction, center)
    if (angle <= radiusRad && angle < bestAngle) {
      bestAngle = angle
      best = constellation
    }
  }
  return best
}

export type ConstellationSkyClickProps = {
  onSelectConstellation: (con: ConstellationCatalogEntry) => void
  onClearStar?: () => void
}

export function ConstellationSkyClick({
  onSelectConstellation,
  onClearStar,
}: ConstellationSkyClickProps) {
  const { camera, gl } = useThree()
  const regions = useMemo(() => buildConstellationRegions(), [])
  const raycaster = useRef(new Raycaster())
  const pointer = useRef(new Vector2())
  const downRef = useRef<{
    x: number
    y: number
    constellation: ConstellationCatalogEntry | null
  }>({ x: 0, y: 0, constellation: null })

  const getDirectionFromEvent = useCallback(
    (e: PointerEvent): Vector3 => {
      const canvas = gl.domElement
      const rect = canvas.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1
      pointer.current.set(x, y)
      raycaster.current.setFromCamera(pointer.current, camera)
      return raycaster.current.ray.direction.clone().normalize()
    },
    [camera, gl]
  )

  const handlePointerDown = useCallback(
    (e: PointerEvent) => {
      const direction = getDirectionFromEvent(e)
      const constellation = findConstellationAtDirection(regions, direction)
      downRef.current = {
        x: e.clientX,
        y: e.clientY,
        constellation,
      }
    },
    [getDirectionFromEvent, regions]
  )

  const handlePointerUp = useCallback(
    (e: PointerEvent) => {
      const { x, y, constellation } = downRef.current
      const dx = e.clientX - x
      const dy = e.clientY - y
      const moved = Math.sqrt(dx * dx + dy * dy)
      if (constellation != null && moved < MOVE_THRESHOLD_PX) {
        onSelectConstellation(constellation)
        onClearStar?.()
      }
      downRef.current = { x: 0, y: 0, constellation: null }
    },
    [onSelectConstellation, onClearStar]
  )

  useEffect(() => {
    const el = gl.domElement
    el.addEventListener('pointerdown', handlePointerDown)
    el.addEventListener('pointerup', handlePointerUp)
    return () => {
      el.removeEventListener('pointerdown', handlePointerDown)
      el.removeEventListener('pointerup', handlePointerUp)
    }
  }, [gl, handlePointerDown, handlePointerUp])

  return null
}
