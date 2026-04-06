/**
 * Capas Relaciones — Flujo de dependencias entre capas
 */
import { DiagramEngine, C } from '../lib/diagram-engine.mjs';

export const name = 'capas-relaciones';
export const description = 'Relaciones y flujo de dependencias entre las capas del modulo';
export const width = 800;
export const height = 400;

export function draw(d, C) {
  // API Layer
  d.region(20, 10, 250, 100, { stroke: C.blueStroke });
  d.note(30, 27, 'API Layer', { size: 12, color: C.blueStroke });
  d.box(35, 38, 100, 30, 'Controllers', { fill: C.blueFill, stroke: C.blueStroke, fontSize: 11 });
  d.box(145, 38, 110, 30, 'DTOs', { fill: C.blueFill, stroke: C.blueStroke, fontSize: 11 });
  d.box(35, 73, 220, 28, 'Swagger / OpenAPI', { fill: C.blueFill, stroke: C.blueStroke, fontSize: 10 });

  // Application Layer
  d.region(300, 10, 210, 100, { stroke: C.greenStroke });
  d.note(310, 27, 'Application Layer', { size: 12, color: C.greenStroke });
  d.box(315, 38, 85, 30, 'Use Cases', { fill: C.greenFill, stroke: C.greenStroke, fontSize: 10 });
  d.box(410, 38, 85, 30, 'Facades', { fill: C.greenFill, stroke: C.greenStroke, fontSize: 10 });
  d.box(315, 73, 180, 28, 'Commands / Queries', { fill: C.greenFill, stroke: C.greenStroke, fontSize: 10 });

  // Domain Layer
  d.region(540, 10, 240, 100, { stroke: C.redStroke });
  d.note(550, 27, 'Domain Layer', { size: 12, color: C.redStroke });
  d.box(555, 38, 100, 30, 'Domain Svc', { fill: C.redFill, stroke: C.redStroke, fontSize: 10 });
  d.box(665, 38, 100, 30, 'Entities', { fill: C.redFill, stroke: C.redStroke, fontSize: 10 });
  d.box(555, 73, 210, 28, 'Value Objects', { fill: C.redFill, stroke: C.redStroke, fontSize: 10 });

  // Infrastructure Layer
  d.region(200, 180, 400, 80, { stroke: C.orangeStroke });
  d.note(210, 197, 'Infrastructure Layer', { size: 12, color: C.orangeStroke });
  d.box(215, 210, 115, 30, 'Repositories', { fill: C.orangeFill, stroke: C.orangeStroke, fontSize: 10 });
  d.box(340, 210, 100, 30, 'External APIs', { fill: C.orangeFill, stroke: C.orangeStroke, fontSize: 10 });
  d.box(450, 210, 60, 30, 'DB', { fill: C.orangeFill, stroke: C.orangeStroke, fontSize: 10 });
  d.box(520, 210, 65, 30, 'Cache', { fill: C.orangeFill, stroke: C.orangeStroke, fontSize: 10 });

  // Flow arrows
  d.arrow(135, 53, 315, 53, { stroke: C.blueStroke }); // Controllers -> Use Cases
  d.note(225, 47, 'calls', { size: 9, anchor: 'middle', color: C.textLight });

  d.arrow(400, 53, 540, 53, { stroke: C.greenStroke }); // Facades -> Domain Svc
  d.note(470, 47, 'calls', { size: 9, anchor: 'middle', color: C.textLight });

  d.arrow(605, 68, 665, 53, { stroke: C.redStroke }); // Domain Svc -> Entities

  d.arrow(358, 110, 272, 210, { stroke: C.orangeStroke }); // Use Cases -> Repositories
  d.note(280, 165, 'uses', { size: 9, anchor: 'middle', color: C.textLight });

  d.arrow(480, 240, 480, 270);
  d.note(400, 310, 'Regla de Dependencia: capas internas NO conocen las externas', { anchor: 'middle', size: 12, color: C.textDark });
}
