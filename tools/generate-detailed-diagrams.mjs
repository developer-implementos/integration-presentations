/**
 * Detailed Presentation Diagram Generator — Sketchnote Style
 *
 * Generates ALL hand-drawn SVG diagrams for the detailed architecture presentation.
 * Uses DiagramEngine with rough.js for consistent hand-drawn style.
 *
 * Usage: node tools/generate-detailed-diagrams.mjs
 */
import { writeFileSync, mkdirSync, cpSync } from 'fs';
import { DiagramEngine, C } from './lib/diagram-engine.mjs';

const OUT = 'assets/images/excalidraw-detailed';
const SERVE = 'presentations/assets/excalidraw-detailed';
mkdirSync(OUT, { recursive: true });
mkdirSync(SERVE, { recursive: true });

function save(name, engine) {
  const svg = engine.toSvg();
  writeFileSync(`${OUT}/${name}.svg`, svg);
  writeFileSync(`${SERVE}/${name}.svg`, svg);
  console.log(`  ✓ ${name}.svg (${(svg.length / 1024).toFixed(1)} KB)`);
}

// ═══════════════════════════════════════════════════════
// 1. La Solucion — Composable Platform
// ═══════════════════════════════════════════════════════
function laSolucion() {
  const d = new DiagramEngine(900, 380);

  // ERP (left)
  d.box(20, 50, 160, 130, '', { fill: C.darkFill, stroke: C.darkStroke });
  d.text(100, 85, 'ERP', { size: 16, anchor: 'middle', weight: 'bold' });
  d.text(100, 108, 'Back office', { size: 11, anchor: 'middle', color: C.textMuted });
  d.text(100, 124, 'transaccional', { size: 11, anchor: 'middle', color: C.textMuted });
  d.note(100, 155, 'Dynamics AX / Custom / Gira', { anchor: 'middle', size: 9 });

  // ACL arrow (API real-time)
  d.arrow(180, 90, 280, 90, { stroke: C.greenStroke });
  d.note(230, 80, 'ACL (API)', { size: 9, anchor: 'middle', color: C.greenStroke });
  d.note(230, 105, 'real-time', { size: 8, anchor: 'middle', color: C.greenStroke });

  // Sync Worker arrow (SQL batch) — dashed style via line + arrow
  d.arrow(180, 140, 280, 140, { stroke: C.orangeStroke });
  d.note(230, 130, 'Sync Worker', { size: 9, anchor: 'middle', color: C.orangeStroke });
  d.note(230, 155, 'SQL batch', { size: 8, anchor: 'middle', color: C.orangeStroke });

  // Integration Platform (center)
  d.rect(280, 30, 300, 170, { fill: C.yellowFill, stroke: C.yellowStroke, strokeWidth: 3 });
  d.text(430, 65, 'Integration Platform', { size: 16, anchor: 'middle', weight: 'bold' });
  d.text(430, 88, 'Conectividad · Escalabilidad', { size: 11, anchor: 'middle', color: C.textMuted });
  d.text(430, 105, 'Diferenciacion', { size: 11, anchor: 'middle', color: C.textMuted });
  d.text(430, 130, 'Composable: poner y sacar', { size: 10, anchor: 'middle', color: C.textLight });
  d.text(430, 145, 'piezas de software dinamicamente', { size: 10, anchor: 'middle', color: C.textLight });
  d.text(430, 175, '= Desarrollo Propio', { size: 11, anchor: 'middle', weight: 'bold', color: C.greenStroke });

  // Soluciones de Mercado (right)
  d.box(640, 30, 230, 170, '', { fill: C.blueFill, stroke: C.blueStroke });
  d.text(755, 65, 'Soluciones de', { size: 14, anchor: 'middle', weight: 'bold' });
  d.text(755, 82, 'Mercado', { size: 14, anchor: 'middle', weight: 'bold' });
  d.text(755, 105, 'VTEX · Salesforce MC', { size: 10, anchor: 'middle', color: C.textMuted });
  d.text(755, 120, 'Webpay · Niubiz', { size: 10, anchor: 'middle', color: C.textMuted });
  d.text(755, 135, 'MercadoPago · Khipu', { size: 10, anchor: 'middle', color: C.textMuted });
  d.text(755, 150, 'Algolia · WMS · CRM', { size: 10, anchor: 'middle', color: C.textMuted });
  d.note(755, 175, 'Herramientas de nicho', { anchor: 'middle', size: 9 });

  // Bidirectional arrows Platform <-> Market
  d.arrow(580, 90, 640, 90, { stroke: C.blueStroke });
  d.arrow(640, 130, 580, 130, { stroke: C.blueStroke });
  d.note(610, 115, 'REST/', { anchor: 'middle', size: 9, color: C.blueStroke });

  // Countries below
  d.box(300, 240, 90, 38, 'Chile', { fill: C.redFill, stroke: C.redStroke, fontSize: 13 });
  d.box(405, 240, 90, 38, 'Peru', { fill: C.orangeFill, stroke: C.orangeStroke, fontSize: 13 });
  d.box(510, 240, 90, 38, 'Espana', { fill: C.blueFill, stroke: C.blueStroke, fontSize: 13 });

  d.arrow(430, 200, 345, 240, { stroke: C.yellowStroke });
  d.arrow(430, 200, 450, 240, { stroke: C.yellowStroke });
  d.arrow(430, 200, 555, 240, { stroke: C.yellowStroke });

  d.note(450, 320, 'El ERP alimenta la plataforma via ACL — la plataforma no depende del ERP', { anchor: 'middle', size: 11 });

  return d;
}

// ═══════════════════════════════════════════════════════
// 2. Capacidades de Negocio
// ═══════════════════════════════════════════════════════
function capacidadesNegocio() {
  const d = new DiagramEngine(1000, 520);

  const bw = 140; // box width
  const bh = 55;  // box height
  const gap = 10;
  const startX = 15;

  // Row 1: Core Systems
  const row1y = 10;
  const systems1 = [
    { name: 'ERP', sub: 'Planif. Recursos', fill: C.blueFill, stroke: C.blueStroke },
    { name: 'SCM', sub: 'Cadena Suministro', fill: C.greenFill, stroke: C.greenStroke },
    { name: 'SALES', sub: 'Sistemas Venta', fill: C.tealFill, stroke: C.tealStroke },
    { name: 'CRM', sub: 'Relacion Clientes', fill: C.tealFill, stroke: C.tealStroke },
    { name: 'ECOMMERCE', sub: 'Comercio Electronico', fill: C.purpleFill, stroke: C.purpleStroke },
    { name: 'MARKETPLACES', sub: 'Mercados en Linea', fill: C.purpleFill, stroke: C.purpleStroke },
  ];
  systems1.forEach((s, i) => {
    const x = startX + i * (bw + gap);
    d.boxSub(x, row1y, bw, bh, s.name, s.sub, { fill: s.fill, stroke: s.stroke, fontSize: 13 });
  });

  // Row 1 sub-items
  const subItemH = 28;
  const subGap = 5;
  const row1SubY = row1y + bh + subGap;

  // ERP sub-items
  const erpItems = ['Cobranzas', 'Finanzas', 'Contabilidad', 'Tesoreria', 'Inventarios'];
  erpItems.forEach((item, i) => {
    d.box(startX + 5, row1SubY + i * (subItemH + 3), bw - 10, subItemH, item, { fill: C.blueFill, stroke: C.blueStroke, fontSize: 10 });
  });

  // SCM sub-items
  const scmItems = ['Planif. demanda', 'Planif. compras', 'Planif. reposicion'];
  scmItems.forEach((item, i) => {
    d.box(startX + bw + gap + 5, row1SubY + i * (subItemH + 3), bw - 10, subItemH, item, { fill: C.greenFill, stroke: C.greenStroke, fontSize: 10 });
  });

  // SALES sub-items
  const salesItems = ['POS & Caja', 'Pedidos B2B', 'Gst. Venver'];
  salesItems.forEach((item, i) => {
    d.box(startX + 2 * (bw + gap) + 5, row1SubY + i * (subItemH + 3), bw - 10, subItemH, item, { fill: C.tealFill, stroke: C.tealStroke, fontSize: 10 });
  });

  // CRM sub-items
  const crmItems = ['Clientes', 'Campanas', 'Atencion', 'Televenta'];
  crmItems.forEach((item, i) => {
    d.box(startX + 3 * (bw + gap) + 5, row1SubY + i * (subItemH + 3), bw - 10, subItemH, item, { fill: C.tealFill, stroke: C.tealStroke, fontSize: 10 });
  });

  // ECOMMERCE sub-items
  const ecomItems = ['Gst. ecommerce B2C', 'Precios y promos'];
  ecomItems.forEach((item, i) => {
    d.box(startX + 4 * (bw + gap) + 5, row1SubY + i * (subItemH + 3), bw - 10, subItemH, item, { fill: C.purpleFill, stroke: C.purpleStroke, fontSize: 10 });
  });

  // MARKETPLACES sub-items
  const mktItems = ['Precios marketplace'];
  mktItems.forEach((item, i) => {
    d.box(startX + 5 * (bw + gap) + 5, row1SubY + i * (subItemH + 3), bw - 10, subItemH, item, { fill: C.purpleFill, stroke: C.purpleStroke, fontSize: 10 });
  });

  // Row 2: Operational Systems
  const row2y = 280;
  const systems2 = [
    { name: 'WMS', sub: 'Gestion Almacenes', fill: C.blueFill, stroke: C.blueStroke },
    { name: 'OMS', sub: 'Ordenes Omnicanal', fill: C.greenFill, stroke: C.greenStroke },
    { name: 'PIM', sub: 'Info Productos', fill: C.greenFill, stroke: C.greenStroke },
    { name: 'PRECIOS', sub: 'Gst. precios', fill: C.purpleFill, stroke: C.purpleStroke },
    { name: 'COBRANZAS', sub: 'Portal', fill: C.blueFill, stroke: C.blueStroke },
    { name: 'INCENTIVOS', sub: 'Comisiones', fill: C.purpleFill, stroke: C.purpleStroke },
  ];
  systems2.forEach((s, i) => {
    const x = startX + i * (bw + gap);
    d.boxSub(x, row2y, bw, bh, s.name, s.sub, { fill: s.fill, stroke: s.stroke, fontSize: 13 });
  });

  // Row 3: Bottom bars
  const barY1 = 400;
  d.rect(startX, barY1, 960, 40, { fill: C.yellowFill, stroke: C.yellowStroke, strokeWidth: 3 });
  d.text(500, barY1 + 25, 'IA ARTIFICIAL / RPA (Robotic Process Automation)', { size: 12, anchor: 'middle', weight: 'bold', color: C.yellowStroke });

  const barY2 = 455;
  d.rect(startX, barY2, 960, 42, { fill: C.redFill, stroke: C.redStroke, strokeWidth: 3 });
  d.text(500, barY2 + 27, 'INTEGRATION PLATFORM — Conecta todos estos componentes', { size: 13, anchor: 'middle', weight: 'bold', color: C.redStroke });

  return d;
}

// ═══════════════════════════════════════════════════════
// 3. Vista C4 — Contexto del Sistema
// ═══════════════════════════════════════════════════════
function vistaC4() {
  const d = new DiagramEngine(860, 520);

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

  return d;
}

// ═══════════════════════════════════════════════════════
// 4. Desacoplamiento Before/After
// ═══════════════════════════════════════════════════════
function desacoplamiento() {
  const d = new DiagramEngine(900, 220);

  // BEFORE (left side)
  d.note(200, 18, 'ANTES (acoplado)', { anchor: 'middle', size: 13, color: C.redStroke });
  d.box(10, 30, 120, 40, 'Caja POS', { fill: C.redFill, stroke: C.redStroke, fontSize: 12 });
  d.box(10, 80, 120, 40, 'VTEX IO', { fill: C.redFill, stroke: C.redStroke, fontSize: 12 });
  d.box(10, 130, 120, 40, 'Omnichannel', { fill: C.redFill, stroke: C.redStroke, fontSize: 12 });
  d.box(260, 65, 160, 60, 'Dynamics AX', { fill: C.redFill, stroke: C.redStroke, fontSize: 15 });
  d.arrow(130, 50, 260, 85, { stroke: C.redStroke });
  d.arrow(130, 100, 260, 95, { stroke: C.redStroke });
  d.arrow(130, 150, 260, 105, { stroke: C.redStroke });

  // Divider
  d.line(450, 20, 450, 200, { stroke: C.textLight, strokeWidth: 1.5 });

  // AFTER (right side)
  d.note(680, 18, 'DESPUES (desacoplado)', { anchor: 'middle', size: 13, color: C.greenStroke });
  d.box(480, 30, 120, 40, 'Caja POS', { fill: C.greenFill, stroke: C.greenStroke, fontSize: 12 });
  d.box(480, 80, 120, 40, 'VTEX IO', { fill: C.greenFill, stroke: C.greenStroke, fontSize: 12 });
  d.box(480, 130, 120, 40, 'Omnichannel', { fill: C.greenFill, stroke: C.greenStroke, fontSize: 12 });

  d.rect(640, 45, 120, 100, { fill: C.yellowFill, stroke: C.yellowStroke, strokeWidth: 3 });
  d.text(700, 85, 'Integration', { size: 13, anchor: 'middle', weight: 'bold' });
  d.text(700, 102, 'Platform', { size: 13, anchor: 'middle', weight: 'bold' });

  d.box(800, 55, 90, 35, 'Adapter', { fill: C.yellowFill, stroke: C.yellowStroke, fontSize: 11 });
  d.box(800, 100, 90, 40, 'Dynamics AX', { fill: C.redFill, stroke: C.redStroke, fontSize: 10 });

  d.arrow(600, 50, 640, 80, { stroke: C.greenStroke });
  d.arrow(600, 100, 640, 95, { stroke: C.greenStroke });
  d.arrow(600, 150, 640, 110, { stroke: C.greenStroke });
  d.arrow(760, 95, 800, 72, { stroke: C.yellowStroke });
  d.arrow(845, 90, 845, 100, { stroke: C.yellowStroke });

  return d;
}

// ═══════════════════════════════════════════════════════
// 5. ACL Estado Actual (On-Premise)
// ═══════════════════════════════════════════════════════
function aclEstadoActual() {
  const d = new DiagramEngine(860, 420);

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
  d.text(530, 288, 'ACL Espana', { size: 12, anchor: 'middle', weight: 'bold', color: C.blueStroke });
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

  return d;
}

// ═══════════════════════════════════════════════════════
// 6. ACL Migracion a Cloud
// ═══════════════════════════════════════════════════════
function aclMigracion() {
  const d = new DiagramEngine(860, 400);

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

  d.box(590, 120, 200, 60, 'ERP Cloud (Peru)', { fill: C.greenFill, stroke: C.greenStroke, fontSize: 12 });
  d.note(690, 165, 'config: PE', { anchor: 'middle', size: 9 });

  d.box(590, 205, 200, 60, 'ERP Cloud (Espana)', { fill: C.greenFill, stroke: C.greenStroke, fontSize: 12 });
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

  return d;
}

// ═══════════════════════════════════════════════════════
// 7. GCP Org Structure
// ═══════════════════════════════════════════════════════
function gcpOrg() {
  const d = new DiagramEngine(700, 370);

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
  d.note(130, 163, 'Peru', { size: 12, anchor: 'middle', color: C.textDark });
  d.box(50, 171, 75, 35, 'QA', { fill: C.yellowFill, stroke: C.yellowStroke, fontSize: 11 });
  d.box(135, 171, 75, 35, 'Prod', { fill: C.greenFill, stroke: C.greenStroke, fontSize: 11 });

  // Spain
  d.rect(40, 236, 180, 75, { fill: C.yellowFill, stroke: C.darkStroke, strokeWidth: 1.5 });
  d.note(130, 251, 'Espana', { size: 12, anchor: 'middle', color: C.textDark });
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

  return d;
}

// ═══════════════════════════════════════════════════════
// 8. Deploy Multi-Pais
// ═══════════════════════════════════════════════════════
function deployMultiPais() {
  const d = new DiagramEngine(700, 320);

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

  return d;
}

// ═══════════════════════════════════════════════════════
// 9. Stack de Infraestructura GCP
// ═══════════════════════════════════════════════════════
function stackInfra() {
  const d = new DiagramEngine(800, 420);

  // GCP outer border
  d.region(10, 5, 780, 405, { stroke: C.gcpBlue });
  d.text(400, 28, 'Google Cloud Platform', { size: 15, anchor: 'middle', weight: 'bold', color: C.gcpBlue });

  const leftLabel = 55;
  const leftBox = 170;
  const boxW = 130;
  const boxGap = 10;

  // Row 1: Networking
  d.rect(30, 45, 740, 55, { fill: C.redFill, stroke: C.redStroke, strokeWidth: 1.5 });
  d.text(leftLabel, 77, 'NETWORKING', { size: 10, weight: 'bold', color: C.redStroke });
  const netItems = ['Cloud Run TLS', 'VPC + Direct Egress', 'VPC Peering', 'IAM + SA'];
  netItems.forEach((item, i) => {
    d.box(leftBox + i * (boxW + boxGap), 55, boxW, 35, item, { fill: C.redFill, stroke: C.redStroke, fontSize: 10 });
  });

  // Row 2: Compute
  d.rect(30, 110, 740, 65, { fill: C.blueFill, stroke: C.blueStroke, strokeWidth: 1.5 });
  d.text(leftLabel, 147, 'COMPUTE', { size: 10, weight: 'bold', color: C.blueStroke });
  const compItems = [
    { name: 'Cloud Run', sub: 'API + Workers' },
    { name: 'Cloud Scheduler', sub: 'Cron Jobs' },
    { name: 'Cloud Tasks', sub: 'Async Processing' },
    { name: 'Artifact Registry', sub: 'Docker Images' },
  ];
  compItems.forEach((item, i) => {
    d.boxSub(leftBox + i * (boxW + boxGap), 120, boxW, 48, item.name, item.sub, { fill: C.blueFill, stroke: C.blueStroke, fontSize: 11 });
  });

  // Row 3: Data
  d.rect(30, 185, 740, 60, { fill: C.gcpYellowFill, stroke: C.gcpYellow, strokeWidth: 1.5 });
  d.text(leftLabel, 220, 'DATA', { size: 10, weight: 'bold', color: C.gcpYellow });
  const dataItems = [
    { name: 'Firestore', sub: 'MongoDB API' },
    { name: 'Memorystore', sub: 'Redis Cache' },
    { name: 'Secret Manager', sub: 'Credenciales' },
    { name: 'Cloud Storage', sub: 'Archivos' },
  ];
  dataItems.forEach((item, i) => {
    d.boxSub(leftBox + i * (boxW + boxGap), 195, boxW, 42, item.name, item.sub, { fill: C.gcpYellowFill, stroke: C.gcpYellow, fontSize: 10 });
  });

  // Row 4a: Messaging
  d.rect(30, 255, 380, 55, { fill: C.greenFill, stroke: C.greenStroke, strokeWidth: 1.5 });
  d.text(leftLabel, 287, 'MESSAGING', { size: 10, weight: 'bold', color: C.greenStroke });
  d.box(leftBox, 265, boxW, 35, 'Cloud Pub/Sub', { fill: C.greenFill, stroke: C.greenStroke, fontSize: 10 });
  d.box(leftBox + boxW + boxGap, 265, boxW, 35, 'Dead Letter Queue', { fill: C.greenFill, stroke: C.greenStroke, fontSize: 10 });

  // Row 4b: Observability
  d.rect(420, 255, 350, 55, { fill: C.grafanaFill, stroke: C.grafanaStroke, strokeWidth: 1.5 });
  d.text(445, 287, 'OBSERVABILITY', { size: 10, weight: 'bold', color: C.grafanaStroke });
  d.box(540, 265, boxW, 35, 'Grafana Cloud', { fill: C.grafanaFill, stroke: C.grafanaStroke, fontSize: 10 });
  d.box(540 + boxW + boxGap, 265, boxW, 35, 'Cloud Logging', { fill: C.darkFill, stroke: C.darkStroke, fontSize: 10 });

  // Row 5: Security
  d.rect(30, 320, 740, 45, { fill: C.redFill, stroke: C.redStroke, strokeWidth: 1.5 });
  d.text(leftLabel, 348, 'SECURITY', { size: 10, weight: 'bold', color: C.redStroke });
  const secItems = ['Workload Identity', 'IAM + Service Accts', 'VPC Peering', 'KMS Encryption'];
  secItems.forEach((item, i) => {
    d.box(leftBox + i * (boxW + boxGap), 330, boxW, 28, item, { fill: C.redFill, stroke: C.redStroke, fontSize: 9 });
  });

  return d;
}

// ═══════════════════════════════════════════════════════
// 10. Cloud Run Auto-Scaling
// ═══════════════════════════════════════════════════════
function cloudRunScaling() {
  const d = new DiagramEngine(650, 300);

  // Traffic circle
  d.ellipse(260, 10, 130, 50, { fill: C.yellowFill, stroke: C.yellowStroke, strokeWidth: 2.5 });
  d.text(325, 40, 'Trafico', { size: 15, anchor: 'middle', weight: 'bold' });

  d.arrow(325, 60, 325, 100, { stroke: C.textDark });

  // Load Balancer
  d.box(220, 100, 210, 45, 'Cloud Run Load Balancer', { fill: C.blueFill, stroke: C.blueStroke, fontSize: 13 });

  // Instances
  d.arrow(270, 145, 110, 190, { stroke: C.blueStroke });
  d.arrow(325, 145, 325, 190, { stroke: C.blueStroke });
  d.arrow(380, 145, 540, 190, { stroke: C.blueStroke });

  d.box(30, 190, 160, 50, 'Instance 1', { fill: C.greenFill, stroke: C.greenStroke, fontSize: 13 });
  d.note(110, 255, 'warm (min=1)', { size: 10, anchor: 'middle', color: C.greenStroke });

  d.box(245, 190, 160, 50, 'Instance 2', { fill: C.greenFill, stroke: C.greenStroke, fontSize: 13 });
  d.note(325, 255, 'auto-scale', { size: 10, anchor: 'middle', color: C.greenStroke });

  d.box(460, 190, 160, 50, 'Instance N', { fill: C.greenFill, stroke: C.greenStroke, fontSize: 13 });
  d.note(540, 255, 'max=10', { size: 10, anchor: 'middle', color: C.greenStroke });

  d.note(325, 285, 'Cada instancia: 100 req concurrentes — auto-scale al superar', { anchor: 'middle', size: 11 });

  return d;
}

// ═══════════════════════════════════════════════════════
// 11. Arquitectura Pub/Sub
// ═══════════════════════════════════════════════════════
function arquitecturaPubsub() {
  const d = new DiagramEngine(700, 340);

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

  return d;
}

// ═══════════════════════════════════════════════════════
// 12. No Shared State
// ═══════════════════════════════════════════════════════
function noSharedState() {
  const d = new DiagramEngine(650, 250);

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

  return d;
}

// ═══════════════════════════════════════════════════════
// 13. Ecosistema de Integraciones
// ═══════════════════════════════════════════════════════
function ecosistema() {
  const d = new DiagramEngine(800, 420);

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

  return d;
}

// ═══════════════════════════════════════════════════════
// 14. 5 Capas (Concentric Rectangles)
// ═══════════════════════════════════════════════════════
function cincoCaps() {
  const d = new DiagramEngine(650, 380);

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

  return d;
}

// ═══════════════════════════════════════════════════════
// 15. Capas Relaciones
// ═══════════════════════════════════════════════════════
function capasRelaciones() {
  const d = new DiagramEngine(800, 400);

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

  return d;
}

// ═══════════════════════════════════════════════════════
// 16. Error Jerarquia
// ═══════════════════════════════════════════════════════
function errorJerarquia() {
  const d = new DiagramEngine(800, 350);

  // Root
  d.box(310, 10, 180, 42, 'DomainError', { fill: C.purpleFill, stroke: C.purpleStroke, fontSize: 14 });
  d.note(400, 42, 'abstracta', { anchor: 'middle', size: 9, color: C.purpleStroke });

  // Level 2
  d.arrow(350, 52, 120, 100, { stroke: C.blueStroke });
  d.arrow(380, 52, 320, 100, { stroke: C.greenStroke });
  d.arrow(420, 52, 520, 100, { stroke: C.orangeStroke });
  d.arrow(460, 52, 700, 100, { stroke: C.redStroke });

  d.box(40, 100, 160, 40, 'InventoryError', { fill: C.blueFill, stroke: C.blueStroke, fontSize: 12 });
  d.box(240, 100, 160, 40, 'PricingError', { fill: C.greenFill, stroke: C.greenStroke, fontSize: 12 });
  d.box(440, 100, 160, 40, 'CatalogueError', { fill: C.orangeFill, stroke: C.orangeStroke, fontSize: 12 });
  d.box(640, 100, 140, 40, 'NotificationError', { fill: C.redFill, stroke: C.redStroke, fontSize: 11 });

  // Level 3: Inventory children
  d.arrow(80, 140, 40, 190, { stroke: C.blueStroke });
  d.arrow(160, 140, 160, 190, { stroke: C.blueStroke });
  d.box(0, 190, 130, 38, 'InsufficientStock', { fill: C.blueFill, stroke: C.blueStroke, fontSize: 10 });
  d.box(140, 190, 100, 38, 'InvalidSKU', { fill: C.blueFill, stroke: C.blueStroke, fontSize: 10 });

  // Level 3: Pricing children
  d.arrow(290, 140, 260, 190, { stroke: C.greenStroke });
  d.arrow(350, 140, 370, 190, { stroke: C.greenStroke });
  d.box(220, 190, 120, 38, 'InvalidMargin', { fill: C.greenFill, stroke: C.greenStroke, fontSize: 10 });
  d.box(350, 190, 120, 38, 'PriceNotFound', { fill: C.greenFill, stroke: C.greenStroke, fontSize: 10 });

  // Level 3: Catalogue children
  d.arrow(490, 140, 490, 190, { stroke: C.orangeStroke });
  d.arrow(560, 140, 610, 190, { stroke: C.orangeStroke });
  d.box(450, 190, 120, 38, 'DuplicateSku', { fill: C.orangeFill, stroke: C.orangeStroke, fontSize: 10 });
  d.box(580, 190, 130, 38, 'ProductNotFound', { fill: C.orangeFill, stroke: C.orangeStroke, fontSize: 10 });

  d.note(400, 280, 'Cada modulo tiene errores tipados que heredan de DomainError', { anchor: 'middle', size: 12 });

  return d;
}

// ═══════════════════════════════════════════════════════
// 17. Seguridad — Capas
// ═══════════════════════════════════════════════════════
function seguridadCapas() {
  const d = new DiagramEngine(700, 500);

  // Internet circle at top
  d.ellipse(275, 5, 150, 40, { fill: C.darkFill, stroke: C.darkStroke });
  d.text(350, 30, 'INTERNET', { size: 12, anchor: 'middle', weight: 'bold' });

  d.arrow(350, 45, 350, 65, { stroke: C.textDark });

  const layers = [
    { num: '1', label: 'Cloud Run TLS + DDoS', fill: C.redFill, stroke: C.redStroke },
    { num: '2', label: 'VPC + Private Egress', fill: C.redFill, stroke: C.redStroke },
    { num: '3', label: 'Rate Limiting (Redis)', fill: C.redFill, stroke: C.redStroke },
    { num: '4', label: 'Autenticacion (JWT + API Key)', fill: C.redFill, stroke: C.redStroke },
    { num: '5', label: 'Autorizacion (RBAC + Scopes)', fill: C.orangeFill, stroke: C.orangeStroke },
    { num: '6', label: 'Input Validation', fill: C.orangeFill, stroke: C.orangeStroke },
    { num: '7', label: 'Security Headers (Helmet)', fill: C.orangeFill, stroke: C.orangeStroke },
    { num: '8', label: 'Data Redaction (PII)', fill: C.yellowFill, stroke: C.yellowStroke },
  ];

  layers.forEach((l, i) => {
    const y = 65 + i * 45;
    d.numCircle(70, y + 20, l.num, { fill: l.fill, stroke: l.stroke });
    d.box(100, y, 500, 38, l.label, { fill: l.fill, stroke: l.stroke, fontSize: 13 });
    if (i < layers.length - 1) {
      d.arrow(350, y + 38, 350, y + 45, { stroke: C.textLight });
    }
  });

  // Application at bottom
  d.ellipse(275, 430, 150, 40, { fill: C.greenFill, stroke: C.greenStroke });
  d.text(350, 455, 'APLICACION', { size: 12, anchor: 'middle', weight: 'bold' });
  d.arrow(350, 423, 350, 430, { stroke: C.textDark });

  return d;
}

// ═══════════════════════════════════════════════════════
// 18. Pipeline CI/CD
// ═══════════════════════════════════════════════════════
function pipelineCi() {
  const d = new DiagramEngine(800, 430);

  // Stage 1: Detect
  d.box(300, 10, 200, 42, '1. Detect Changes', { fill: C.blueFill, stroke: C.blueStroke, fontSize: 13 });
  d.note(400, 42, 'Nx affected (solo lo que cambio)', { anchor: 'middle', size: 9 });
  d.arrow(400, 52, 400, 75, { stroke: C.textLight });

  // Stage 2: Quality Gates (parallel)
  d.region(10, 75, 780, 55, { stroke: C.greenStroke });
  d.note(20, 90, '2. Quality Gates (paralelo)', { size: 10, color: C.greenStroke });
  const gates = ['Lint (ESLint)', 'Tests (Vitest)', 'Typecheck (tsc)', 'Format (Prettier)', 'SAST (Semgrep)'];
  gates.forEach((g, i) => {
    d.box(20 + i * 155, 98, 145, 25, g, { fill: C.greenFill, stroke: C.greenStroke, fontSize: 10 });
  });
  d.arrow(400, 130, 400, 150, { stroke: C.textLight });

  // Stage 3: Build
  d.box(240, 150, 320, 42, '3. Build Docker Image', { fill: C.purpleFill, stroke: C.purpleStroke, fontSize: 13 });
  d.note(400, 182, 'Multi-stage + Push to Artifact Registry', { anchor: 'middle', size: 9 });
  d.arrow(400, 192, 400, 215, { stroke: C.textLight });

  // Stage 4: Security
  d.box(240, 215, 320, 42, '4. Security Scan', { fill: C.redFill, stroke: C.redStroke, fontSize: 13 });
  d.note(400, 247, 'Trivy (CVE) + Supply Chain (SHA pinning)', { anchor: 'middle', size: 9 });
  d.arrow(400, 257, 400, 280, { stroke: C.textLight });

  // Stage 5: Deploy Multi-Pais
  d.region(10, 280, 780, 65, { stroke: C.yellowStroke });
  d.note(20, 295, '5. Deploy Multi-Pais (matrix paralelo)', { size: 10, color: C.yellowStroke });
  d.box(100, 308, 190, 30, 'Chile (CL)', { fill: C.orangeFill, stroke: C.orangeStroke, fontSize: 12 });
  d.box(305, 308, 190, 30, 'Peru (PE)', { fill: C.orangeFill, stroke: C.orangeStroke, fontSize: 12 });
  d.box(510, 308, 190, 30, 'Espana (ES)', { fill: C.orangeFill, stroke: C.orangeStroke, fontSize: 12 });
  d.arrow(400, 345, 400, 370, { stroke: C.textLight });

  // Stage 6: Smoke Tests
  d.box(240, 370, 320, 42, '6. Smoke Tests + Notification', { fill: C.tealFill, stroke: C.tealStroke, fontSize: 13 });
  d.note(400, 402, '/health, /docs, response-time SLA', { anchor: 'middle', size: 9 });

  return d;
}

// ═══════════════════════════════════════════════════════
// 19. Observabilidad — 3 Pilares
// ═══════════════════════════════════════════════════════
function observabilidad() {
  const d = new DiagramEngine(800, 280);

  // Logging
  d.rect(20, 10, 240, 220, { fill: C.blueFill, stroke: C.blueStroke, strokeWidth: 2 });
  d.text(140, 38, 'Logging', { size: 16, anchor: 'middle', weight: 'bold', color: C.blueStroke });
  d.text(140, 60, 'Pino (structured JSON)', { size: 11, anchor: 'middle', color: C.textMuted });
  d.text(140, 82, 'Correlation ID por request', { size: 10, anchor: 'middle', color: C.textLight });
  d.text(140, 100, 'Data Redaction automatica', { size: 10, anchor: 'middle', color: C.textLight });
  d.text(140, 118, 'Niveles: log, warn, error', { size: 10, anchor: 'middle', color: C.textLight });
  d.text(140, 150, '-> Cloud Logging', { size: 10, anchor: 'middle', color: C.blueStroke });
  d.text(140, 170, '-> Sentry (errors)', { size: 10, anchor: 'middle', color: C.blueStroke });

  // Metrics
  d.rect(280, 10, 240, 220, { fill: C.greenFill, stroke: C.greenStroke, strokeWidth: 2 });
  d.text(400, 38, 'Metrics', { size: 16, anchor: 'middle', weight: 'bold', color: C.greenStroke });
  d.text(400, 60, 'OpenTelemetry SDK', { size: 11, anchor: 'middle', color: C.textMuted });
  d.text(400, 82, 'HTTP request duration', { size: 10, anchor: 'middle', color: C.textLight });
  d.text(400, 100, 'Error rates por modulo', { size: 10, anchor: 'middle', color: C.textLight });
  d.text(400, 118, 'Cache hit/miss ratios', { size: 10, anchor: 'middle', color: C.textLight });
  d.text(400, 150, '-> Grafana Cloud (OTLP)', { size: 10, anchor: 'middle', color: C.grafanaStroke });
  d.text(400, 170, '-> Grafana dashboards', { size: 10, anchor: 'middle', color: C.grafanaStroke });

  // Traces
  d.rect(540, 10, 240, 220, { fill: C.orangeFill, stroke: C.orangeStroke, strokeWidth: 2 });
  d.text(660, 38, 'Traces', { size: 16, anchor: 'middle', weight: 'bold', color: C.orangeStroke });
  d.text(660, 60, 'OpenTelemetry -> Grafana Tempo', { size: 11, anchor: 'middle', color: C.textMuted });
  d.text(660, 82, 'Distributed tracing', { size: 10, anchor: 'middle', color: C.textLight });
  d.text(660, 100, 'Span por operacion', { size: 10, anchor: 'middle', color: C.textLight });
  d.text(660, 118, 'Latency breakdown', { size: 10, anchor: 'middle', color: C.textLight });
  d.text(660, 150, '-> Grafana Cloud', { size: 10, anchor: 'middle', color: C.grafanaStroke });
  d.text(660, 170, '-> Error Budget (SLOs)', { size: 10, anchor: 'middle', color: C.orangeStroke });

  d.note(400, 260, 'SRE Practices: Error budgets, SLOs (99.9% uptime), alertas basadas en burn rate', { anchor: 'middle', size: 11 });

  return d;
}

// ═══════════════════════════════════════════════════════
// Generate All Diagrams
// ═══════════════════════════════════════════════════════
console.log('Generating detailed presentation diagrams (sketchnote style)...\n');

save('la-solucion', laSolucion());
save('capacidades-negocio', capacidadesNegocio());
save('vista-c4', vistaC4());
save('desacoplamiento', desacoplamiento());
save('acl-estado-actual', aclEstadoActual());
save('acl-migracion', aclMigracion());
save('gcp-org', gcpOrg());
save('deploy-multi-pais', deployMultiPais());
save('stack-infra', stackInfra());
save('cloud-run-scaling', cloudRunScaling());
save('arquitectura-pubsub', arquitecturaPubsub());
save('no-shared-state', noSharedState());
save('ecosistema', ecosistema());
save('5-capas', cincoCaps());
save('capas-relaciones', capasRelaciones());
save('error-jerarquia', errorJerarquia());
save('seguridad-capas', seguridadCapas());
save('pipeline-ci', pipelineCi());
save('observabilidad', observabilidad());

console.log(`\n✓ Done — ${19} diagrams generated`);
console.log(`  Output: ${OUT}/`);
console.log(`  Serve:  ${SERVE}/`);
