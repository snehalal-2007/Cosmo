# Cosmo – Planet Textures

Place high-resolution NASA-style texture maps here to enable photorealistic PBR rendering.

## Folder structure

```
public/textures/
├── mercury/
│   ├── diffuse.jpg    (albedo / color)
│   ├── normal.jpg     (surface detail)
│   └── roughness.jpg
├── venus/
│   ├── diffuse.jpg
│   ├── normal.jpg
│   └── roughness.jpg
├── earth/
│   ├── diffuse.jpg    (land & ocean)
│   ├── normal.jpg     (terrain)
│   ├── roughness.jpg
│   ├── specular.jpg   (ocean shine)
│   ├── clouds.png     (transparent cloud layer; or clouds.jpg)
├── mars/
│   ├── diffuse.jpg
│   ├── normal.jpg
│   └── roughness.jpg
├── jupiter/
│   ├── diffuse.jpg    (banded + Great Red Spot)
│   ├── normal.jpg
│   └── roughness.jpg
├── saturn/
│   ├── diffuse.jpg
│   ├── normal.jpg
│   ├── roughness.jpg
│   └── rings_alpha.png (ring transparency variation)
├── uranus/
│   ├── diffuse.jpg
│   ├── normal.jpg
│   └── roughness.jpg
├── neptune/
│   ├── diffuse.jpg
│   ├── normal.jpg
│   └── roughness.jpg
└── moon/
    ├── diffuse.jpg    (crater surface)
    ├── normal.jpg
    └── roughness.jpg
```

## Sources

- **NASA** – [Planetary Data System](https://pds-imaging.jpl.nasa.gov/), [Visible Earth](https://visibleearth.nasa.gov/)
- **Solar System Scope** – Free 2K textures (CC BY 4.0)
- **Solar System Texture Maps** – Community packs (check licenses)

## Format

- **Diffuse / Albedo**: JPG or PNG, 1K–4K recommended.
- **Normal**: RGB normal map (tangent space).
- **Roughness**: Greyscale (black = smooth, white = rough).
- **Earth clouds**: PNG with alpha (white clouds on transparent).
- **Saturn rings**: Greyscale or RGBA for inner/outer opacity variation.

If a file is missing, Cosmo falls back to high-quality procedural colors and PBR settings. Add textures progressively; the app loads them optionally without errors.
