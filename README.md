# DEX STUDIO — Repositorio de Extensiones

Extensiones oficiales y de la comunidad para DEX STUDIO IDE.

## Estructura de una Extensión

Cada extensión debe contener:
- `manifest.json` — Configuración y metadata
- `main.js` — Código principal (DEBE terminar con `// Dex code successful`)
- `README.md` — Documentación (se muestra en el panel de extensiones)

## Tipos de Extensiones

| Categoría | Descripción | Ejemplo |
|-----------|-------------|---------|
| `editor` | Funcionalidades del editor | Autocompletado, Preview HTML |
| `theme` | Temas de colores | Monokai, One Dark |
| `ui` | Mejoras visuales | File Icons |
| `language` | Soporte de lenguajes | Syntax highlighting |

## manifest.json

```json
{
    "id": "mi-extension",
    "name": "Mi Extensión",
    "version": "1.0.0",
    "description": "Descripción corta",
    "author": "Tu Nombre",
    "icon": "nombre-icono-lucide",
    "category": "editor",
    "min_dex_version": "1.0.0",
    "files": ["main.js"],
    "color": "#hexcolor"
}
```

## DEX Extension API

```javascript
var DEX_EXTENSION = {
    id: "mi-extension",
    name: "Mi Extensión",
    icon: "puzzle",
    version: "1.0.0",
    description: "Descripción",
    ui_buttons: [
        { icon: "play", label: "Acción", position: "editor-toolbar", fileTypes: [".py"], action: "miAccion" }
    ]
};

(function() {
    var handlers = {
        onInit: function() { /* Al cargar */ },
        onFileOpen: function(path, ext) { /* Al abrir archivo */ },
        onEditorInput: function(editor) { /* Al escribir */ },
        miAccion: function() { /* Acción personalizada */ }
    };
    DEX.registerExtension(DEX_EXTENSION, handlers);
})();
// Dex code successful
```

## Instalar Extensiones

Las extensiones se descargan desde el panel de Extensiones dentro de DEX STUDIO.
