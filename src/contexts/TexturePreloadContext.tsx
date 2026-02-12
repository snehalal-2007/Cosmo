/**
 * Cosmo – Centralized diffuse texture preload. Single source of truth: DIFFUSE_TEXTURE_URLS.
 * Loads sequentially so every planet and moon gets its texture; keys match IDs exactly (lowercase).
 */
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  type ReactNode,
} from 'react'
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

function configureTexture(t: Texture) {
  t.wrapS = t.wrapT = RepeatWrapping
  t.anisotropy = 8
  t.minFilter = LinearMipmapLinearFilter
  t.magFilter = LinearFilter
  t.generateMipmaps = true
  t.colorSpace = SRGBColorSpace
  t.needsUpdate = true
}

export type TextureMap = Record<PlanetId | 'moon', Texture | null>

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
}

const TexturePreloadContext = createContext<TextureMap>(defaultTextures)

function loadOne(
  loader: TextureLoader,
  url: string
): Promise<Texture | null> {
  return new Promise((resolve) => {
    loader.load(
      url,
      (tex) => {
        configureTexture(tex)
        resolve(tex)
      },
      undefined,
      () => resolve(null)
    )
  })
}

function resolveUrl(path: string): string {
  if (typeof window !== 'undefined' && path.startsWith('/')) {
    return new URL(path, window.location.origin).href
  }
  return path
}

export function TexturePreloadProvider({ children }: { children: ReactNode }) {
  const [textures, setTextures] = useState<TextureMap>(defaultTextures)

  useEffect(() => {
    const loader = new TextureLoader()
    let cancelled = false

    async function loadAll() {
      const loadPromises = BODY_IDS.map(async (id) => {
        const path = DIFFUSE_TEXTURE_URLS[id]
        const url = resolveUrl(path)
        const tex = await loadOne(loader, url)
        return { id, tex }
      })

      const results = await Promise.all(loadPromises)
      if (cancelled) {
        results.forEach((r) => r.tex?.dispose())
        return
      }

      const next: TextureMap = { ...defaultTextures }
      results.forEach(({ id, tex }) => {
        if (tex) next[id] = tex
      })
      setTextures({ ...next })

      const loadedKeys = Object.keys(next).filter((k) => next[k as keyof TextureMap] != null) as (PlanetId | 'moon')[]
      console.log('Loaded textures:', loadedKeys)
      const expected: (PlanetId | 'moon')[] = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'moon']
      const missing = expected.filter((k) => !loadedKeys.includes(k))
      if (missing.length > 0) {
        console.warn('Missing texture keys (check URLs):', missing)
      }
    }
    loadAll()

    return () => {
      cancelled = true
    }
  }, [])

  const value = useMemo(() => textures, [textures])
  return (
    <TexturePreloadContext.Provider value={value}>
      {children}
    </TexturePreloadContext.Provider>
  )
}

export function usePreloadedTexture(id: PlanetId | 'moon'): Texture | null {
  const map = useContext(TexturePreloadContext)
  return map[id] ?? null
}
