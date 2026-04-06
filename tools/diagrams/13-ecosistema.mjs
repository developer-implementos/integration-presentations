/**
 * Ecosistema de Integraciones — Todas las conexiones externas
 */
import { DiagramEngine, C } from '../lib/diagram-engine.mjs';

export const name = 'ecosistema';
export const description = 'Ecosistema completo de integraciones externas';
export const width = 800;
export const height = 420;

export function draw(d, C) {
  // Center: Integration Platform
  d.rect(270, 155, 260, 80, { fill: C.yellowFill, stroke: C.yellowStroke, strokeWidth: 3 });
  d.text(400, 188, 'Integration Platform', { size: 15, anchor: 'middle', weight: 'bold' });
  d.note(400, 210, 'Integration API + Workers', { anchor: 'middle', size: 10 });

  // Top: VTEX
  d.box(35, 15, 160, 50, 'VTEX Marketplace', { fill: C.purpleFill, stroke: C.purpleStroke, fontSize: 12 });
  d.note(115, 55, 'External Seller Protocol', { anchor: 'middle', size: 8 });
  d.arrow(160, 65, 310, 155, { stroke: C.purpleStroke });

  // Top center: Algolia
  d.box(310, 15, 140, 50, 'Algolia', { fill: C.algoliaFill, stroke: C.algoliaStroke, fontSize: 13 });
  d.note(380, 55, 'Search Engine', { anchor: 'middle', size: 8 });
  d.arrow(380, 65, 400, 155, { stroke: C.algoliaStroke });

  // Top right: Salesforce
  d.box(530, 15, 170, 50, 'Salesforce MC', { fill: C.cyanFill, stroke: C.cyanStroke, fontSize: 12 });
  d.note(615, 55, 'Journey Builder', { anchor: 'middle', size: 8 });
  d.arrow(575, 65, 475, 155, { stroke: C.cyanStroke });

  // Left: Payment Gateways
  d.box(10, 105, 130, 28, 'Webpay', { fill: C.redFill, stroke: C.redStroke, fontSize: 10 });
  d.box(10, 138, 130, 28, 'Khipu', { fill: C.redFill, stroke: C.redStroke, fontSize: 10 });
  d.box(10, 171, 130, 28, 'MercadoPago', { fill: C.redFill, stroke: C.redStroke, fontSize: 10 });
  d.box(10, 204, 130, 28, 'Niubiz', { fill: C.redFill, stroke: C.redStroke, fontSize: 10 });
  d.note(75, 247, 'Payment Gateways', { color: C.redStroke, size: 9, anchor: 'middle' });
  d.arrow(140, 175, 270, 190, { stroke: C.redStroke });

  // Right: ERPs
  d.box(640, 125, 140, 28, 'Dynamics AX (CL)', { fill: C.orangeFill, stroke: C.orangeStroke, fontSize: 10 });
  d.box(640, 158, 140, 28, 'Custom ERP (PE)', { fill: C.orangeFill, stroke: C.orangeStroke, fontSize: 10 });
  d.box(640, 191, 140, 28, 'Gira (ES)', { fill: C.orangeFill, stroke: C.orangeStroke, fontSize: 10 });
  d.note(710, 233, 'ERPs por Pais', { color: C.orangeStroke, size: 9, anchor: 'middle' });
  d.arrow(530, 190, 640, 175, { stroke: C.orangeStroke });

  // Bottom left: Pub/Sub
  d.box(65, 300, 160, 50, 'Cloud Pub/Sub', { fill: C.greenFill, stroke: C.greenStroke, fontSize: 12 });
  d.note(145, 340, 'Event-Driven Messaging', { anchor: 'middle', size: 8 });
  d.arrow(195, 300, 330, 235, { stroke: C.greenStroke });

  // Bottom center: Databases
  d.box(290, 300, 200, 50, 'Databases', { fill: C.gcpYellowFill, stroke: C.gcpYellow, fontSize: 13 });
  d.note(390, 340, 'Firestore + Redis', { anchor: 'middle', size: 9 });
  d.arrow(390, 300, 390, 235, { stroke: C.gcpYellow });

  // Bottom right: Channels
  d.box(560, 290, 130, 28, 'Twilio (SMS)', { fill: C.tealFill, stroke: C.tealStroke, fontSize: 10 });
  d.box(560, 323, 130, 28, 'WhatsApp', { fill: C.tealFill, stroke: C.tealStroke, fontSize: 10 });
  d.box(560, 356, 130, 28, 'Email (SMTP)', { fill: C.tealFill, stroke: C.tealStroke, fontSize: 10 });
  d.note(625, 400, 'Canales', { color: C.tealStroke, size: 9, anchor: 'middle' });
  d.arrow(560, 320, 470, 235, { stroke: C.tealStroke });
}
