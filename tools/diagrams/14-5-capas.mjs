/**
 * 5 Capas — Rectangulos concentricos del modulo
 */
import { DiagramEngine, C } from '../lib/diagram-engine.mjs';

export const name = '5-capas';
export const description = '5 capas concentricas del modulo: Config, API, Infrastructure, Application, Domain';
export const width = 650;
export const height = 380;

export function draw(d, C) {
  // Config (outermost)
  d.rect(20, 10, 610, 350, { fill: 'transparent', stroke: C.darkStroke, strokeWidth: 2 });
  d.text(325, 33, 'Config — Bootstrap del modulo', { size: 12, anchor: 'middle', weight: 'bold', color: C.darkStroke });

  // API
  d.rect(50, 45, 550, 290, { fill: 'transparent', stroke: C.blueStroke, strokeWidth: 2 });
  d.text(325, 65, 'API — Controllers, DTOs, Swagger', { size: 12, anchor: 'middle', weight: 'bold', color: C.blueStroke });

  // Infrastructure
  d.rect(80, 80, 490, 230, { fill: 'transparent', stroke: C.orangeStroke, strokeWidth: 2 });
  d.text(325, 100, 'Infrastructure — Repos, Adapters, Schemas', { size: 12, anchor: 'middle', weight: 'bold', color: C.orangeStroke });

  // Application
  d.rect(120, 115, 410, 170, { fill: 'transparent', stroke: C.greenStroke, strokeWidth: 2 });
  d.text(325, 135, 'Application — Facades, Services, Ports', { size: 12, anchor: 'middle', weight: 'bold', color: C.greenStroke });

  // Domain (innermost, filled)
  d.rect(175, 155, 300, 100, { fill: C.redFill, stroke: C.redStroke, strokeWidth: 3 });
  d.text(325, 190, 'Domain', { size: 16, anchor: 'middle', weight: 'bold', color: C.redStroke });
  d.text(325, 212, 'Entities, Value Objects, Events', { size: 10, anchor: 'middle', color: C.textMuted });
  d.text(325, 230, 'CERO dependencias externas', { size: 9, anchor: 'middle', color: C.textLight });

  // Dependency arrow (rotated via text)
  d.note(590, 200, 'Dependencias -->', { size: 10, color: C.textLight });
}
