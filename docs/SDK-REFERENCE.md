# DEX SDK — Referencia Completa (v1.0.2)

Documentación de todas las funciones disponibles para extensiones de DEX STUDIO.

---

## Registro de Extensión

```javascript
DEX.registerExtension(config, handlers)
```

### Config (objeto)

| Propiedad      | Tipo     | Requerido | Descripción |
|----------------|----------|-----------|-------------|
| `id`           | string   | ✅ | Identificador único (minúsculas, guiones). Debe coincidir con manifest.json |
| `name`         | string   | ✅ | Nombre visible en el Marketplace |
| `version`      | string   | ✅ | Versión semántica (ej: `1.0.0`) |
| `description`  | string   | ✅ | Descripción corta |
| `icon`         | string   | ❌ | Nombre de ícono Lucide. Default: `puzzle` |
| `ui_buttons`   | array    | ❌ | Botones para el toolbar del editor |
| `ui_statusbar` | array    | ❌ | Items para la barra de estado |
| `ui_panels`    | array    | ❌ | Paneles laterales |

---

## Elementos de UI

### Botones en Toolbar

```javascript
ui_buttons: [
    {
        label: 'Mi Botón',
        icon: 'zap',                    // Ícono Lucide
        action: 'onMyAction',           // Nombre del handler
        fileTypes: ['.py', '.js']       // Filtro opcional por tipo de archivo
    }
]
```

### Items en Barra de Estado

```javascript
ui_statusbar: [
    { text: 'Estado', icon: 'info', action: 'onStatusClick' }
]
```

### Paneles Laterales

```javascript
ui_panels: [
    { id: 'mi-panel', title: 'Mi Panel', icon: 'layout', position: 'right' }
]
```

---

## Handlers (Ciclo de Vida)

| Handler          | Evento         | Parámetros        | Descripción |
|------------------|----------------|-------------------|-------------|
| `onInit`         | —              | ninguno           | Se ejecuta una vez al cargar la extensión |
| `onFileOpen`     | `fileOpen`     | `(path, ext)`     | Al abrir un archivo. Retornar `true` si la extensión lo maneja |
| `onFileSave`     | `fileSave`     | `(path)`          | Después de guardar un archivo |
| `onFileClose`    | `fileClose`    | `(path)`          | Al cerrar una pestaña |
| `onProjectOpen`  | `projectOpen`  | `(projectPath)`   | Al abrir un proyecto |
| `onEditorInput`  | —              | `(editor)`        | En cada pulsación de tecla en el editor |

### Ejemplo de Handler

```javascript
onFileOpen: function(path, ext) {
    if (ext === '.md') {
        DEX.showNotification('Markdown detectado', 'info');
        return true;  // La extensión maneja este archivo
    }
    return false;
},

onEditorInput: function(editor) {
    const code = editor.value;               // Contenido completo
    const cursor = editor.selectionStart;    // Posición del cursor
    const selected = editor.value.substring(
        editor.selectionStart,
        editor.selectionEnd
    );
}
```

---

## Paneles y UI

| Función | Descripción |
|---------|-------------|
| `DEX.createPanel(id, html, options)` | Crear panel (fullscreen o sidebar) |
| `DEX.removePanel(id)` | Eliminar un panel creado |
| `DEX.showSidebar(id, html)` | Panel lateral derecho |
| `DEX.showImageViewer(path)` | Abrir el visor de imágenes integrado |
| `DEX.openPreviewTab(html)` | Abrir una pestaña de preview HTML |
| `DEX.hidePreview()` | Cerrar la pestaña de preview |

---

## Archivos

| Función | Descripción |
|---------|-------------|
| `DEX.readCurrentFile()` | Leer contenido del archivo actual |
| `DEX.writeCurrentFile(content)` | Escribir al archivo actual |
| `DEX.getCurrentFilePath()` | Ruta del archivo actual |
| `DEX.getProjectPath()` | Ruta del proyecto actual |

---

## Filesystem

```javascript
DEX.fs.readFile(path)                // Leer archivo (retorna Promise)
DEX.fs.writeFile(path, content)      // Escribir archivo
DEX.fs.listDir(path)                 // Listar directorio
DEX.fs.createFile(path)              // Crear archivo vacío
DEX.fs.createDir(path)               // Crear directorio
DEX.fs.delete(path)                  // Eliminar archivo o directorio
DEX.fs.rename(oldPath, newPath)      // Renombrar
DEX.fs.exists(path)                  // Verificar si existe
```

---

## Notificaciones y UI

| Función | Descripción |
|---------|-------------|
| `DEX.showNotification(title, msg, type)` | Toast: `'success'`, `'error'`, `'info'` |
| `DEX.log(msg, isError)` | Escribir en la terminal integrada |
| `DEX.showInputDialog(options)` | Diálogo de input (retorna Promise) |
| `DEX.addMenuItem(menu, item)` | Agregar item a menú contextual |
| `DEX.getTheme()` | Obtener tema actual `{ ui, editor }` |
| `DEX.parseMarkdown(md)` | Convertir Markdown a HTML |
| `DEX.currentLanguage` | Lenguaje del archivo actual (ej: `'python'`) |

---

## Comandos

```javascript
DEX.registerCommand('mi-comando', function() {
    // Acción del comando
});

DEX.executeCommand('mi-comando');
```

---

## Hooks

```javascript
DEX.onFileSave(function(path) {
    console.log('Guardado:', path);
});

DEX.onFileChange(function(path) {
    console.log('Cambio a:', path);
});
```

---

## Multi-archivo

```javascript
DEX.require(extId, 'utils.js')              // Cargar módulo JS o JSON
DEX.python.run(extId, 'script.py')          // Ejecutar script Python
DEX.extFiles.list(extId)                    // Listar archivos de la extensión
DEX.extFiles.read(extId, 'data.json')       // Leer archivo de la extensión
DEX.extFiles.write(extId, 'out.json', data) // Escribir archivo
```

---

## Shell

```javascript
DEX.shell.exec('ls -la')     // Ejecutar comando del sistema (retorna Promise)
```

---

## Storage (Persistencia)

```javascript
const store = DEX.storage.forExtension('mi-extension');
store.set('config', JSON.stringify({ theme: 'dark' }));
const val = store.get('config');
```

---

## Temas de Interfaz (UI Themes)

Para crear un tema completo, configura `manifest.json` con:

```json
{
    "category": "theme",
    "type": "ui-theme",
    "colors": {
        "background": "#1e1e2e",
        "foreground": "#cdd6f4",
        "accent": "#89b4fa"
    }
}
```

Y crea un `theme.css` con las variables CSS:

```css
:root {
    --bg-primary: #1e1e2e;
    --bg-secondary: #313244;
    --bg-sidebar: #181825;
    --text-primary: #cdd6f4;
    --text-secondary: #a6adc8;
    --accent: #89b4fa;
    --accent-hover: #74c7ec;
    --border-color: #45475a;
}
```

---

## Notas Importantes

1. El archivo JS principal **DEBE** terminar con `// Dex code successful`
2. El `id` en `manifest.json` debe coincidir con el `id` en `DEX.registerExtension()`
3. El `id` debe coincidir con el nombre de la carpeta de la extensión
4. Evita código pesado en `onEditorInput` — se ejecuta en cada tecla
5. Las extensiones se instalan en `~/.dex-studio/extensions/{id}/`
