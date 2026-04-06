/**
 * ACL Migracion a Cloud
 */
import { DiagramEngine, C } from '../lib/diagram-engine.mjs';

export const name = 'acl-migracion';
export const description = 'ACL migration from on-premise to Cloud Run with zero platform changes';
export const width = 860;
export const height = 400;

export function draw(d, C) {
  // Full cloud zone
  d.region(10, 5, 840, 380, { stroke: C.gcpBlue });
  d.note(20, 22, 'TODO EN CLOUD (GCP)', { size: 12, color: C.gcpBlue });

  // Integration API
  d.boxSub(25, 45, 210, 60, 'Integration API', '0% cambios', { fill: C.yellowFill, stroke: C.yellowStroke, fontSize: 12 });

  // Sync Worker
  d.box(25, 130, 210, 45, 'Sync Worker (0% cambios)', { fill: C.greenFill, stroke: C.greenStroke, fontSize: 11 });

  // Firestore
  d.box(25, 200, 210, 42, 'Firestore (0% cambios)', { fill: C.gcpYellowFill, stroke: C.gcpYellow, fontSize: 12 });

  // ACL Cloud Run
  d.rect(310, 45, 210, 110, { fill: C.greenFill, stroke: C.greenStroke, strokeWidth: 3 });
  d.text(415, 68, 'ACL (Cloud Run)', { size: 14, anchor: 'middle', weight: 'bold', color: C.greenStroke });
  d.box(325, 85, 180, 30, 'NewErpCloudAdapter', { fill: C.greenFill, stroke: C.greenStroke, fontSize: 11 });
  d.note(415, 140, '1 adapter, 3 configs', { anchor: 'middle', size: 10 });

  // ERP Cloud Instances
  d.box(590, 35, 200, 60, 'ERP Cloud (Chile)', { fill: C.greenFill, stroke: C.greenStroke, fontSize: 12 });
  d.note(690, 80, 'config: CL', { anchor: 'middle', size: 9 });

  d.box(590, 120, 200, 60, 'ERP Cloud (Perú)', { fill: C.greenFill, stroke: C.greenStroke, fontSize: 12 });
  d.note(690, 165, 'config: PE', { anchor: 'middle', size: 9 });

  d.box(590, 205, 200, 60, 'ERP Cloud (España)', { fill: C.greenFill, stroke: C.greenStroke, fontSize: 12 });
  d.note(690, 250, 'config: ES', { anchor: 'middle', size: 9 });

  // Arrows
  d.arrow(235, 75, 310, 95, { stroke: C.blueStroke });
  d.arrow(235, 152, 310, 120, { stroke: C.greenStroke });
  d.arrow(520, 85, 590, 60, { stroke: C.greenStroke });
  d.arrow(520, 100, 590, 145, { stroke: C.greenStroke });
  d.arrow(520, 115, 590, 230, { stroke: C.greenStroke });

  // Migration summary box
  d.region(310, 195, 210, 85);
  d.text(415, 215, 'Cambios requeridos:', { size: 11, anchor: 'middle', weight: 'bold', color: C.yellowStroke });
  d.note(415, 235, '1 nuevo adapter', { anchor: 'middle', size: 10, color: C.greenStroke });
  d.note(415, 250, 'ACL se mueve a Cloud Run', { anchor: 'middle', size: 10, color: C.greenStroke });
  d.note(415, 265, 'Integration API: 0 cambios', { anchor: 'middle', size: 10, color: C.redStroke });

  d.text(430, 360, 'El ACL migra de on-premise a Cloud Run — la plataforma no cambia', { size: 12, anchor: 'middle', weight: 'bold', color: C.greenStroke });
}
