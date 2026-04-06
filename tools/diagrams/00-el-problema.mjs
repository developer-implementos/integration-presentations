/**
 * El Problema — Integraciones ad-hoc por país
 */
import { DiagramEngine, C } from '../lib/diagram-engine.mjs';

export const name = 'el-problema';
export const description = 'Integraciones punto a punto por pais — fragil, costoso, no escalable';
export const width = 750;
export const height = 250;

export function draw(d, C) {
  // Chile systems
  d.box(10, 20, 130, 45, 'ERP Chile', { fill: C.redFill, stroke: C.redStroke, fontSize: 13 });
  d.box(10, 80, 130, 45, 'WMS Chile', { fill: C.redFill, stroke: C.redStroke, fontSize: 13 });

  // Chile integration (ad-hoc)
  d.box(200, 40, 170, 55, 'Integración ad-hoc', { fill: C.darkFill, stroke: C.darkStroke, fontSize: 12 });
  d.arrow(140, 42, 200, 60, { stroke: C.blueStroke });
  d.arrow(140, 102, 200, 80, { stroke: C.blueStroke });

  // Chile apps
  d.box(420, 45, 80, 45, 'Apps', { fill: C.blueFill, stroke: C.blueStroke, fontSize: 13 });
  d.arrow(370, 67, 420, 67, { stroke: C.blueStroke });

  // Peru systems
  d.box(10, 145, 130, 45, 'ERP Peru', { fill: C.orangeFill, stroke: C.orangeStroke, fontSize: 13 });
  d.box(10, 205, 130, 45, 'CRM Peru', { fill: C.orangeFill, stroke: C.orangeStroke, fontSize: 13 });

  // Peru integration (ad-hoc)
  d.box(200, 165, 170, 55, 'Integración ad-hoc', { fill: C.darkFill, stroke: C.darkStroke, fontSize: 12 });
  d.arrow(140, 167, 200, 185, { stroke: C.blueStroke });
  d.arrow(140, 227, 200, 205, { stroke: C.blueStroke });

  // Peru apps
  d.box(420, 170, 80, 45, 'Apps', { fill: C.blueFill, stroke: C.blueStroke, fontSize: 13 });
  d.arrow(370, 192, 420, 192, { stroke: C.blueStroke });

  // X marks — fragile
  d.text(550, 80, '✗ No escalable', { size: 13, color: C.redStroke, weight: 'bold' });
  d.text(550, 110, '✗ No intercambiable', { size: 13, color: C.redStroke, weight: 'bold' });
  d.text(550, 140, '✗ Duplicación', { size: 13, color: C.redStroke, weight: 'bold' });
  d.text(550, 170, '✗ Frágil', { size: 13, color: C.redStroke, weight: 'bold' });
}
