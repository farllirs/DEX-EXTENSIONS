# DEX STUDIO — Repositorio de Extensiones

Repositorio oficial de extensiones para DEX STUDIO.

## Compatibilidad de temas

| Tipo funcional | `category` | `type` | Estado | Dónde se aplica |
|---|---|---|---|---|
| Tema normal (colores/estilo) | `theme` | vacío u opcional | Estable | Configuración > Apariencia > Tema Normal |
| UI Layout (estructura/disposición) | `ui-theme` | `ui-theme` recomendado | Beta | Configuración > UI Layout (Beta) |
| Compatibilidad legacy UI Layout | `theme` | `ui-theme` | Compatibilidad | Se trata como UI Layout |

## Estructura mínima de extensión

- `manifest.json`
- `extension.dex.js` (o `main.js`)
- `README.md`
- `theme.css` (si es tema)

> El archivo principal debe terminar con `// Dex code successful`.

## Categorías soportadas

- `editor`
- `tools`
- `language`
- `theme`
- `ui-theme`
- `productivity`
- `debug`

## Documentación

- Guía: [docs/GUIA-EXTENSIONES.md](./docs/GUIA-EXTENSIONES.md)
- SDK: [docs/SDK-REFERENCE.md](./docs/SDK-REFERENCE.md)

## Novedades de compatibilidad

- Compatibilidad objetivo de documentación/repo: `DEX STUDIO v1.0.3`.
- Nueva UI API para extensiones en el editor:
  - `DEX.ui.overrideButton(id, config)`
  - `DEX.ui.clearButton(id)`
  - `DEX.ui.listButtons()`
- IDs core soportados para override:
  - `run`
  - `compile`
  - `terminal`
  - `console-toggle`
- El Marketplace ahora puede marcar extensiones como `Extensión no disponible` cuando el repositorio deja de responder y ocultarlas tras un periodo de gracia.

## Repositorios

- Editor: https://github.com/farllirs/DEX-STUDIO
- Extensiones: https://github.com/farllirs/DEX-EXTENSIONS
