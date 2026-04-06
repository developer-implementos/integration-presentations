/**
 * Desacoplamiento Before/After
 */
import { DiagramEngine, C } from '../lib/diagram-engine.mjs';

export const name = 'desacoplamiento';
export const description = 'Before/after comparison showing decoupling from ERP via Integration Platform';
export const width = 900;
export const height = 220;

export function draw(d, C) {
  // BEFORE (left side)
  d.note(200, 18, 'ANTES (acoplado)', { anchor: 'middle', size: 13, color: C.redStroke });
  d.box(10, 30, 120, 40, 'Caja POS', { fill: C.redFill, stroke: C.redStroke, fontSize: 12 });
  d.box(10, 80, 120, 40, 'VTEX IO', { fill: C.redFill, stroke: C.redStroke, fontSize: 12 });
  d.box(10, 130, 120, 40, 'Omnichannel', { fill: C.redFill, stroke: C.redStroke, fontSize: 12 });
  d.box(260, 65, 160, 60, 'Dynamics AX', { fill: C.redFill, stroke: C.redStroke, fontSize: 15 });
  d.arrow(130, 50, 260, 85, { stroke: C.redStroke });
  d.arrow(130, 100, 260, 95, { stroke: C.redStroke });
  d.arrow(130, 150, 260, 105, { stroke: C.redStroke });

  // Divider
  d.line(450, 20, 450, 200, { stroke: C.textLight, strokeWidth: 1.5 });

  // AFTER (right side)
  d.note(680, 18, 'DESPUES (desacoplado)', { anchor: 'middle', size: 13, color: C.greenStroke });
  d.box(480, 30, 120, 40, 'Caja POS', { fill: C.greenFill, stroke: C.greenStroke, fontSize: 12 });
  d.box(480, 80, 120, 40, 'VTEX IO', { fill: C.greenFill, stroke: C.greenStroke, fontSize: 12 });
  d.box(480, 130, 120, 40, 'Omnichannel', { fill: C.greenFill, stroke: C.greenStroke, fontSize: 12 });

  d.rect(640, 45, 120, 100, { fill: C.yellowFill, stroke: C.yellowStroke, strokeWidth: 3 });
  d.text(700, 85, 'Integration', { size: 13, anchor: 'middle', weight: 'bold' });
  d.text(700, 102, 'Platform', { size: 13, anchor: 'middle', weight: 'bold' });

  d.box(800, 55, 90, 35, 'Adapter', { fill: C.yellowFill, stroke: C.yellowStroke, fontSize: 11 });
  d.box(800, 100, 90, 40, 'Dynamics AX', { fill: C.redFill, stroke: C.redStroke, fontSize: 10 });

  d.arrow(600, 50, 640, 80, { stroke: C.greenStroke });
  d.arrow(600, 100, 640, 95, { stroke: C.greenStroke });
  d.arrow(600, 150, 640, 110, { stroke: C.greenStroke });
  d.arrow(760, 95, 800, 72, { stroke: C.yellowStroke });
  d.arrow(845, 90, 845, 100, { stroke: C.yellowStroke });
}
