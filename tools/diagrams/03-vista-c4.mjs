/**
 * Vista C4 — Contexto del Sistema
 */
import { DiagramEngine, C } from '../lib/diagram-engine.mjs';

export const name = 'vista-c4';
export const description = 'C4 system context view with consumers, security, platform, workers, and observability';
export const width = 860;
export const height = 520;

export function draw(d, C) {
  // Layer 1: Consumers
  d.region(10, 5, 840, 85, { stroke: C.blueStroke });
  d.note(20, 22, 'CONSUMIDORES', { size: 12, color: C.blueStroke });

  const consumers = [
    { name: 'Caja POS', sub: 'App Movil', fill: C.blueFill, stroke: C.blueStroke },
    { name: 'VTEX IO', sub: 'E-Commerce', fill: C.blueFill, stroke: C.blueStroke },
    { name: 'Omnichannel', sub: 'OMS Interno', fill: C.blueFill, stroke: C.blueStroke },
    { name: 'PIM', sub: 'Producto', fill: C.blueFill, stroke: C.blueStroke },
    { name: 'Webhooks', sub: 'Inbound', fill: C.purpleFill, stroke: C.purpleStroke },
    { name: 'Partners 3rd', sub: 'M2M Scoped', fill: C.purpleFill, stroke: C.purpleStroke },
  ];
  consumers.forEach((c, i) => {
    d.boxSub(25 + i * 135, 30, 125, 50, c.name, c.sub, { fill: c.fill, stroke: c.stroke, fontSize: 11 });
  });

  d.note(430, 105, 'REST / HTTPS', { anchor: 'middle', size: 10 });

  // Layer 2: Security
  d.region(10, 115, 840, 55, { stroke: C.redStroke });
  d.note(20, 132, 'SEGURIDAD & NETWORKING', { size: 11, color: C.redStroke });

  const secItems = ['Cloud Run TLS', 'Rate Limiting', 'JWT + API Key', 'RBAC + Scopes', 'Validation', 'VPC Private'];
  secItems.forEach((s, i) => {
    d.box(25 + i * 135, 140, 125, 24, s, { fill: C.redFill, stroke: C.redStroke, fontSize: 9 });
  });

  // Layer 3: Integration Platform
  d.rect(10, 190, 840, 145, { fill: C.yellowFill, stroke: C.yellowStroke, strokeWidth: 2 });
  d.text(430, 210, 'INTEGRATION PLATFORM (NestJS + Fastify)', { size: 13, anchor: 'middle', weight: 'bold', color: C.yellowStroke });

  const modules1 = ['Catalog', 'Inventory', 'OMS', 'Payment', 'Customer', 'Logistics'];
  modules1.forEach((m, i) => {
    const colors = [C.blueFill, C.greenFill, C.orangeFill, C.redFill, C.purpleFill, C.tealFill];
    const strokes = [C.blueStroke, C.greenStroke, C.orangeStroke, C.redStroke, C.purpleStroke, C.tealStroke];
    d.box(25 + i * 135, 225, 125, 30, m, { fill: colors[i], stroke: strokes[i], fontSize: 11 });
  });

  const modules2 = ['Shopping Cart', 'Notification', 'CMS', 'Documents', 'Articles', 'VTEX Seller'];
  modules2.forEach((m, i) => {
    d.box(25 + i * 135, 265, 125, 30, m, { fill: C.darkFill, stroke: C.darkStroke, fontSize: 10 });
  });

  d.box(25, 305, 820, 22, 'Shared (Auth, Cache, Logger, Resilience)', { fill: C.yellowFill, stroke: C.yellowStroke, fontSize: 10 });

  // Layer 4: Workers + Data
  d.region(10, 350, 420, 80, { stroke: C.greenStroke });
  d.note(20, 367, 'WORKERS', { size: 11, color: C.greenStroke });
  const workers = ['Pub/Sub', 'Sync Worker', 'Notif Worker', 'Report Worker'];
  workers.forEach((w, i) => {
    d.box(25 + i * 100, 375, 92, 24, w, { fill: C.greenFill, stroke: C.greenStroke, fontSize: 9 });
  });

  d.region(440, 350, 410, 80, { stroke: C.orangeStroke });
  d.note(450, 367, 'DATOS & CACHE', { size: 11, color: C.orangeStroke });
  d.box(455, 375, 120, 24, 'Firestore (Mongo)', { fill: C.gcpYellowFill, stroke: C.gcpYellow, fontSize: 9 });
  d.box(585, 375, 110, 24, 'Redis Cache', { fill: C.orangeFill, stroke: C.orangeStroke, fontSize: 9 });
  d.box(705, 375, 130, 24, 'Twilio / WSP', { fill: C.tealFill, stroke: C.tealStroke, fontSize: 9 });

  // Layer 5: Observability
  d.region(10, 445, 840, 55, { stroke: C.darkStroke });
  d.note(20, 462, 'OBSERVABILIDAD', { size: 11, color: C.textLight });
  const obsItems = ['Pino Structured Logs', 'OpenTelemetry', 'Grafana Cloud', 'Sentry'];
  const obsColors = [C.darkFill, C.darkFill, C.grafanaFill, C.purpleFill];
  const obsStrokes = [C.darkStroke, C.darkStroke, C.grafanaStroke, C.purpleStroke];
  obsItems.forEach((o, i) => {
    d.box(150 + i * 170, 468, 155, 24, o, { fill: obsColors[i], stroke: obsStrokes[i], fontSize: 10 });
  });
}
