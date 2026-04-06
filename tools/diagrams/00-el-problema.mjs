/**
 * El Problema — Integraciones ad-hoc por país (compacto)
 */
import { DiagramEngine, C } from '../lib/diagram-engine.mjs';

export const name = 'el-problema';
export const description = 'Integraciones punto a punto por pais — fragil, costoso, no escalable';
export const width = 900;
export const height = 420;

export function draw(d, C) {
  // Title inside diagram
  d.text(450, 30, '3 países × sistemas distintos × integraciones ad-hoc', {
    size: 16, anchor: 'middle', weight: 'bold', color: C.textDark,
  });

  // --- Chile ---
  d.box(20, 60, 130, 45, 'ERP Chile', { fill: C.redFill, stroke: C.redStroke, fontSize: 13 });
  d.box(20, 120, 130, 45, 'WMS Chile', { fill: C.redFill, stroke: C.redStroke, fontSize: 13 });
  d.arrow(150, 82, 220, 105, { stroke: C.darkStroke });
  d.arrow(150, 142, 220, 120, { stroke: C.darkStroke });
  d.box(220, 80, 170, 55, 'Integración ad-hoc', { fill: C.darkFill, stroke: C.darkStroke, fontSize: 12 });
  d.arrow(390, 107, 440, 107, { stroke: C.darkStroke });
  d.box(440, 85, 80, 45, 'Apps', { fill: C.blueFill, stroke: C.blueStroke, fontSize: 13 });

  // --- Peru ---
  d.box(20, 195, 130, 45, 'ERP Perú', { fill: C.orangeFill, stroke: C.orangeStroke, fontSize: 13 });
  d.box(20, 255, 130, 45, 'CRM Perú', { fill: C.orangeFill, stroke: C.orangeStroke, fontSize: 13 });
  d.arrow(150, 217, 220, 240, { stroke: C.darkStroke });
  d.arrow(150, 277, 220, 255, { stroke: C.darkStroke });
  d.box(220, 215, 170, 55, 'Integración ad-hoc', { fill: C.darkFill, stroke: C.darkStroke, fontSize: 12 });
  d.arrow(390, 242, 440, 242, { stroke: C.darkStroke });
  d.box(440, 220, 80, 45, 'Apps', { fill: C.blueFill, stroke: C.blueStroke, fontSize: 13 });

  // --- Problems (right side) ---
  d.text(620, 90, '✗ No escalable', { size: 15, color: C.redStroke, weight: 'bold' });
  d.text(620, 120, '✗ No intercambiable', { size: 15, color: C.redStroke, weight: 'bold' });
  d.text(620, 150, '✗ Duplicación por país', { size: 15, color: C.redStroke, weight: 'bold' });
  d.text(620, 180, '✗ Frágil', { size: 15, color: C.redStroke, weight: 'bold' });
  d.text(620, 210, '✗ Costoso de mantener', { size: 15, color: C.redStroke, weight: 'bold' });

  // --- Divider ---
  d.line(30, 320, 870, 320, { stroke: C.textLight, strokeWidth: 1 });
  d.text(450, 345, '¿Qué necesitamos?', { size: 14, anchor: 'middle', color: C.textMuted });

  // --- Solution hint (bottom) ---
  d.rect(180, 360, 540, 50, { fill: C.yellowFill, stroke: C.yellowStroke, strokeWidth: 3 });
  d.text(450, 390, 'Plataforma composable: poner y sacar piezas de software', {
    size: 14, anchor: 'middle', weight: 'bold', color: C.textDark,
  });
}
