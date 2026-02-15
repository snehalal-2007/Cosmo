/**
 * Cosmo – Planetarium camera: drag to rotate sky, scroll to zoom (FOV).
 * Smooth focus to constellation or selected star (time-based animation). Camera stays at origin.
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
const STAR_FOCUS_FOV = 48
const FOCUS_DURATION_MS = 1000
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

function getStarDirection(starId: string): Vector3 | null {
  const star = getStarById(starId)
  if (!star) return null
  const v = raDecToCartesian(star.ra, star.dec)
  return v.normalize()
}

type SkyCameraControllerProps = {
  skyGroupRef: React.RefObject<Group | null>
  selectedConstellation: ConstellationCatalogEntry | null
  selectedStarId: string | null
}

export function SkyCameraController({
  skyGroupRef,
  selectedConstellation,
  selectedStarId,
}: SkyCameraControllerProps) {
  const { camera, gl } = useThree()
  const isDragging = useRef(false)
  const prevPointer = useRef({ x: 0, y: 0 })
  const velocity = useRef({ x: 0, y: 0 })
  const targetQuat = useRef<Quaternion | null>(null)
  const focusStartQuat = useRef<Quaternion | null>(null)
  const focusStartTime = useRef(0)
  const focusTargetFov = useRef(75)
  const focusAnimationPending = useRef(false)
  const quatY = useRef(new Quaternion())
  const quatX = useRef(new Quaternion())
  const forward = useRef(new Vector3(0, 0, -1))

  useEffect(() => {
    if (selectedStarId) {
      const direction = getStarDirection(selectedStarId)
      if (direction) {
        focusTargetFov.current = STAR_FOCUS_FOV
        const q = new Quaternion()
        q.setFromUnitVectors(direction, forward.current)
        targetQuat.current = q
        focusAnimationPending.current = true
      }
      return
    }
    if (selectedConstellation) {
      const center = computeConstellationCenter(selectedConstellation)
      if (center) {
        focusTargetFov.current = FOCUS_FOV
        const q = new Quaternion()
        q.setFromUnitVectors(center, forward.current)
        targetQuat.current = q
        focusAnimationPending.current = true
      }
      return
    }
    targetQuat.current = null
    focusStartQuat.current = null
    focusAnimationPending.current = false
  }, [selectedStarId, selectedConstellation])

  useEffect(() => {
    if (!selectedConstellation) return
    if (selectedStarId != null) return
    const center = computeConstellationCenter(selectedConstellation)
    if (!center) return
    focusTargetFov.current = FOCUS_FOV
    const q = new Quaternion()
    q.setFromUnitVectors(center, forward.current)
    targetQuat.current = q
    focusAnimationPending.current = true
  }, [selectedConstellation])

  useFrame(() => {
    const group = skyGroupRef.current
    const cam = camera as PerspectiveCamera
    if (!group) return

    if (targetQuat.current != null) {
      if (focusAnimationPending.current) {
        focusStartQuat.current = group.quaternion.clone()
        focusStartTime.current = Date.now()
        focusAnimationPending.current = false
      }
      const startQuat = focusStartQuat.current
      if (startQuat) {
        const t = Math.min(1, (Date.now() - focusStartTime.current) / FOCUS_DURATION_MS)
        const ease = 1 - (1 - t) * (1 - t)
        group.quaternion.copy(startQuat).slerp(targetQuat.current!, ease)
        if (t >= 1) {
          group.quaternion.copy(targetQuat.current!)
          focusStartQuat.current = null
          targetQuat.current = null
        }
      }
      cam.fov += (focusTargetFov.current - cam.fov) * FOV_LERP
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
    targetQuat.current = null
    focusStartQuat.current = null
    focusAnimationPending.current = false
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
