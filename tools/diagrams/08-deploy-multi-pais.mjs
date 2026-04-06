/**
 * Deploy Multi-Pais
 */
import { DiagramEngine, C } from '../lib/diagram-engine.mjs';

export const name = 'deploy-multi-pais';
export const description = 'Multi-country deploy pipeline with GitHub Actions to QA and Prod per country';
export const width = 700;
export const height = 320;

export function draw(d, C) {
  // GitHub Actions
  d.rect(220, 10, 260, 70, { fill: C.darkFill, stroke: C.darkStroke });
  d.note(350, 30, 'GitHub Actions', { size: 13, anchor: 'middle', color: C.textDark });
  d.box(260, 40, 80, 30, 'CI', { fill: C.purpleFill, stroke: C.purpleStroke, fontSize: 11 });
  d.box(355, 40, 100, 30, 'Deploy', { fill: C.purpleFill, stroke: C.purpleStroke, fontSize: 11 });
  d.arrow(340, 55, 355, 55, { stroke: C.purpleStroke });

  d.arrow(350, 80, 110, 140, { stroke: C.blueStroke });
  d.arrow(350, 80, 350, 140, { stroke: C.blueStroke });
  d.arrow(350, 80, 580, 140, { stroke: C.blueStroke });

  // Chile
  d.rect(20, 140, 180, 80, { fill: C.yellowFill, stroke: C.darkStroke, strokeWidth: 1.5 });
  d.note(110, 158, 'Chile', { size: 12, anchor: 'middle', color: C.textDark });
  d.box(30, 168, 75, 38, 'QA', { fill: C.yellowFill, stroke: C.yellowStroke, fontSize: 11 });
  d.box(115, 168, 75, 38, 'PROD', { fill: C.greenFill, stroke: C.greenStroke, fontSize: 11 });

  // Peru
  d.rect(260, 140, 180, 80, { fill: C.yellowFill, stroke: C.darkStroke, strokeWidth: 1.5 });
  d.note(350, 158, 'Peru', { size: 12, anchor: 'middle', color: C.textDark });
  d.box(270, 168, 75, 38, 'QA', { fill: C.yellowFill, stroke: C.yellowStroke, fontSize: 11 });
  d.box(355, 168, 75, 38, 'PROD', { fill: C.greenFill, stroke: C.greenStroke, fontSize: 11 });

  // Spain
  d.rect(495, 140, 180, 80, { fill: C.yellowFill, stroke: C.darkStroke, strokeWidth: 1.5 });
  d.note(585, 158, 'Espana', { size: 12, anchor: 'middle', color: C.textDark });
  d.box(505, 168, 75, 38, 'QA', { fill: C.yellowFill, stroke: C.yellowStroke, fontSize: 11 });
  d.box(590, 168, 75, 38, 'PROD', { fill: C.greenFill, stroke: C.greenStroke, fontSize: 11 });

  d.note(350, 265, 'workflow_dispatch — deploy manual por pais', { size: 11, anchor: 'middle' });
}
