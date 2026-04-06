/**
 * La Solucion — Composable Platform
 */
import { DiagramEngine, C } from '../lib/diagram-engine.mjs';

export const name = 'la-solucion';
export const description = 'Composable platform overview with ERP, Integration Platform, and market solutions';
export const width = 900;
export const height = 380;

export function draw(d, C) {
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
  d.box(510, 240, 90, 38, 'España', { fill: C.blueFill, stroke: C.blueStroke, fontSize: 13 });

  d.arrow(430, 200, 345, 240, { stroke: C.yellowStroke });
  d.arrow(430, 200, 450, 240, { stroke: C.yellowStroke });
  d.arrow(430, 200, 555, 240, { stroke: C.yellowStroke });

  d.note(450, 320, 'El ERP alimenta la plataforma via ACL — la plataforma no depende del ERP', { anchor: 'middle', size: 11 });
}
