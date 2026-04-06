/**
 * Cloud Run Auto-Scaling
 */
import { DiagramEngine, C } from '../lib/diagram-engine.mjs';

export const name = 'cloud-run-scaling';
export const description = 'Cloud Run auto-scaling with load balancer and instance scaling';
export const width = 650;
export const height = 300;

export function draw(d, C) {
  // Traffic circle
  d.ellipse(260, 10, 130, 50, { fill: C.yellowFill, stroke: C.yellowStroke, strokeWidth: 2.5 });
  d.text(325, 40, 'Trafico', { size: 15, anchor: 'middle', weight: 'bold' });

  d.arrow(325, 60, 325, 100, { stroke: C.textDark });

  // Load Balancer
  d.box(220, 100, 210, 45, 'Cloud Run Load Balancer', { fill: C.blueFill, stroke: C.blueStroke, fontSize: 13 });

  // Instances
  d.arrow(270, 145, 110, 190, { stroke: C.blueStroke });
  d.arrow(325, 145, 325, 190, { stroke: C.blueStroke });
  d.arrow(380, 145, 540, 190, { stroke: C.blueStroke });

  d.box(30, 190, 160, 50, 'Instance 1', { fill: C.greenFill, stroke: C.greenStroke, fontSize: 13 });
  d.note(110, 255, 'warm (min=1)', { size: 10, anchor: 'middle', color: C.greenStroke });

  d.box(245, 190, 160, 50, 'Instance 2', { fill: C.greenFill, stroke: C.greenStroke, fontSize: 13 });
  d.note(325, 255, 'auto-scale', { size: 10, anchor: 'middle', color: C.greenStroke });

  d.box(460, 190, 160, 50, 'Instance N', { fill: C.greenFill, stroke: C.greenStroke, fontSize: 13 });
  d.note(540, 255, 'max=10', { size: 10, anchor: 'middle', color: C.greenStroke });

  d.note(325, 285, 'Cada instancia: 100 req concurrentes — auto-scale al superar', { anchor: 'middle', size: 11 });
}
