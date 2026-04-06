/**
 * Enterprise Diagram Engine — Sketchnote Style
 *
 * Hand-drawn SVGs using rough.js with warm light background,
 * strong contour colors, and soft hachure fills.
 *
 * Style rules:
 * - Background: warm cream (#F5F0E8)
 * - Contours: strong brand colors (thick, irregular strokes)
 * - Fills: soft/pastel hachure (pencil-texture, never flat solid)
 * - Text: dark (#1a1a2e), hand-lettering font (Virgil)
 * - Roughness: high (1.5-2.0) for organic feel
 */
import { JSDOM } from 'jsdom';
import rough from 'roughjs';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const VIRGIL_WOFF2 = readFileSync(resolve(__dirname, '../../assets/fonts/Virgil-subset.woff2'));
const VIRGIL_B64 = VIRGIL_WOFF2.toString('base64');

// ─── Color System: Strong Contours + Soft Fills ─────────
const C = {
  // Background
  bg: '#F5F0E8',

  // Text
  textDark: '#1a1a2e',
  textMuted: '#555555',
  textLight: '#888888',

  // Red
  redStroke: '#E74C3C',
  redFill: '#FADBD8',

  // Green
  greenStroke: '#2ECC71',
  greenFill: '#D5F5E3',

  // Blue
  blueStroke: '#3498DB',
  blueFill: '#D6EAF8',

  // Purple
  purpleStroke: '#8C27F1',
  purpleFill: '#E8D5F5',

  // Orange
  orangeStroke: '#E67E22',
  orangeFill: '#FDEBD0',

  // Yellow / Accent
  yellowStroke: '#F39C12',
  yellowFill: '#FEF9E7',

  // Teal
  tealStroke: '#1ABC9C',
  tealFill: '#D1F2EB',

  // Cyan (Salesforce)
  cyanStroke: '#00A1E0',
  cyanFill: '#CCE5FF',

  // Dark / Slate
  darkStroke: '#2C3E50',
  darkFill: '#D5D8DC',

  // GCP
  gcpBlue: '#4285F4',
  gcpBlueFill: '#D2E3FC',
  gcpRed: '#EA4335',
  gcpYellow: '#FBBC04',
  gcpYellowFill: '#FEF7CD',
  gcpGreen: '#34A853',

  // Grafana
  grafanaStroke: '#FF6F00',
  grafanaFill: '#FFE0B2',

  // Algolia
  algoliaStroke: '#5468FF',
  algoliaFill: '#D6DCFF',
};

const FONT = 'Virgil, Segoe UI, sans-serif';
const FONT_TITLE = 'Virgil, Segoe UI, sans-serif';
const ROUGHNESS = 1.8;
const HACHURE_GAP = 4;

export class DiagramEngine {
  constructor(width, height, opts = {}) {
    this.width = width;
    this.height = height;
    this.dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
    this.doc = this.dom.window.document;
    this.svg = this.doc.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this.svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    this.svg.setAttribute('width', String(width));
    this.svg.setAttribute('height', String(height));
    this.svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    this.doc.body.appendChild(this.svg);
    this.rc = rough.svg(this.svg);
    this.roughness = opts.roughness ?? ROUGHNESS;

    // Virgil font loaded via CSS in presentation, referenced here by name
    const defs = this.doc.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const style = this.doc.createElementNS('http://www.w3.org/2000/svg', 'style');
    style.textContent = `@font-face { font-family: 'Virgil'; src: url('data:font/woff2;base64,${VIRGIL_B64}') format('woff2'); }`;
    defs.appendChild(style);
    this.svg.appendChild(defs);

    // Transparent background (slide controls its own bg)
    if (opts.bg) {
      const bg = this.doc.createElementNS('http://www.w3.org/2000/svg', 'rect');
      bg.setAttribute('width', String(width));
      bg.setAttribute('height', String(height));
      bg.setAttribute('fill', opts.bg);
      this.svg.appendChild(bg);
    }
  }

  // ─── Primitives ─────────────────────────────────────

  rect(x, y, w, h, opts = {}) {
    const el = this.rc.rectangle(x, y, w, h, {
      fill: opts.fill || 'transparent',
      fillStyle: opts.fillStyle || 'hachure',
      fillWeight: opts.fillWeight || 1.5,
      hachureGap: opts.hachureGap || HACHURE_GAP,
      hachureAngle: opts.hachureAngle || -41,
      stroke: opts.stroke || C.darkStroke,
      strokeWidth: opts.strokeWidth || 2.5,
      roughness: opts.roughness ?? this.roughness,
    });
    this.svg.appendChild(el);
    return this;
  }

  ellipse(x, y, w, h, opts = {}) {
    const el = this.rc.ellipse(x + w / 2, y + h / 2, w, h, {
      fill: opts.fill || 'transparent',
      fillStyle: opts.fillStyle || 'hachure',
      fillWeight: opts.fillWeight || 1.5,
      hachureGap: opts.hachureGap || HACHURE_GAP,
      hachureAngle: opts.hachureAngle || -41,
      stroke: opts.stroke || C.darkStroke,
      strokeWidth: opts.strokeWidth || 2.5,
      roughness: opts.roughness ?? this.roughness,
    });
    this.svg.appendChild(el);
    return this;
  }

  line(x1, y1, x2, y2, opts = {}) {
    const el = this.rc.line(x1, y1, x2, y2, {
      stroke: opts.stroke || C.darkStroke,
      strokeWidth: opts.strokeWidth || 2,
      roughness: opts.roughness ?? this.roughness,
    });
    this.svg.appendChild(el);
    return this;
  }

  arrow(x1, y1, x2, y2, opts = {}) {
    this.line(x1, y1, x2, y2, opts);
    const angle = Math.atan2(y2 - y1, x2 - x1);
    const headLen = opts.headLen || 12;
    const stroke = opts.stroke || C.darkStroke;
    const ax = x2 - headLen * Math.cos(angle - Math.PI / 6);
    const ay = y2 - headLen * Math.sin(angle - Math.PI / 6);
    const bx = x2 - headLen * Math.cos(angle + Math.PI / 6);
    const by = y2 - headLen * Math.sin(angle + Math.PI / 6);
    const poly = this.doc.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    poly.setAttribute('points', `${x2},${y2} ${ax},${ay} ${bx},${by}`);
    poly.setAttribute('fill', stroke);
    this.svg.appendChild(poly);
    return this;
  }

  text(x, y, content, opts = {}) {
    const el = this.doc.createElementNS('http://www.w3.org/2000/svg', 'text');
    el.setAttribute('x', String(x));
    el.setAttribute('y', String(y));
    el.setAttribute('fill', opts.color || C.textDark);
    el.setAttribute('font-size', String(opts.size || 16));
    el.setAttribute('font-family', opts.font || FONT);
    if (opts.anchor) el.setAttribute('text-anchor', opts.anchor);
    if (opts.weight) el.setAttribute('font-weight', opts.weight);
    el.textContent = content;
    this.svg.appendChild(el);
    return this;
  }

  // ─── Compound Elements ──────────────────────────────

  /** Hand-drawn box with hachure fill and label */
  box(x, y, w, h, label, opts = {}) {
    this.rect(x, y, w, h, {
      fill: opts.fill || C.blueFill,
      stroke: opts.stroke || C.blueStroke,
      fillStyle: 'hachure',
      hachureGap: opts.hachureGap || 4,
      strokeWidth: opts.strokeWidth || 2.5,
    });
    this.text(x + w / 2, y + h / 2 + 5, label, {
      color: opts.textColor || C.textDark,
      size: opts.fontSize || 14,
      anchor: 'middle',
      weight: opts.fontWeight || 'bold',
    });
    return this;
  }

  /** Box with subtitle */
  boxSub(x, y, w, h, title, subtitle, opts = {}) {
    this.rect(x, y, w, h, {
      fill: opts.fill || C.blueFill,
      stroke: opts.stroke || C.blueStroke,
      fillStyle: 'hachure',
      hachureGap: opts.hachureGap || 4,
      strokeWidth: opts.strokeWidth || 2.5,
    });
    this.text(x + w / 2, y + h / 2 - 4, title, {
      color: opts.textColor || C.textDark,
      size: opts.fontSize || 14,
      anchor: 'middle',
      weight: 'bold',
    });
    this.text(x + w / 2, y + h / 2 + 14, subtitle, {
      color: opts.subColor || C.textMuted,
      size: (opts.fontSize || 14) - 3,
      anchor: 'middle',
    });
    return this;
  }

  /** Title text — large hand-lettering style */
  title(x, y, content, opts = {}) {
    this.text(x, y, content, {
      color: opts.color || C.textDark,
      size: opts.size || 22,
      font: FONT_TITLE,
      anchor: opts.anchor || 'middle',
      weight: 'bold',
    });
    return this;
  }

  /** Annotation with small text */
  note(x, y, content, opts = {}) {
    this.text(x, y, content, {
      color: opts.color || C.textLight,
      size: opts.size || 11,
      anchor: opts.anchor,
    });
    return this;
  }

  /** Numbered circle */
  numCircle(cx, cy, num, opts = {}) {
    this.ellipse(cx - 14, cy - 14, 28, 28, {
      fill: opts.fill || C.purpleFill,
      stroke: opts.stroke || C.purpleStroke,
      strokeWidth: 2,
    });
    this.text(cx, cy + 5, String(num), {
      color: C.textDark,
      size: 14,
      anchor: 'middle',
      weight: 'bold',
    });
    return this;
  }

  /** Dashed region border */
  region(x, y, w, h, opts = {}) {
    const el = this.rc.rectangle(x, y, w, h, {
      fill: 'transparent',
      stroke: opts.stroke || C.darkStroke,
      strokeWidth: 1.5,
      roughness: 0.5,
      strokeLineDash: [8, 5],
    });
    this.svg.appendChild(el);
    return this;
  }

  // ─── Export ─────────────────────────────────────────

  toSvg() {
    return this.svg.outerHTML;
  }
}

export { C };
