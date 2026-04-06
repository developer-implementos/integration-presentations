/**
 * El Problema — Integraciones ad-hoc por país
 */
import { DiagramEngine, C } from '../lib/diagram-engine.mjs';

export const name = 'el-problema';
export const description = 'Integraciones punto a punto por pais — fragil, costoso, no escalable';
export const width = 900;
export const height = 300;

export function draw(d, C) {
  // Chile systems
  d.box(10, 25, 155, 55, 'ERP Chile', { fill: C.redFill, stroke: C.redStroke, fontSize: 15 });
  d.box(10, 100, 155, 55, 'WMS Chile', { fill: C.redFill, stroke: C.redStroke, fontSize: 15 });

  // Chile integration (ad-hoc)
  d.box(240, 45, 200, 65, 'Integración ad-hoc', { fill: C.darkFill, stroke: C.darkStroke, fontSize: 14 });
  d.arrow(165, 52, 240, 70, { stroke: C.blueStroke });
  d.arrow(165, 127, 240, 95, { stroke: C.blueStroke });

  // Chile apps
  d.box(500, 52, 95, 55, 'Apps', { fill: C.blueFill, stroke: C.blueStroke, fontSize: 15 });
  d.arrow(440, 77, 500, 77, { stroke: C.blueStroke });

  // Peru systems
  d.box(10, 175, 155, 55, 'ERP Peru', { fill: C.orangeFill, stroke: C.orangeStroke, fontSize: 15 });
  d.box(10, 250, 155, 55, 'CRM Peru', { fill: C.orangeFill, stroke: C.orangeStroke, fontSize: 15 });

  // Peru integration (ad-hoc)
  d.box(240, 195, 200, 65, 'Integración ad-hoc', { fill: C.darkFill, stroke: C.darkStroke, fontSize: 14 });
  d.arrow(165, 202, 240, 220, { stroke: C.blueStroke });
  d.arrow(165, 277, 240, 245, { stroke: C.blueStroke });

  // Peru apps
  d.box(500, 202, 95, 55, 'Apps', { fill: C.blueFill, stroke: C.blueStroke, fontSize: 15 });
  d.arrow(440, 227, 500, 227, { stroke: C.blueStroke });

  // X marks — fragile
  d.text(660, 95, '✗ No escalable', { size: 15, color: C.redStroke, weight: 'bold' });
  d.text(660, 130, '✗ No intercambiable', { size: 15, color: C.redStroke, weight: 'bold' });
  d.text(660, 165, '✗ Duplicación', { size: 15, color: C.redStroke, weight: 'bold' });
  d.text(660, 200, '✗ Frágil', { size: 15, color: C.redStroke, weight: 'bold' });
}
