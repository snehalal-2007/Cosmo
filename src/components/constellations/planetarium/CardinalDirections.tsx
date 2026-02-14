/**
 * Cosmo – Cardinal direction labels on the celestial sphere (N, S, E, W).
 * +Y = North, -Y = South, +X = East, -X = West. Rotate with the sky.
 */
import { Html } from '@react-three/drei'

const SPHERE_RADIUS = 500

const LABELS: { id: string; letter: string; position: [number, number, number] }[] = [
  { id: 'n', letter: 'N', position: [0, SPHERE_RADIUS, 0] },
  { id: 's', letter: 'S', position: [0, -SPHERE_RADIUS, 0] },
  { id: 'e', letter: 'E', position: [SPHERE_RADIUS, 0, 0] },
  { id: 'w', letter: 'W', position: [-SPHERE_RADIUS, 0, 0] },
]

const labelStyle: React.CSSProperties = {
  pointerEvents: 'none',
  fontSize: '0.9rem',
  fontWeight: 600,
  color: 'rgba(220, 235, 255, 0.9)',
  textShadow: '0 0 8px rgba(255,255,255,0.4), 0 0 4px rgba(255,255,255,0.3)',
  letterSpacing: '0.05em',
  userSelect: 'none',
}

export function CardinalDirections() {
  return (
    <>
      {LABELS.map(({ id, letter, position }) => (
        <Html key={id} position={position} center style={labelStyle}>
          <span>{letter}</span>
        </Html>
      ))}
    </>
  )
}
