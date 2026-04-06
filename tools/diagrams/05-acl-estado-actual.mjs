/**
 * ACL Estado Actual (On-Premise)
 */
import { DiagramEngine, C } from '../lib/diagram-engine.mjs';

export const name = 'acl-estado-actual';
export const description = 'Current ACL state with cloud and on-premise zones per country';
export const width = 860;
export const height = 420;

export function draw(d, C) {
  // Cloud zone
  d.region(10, 5, 350, 250, { stroke: C.gcpBlue });
  d.note(20, 22, 'CLOUD (GCP)', { size: 12, color: C.gcpBlue });

  d.boxSub(25, 40, 200, 55, 'Integration API', 'Logica de negocio', { fill: C.yellowFill, stroke: C.yellowStroke, fontSize: 12 });
  d.boxSub(25, 110, 200, 50, 'Sync Worker', 'Cloud Run Job', { fill: C.greenFill, stroke: C.greenStroke, fontSize: 11 });
  d.box(25, 180, 200, 42, 'Firestore', { fill: C.gcpYellowFill, stroke: C.gcpYellow, fontSize: 13 });

  // Internal arrows
  d.arrow(125, 95, 125, 110, { stroke: C.textLight });
  d.arrow(125, 160, 125, 180, { stroke: C.gcpYellow });

  // On-Premise zone
  d.region(420, 5, 420, 400, { stroke: C.redStroke });
  d.note(430, 22, 'ON-PREMISE (por pais)', { size: 12, color: C.redStroke });

  // ACL Chile
  d.rect(440, 40, 180, 100, { fill: C.redFill, stroke: C.redStroke });
  d.text(530, 58, 'ACL Chile', { size: 12, anchor: 'middle', weight: 'bold', color: C.redStroke });
  d.box(450, 68, 160, 28, 'DynamicsAxAdapter', { fill: C.redFill, stroke: C.redStroke, fontSize: 10 });
  d.box(450, 102, 160, 28, 'Dynamics AX (SQL)', { fill: C.darkFill, stroke: C.darkStroke, fontSize: 10 });

  // ACL Peru
  d.rect(440, 155, 180, 100, { fill: C.orangeFill, stroke: C.orangeStroke });
  d.text(530, 173, 'ACL Peru', { size: 12, anchor: 'middle', weight: 'bold', color: C.orangeStroke });
  d.box(450, 183, 160, 28, 'CustomErpAdapter', { fill: C.orangeFill, stroke: C.orangeStroke, fontSize: 10 });
  d.box(450, 217, 160, 28, 'Custom ERP (REST)', { fill: C.darkFill, stroke: C.darkStroke, fontSize: 10 });

  // ACL Spain
  d.rect(440, 270, 180, 100, { fill: C.blueFill, stroke: C.blueStroke });
  d.text(530, 288, 'ACL España', { size: 12, anchor: 'middle', weight: 'bold', color: C.blueStroke });
  d.box(450, 298, 160, 28, 'GiraAdapter', { fill: C.blueFill, stroke: C.blueStroke, fontSize: 10 });
  d.box(450, 332, 160, 28, 'Gira (API)', { fill: C.darkFill, stroke: C.darkStroke, fontSize: 10 });

  // Arrows Cloud -> On-Prem
  d.arrow(225, 68, 440, 82, { stroke: C.blueStroke });
  d.note(310, 62, 'REST / gRPC', { size: 9, anchor: 'middle', color: C.blueStroke });
  d.arrow(225, 135, 440, 110, { stroke: C.greenStroke });
  d.note(310, 125, 'sync via ACL', { size: 9, anchor: 'middle', color: C.greenStroke });

  // Bracket: same codebase
  d.line(640, 50, 660, 50, { stroke: C.greenStroke });
  d.line(660, 50, 660, 360, { stroke: C.greenStroke });
  d.line(640, 360, 660, 360, { stroke: C.greenStroke });
  d.note(680, 195, 'Misma app ACL', { size: 11, color: C.greenStroke });
  d.note(680, 215, 'COUNTRY_CODE', { size: 9 });
  d.note(680, 230, 'activa adapter', { size: 9 });
}
