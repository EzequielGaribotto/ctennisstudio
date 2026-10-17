# Assets de reserva

Imágenes que **están en el repositorio pero NO se publican en la web** (esta carpeta está fuera de `public/`).
Son logos de torneos que todavía no se muestran; se guardan por si se necesitan en el futuro.

Para usar uno en la web:

```
npm run logos                      # lista los logos de reserva
npm run logos -- usar roland_garros_logo   # lo copia a public/ (y avisa de la ruta)
```

Después hay que añadirlo al torneo correspondiente en `src/data/tournaments.json`.
Antes de mostrar logos de marcas ajenas, ver `docs/LEGAL.md` (marcas y permisos).

Nota: el repositorio de GitHub es público, así que estos archivos siguen siendo visibles allí (no en ctenisstudio.com).
