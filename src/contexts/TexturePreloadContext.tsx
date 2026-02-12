/**
 * Cosmo – Diffuse texture preload via R3F useLoader. Single load, then provide to all planets + moon + sun.
 */
import { createContext, useContext, useMemo, Suspense, type ReactNode } from 'react'
import { useLoader } from '@react-three/fiber'
import {
  TextureLoader,
  RepeatWrapping,
  SRGBColorSpace,
  LinearMipmapLinearFilter,
  LinearFilter,
} from 'three'
import type { Texture } from 'three'
import type { PlanetId } from '../data/planets'
import { DIFFUSE_TEXTURE_URLS } from '../data/planetTextures'

const BODY_IDS: (PlanetId | 'moon')[] = [
  'mercury',
  'venus',
  'earth',
  'mars',
  'jupiter',
  'saturn',
  'uranus',
  'neptune',
  'moon',
]

/** All IDs that have a diffuse texture (planets + moon + sun). */
export const ALL_TEXTURE_IDS: (PlanetId | 'moon' | 'sun')[] = [...BODY_IDS, 'sun']

export type TextureMap = Record<PlanetId | 'moon' | 'sun', Texture | null>

const defaultTextures: TextureMap = {
  mercury: null,
  venus: null,
  earth: null,
  mars: null,
  jupiter: null,
  saturn: null,
  uranus: null,
  neptune: null,
  moon: null,
  sun: null,
}

const TexturePreloadContext = createContext<TextureMap>(defaultTextures)

function configureTexture(t: Texture) {
  t.wrapS = t.wrapT = RepeatWrapping
  t.anisotropy = 8
  t.minFilter = LinearMipmapLinearFilter
  t.magFilter = LinearFilter
  t.generateMipmaps = true
  t.colorSpace = SRGBColorSpace
  t.needsUpdate = true
}

/** URLs in same order as ALL_TEXTURE_IDS for useLoader. */
const TEXTURE_URLS = ALL_TEXTURE_IDS.map((id) => DIFFUSE_TEXTURE_URLS[id])

function TexturePreloadInner({ children }: { children: ReactNode }) {
  const texturesArray = useLoader(TextureLoader, TEXTURE_URLS) as Texture[]
  const value = useMemo(() => {
    const map: TextureMap = { ...defaultTextures }
    ALL_TEXTURE_IDS.forEach((id, i) => {
      const tex = texturesArray[i]
      if (tex) {
        configureTexture(tex)
        map[id] = tex
      }
    })
    return map
  }, [texturesArray])

  return (
    <TexturePreloadContext.Provider value={value}>
      {children}
    </TexturePreloadContext.Provider>
  )
}

export function TexturePreloadProvider({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={null}>
      <TexturePreloadInner>{children}</TexturePreloadInner>
    </Suspense>
  )
}

export function usePreloadedTexture(id: PlanetId | 'moon' | 'sun'): Texture | null {
  const map = useContext(TexturePreloadContext)
  return map[id] ?? null
}
