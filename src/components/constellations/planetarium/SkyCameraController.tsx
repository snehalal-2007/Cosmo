/**
 * Cosmo – Planetarium camera: drag to rotate sky, scroll to zoom (FOV).
 * Full 360° spherical rotation via quaternions. Drag direction matches motion. Camera stays at origin.
 */
import { useRef, useCallback, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Vector3, Quaternion } from 'three'
import type { Group } from 'three'
import type { PerspectiveCamera } from 'three'
import type { ConstellationCatalogEntry } from '../../../data/constellationCatalog'
import { getStarById } from '../../../data/starCatalog'
import { raDecToCartesian } from '../../../utils/celestialSphere'

const MIN_FOV = 15
const MAX_FOV = 90
const FOV_SENSITIVITY = 2
const ROTATION_SENSITIVITY = 0.004
const INERTIA_DAMPING = 0.95
const FOCUS_FOV = 30
const FOCUS_LERP = 0.04
const FOV_LERP = 0.05

const WORLD_Y = new Vector3(0, 1, 0)
const LOCAL_RIGHT = new Vector3(1, 0, 0)
const tempRight = new Vector3()

function computeConstellationCenter(con: ConstellationCatalogEntry): Vector3 | null {
  const ids = new Set<string>()
  for (const [a, b] of con.lineSegments) {
    ids.add(a)
    ids.add(b)
  }
  const sum = new Vector3(0, 0, 0)
  let n = 0
  const v = new Vector3()
  ids.forEach((id) => {
    const star = getStarById(id)
    if (star) {
      raDecToCartesian(star.ra, star.dec, v)
      sum.add(v)
      n++
    }
  })
  if (n === 0) return null
  sum.divideScalar(n)
  sum.normalize()
  return sum
}

type SkyCameraControllerProps = {
  skyGroupRef: React.RefObject<Group | null>
  selectedConstellation: ConstellationCatalogEntry | null
}

export function SkyCameraController({ skyGroupRef, selectedConstellation }: SkyCameraControllerProps) {
  const { camera, gl } = useThree()
  const isDragging = useRef(false)
  const prevPointer = useRef({ x: 0, y: 0 })
  const velocity = useRef({ x: 0, y: 0 })
  const targetQuat = useRef<Quaternion | null>(null)
  const quatY = useRef(new Quaternion())
  const quatX = useRef(new Quaternion())

  useEffect(() => {
    if (!selectedConstellation) {
      targetQuat.current = null
      return
    }
    const center = computeConstellationCenter(selectedConstellation)
    if (!center) return
    const q = new Quaternion()
    const forward = new Vector3(0, 0, -1)
    q.setFromUnitVectors(center, forward)
    targetQuat.current = q
  }, [selectedConstellation])

  useFrame(() => {
    const group = skyGroupRef.current
    const cam = camera as PerspectiveCamera
    if (!group) return

    if (targetQuat.current != null) {
      group.quaternion.slerp(targetQuat.current, FOCUS_LERP)
      cam.fov += (FOCUS_FOV - cam.fov) * FOV_LERP
      cam.updateProjectionMatrix()
      velocity.current.x = 0
      velocity.current.y = 0
      return
    }

    if (!isDragging.current) {
      velocity.current.x *= INERTIA_DAMPING
      velocity.current.y *= INERTIA_DAMPING
      tempRight.copy(LOCAL_RIGHT).applyQuaternion(group.quaternion)
      quatY.current.setFromAxisAngle(WORLD_Y, velocity.current.x)
      quatX.current.setFromAxisAngle(tempRight, velocity.current.y)
      group.quaternion.premultiply(quatY.current).multiply(quatX.current)
    }
    cam.updateProjectionMatrix()
  })

  const handlePointerDown = useCallback((e: PointerEvent) => {
    isDragging.current = true
    prevPointer.current = { x: e.clientX, y: e.clientY }
    velocity.current = { x: 0, y: 0 }
  }, [])

  const handlePointerMove = useCallback(
    (e: PointerEvent) => {
      const group = skyGroupRef.current
      if (!group || !isDragging.current) return
      const dx = e.clientX - prevPointer.current.x
      const dy = e.clientY - prevPointer.current.y
      prevPointer.current = { x: e.clientX, y: e.clientY }
      const vx = dx * ROTATION_SENSITIVITY
      const vy = -dy * ROTATION_SENSITIVITY
      tempRight.copy(LOCAL_RIGHT).applyQuaternion(group.quaternion)
      quatY.current.setFromAxisAngle(WORLD_Y, vx)
      quatX.current.setFromAxisAngle(tempRight, vy)
      group.quaternion.premultiply(quatY.current).multiply(quatX.current)
      velocity.current = { x: vx, y: vy }
    },
    [skyGroupRef]
  )

  const handlePointerUp = useCallback(() => {
    isDragging.current = false
  }, [])

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      e.preventDefault()
      const cam = camera as PerspectiveCamera
      const delta = e.deltaY > 0 ? FOV_SENSITIVITY : -FOV_SENSITIVITY
      cam.fov = Math.max(MIN_FOV, Math.min(MAX_FOV, cam.fov + delta))
      cam.updateProjectionMatrix()
    },
    [camera]
  )

  useEffect(() => {
    const el = gl.domElement
    el.addEventListener('pointerdown', handlePointerDown)
    el.addEventListener('pointermove', handlePointerMove)
    el.addEventListener('pointerup', handlePointerUp)
    el.addEventListener('pointerleave', handlePointerUp)
    el.addEventListener('wheel', handleWheel, { passive: false })
    return () => {
      el.removeEventListener('pointerdown', handlePointerDown)
      el.removeEventListener('pointermove', handlePointerMove)
      el.removeEventListener('pointerup', handlePointerUp)
      el.removeEventListener('pointerleave', handlePointerUp)
      el.removeEventListener('wheel', handleWheel)
    }
  }, [gl, handlePointerDown, handlePointerMove, handlePointerUp, handleWheel])

  return null
}
