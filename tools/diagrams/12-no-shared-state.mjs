/**
 * No Shared State — Cada modulo es dueno de sus colecciones
 */
import { DiagramEngine, C } from '../lib/diagram-engine.mjs';

export const name = 'no-shared-state';
export const description = 'Cada modulo es dueno de sus colecciones en Firestore';
export const width = 650;
export const height = 250;

export function draw(d, C) {
  d.box(20, 15, 170, 55, 'Inventory Schemas', { fill: C.greenFill, stroke: C.greenStroke, fontSize: 13 });
  d.box(240, 15, 170, 55, 'Orders Schemas', { fill: C.orangeFill, stroke: C.orangeStroke, fontSize: 13 });
  d.box(460, 15, 170, 55, 'Payment Schemas', { fill: C.redFill, stroke: C.redStroke, fontSize: 13 });

  d.ellipse(210, 125, 230, 70, { fill: C.gcpYellowFill, stroke: C.gcpYellow, strokeWidth: 3 });
  d.text(325, 165, 'Firestore', { size: 18, anchor: 'middle', weight: 'bold' });

  d.arrow(105, 70, 270, 130, { stroke: C.greenStroke });
  d.arrow(325, 70, 325, 125, { stroke: C.orangeStroke });
  d.arrow(545, 70, 380, 130, { stroke: C.redStroke });

  d.note(325, 210, '1 Firestore, cada modulo dueno de sus colecciones', { anchor: 'middle', size: 12 });
  d.note(325, 228, 'NUNCA importar schema/repositorio de otro modulo', { anchor: 'middle', size: 11, color: C.redStroke });
}
