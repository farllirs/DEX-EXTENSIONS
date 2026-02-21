# DEX STUDIO — Repositorio de Extensiones

Extensiones oficiales y de la comunidad para DEX STUDIO.

## Estructura de una Extensión

Cada extensión debe contener:
- `manifest.json` — Configuración y metadata
- `extension.dex.js` (o `main.js` por compatibilidad) — Código principal (DEBE terminar con `// Dex code successful`)
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
    "color": "linear-gradient(135deg, #667eea, #764ba2)"
}
```

## Plantilla de Extensión

```javascript
// Mi Extensión — Extensión para DEX STUDIO
DEX.registerExtension({
    id: 'mi-extension',
    name: 'Mi Extensión',
    version: '1.0.0',
    description: 'Descripción',
    icon: 'puzzle',
    ui_buttons: [
        // { label: 'Acción', icon: 'zap', action: 'onAction', fileTypes: ['.py', '.js'] }
    ]
}, {
    onInit: function() {
        console.log('Mi Extensión inicializada');
    },
    onFileOpen: function(path, ext) {
        return false; // true si la extensión maneja este archivo
    },
    onEditorInput: function(editor) {
        // Se ejecuta al escribir en el editor
    },
    onAction: function() {
        // Acción del botón
    }
});
// Dex code successful
```

## DEX Extension API (v1.0.1)

### Paneles
```javascript
DEX.createPanel(id, html, options)   // Crear panel (fullscreen o sidebar)
DEX.removePanel(id)                  // Eliminar panel
DEX.showSidebar(id, html)            // Panel lateral derecho
```

### Archivos
```javascript
DEX.readCurrentFile()                // Leer contenido del archivo actual
DEX.writeCurrentFile(content)        // Escribir al archivo actual
DEX.getCurrentFilePath()             // Ruta del archivo actual
DEX.getProjectPath()                 // Ruta del proyecto actual
```

### Hooks
```javascript
DEX.onFileSave(callback)             // Al guardar archivo
DEX.onFileChange(callback)           // Al cambiar de archivo
DEX.triggerFileSave(path)            // Disparar hooks de guardado
DEX.triggerFileChange(path)          // Disparar hooks de cambio
```

### Comandos
```javascript
DEX.registerCommand(id, fn)          // Registrar comando
DEX.executeCommand(id)               // Ejecutar comando
```

### UI
```javascript
DEX.addMenuItem(menu, item)          // Agregar item a menús
DEX.showInputDialog(opts)            // Diálogo de input (Promise)
DEX.showNotification(title, msg, type) // Notificación
DEX.log(msg, isError)                // Escribir en terminal
DEX.getTheme()                       // Obtener tema {ui, editor}
```

### Utilidades
```javascript
DEX.parseMarkdown(md)                // Parser de Markdown integrado
```

## Instalar Extensiones

Las extensiones se descargan desde el panel de **Extensiones** dentro de DEX STUDIO, o se publican directamente desde el editor con el botón **Publicar** en el menú Compilar.

## Publicar una Extensión

1. Crea un proyecto de tipo **Extensión** en DEX STUDIO
2. Desarrolla tu extensión usando la API de arriba
3. Ve a **Compilar → 📤 Publicar Extensión**
4. Necesitarás un token de GitHub con permisos `repo`
5. Tu extensión aparecerá en el marketplace automáticamente
