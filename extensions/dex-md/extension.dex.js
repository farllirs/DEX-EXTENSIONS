// md-synthesis — Extensión para DEX STUDIO
// Síntesis visual completa de Markdown con sistema de color por peso tipográfico

DEX.registerExtension({
    id: 'md-synthesi',
    name: 'MD Synthesis',
    version: '1.0.0',
    description: 'Síntesis visual de todos los elementos Markdown. El color escala con el peso tipográfico: más grande = más cálido, más pequeño = más frío.',
    icon: 'palette',
    ui_buttons: [
        { label: 'MD Synthesis', icon: 'palette', action: 'openSynthesis', fileTypes: ['.md', '.markdown'] }
    ]
}, {
    onInit: function() {
        console.log('MD Synthesis inicializada');
    },

    onFileOpen: function(path, ext) {
        return false;
    },

    onEditorInput: function(editor) {
        // Sin acción en tiempo real — v2.0.0 traerá preview en vivo
    },

    openSynthesis: function() {
        DEX.openPreviewTab(this._buildHTML());
    },

    _buildHTML: function() {
        var theme = DEX.getTheme ? DEX.getTheme() : { ui: 'dark' };
        var isDark = theme.ui !== 'light';

        var bg      = isDark ? '#0d1117' : '#f6f8fa';
        var surface = isDark ? '#161b22' : '#ffffff';
        var border  = isDark ? '#30363d' : '#d0d7de';
        var text    = isDark ? '#e6edf3' : '#1f2328';
        var muted   = isDark ? '#8b949e' : '#656d76';
        var codePanel = isDark ? '#1a2433' : '#eef2f7';

        return '<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8">' +
        '<title>MD Synthesis — DEX STUDIO</title><style>' +

        /* ── Reset ── */
        '*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}' +
        'html{scroll-behavior:smooth}' +
        'body{background:' + bg + ';color:' + text + ';' +
        'font-family:"Segoe UI",system-ui,sans-serif;font-size:15px;line-height:1.7}' +

        /* ── Header ── */
        '.top{background:' + surface + ';border-bottom:1px solid ' + border + ';' +
        'padding:13px 28px;display:flex;align-items:center;gap:10px;' +
        'position:sticky;top:0;z-index:99}' +
        '.top-dot{width:8px;height:8px;border-radius:50%;background:#FF4500}' +
        '.top-title{font-size:.8rem;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:' + text + '}' +
        '.top-sub{font-size:.7rem;color:' + muted + ';margin-left:auto;font-family:monospace}' +

        /* ── Layout ── */
        '.wrap{max-width:800px;margin:0 auto;padding:36px 28px 80px;display:flex;flex-direction:column;gap:44px}' +

        /* ── Section label ── */
        '.lbl{font-family:monospace;font-size:.67rem;letter-spacing:.18em;text-transform:uppercase;' +
        'color:' + muted + ';margin-bottom:14px;padding-bottom:7px;border-bottom:1px solid ' + border + '}' +

        /* ── Color chips ── */
        '.chips{display:flex;flex-wrap:wrap;gap:8px}' +
        '.chip{display:flex;align-items:center;gap:7px;padding:5px 12px;border-radius:20px;' +
        'background:' + surface + ';border:1px solid ' + border + ';' +
        'font-family:monospace;font-size:.68rem;color:' + text + '}' +
        '.cdot{width:9px;height:9px;border-radius:50%;flex-shrink:0}' +

        /* ── Headings ── */
        '.hrows{display:flex;flex-direction:column;gap:7px}' +
        '.hrow{display:flex;align-items:center;gap:14px;padding:11px 17px;border-radius:7px;' +
        'border-left:4px solid;transition:transform .15s;cursor:default}' +
        '.hrow:hover{transform:translateX(5px)}' +
        '.htag{font-family:monospace;font-size:.67rem;opacity:.5;min-width:58px;flex-shrink:0}' +

        '.h1{background:#FF450013;border-color:#FF4500;font-size:2.1rem;font-weight:900;color:#FF4500}' +
        '.h2{background:#FF7F1113;border-color:#FF7F11;font-size:1.75rem;font-weight:800;color:#FF7F11}' +
        '.h3{background:#E8B86D13;border-color:#E8B86D;font-size:1.45rem;font-weight:700;color:#E8B86D}' +
        '.h4{background:#4FC3F713;border-color:#4FC3F7;font-size:1.2rem;font-weight:700;color:#4FC3F7}' +
        '.h5{background:#7986CB13;border-color:#7986CB;font-size:1.02rem;font-weight:600;color:#7986CB}' +
        '.h6{background:#CE93D813;border-color:#CE93D8;font-size:.88rem;font-weight:600;color:#CE93D8}' +

        /* ── Inline grid ── */
        '.igrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:9px}' +
        '.icard{background:' + surface + ';border:1px solid ' + border + ';border-radius:7px;padding:13px 15px}' +
        '.isyn{font-family:monospace;font-size:.64rem;color:' + muted + ';margin-bottom:6px}' +
        '.ipre{font-size:.95rem;color:' + text + '}' +

        /* inline tokens */
        '.t-b{color:#FF4500;font-weight:800}' +
        '.t-i{color:#7986CB;font-style:italic}' +
        '.t-bi{color:#FF7F11;font-weight:800;font-style:italic}' +
        '.t-c{background:' + codePanel + ';color:#4FC3F7;font-family:monospace;padding:2px 6px;border-radius:4px;font-size:.87em}' +
        '.t-s{color:#888;text-decoration:line-through}' +
        '.t-h{background:#E8B86D;color:#1a1200;padding:1px 5px;border-radius:3px}' +
        '.t-a{color:#4FC3F7;text-decoration:underline;cursor:pointer}' +
        '.t-sup{color:#7986CB;vertical-align:super;font-size:.7em;font-family:monospace}' +
        '.t-sub{color:#CE93D8;vertical-align:sub;font-size:.7em;font-family:monospace}' +
        '.t-kbd{background:' + surface + ';border:1px solid ' + border + ';border-bottom:3px solid ' + border + ';' +
        'padding:1px 7px;border-radius:4px;font-family:monospace;font-size:.82em;color:' + text + '}' +
        '.t-mark{background:#FF450022;color:#FF4500;padding:1px 4px;border-radius:3px;font-style:italic}' +

        /* ── Code block ── */
        '.cblock{background:#0a0e13;border:1px solid ' + border + ';border-radius:9px;overflow:hidden}' +
        '.chead{background:#161b22;padding:9px 16px;display:flex;align-items:center;gap:6px;border-bottom:1px solid #30363d}' +
        '.cd{width:11px;height:11px;border-radius:50%;display:inline-block}' +
        '.cd-r{background:#FF605C}.cd-y{background:#FFBD44}.cd-g{background:#00CA4E}' +
        '.clang{font-family:monospace;font-size:.67rem;color:#8b949e;margin-left:auto}' +
        'pre{padding:18px 22px;font-family:monospace;font-size:.85rem;line-height:1.8;overflow-x:auto;color:#e6edf3}' +
        '.k{color:#FF7F11}.fn{color:#4FC3F7}.st{color:#7986CB}.nm{color:#FF4500}.cm{color:#3d5166;font-style:italic}.vr{color:#E8B86D}' +

        /* ── Lists ── */
        '.lgrid{display:grid;grid-template-columns:1fr 1fr;gap:11px}' +
        '.lbox{background:' + surface + ';border:1px solid ' + border + ';border-radius:7px;padding:15px 17px}' +
        '.ltit{font-family:monospace;font-size:.65rem;color:' + muted + ';margin-bottom:9px;text-transform:uppercase;letter-spacing:.08em}' +
        '.lbox ul,.lbox ol{padding-left:20px;display:flex;flex-direction:column;gap:4px;font-size:.92rem;color:' + text + '}' +
        '.lbox ul li::marker{color:#FF4500}' +
        '.lbox ul ul{margin-top:4px}' +
        '.lbox ul ul li::marker{color:#FF7F11}' +
        '.lbox ul ul ul li::marker{color:#7986CB}' +
        '.lbox ol li::marker{color:#4FC3F7;font-weight:700;font-family:monospace}' +

        /* ── Task list ── */
        '.tlist{display:flex;flex-direction:column;gap:7px}' +
        '.titem{display:flex;align-items:center;gap:11px;padding:8px 14px;' +
        'background:' + surface + ';border-radius:6px;border:1px solid ' + border + ';font-size:.92rem;color:' + text + '}' +
        '.titem.done{text-decoration:line-through;color:' + muted + ';border-color:#00CA4E35}' +
        '.tck{font-family:monospace;font-size:.8rem;color:' + muted + '}' +
        '.titem.done .tck{color:#00CA4E}' +

        /* ── Blockquote ── */
        '.bq{border-left:4px solid #FF7F11;background:#FF7F1110;padding:13px 19px;' +
        'border-radius:0 7px 7px 0;font-style:italic;font-size:.98rem;position:relative;color:' + text + '}' +
        '.bq::before{content:\'\\201C\';position:absolute;top:-6px;left:11px;font-size:2.6rem;' +
        'color:#FF7F11;opacity:.22;font-style:normal;line-height:1}' +
        '.bqn{border-left:4px solid #4FC3F7;background:#4FC3F710;padding:9px 15px;' +
        'border-radius:0 6px 6px 0;margin-top:9px;font-size:.9rem;color:#4FC3F7}' +

        /* ── Table ── */
        '.tbl{width:100%;border-collapse:separate;border-spacing:0;' +
        'border-radius:8px;overflow:hidden;border:1px solid ' + border + ';font-size:.87rem}' +
        '.tbl thead{background:' + surface + '}' +
        '.tbl thead th{padding:10px 15px;text-align:left;font-family:monospace;font-size:.68rem;' +
        'letter-spacing:.08em;text-transform:uppercase;border-bottom:2px solid #FF4500;color:#FF4500}' +
        '.tbl tbody tr:nth-child(odd){background:' + (isDark ? '#ffffff04' : '#f6f8fa') + '}' +
        '.tbl tbody tr:hover{background:#FF450010}' +
        '.tbl td{padding:8px 15px;border-bottom:1px solid ' + border + '50;color:' + text + '}' +
        '.tbl tr:last-child td{border-bottom:none}' +
        '.mc{font-family:monospace;color:#4FC3F7;font-size:.85em}' +
        '.cs{display:inline-block;width:10px;height:10px;border-radius:2px;margin-right:4px;vertical-align:middle}' +

        /* ── HR ── */
        '.hrwrap{display:flex;flex-direction:column;gap:11px}' +
        '.hrlbl{font-family:monospace;font-size:.66rem;color:' + muted + ';margin-bottom:3px}' +
        '.hrline{border:none;height:2px;border-radius:2px}' +
        '.hr-a{background:linear-gradient(90deg,#FF4500,#FF7F11,transparent)}' +
        '.hr-b{background:linear-gradient(90deg,#E8B86D,#4FC3F7,transparent)}' +
        '.hr-c{background:linear-gradient(90deg,#7986CB,#CE93D8,transparent)}' +

        /* ── Footnote ── */
        '.fnref{color:#4FC3F7;font-size:.7em;vertical-align:super;font-family:monospace;cursor:pointer}' +
        '.fndef{margin-top:9px;padding:9px 13px;background:' + surface + ';border-radius:6px;' +
        'border-left:3px solid #4FC3F7;font-size:.82rem;color:' + muted + ';font-family:monospace}' +

        /* ── Fade in ── */
        '@keyframes fu{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}' +
        '.wrap > *{animation:fu .3s ease both}' +
        '.wrap > *:nth-child(1){animation-delay:.03s}.wrap > *:nth-child(2){animation-delay:.07s}' +
        '.wrap > *:nth-child(3){animation-delay:.11s}.wrap > *:nth-child(4){animation-delay:.15s}' +
        '.wrap > *:nth-child(5){animation-delay:.19s}.wrap > *:nth-child(6){animation-delay:.23s}' +
        '.wrap > *:nth-child(7){animation-delay:.27s}.wrap > *:nth-child(8){animation-delay:.31s}' +
        '.wrap > *:nth-child(9){animation-delay:.35s}.wrap > *:nth-child(10){animation-delay:.39s}' +
        '.wrap > *:nth-child(11){animation-delay:.43s}' +

        '@media(max-width:560px){.lgrid{grid-template-columns:1fr}.igrid{grid-template-columns:1fr}' +
        '.h1{font-size:1.5rem}.h2{font-size:1.3rem}.h3{font-size:1.15rem}}' +

        '</style></head><body>' +

        /* ── HEADER ── */
        '<div class="top">' +
        '<div class="top-dot"></div>' +
        '<span class="top-title">MD Synthesis</span>' +
        '<span class="top-sub">DEX STUDIO · v1.0.0</span>' +
        '</div>' +

        '<div class="wrap">' +

        /* ① LEYENDA */
        '<section>' +
        '<div class="lbl">Sistema de color — peso tipográfico</div>' +
        '<div class="chips">' +
        '<div class="chip"><div class="cdot" style="background:#FF4500"></div>H1 · Bold · Más pesado</div>' +
        '<div class="chip"><div class="cdot" style="background:#FF7F11"></div>H2 · Bold-Italic</div>' +
        '<div class="chip"><div class="cdot" style="background:#E8B86D"></div>H3 · Highlight</div>' +
        '<div class="chip"><div class="cdot" style="background:#4FC3F7"></div>H4 · Code · Link</div>' +
        '<div class="chip"><div class="cdot" style="background:#7986CB"></div>H5 · Italic · Sup</div>' +
        '<div class="chip"><div class="cdot" style="background:#CE93D8"></div>H6 · Sub · Más liviano</div>' +
        '</div></section>' +

        /* ② ENCABEZADOS */
        '<section>' +
        '<div class="lbl">Encabezados H1 – H6</div>' +
        '<div class="hrows">' +
        '<div class="hrow h1"><span class="htag"># H1</span><span>Heading One</span></div>' +
        '<div class="hrow h2"><span class="htag">## H2</span><span>Heading Two</span></div>' +
        '<div class="hrow h3"><span class="htag">### H3</span><span>Heading Three</span></div>' +
        '<div class="hrow h4"><span class="htag">#### H4</span><span>Heading Four</span></div>' +
        '<div class="hrow h5"><span class="htag">##### H5</span><span>Heading Five</span></div>' +
        '<div class="hrow h6"><span class="htag">###### H6</span><span>Heading Six</span></div>' +
        '</div></section>' +

        /* ③ INLINE */
        '<section>' +
        '<div class="lbl">Elementos inline</div>' +
        '<div class="igrid">' +
        '<div class="icard"><div class="isyn">**texto**</div><div class="ipre"><span class="t-b">Negrita</span></div></div>' +
        '<div class="icard"><div class="isyn">*texto*</div><div class="ipre"><span class="t-i">Cursiva</span></div></div>' +
        '<div class="icard"><div class="isyn">***texto***</div><div class="ipre"><span class="t-bi">Negrita cursiva</span></div></div>' +
        '<div class="icard"><div class="isyn">`código`</div><div class="ipre"><span class="t-c">inline_code()</span></div></div>' +
        '<div class="icard"><div class="isyn">~~texto~~</div><div class="ipre"><span class="t-s">Tachado</span></div></div>' +
        '<div class="icard"><div class="isyn">==texto==</div><div class="ipre"><span class="t-h">Resaltado</span></div></div>' +
        '<div class="icard"><div class="isyn">[texto](url)</div><div class="ipre"><span class="t-a">Enlace</span></div></div>' +
        '<div class="icard"><div class="isyn">x^2^</div><div class="ipre">x<span class="t-sup">2</span> + y<span class="t-sup">n</span></div></div>' +
        '<div class="icard"><div class="isyn">H~2~O</div><div class="ipre">H<span class="t-sub">2</span>O</div></div>' +
        '<div class="icard"><div class="isyn">`Ctrl`</div><div class="ipre"><span class="t-kbd">Ctrl</span> + <span class="t-kbd">S</span></div></div>' +
        '<div class="icard"><div class="isyn">&gt; !nota</div><div class="ipre"><span class="t-mark">Callout / nota</span></div></div>' +
        '</div></section>' +

        /* ④ BLOQUE DE CÓDIGO */
        '<section>' +
        '<div class="lbl">Bloque de código</div>' +
        '<div class="cblock">' +
        '<div class="chead">' +
        '<span class="cd cd-r"></span><span class="cd cd-y"></span><span class="cd cd-g"></span>' +
        '<span class="clang">javascript</span>' +
        '</div>' +
        '<pre><span class="cm">// MD Synthesis · DEX STUDIO</span>\n' +
        '<span class="k">function</span> <span class="fn">getHeadingColor</span>(<span class="vr">level</span>) {\n' +
        '  <span class="k">const</span> <span class="vr">palette</span> = [<span class="st">\'#FF4500\'</span>, <span class="st">\'#FF7F11\'</span>, <span class="st">\'#E8B86D\'</span>,\n' +
        '                    <span class="st">\'#4FC3F7\'</span>, <span class="st">\'#7986CB\'</span>, <span class="st">\'#CE93D8\'</span>];\n' +
        '  <span class="k">return</span> <span class="vr">palette</span>[<span class="vr">level</span> - <span class="nm">1</span>] ?? <span class="vr">palette</span>[<span class="nm">5</span>];\n' +
        '}</pre>' +
        '</div></section>' +

        /* ⑤ LISTAS */
        '<section>' +
        '<div class="lbl">Listas</div>' +
        '<div class="lgrid">' +
        '<div class="lbox">' +
        '<div class="ltit">Desordenada (ul)</div>' +
        '<ul><li>Nivel 1<ul><li>Nivel 2<ul><li>Nivel 3</li></ul></li><li>Nivel 2</li></ul></li><li>Nivel 1</li></ul>' +
        '</div>' +
        '<div class="lbox">' +
        '<div class="ltit">Ordenada (ol)</div>' +
        '<ol><li>Primero</li><li>Segundo</li><li>Tercero</li><li>Cuarto</li></ol>' +
        '</div>' +
        '</div></section>' +

        /* ⑥ TAREAS */
        '<section>' +
        '<div class="lbl">Lista de tareas</div>' +
        '<div class="tlist">' +
        '<div class="titem done"><span class="tck">✓</span>Sistema de color por peso tipográfico implementado</div>' +
        '<div class="titem done"><span class="tck">✓</span>Nueva API DEX.registerExtension + DEX.openPreviewTab</div>' +
        '<div class="titem"><span class="tck">○</span>Visor MD en tiempo real con DEX.onFileSave (v2.0.0)</div>' +
        '<div class="titem"><span class="tck">○</span>Preview dividido edición / render simultáneo</div>' +
        '</div></section>' +

        /* ⑦ BLOCKQUOTE */
        '<section>' +
        '<div class="lbl">Citas</div>' +
        '<div class="bq">El código bien escrito es su propia documentación.' +
        '<div class="bqn">Cita anidada: la claridad supera a la brevedad.</div>' +
        '</div></section>' +

        /* ⑧ TABLA */
        '<section>' +
        '<div class="lbl">Tabla de referencia</div>' +
        '<table class="tbl"><thead><tr>' +
        '<th>Elemento</th><th>Sintaxis</th><th>Color</th><th>Tamaño · Peso</th>' +
        '</tr></thead><tbody>' +
        '<tr><td>H1</td><td><span class="mc"># texto</span></td><td><span class="cs" style="background:#FF4500"></span>#FF4500</td><td>2.1rem · 900</td></tr>' +
        '<tr><td>H2</td><td><span class="mc">## texto</span></td><td><span class="cs" style="background:#FF7F11"></span>#FF7F11</td><td>1.75rem · 800</td></tr>' +
        '<tr><td>H3</td><td><span class="mc">### texto</span></td><td><span class="cs" style="background:#E8B86D"></span>#E8B86D</td><td>1.45rem · 700</td></tr>' +
        '<tr><td>H4</td><td><span class="mc">#### texto</span></td><td><span class="cs" style="background:#4FC3F7"></span>#4FC3F7</td><td>1.2rem · 700</td></tr>' +
        '<tr><td>H5</td><td><span class="mc">##### texto</span></td><td><span class="cs" style="background:#7986CB"></span>#7986CB</td><td>1.02rem · 600</td></tr>' +
        '<tr><td>H6</td><td><span class="mc">###### texto</span></td><td><span class="cs" style="background:#CE93D8"></span>#CE93D8</td><td>.88rem · 600</td></tr>' +
        '<tr><td>Bold</td><td><span class="mc">**texto**</span></td><td><span class="cs" style="background:#FF4500"></span>#FF4500</td><td>weight 800</td></tr>' +
        '<tr><td>Italic</td><td><span class="mc">*texto*</span></td><td><span class="cs" style="background:#7986CB"></span>#7986CB</td><td>italic</td></tr>' +
        '<tr><td>Code</td><td><span class="mc">`texto`</span></td><td><span class="cs" style="background:#4FC3F7"></span>#4FC3F7</td><td>monospace</td></tr>' +
        '</tbody></table></section>' +

        /* ⑨ SEPARADORES */
        '<section>' +
        '<div class="lbl">Separadores horizontales</div>' +
        '<div class="hrwrap">' +
        '<div><div class="hrlbl">Cálido — H1 / H2</div><hr class="hrline hr-a"></div>' +
        '<div><div class="hrlbl">Medio — H3 / H4</div><hr class="hrline hr-b"></div>' +
        '<div><div class="hrlbl">Frío — H5 / H6</div><hr class="hrline hr-c"></div>' +
        '</div></section>' +

        /* ⑩ NOTA AL PIE */
        '<section>' +
        '<div class="lbl">Nota al pie</div>' +
        '<div style="color:' + text + ';font-size:.95rem">' +
        'Esta oración referencia una fuente<span class="fnref">[1]</span> con información adicional.' +
        '<div class="fndef">[1] Definición o fuente citada como nota al pie del documento.</div>' +
        '</div></section>' +

        '</div></body></html>';
    }
});

// Dex code successful
