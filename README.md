# DEX STUDIO — Repositorio de Extensiones

Extensiones oficiales y de la comunidad para DEX STUDIO v1.0.2.

## Novedades v1.0.2

- **Marketplace estilo VS Code** — Pestañas Instaladas/Marketplace, búsqueda global
- **Activar/Desactivar extensiones** — Toggle rápido sin desinstalar
- **Detección de estado real** — Verificación contra disco, no solo DB
- **README renderizado** — Se muestra con formato Markdown en el panel de detalle

## Estructura de una Extensión

Cada extensión debe contener:
- `manifest.json` — Configuración y metadata
- `extension.dex.js` (o `main.js`) — Código principal (DEBE terminar con `// Dex code successful`)
- `README.md` — Documentación (se muestra en el panel de extensiones)

## Tipos de Extensiones

| Categoría | Descripción | Ejemplo |
|-----------|-------------|---------|
| `editor` | Funcionalidades del editor | Autocompletado, Preview HTML, Markdown Pro |
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
        return false;
    },
    onEditorInput: function(editor) {
    },
    onAction: function() {
    }
});
// Dex code successful
```

## DEX Extension API (v1.0.2)

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
DEX.parseMarkdown(md)                // Parser de Markdown integrado
```

### Multi-archivo (v2)
```javascript
DEX.require(extId, 'utils.js')        // Cargar módulos JS/JSON
DEX.python.run(extId, 'script.py')    // Ejecutar Python
DEX.extFiles.list(extId)              // Listar archivos de la extensión
DEX.extFiles.read(extId, path)        // Leer archivo
DEX.extFiles.write(extId, path, data) // Escribir archivo
```

### Filesystem y Otros
```javascript
DEX.fs.readFile(path) / DEX.fs.writeFile(path, content)
DEX.fs.listDir(path) / DEX.fs.createFile(path) / DEX.fs.createDir(path)
DEX.fs.delete(path) / DEX.fs.rename(old, new) / DEX.fs.exists(path)
DEX.shell.exec(cmd)
DEX.storage.forExtension(id).get(key) / .set(key, value)
```

## Gestión de Extensiones

- **Instalar** — Desde el panel Marketplace dentro de DEX STUDIO
- **Activar/Desactivar** — Botón ⏸/▶ sin eliminar archivos (requiere reinicio)
- **Desinstalar** — Botón 🗑 elimina archivos y registro de la DB
- **Publicar** — Compilar → 📤 Publicar Extensión (necesita token GitHub con scope `repo`)

## Repositorios

- **Editor:** https://github.com/farllirs/DEX-STUDIO
- **Extensiones:** https://github.com/farllirs/DEX-EXTENSIONS