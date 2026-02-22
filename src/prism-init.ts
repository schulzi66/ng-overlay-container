/**
 * Prism auf window setzen, damit ngx-markdown es für Syntax-Highlighting nutzen kann.
 * Notwendig, weil der Application Builder (Vite) scripts.js mit defer lädt – die Ausführung
 * kann nach main.js erfolgen, sodass Prism beim ersten Markdown-Render noch nicht existiert.
 * Theme und API bleiben die offiziellen (prism-okaidia aus angular.json, ngx-markdown).
 */
import Prism from 'prismjs';
(window as unknown as { Prism: typeof Prism }).Prism = Prism;

import 'prismjs/components/prism-typescript.min.js';
import 'prismjs/components/prism-json.min.js';
import 'prismjs/components/prism-bash.min.js';
import 'prismjs/components/prism-javascript.min.js';
import 'prismjs/components/prism-css.min.js';
import 'prismjs/plugins/line-numbers/prism-line-numbers.min.js';
