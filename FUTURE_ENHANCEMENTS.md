# Cosmo – Future Enhancements

The following are planned enhancements. **Do not implement until specified.**

---

## Textures

- **High-resolution NASA diffuse maps** – Apply to Sun, planets, and Moon for photorealistic surfaces.
- **Normal maps** – Surface detail and relief.
- **Specular maps** – Control reflectivity and highlights.
- **Earth atmospheric glow shader** – Thin atmosphere rim/glow around Earth.

---

## Shadows

- **Soft shadow mapping from the Sun** – Sun as shadow caster.
- **Planet shadow receiving** – Bodies cast shadows on each other and receive shadows.

---

## Asteroid Belt / Comets / Missions

- **Instanced asteroid belt** – Many small bodies between Mars and Jupiter, driven by simulation time.
- **Comet elliptical paths** – Elliptical orbits with correct periods and visibility.
- **Mission trajectory lines** – Paths tied to simulation time (e.g. Voyager, Mars missions).

---

*All motion in Cosmo is mathematically calculated from a central simulation clock; no hardcoded looping animations.*
