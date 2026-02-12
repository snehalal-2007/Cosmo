/**
 * Cosmo – Optional PBR texture loading. Loads from /textures/{planet}/ without throwing on 404.
 */
import { useState, useEffect, useMemo } from 'react'
import {
  TextureLoader,
  RepeatWrapping,
  SRGBColorSpace,
  LinearMipmapLinearFilter,
  LinearFilter,
} from 'three'
import type { Texture } from 'three'
import type { PlanetId } from '../data/planets'
import { PLANET_TEXTURE_PATHS, MOON_TEXTURE_PATHS } from '../data/planetTextures'

export type LoadedTextures = {
  map: Texture | null
  normalMap: Texture | null
  roughnessMap: Texture | null
  specularMap?: Texture | null
}

function configureTexture(t: Texture, isDiffuse = false) {
  t.wrapS = t.wrapT = RepeatWrapping
  t.anisotropy = 8
  t.minFilter = LinearMipmapLinearFilter
  t.magFilter = LinearFilter
  t.generateMipmaps = true
  if (isDiffuse) t.colorSpace = SRGBColorSpace
  t.needsUpdate = true
}

function loadOptional(url: string, isDiffuse = false): Promise<Texture | null> {
  return new Promise((resolve) => {
    const loader = new TextureLoader()
    loader.load(
      url,
      (tex) => {
        configureTexture(tex, isDiffuse)
        resolve(tex)
      },
      undefined,
      () => resolve(null)
    )
  })
}

function toAbsoluteUrl(path: string): string {
  if (typeof window !== 'undefined' && path.startsWith('/')) {
    return new URL(path, window.location.origin).href
  }
  return path
}

export function usePlanetTextures(planetId: PlanetId): LoadedTextures {
  const paths = PLANET_TEXTURE_PATHS[planetId]
  const [map, setMap] = useState<Texture | null>(null)
  const [normalMap, setNormalMap] = useState<Texture | null>(null)
  const [roughnessMap, setRoughnessMap] = useState<Texture | null>(null)
  const [specularMap, setSpecularMap] = useState<Texture | null>(null)

  useEffect(() => {
    if (!paths) return
    let cancelled = false

    // Fallback: load diffuse if preload didn't provide it (same absolute URL so it resolves)
    const diffuseUrl = paths.diffuse ?? null
    if (diffuseUrl) {
      loadOptional(toAbsoluteUrl(diffuseUrl), true).then((m) => {
        if (!cancelled && m) setMap(m)
        else if (m) m.dispose()
      })
    }

    const otherUrls = {
      normal: paths.normal ?? null,
      roughness: paths.roughness ?? null,
      specular: paths.specular ?? null,
    }

    const loadOthers = async () => {
      const [n, r, s] = await Promise.all([
        otherUrls.normal ? loadOptional(otherUrls.normal) : Promise.resolve(null),
        otherUrls.roughness ? loadOptional(otherUrls.roughness) : Promise.resolve(null),
        otherUrls.specular ? loadOptional(otherUrls.specular) : Promise.resolve(null),
      ])
      if (cancelled) {
        [n, r, s].forEach((t) => t?.dispose())
        return
      }
      setNormalMap(n)
      setRoughnessMap(r)
      setSpecularMap(s ?? null)
    }
    loadOthers()

    return () => {
      cancelled = true
    }
  }, [planetId])

  return useMemo(
    () => ({ map, normalMap, roughnessMap, specularMap }),
    [map, normalMap, roughnessMap, specularMap]
  )
}

export function useMoonTextures(): LoadedTextures {
  const paths = MOON_TEXTURE_PATHS
  const [map, setMap] = useState<Texture | null>(null)
  const [normalMap, setNormalMap] = useState<Texture | null>(null)
  const [roughnessMap, setRoughnessMap] = useState<Texture | null>(null)

  useEffect(() => {
    let cancelled = false
    if (paths.diffuse) {
      loadOptional(toAbsoluteUrl(paths.diffuse), true).then((m) => {
        if (!cancelled && m) setMap(m)
        else if (m) m.dispose()
      })
    }
    const loadOthers = async () => {
      const [n, r] = await Promise.all([
        paths.normal ? loadOptional(paths.normal) : Promise.resolve(null),
        paths.roughness ? loadOptional(paths.roughness) : Promise.resolve(null),
      ])
      if (cancelled) {
        [n, r].forEach((t) => t?.dispose())
        return
      }
      setNormalMap(n)
      setRoughnessMap(r)
    }
    loadOthers()
    return () => {
      cancelled = true
    }
  }, [paths.diffuse, paths.normal, paths.roughness])

  return useMemo(() => ({ map, normalMap, roughnessMap, specularMap: null }), [map, normalMap, roughnessMap])
}

export function useOptionalTexture(url: string | undefined, isDiffuse = false): Texture | null {
  const [tex, setTex] = useState<Texture | null>(null)
  const resolvedUrl =
    url && typeof window !== 'undefined' && url.startsWith('/')
      ? new URL(url, window.location.origin).href
      : url
  useEffect(() => {
    if (!resolvedUrl) {
      setTex(null)
      return
    }
    let cancelled = false
    loadOptional(resolvedUrl, isDiffuse).then((t) => {
      if (!cancelled) setTex(t)
    })
    return () => {
      cancelled = true
    }
  }, [resolvedUrl, isDiffuse])
  return tex
}
