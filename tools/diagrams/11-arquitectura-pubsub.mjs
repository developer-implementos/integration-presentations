/**
 * Arquitectura Pub/Sub — Publishers, Topics y Subscribers
 */
import { DiagramEngine, C } from '../lib/diagram-engine.mjs';

export const name = 'arquitectura-pubsub';
export const description = 'Arquitectura Cloud Pub/Sub con publishers, topics y subscribers';
export const width = 700;
export const height = 340;

export function draw(d, C) {
  // Publisher
  d.region(20, 10, 150, 60, { stroke: C.greenStroke });
  d.note(30, 27, 'Publishers', { size: 11, color: C.greenStroke });
  d.box(30, 35, 130, 28, 'integration-api', { fill: C.greenFill, stroke: C.greenStroke, fontSize: 11 });

  // Topics
  d.region(250, 10, 200, 200, { stroke: C.blueStroke });
  d.note(260, 27, 'Cloud Pub/Sub', { size: 11, color: C.blueStroke });
  d.box(265, 40, 170, 35, 'Topic: notifications', { fill: C.blueFill, stroke: C.blueStroke, fontSize: 10 });
  d.box(265, 90, 170, 35, 'Topic: reports', { fill: C.blueFill, stroke: C.blueStroke, fontSize: 10 });
  d.box(265, 140, 170, 35, 'Topic: sync-events', { fill: C.blueFill, stroke: C.blueStroke, fontSize: 10 });

  // Subscribers
  d.region(530, 10, 150, 200, { stroke: C.orangeStroke });
  d.note(540, 27, 'Subscribers', { size: 11, color: C.orangeStroke });
  d.box(540, 40, 130, 35, 'notif-worker', { fill: C.orangeFill, stroke: C.orangeStroke, fontSize: 10 });
  d.box(540, 90, 130, 35, 'report-worker', { fill: C.orangeFill, stroke: C.orangeStroke, fontSize: 10 });
  d.box(540, 140, 130, 35, 'sync-worker', { fill: C.orangeFill, stroke: C.orangeStroke, fontSize: 10 });

  // Publish arrows
  d.arrow(160, 49, 265, 52, { stroke: C.greenStroke });
  d.arrow(160, 49, 265, 102, { stroke: C.greenStroke });
  d.arrow(160, 49, 265, 152, { stroke: C.greenStroke });
  d.note(210, 42, 'Publish', { size: 9, color: C.greenStroke });

  // Pull arrows
  d.arrow(435, 57, 540, 57, { stroke: C.blueStroke });
  d.arrow(435, 107, 540, 107, { stroke: C.blueStroke });
  d.arrow(435, 157, 540, 157, { stroke: C.blueStroke });
  d.note(490, 48, 'Pull', { size: 9, color: C.blueStroke });

  d.note(350, 260, 'Si un worker falla, Pub/Sub hace retry automatico', { anchor: 'middle', size: 11 });
  d.note(350, 280, 'Si esta saturado, backoff automatico', { anchor: 'middle', size: 11 });
}
