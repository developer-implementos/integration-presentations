/**
 * GCP Org Structure
 */
import { DiagramEngine, C } from '../lib/diagram-engine.mjs';

export const name = 'gcp-org';
export const description = 'GCP organization structure with country folders and management project';
export const width = 700;
export const height = 370;

export function draw(d, C) {
  d.region(10, 5, 670, 320, { stroke: C.darkStroke });
  d.note(20, 22, 'Organization: Implementos', { size: 13, color: C.textDark });

  d.region(25, 35, 400, 280, { stroke: C.yellowStroke });
  d.note(35, 52, 'Folder: Implementos Core', { size: 12, color: C.textDark });

  // Chile
  d.rect(40, 60, 180, 75, { fill: C.yellowFill, stroke: C.darkStroke, strokeWidth: 1.5 });
  d.note(130, 75, 'Chile', { size: 12, anchor: 'middle', color: C.textDark });
  d.box(50, 83, 75, 35, 'QA', { fill: C.yellowFill, stroke: C.yellowStroke, fontSize: 11 });
  d.box(135, 83, 75, 35, 'Prod', { fill: C.greenFill, stroke: C.greenStroke, fontSize: 11 });

  // Peru
  d.rect(40, 148, 180, 75, { fill: C.yellowFill, stroke: C.darkStroke, strokeWidth: 1.5 });
  d.note(130, 163, 'Perú', { size: 12, anchor: 'middle', color: C.textDark });
  d.box(50, 171, 75, 35, 'QA', { fill: C.yellowFill, stroke: C.yellowStroke, fontSize: 11 });
  d.box(135, 171, 75, 35, 'Prod', { fill: C.greenFill, stroke: C.greenStroke, fontSize: 11 });

  // Spain
  d.rect(40, 236, 180, 75, { fill: C.yellowFill, stroke: C.darkStroke, strokeWidth: 1.5 });
  d.note(130, 251, 'España', { size: 12, anchor: 'middle', color: C.textDark });
  d.box(50, 259, 75, 35, 'QA', { fill: C.yellowFill, stroke: C.yellowStroke, fontSize: 11 });
  d.box(135, 259, 75, 35, 'Prod', { fill: C.greenFill, stroke: C.greenStroke, fontSize: 11 });

  // Management
  d.box(460, 130, 190, 50, 'Management', { fill: C.blueFill, stroke: C.blueStroke, fontSize: 15 });
  d.box(460, 210, 90, 38, 'GAR', { fill: C.purpleFill, stroke: C.purpleStroke, fontSize: 11 });
  d.box(560, 210, 90, 38, 'TF State', { fill: C.purpleFill, stroke: C.purpleStroke, fontSize: 11 });
  d.box(510, 260, 90, 38, 'Svc Accts', { fill: C.purpleFill, stroke: C.purpleStroke, fontSize: 11 });

  d.arrow(510, 180, 505, 210, { stroke: C.blueStroke });
  d.arrow(555, 180, 600, 210, { stroke: C.blueStroke });
  d.arrow(555, 180, 555, 260, { stroke: C.blueStroke });

  d.note(350, 350, 'Amarillo = QA  ·  Verde = Prod  ·  Azul = Management', { size: 10, anchor: 'middle' });
}
