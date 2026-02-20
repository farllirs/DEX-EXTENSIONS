var DEX_EXTENSION = {
    id: "md-preview",
    name: "Preview Markdown",
    icon: "eye",
    version: "1.0.0",
    description: "Previsualiza archivos Markdown",
    ui_buttons: [
        { icon: "eye", label: "Preview MD", position: "editor-toolbar", fileTypes: [".md"], action: "openPreview" }
    ]
};

(function () {

    function markdownToHTML(md) {
        return md
            .replace(/^# (.*$)/gim, '<h1>$1</h1>')
            .replace(/^## (.*$)/gim, '<h2>$1</h2>')
            .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/gim, '<em>$1</em>')
            .replace(/```([\s\S]*?)```/gim, '<pre><code>$1</code></pre>')
            .replace(/\n/gim, '<br>');
    }

    var handlers = {
        openPreview: function () {

            var editor = document.getElementById("code-editor");
            if (!editor) return;

            var html = markdownToHTML(editor.value);

            DEX.openPreviewTab(`
                <div style="padding:20px;font-family:sans-serif">
                    ${html}
                </div>
            `);
        }
    };

    DEX.registerExtension(DEX_EXTENSION, handlers);

})();

// Dex code successful