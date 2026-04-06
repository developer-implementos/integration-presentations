# Convertir Presentación a Estilo Excalidraw

Convierte una presentación reveal-md (theme dark con Mermaid/SVG inline) a una versión hand-drawn estilo Excalidraw con fondo cream y diagramas generados con rough.js.

## Contextos Requeridos

Leer antes de ejecutar:
- `tools/lib/diagram-engine.mjs` — API del DiagramEngine (rough.js + Virgil font)
- `tools/generate-diagrams.mjs` — Ejemplo de cómo generar diagramas
- `assets/css/excalidraw-theme.css` — CSS para theme cream
- `assets/fonts/Virgil-subset.woff2` — Font hand-drawn (11KB subset)

## Proceso

### 1. Analizar el archivo fuente

Leer el markdown indicado y catalogar:
- Bloques ` ```mermaid ` → listar con nombre descriptivo
- SVGs inline `<svg>...</svg>` → listar con nombre descriptivo
- Tablas y código → se mantienen igual (solo cambia la fuente vía CSS)
- Imágenes existentes → se mantienen

### 2. Generar script de diagramas

Crear `tools/generate-[nombre]-diagrams.mjs` que:

```javascript
import { DiagramEngine, C } from './lib/diagram-engine.mjs';
import { writeFileSync, mkdirSync } from 'fs';

const OUT = 'assets/images/excalidraw-[nombre]';
const SERVE = 'presentations/assets/excalidraw-[nombre]';
mkdirSync(OUT, { recursive: true });
mkdirSync(SERVE, { recursive: true });

function save(name, engine) {
  const svg = engine.toSvg();
  writeFileSync(`${OUT}/${name}.svg`, svg);
  writeFileSync(`${SERVE}/${name}.svg`, svg);
  console.log(`✓ ${name}.svg`);
}
```

Para cada diagrama:
- Background transparente (sin `opts.bg`)
- Usar colores de `C` (blueStroke, greenFill, redStroke, etc.)
- Tamaño ~800x400 a 1000x600
- Usar `box()`, `boxSub()`, `arrow()`, `region()`, `note()`, `title()`
- Texto mínimo font-size 11
- Roughness 1.8 (default del engine)

### 3. Clonar y adaptar el markdown

Crear `[nombre]-excalidraw.md` con:

**Frontmatter:**
```yaml
theme: white
highlightTheme: github
mermaid:
  theme: default
```

**Style embebido después del frontmatter:**
```html
<style>
  :root { --r-background-color: #F5F0E8 !important; }
  .reveal { background: #F5F0E8 !important; color: #1a1a2e !important; }
  .reveal h1, .reveal h2, .reveal h3 { color: #1a1a2e !important; font-family: 'Virgil', 'Segoe UI', sans-serif !important; }
  .reveal p, .reveal li, .reveal td, .reveal th { color: #333 !important; }
  .reveal blockquote { background: rgba(0,0,0,0.05) !important; color: #555 !important; border-left-color: #E74C3C !important; }
  .reveal code { background: rgba(0,0,0,0.08) !important; color: #1a1a2e !important; }
  .reveal pre { background: #2c3e50 !important; }
  .reveal pre code { color: #ecf0f1 !important; background: transparent !important; }
  .reveal table th { color: #1a1a2e !important; }
  .reveal table td { border-bottom-color: #ddd !important; }
</style>
```

**Reemplazos:**
- Cada bloque ` ```mermaid...``` ` → `![](../assets/excalidraw-[nombre]/diagram-name.svg)`
- Cada `<svg>...</svg>` inline → `![](../assets/excalidraw-[nombre]/diagram-name.svg)`
- Remover `data-background="#0d1117"` y similares (el cream bg reemplaza todo)
- Mantener code blocks, tablas, speaker notes, imágenes PNG

### 4. Ejecutar y verificar

```bash
node tools/generate-[nombre]-diagrams.mjs
npm run dev  # verificar en localhost:1948
```

## Reglas del Estilo Excalidraw

| Elemento | Regla |
|----------|-------|
| Background | Transparente en SVGs, cream (#F5F0E8) vía CSS |
| Contornos | Colores fuertes del sistema C (stroke) |
| Rellenos | Hachure suave con colores pastel (fill) |
| Texto | Virgil font, color #1a1a2e |
| Roughness | 1.8 (alto para efecto orgánico) |
| Flechas | Arrow heads como triángulos filled |
| Regiones | Dashed borders con `region()` |

## Restricciones

- NO modificar el archivo fuente original
- NO cambiar contenido de slides (solo visual)
- NO agregar ni quitar slides
- Mantener todas las speaker notes intactas
- Los SVGs deben ser auto-contenidos (Virgil font embebida como base64)
- Code blocks mantienen syntax highlighting (solo cambia el theme a github)

$ARGUMENTS
