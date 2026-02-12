/**
 * Cosmo – Earth (and Neptune) atmospheric rim glow. Subtle blue edge.
 */
import { useMemo } from 'react'
import { BackSide, Color } from 'three'

const vertexShader = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vViewPosition = -mvPosition.xyz;
    gl_Position = projectionMatrix * mvPosition;
  }
`

const fragmentShader = /* glsl */ `
  uniform vec3 uColor;
  uniform float uPower;
  uniform float uIntensity;
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  void main() {
    float intensity = pow(uPower - dot(normalize(vNormal), normalize(vViewPosition)), 2.0);
    intensity = max(0.0, intensity) * uIntensity;
    gl_FragColor = vec4(uColor, intensity);
  }
`

type EarthAtmosphereProps = {
  radius: number
  color?: string
  power?: number
  intensity?: number
}

export function EarthAtmosphere({
  radius,
  color = '#4a7ba7',
  power = 1.4,
  intensity = 0.35,
}: EarthAtmosphereProps) {
  const uniforms = useMemo(
    () => ({
      uColor: { value: new Color(color) },
      uPower: { value: power },
      uIntensity: { value: intensity },
    }),
    [color, power, intensity]
  )

  return (
    <mesh scale={1.02}>
      <sphereGeometry args={[radius, 64, 64]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        side={BackSide}
        transparent
        depthWrite={false}
      />
    </mesh>
  )
}
