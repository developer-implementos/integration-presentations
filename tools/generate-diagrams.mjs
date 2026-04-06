/**
 * Enterprise Architecture Diagram Generator — Sketchnote Style (Pure Diagrams)
 *
 * SVGs without titles, backgrounds, or annotations.
 * Those are handled by the slide markdown.
 *
 * Usage: node tools/generate-diagrams.mjs
 */
import { writeFileSync, mkdirSync } from 'fs';
import { DiagramEngine, C } from './lib/diagram-engine.mjs';

const OUT = 'assets/images/excalidraw';
mkdirSync(OUT, { recursive: true });

function save(name, engine) {
  const svg = engine.toSvg();
  writeFileSync(`${OUT}/${name}.svg`, svg);
  console.log(`  ✓ ${name}.svg (${(svg.length / 1024).toFixed(1)} KB)`);
}

// 1. El Problema
function elProblema() {
  const d = new DiagramEngine(580, 330);
  d.box(20, 10, 170, 45, 'API Catalog CL', { fill: C.redFill, stroke: C.redStroke });
  d.box(20, 70, 170, 45, 'API Orders CL', { fill: C.redFill, stroke: C.redStroke });
  d.box(20, 130, 170, 45, 'API Inventory CL', { fill: C.redFill, stroke: C.redStroke });
  d.box(20, 210, 170, 45, 'API Catalog PE', { fill: C.orangeFill, stroke: C.orangeStroke });
  d.box(20, 270, 170, 45, 'API Orders PE', { fill: C.orangeFill, stroke: C.orangeStroke });
  d.box(360, 55, 190, 65, 'Dynamics AX', { fill: C.redFill, stroke: C.redStroke, fontSize: 18 });
  d.box(360, 230, 190, 65, 'Custom ERP', { fill: C.orangeFill, stroke: C.orangeStroke, fontSize: 18 });
  d.arrow(190, 32, 360, 78); d.arrow(190, 92, 360, 87); d.arrow(190, 152, 360, 97);
  d.arrow(190, 232, 360, 255); d.arrow(190, 292, 360, 270);
  return d;
}

// 2. La Solución
function laSolucion() {
  const d = new DiagramEngine(620, 250);
  d.box(15, 10, 130, 42, 'Catalog', { fill: C.blueFill, stroke: C.blueStroke });
  d.box(160, 10, 130, 42, 'Orders', { fill: C.orangeFill, stroke: C.orangeStroke });
  d.box(305, 10, 130, 42, 'Inventory', { fill: C.greenFill, stroke: C.greenStroke });
  d.box(450, 10, 130, 42, 'Payment', { fill: C.redFill, stroke: C.redStroke });
  d.arrow(80, 52, 80, 75); d.arrow(225, 52, 225, 75);
  d.arrow(370, 52, 370, 75); d.arrow(515, 52, 515, 75);
  d.box(15, 75, 565, 48, 'Adapter Layer', { fill: C.yellowFill, stroke: C.yellowStroke, fontSize: 16 });
  d.arrow(108, 123, 108, 155); d.arrow(310, 123, 310, 155); d.arrow(512, 123, 512, 155);
  d.box(15, 155, 180, 50, 'Dynamics AX (CL)', { fill: C.redFill, stroke: C.redStroke });
  d.box(215, 155, 180, 50, 'Custom ERP (PE)', { fill: C.orangeFill, stroke: C.orangeStroke });
  d.box(415, 155, 180, 50, 'Gira (ES)', { fill: C.blueFill, stroke: C.blueStroke });
  return d;
}

// 3. GCP Org Structure
function gcpOrgStructure() {
  const d = new DiagramEngine(680, 360);
  d.region(10, 5, 650, 310, { stroke: C.darkStroke });
  d.note(20, 22, 'Organization: Implementos', { size: 13, color: C.textDark });
  d.region(25, 35, 390, 270, { stroke: C.yellowStroke });
  d.note(35, 52, 'Folder: Implementos Core', { size: 12, color: C.textDark });
  // Chile
  d.rect(40, 60, 175, 72, { fill: C.bg, stroke: C.darkStroke });
  d.note(127, 75, 'Chile', { size: 12, anchor: 'middle', color: C.textDark });
  d.box(50, 83, 72, 35, 'QA', { fill: C.yellowFill, stroke: C.yellowStroke, fontSize: 11 });
  d.box(132, 83, 72, 35, 'Prod', { fill: C.greenFill, stroke: C.greenStroke, fontSize: 11 });
  // Peru
  d.rect(40, 145, 175, 72, { fill: C.bg, stroke: C.darkStroke });
  d.note(127, 160, 'Peru', { size: 12, anchor: 'middle', color: C.textDark });
  d.box(50, 168, 72, 35, 'QA', { fill: C.yellowFill, stroke: C.yellowStroke, fontSize: 11 });
  d.box(132, 168, 72, 35, 'Prod', { fill: C.greenFill, stroke: C.greenStroke, fontSize: 11 });
  // Spain
  d.rect(40, 230, 175, 72, { fill: C.bg, stroke: C.darkStroke });
  d.note(127, 245, 'España', { size: 12, anchor: 'middle', color: C.textDark });
  d.box(50, 253, 72, 35, 'QA', { fill: C.yellowFill, stroke: C.yellowStroke, fontSize: 11 });
  d.box(132, 253, 72, 35, 'Prod', { fill: C.greenFill, stroke: C.greenStroke, fontSize: 11 });
  // Management
  d.box(450, 130, 180, 50, 'Management', { fill: C.blueFill, stroke: C.blueStroke, fontSize: 15 });
  d.box(450, 210, 85, 38, 'GAR', { fill: C.purpleFill, stroke: C.purpleStroke, fontSize: 11 });
  d.box(545, 210, 85, 38, 'TF State', { fill: C.purpleFill, stroke: C.purpleStroke, fontSize: 11 });
  d.box(495, 260, 85, 38, 'Svc Accts', { fill: C.purpleFill, stroke: C.purpleStroke, fontSize: 11 });
  d.arrow(500, 180, 500, 210, { stroke: C.blueStroke });
  d.arrow(540, 180, 585, 210, { stroke: C.blueStroke });
  d.arrow(540, 180, 537, 260, { stroke: C.blueStroke });
  d.note(340, 340, 'Amarillo = QA · Verde = Prod · Azul = Management', { size: 10, anchor: 'middle' });
  return d;
}

// 4. Deploy Multi-País
function deployMultiPais() {
  const d = new DiagramEngine(680, 310);
  d.rect(210, 10, 260, 70, { fill: C.darkFill, stroke: C.darkStroke });
  d.note(340, 30, 'GitHub Actions', { size: 13, anchor: 'middle', color: C.textDark });
  d.box(250, 40, 75, 30, 'CI', { fill: C.purpleFill, stroke: C.purpleStroke, fontSize: 11 });
  d.box(345, 40, 100, 30, 'Deploy', { fill: C.purpleFill, stroke: C.purpleStroke, fontSize: 11 });
  d.arrow(325, 55, 345, 55, { stroke: C.purpleStroke });
  d.arrow(340, 80, 110, 140, { stroke: C.blueStroke });
  d.arrow(340, 80, 340, 140, { stroke: C.blueStroke });
  d.arrow(340, 80, 570, 140, { stroke: C.blueStroke });
  // Chile
  d.rect(20, 140, 175, 80, { fill: C.bg, stroke: C.darkStroke });
  d.note(107, 158, 'Chile', { size: 12, anchor: 'middle', color: C.textDark });
  d.box(30, 168, 72, 38, 'QA', { fill: C.yellowFill, stroke: C.yellowStroke, fontSize: 11 });
  d.box(112, 168, 72, 38, 'PROD', { fill: C.greenFill, stroke: C.greenStroke, fontSize: 11 });
  // Peru
  d.rect(250, 140, 175, 80, { fill: C.bg, stroke: C.darkStroke });
  d.note(337, 158, 'Peru', { size: 12, anchor: 'middle', color: C.textDark });
  d.box(260, 168, 72, 38, 'QA', { fill: C.yellowFill, stroke: C.yellowStroke, fontSize: 11 });
  d.box(342, 168, 72, 38, 'PROD', { fill: C.greenFill, stroke: C.greenStroke, fontSize: 11 });
  // Spain
  d.rect(480, 140, 175, 80, { fill: C.bg, stroke: C.darkStroke });
  d.note(567, 158, 'España', { size: 12, anchor: 'middle', color: C.textDark });
  d.box(490, 168, 72, 38, 'QA', { fill: C.yellowFill, stroke: C.yellowStroke, fontSize: 11 });
  d.box(572, 168, 72, 38, 'PROD', { fill: C.greenFill, stroke: C.greenStroke, fontSize: 11 });
  d.note(340, 260, 'workflow_dispatch — deploy manual por país', { size: 11, anchor: 'middle' });
  return d;
}

// 5. Desacoplamiento SIN
function desacoplamientoSin() {
  const d = new DiagramEngine(520, 180);
  d.box(10, 10, 140, 40, 'Caja POS', { fill: C.blueFill, stroke: C.blueStroke });
  d.box(10, 60, 140, 40, 'VTEX IO', { fill: C.blueFill, stroke: C.blueStroke });
  d.box(10, 110, 140, 40, 'Omnichannel', { fill: C.blueFill, stroke: C.blueStroke });
  d.box(310, 45, 185, 60, 'Dynamics AX', { fill: C.redFill, stroke: C.redStroke, fontSize: 16 });
  d.arrow(150, 30, 310, 68, { stroke: C.redStroke });
  d.arrow(150, 80, 310, 75, { stroke: C.redStroke });
  d.arrow(150, 130, 310, 85, { stroke: C.redStroke });
  return d;
}

// 6. Desacoplamiento CON
function desacoplamientoCon() {
  const d = new DiagramEngine(620, 180);
  d.box(10, 10, 120, 40, 'Caja POS', { fill: C.blueFill, stroke: C.blueStroke });
  d.box(10, 60, 120, 40, 'VTEX IO', { fill: C.blueFill, stroke: C.blueStroke });
  d.box(10, 110, 120, 40, 'Omnichannel', { fill: C.blueFill, stroke: C.blueStroke });
  d.rect(180, 20, 210, 100, { fill: C.yellowFill, stroke: C.yellowStroke, strokeWidth: 3 });
  d.text(285, 62, 'Integration', { color: C.textDark, size: 15, anchor: 'middle', weight: 'bold' });
  d.text(285, 80, 'Platform', { color: C.textDark, size: 15, anchor: 'middle', weight: 'bold' });
  d.box(440, 20, 145, 42, 'Adapter', { fill: C.yellowFill, stroke: C.yellowStroke });
  d.box(440, 80, 145, 48, 'Dynamics AX', { fill: C.redFill, stroke: C.redStroke });
  d.arrow(130, 30, 180, 58, { stroke: C.blueStroke });
  d.arrow(130, 80, 180, 70, { stroke: C.blueStroke });
  d.arrow(130, 130, 180, 85, { stroke: C.blueStroke });
  d.arrow(390, 70, 440, 41); d.arrow(512, 62, 512, 80);
  return d;
}

// 7. No Shared State
function noSharedState() {
  const d = new DiagramEngine(600, 200);
  d.box(15, 10, 155, 50, 'Inventory', { fill: C.greenFill, stroke: C.greenStroke, fontSize: 15 });
  d.box(215, 10, 155, 50, 'Orders', { fill: C.orangeFill, stroke: C.orangeStroke, fontSize: 15 });
  d.box(415, 10, 155, 50, 'Payment', { fill: C.redFill, stroke: C.redStroke, fontSize: 15 });
  d.ellipse(200, 110, 200, 65, { fill: C.gcpYellowFill, stroke: C.gcpYellow, strokeWidth: 3 });
  d.text(300, 148, 'Firestore', { color: C.textDark, size: 18, anchor: 'middle', weight: 'bold' });
  d.arrow(92, 60, 250, 115, { stroke: C.greenStroke });
  d.arrow(292, 60, 300, 110, { stroke: C.orangeStroke });
  d.arrow(492, 60, 350, 115, { stroke: C.redStroke });
  return d;
}

// 8. Ecosistema de Integraciones
function ecosistemaIntegraciones() {
  const d = new DiagramEngine(740, 390);
  d.rect(250, 135, 240, 75, { fill: C.yellowFill, stroke: C.yellowStroke, strokeWidth: 3 });
  d.text(370, 168, 'Integration Platform', { size: 15, anchor: 'middle', weight: 'bold' });
  d.note(370, 192, 'Integration API + Workers', { anchor: 'middle', size: 10 });

  d.box(25, 10, 155, 45, 'VTEX Marketplace', { fill: C.purpleFill, stroke: C.purpleStroke, fontSize: 12 });
  d.arrow(140, 55, 300, 135, { stroke: C.purpleStroke });
  d.box(270, 10, 135, 45, 'Algolia', { fill: C.algoliaFill, stroke: C.algoliaStroke });
  d.arrow(337, 55, 370, 135, { stroke: C.algoliaStroke });
  d.box(500, 10, 165, 45, 'Salesforce MC', { fill: C.cyanFill, stroke: C.cyanStroke, fontSize: 12 });
  d.arrow(545, 55, 440, 135, { stroke: C.cyanStroke });

  d.box(5, 100, 120, 25, 'Webpay', { fill: C.redFill, stroke: C.redStroke, fontSize: 10 });
  d.box(5, 129, 120, 25, 'Khipu', { fill: C.redFill, stroke: C.redStroke, fontSize: 10 });
  d.box(5, 158, 120, 25, 'MercadoPago', { fill: C.redFill, stroke: C.redStroke, fontSize: 10 });
  d.box(5, 187, 120, 25, 'Niubiz', { fill: C.redFill, stroke: C.redStroke, fontSize: 10 });
  d.note(65, 225, 'Payment Gateways', { color: C.redStroke, size: 9, anchor: 'middle' });
  d.arrow(125, 160, 250, 172, { stroke: C.redStroke });

  d.box(595, 120, 135, 25, 'Dynamics AX', { fill: C.orangeFill, stroke: C.orangeStroke, fontSize: 10 });
  d.box(595, 149, 135, 25, 'Custom ERP', { fill: C.orangeFill, stroke: C.orangeStroke, fontSize: 10 });
  d.box(595, 178, 135, 25, 'Gira (ES)', { fill: C.orangeFill, stroke: C.orangeStroke, fontSize: 10 });
  d.note(662, 218, 'ERPs', { color: C.orangeStroke, size: 9, anchor: 'middle' });
  d.arrow(490, 172, 595, 162, { stroke: C.orangeStroke });

  d.box(55, 280, 155, 45, 'Cloud Pub/Sub', { fill: C.greenFill, stroke: C.greenStroke, fontSize: 12 });
  d.arrow(175, 280, 320, 210, { stroke: C.greenStroke });
  d.box(275, 270, 190, 45, 'Databases', { fill: C.gcpYellowFill, stroke: C.gcpYellow, fontSize: 12 });
  d.note(370, 302, 'Firestore + Redis', { size: 9, anchor: 'middle' });
  d.arrow(370, 270, 370, 210, { stroke: C.gcpYellow });
  d.box(535, 265, 125, 25, 'Twilio', { fill: C.tealFill, stroke: C.tealStroke, fontSize: 10 });
  d.box(535, 294, 125, 25, 'WhatsApp', { fill: C.tealFill, stroke: C.tealStroke, fontSize: 10 });
  d.box(535, 323, 125, 25, 'Email', { fill: C.tealFill, stroke: C.tealStroke, fontSize: 10 });
  d.note(597, 362, 'Canales', { color: C.tealStroke, size: 9, anchor: 'middle' });
  d.arrow(535, 295, 440, 210, { stroke: C.tealStroke });
  return d;
}

// 9. Arquitectura Cloud Run
function arquitecturaCloudRun() {
  const d = new DiagramEngine(630, 330);
  d.box(240, 5, 150, 38, 'Users / Clients', { fill: C.darkFill, stroke: C.darkStroke, fontSize: 12 });
  d.arrow(315, 43, 315, 65);
  d.box(190, 65, 250, 48, 'integration-api', { fill: C.greenFill, stroke: C.greenStroke, fontSize: 14 });
  d.note(450, 88, '0-100 inst', { size: 10 });
  d.arrow(315, 113, 315, 145);
  d.box(225, 145, 175, 38, 'Cloud Pub/Sub', { fill: C.greenFill, stroke: C.greenStroke, fontSize: 12 });
  d.arrow(255, 183, 95, 215); d.arrow(315, 183, 315, 215); d.arrow(375, 183, 520, 215);
  d.box(15, 215, 165, 42, 'notif-worker', { fill: C.blueFill, stroke: C.blueStroke, fontSize: 11 });
  d.box(230, 215, 165, 42, 'report-worker', { fill: C.blueFill, stroke: C.blueStroke, fontSize: 11 });
  d.box(445, 215, 165, 42, 'sync-worker', { fill: C.blueFill, stroke: C.blueStroke, fontSize: 11 });
  d.note(97, 268, '0-10', { size: 9, anchor: 'middle' });
  d.note(312, 268, '0-5', { size: 9, anchor: 'middle' });
  d.note(527, 268, '0-3', { size: 9, anchor: 'middle' });
  // Managed
  d.ellipse(500, 60, 110, 42, { fill: C.gcpYellowFill, stroke: C.gcpYellow });
  d.text(555, 86, 'Firestore', { color: C.textDark, size: 11, anchor: 'middle' });
  d.ellipse(500, 115, 110, 42, { fill: C.orangeFill, stroke: C.orangeStroke });
  d.text(555, 141, 'Redis', { color: C.textDark, size: 11, anchor: 'middle' });
  d.arrow(440, 85, 500, 78, { stroke: C.gcpYellow });
  d.arrow(440, 98, 500, 130, { stroke: C.orangeStroke });
  return d;
}

// ═══════════════════════════════════════════════════════
console.log('Generating pure diagrams (no titles, no bg)...\n');
save('01-el-problema', elProblema());
save('02-la-solucion', laSolucion());
save('03-gcp-org-structure', gcpOrgStructure());
save('04-deploy-multi-pais', deployMultiPais());
save('05-desacoplamiento-sin', desacoplamientoSin());
save('06-desacoplamiento-con', desacoplamientoCon());
save('07-no-shared-state', noSharedState());
save('08-ecosistema-integraciones', ecosistemaIntegraciones());
save('09-arquitectura-cloud-run', arquitecturaCloudRun());
console.log('\n✓ Done');
