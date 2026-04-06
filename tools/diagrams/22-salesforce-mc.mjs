/**
 * Salesforce Marketing Cloud — Flujo de notificacion via Pub/Sub
 *
 * Integration API → Cloud Pub/Sub → Notification Worker → Salesforce MC
 */
import { DiagramEngine, C } from '../lib/diagram-engine.mjs';

export const name = 'salesforce-mc';
export const description = 'Flujo de notificacion: Integration API → Pub/Sub → Notification Worker → Salesforce MC';
export const width = 850;
export const height = 320;

export function draw(d, C) {
  const y0 = 10;
  const bh = 40;
  const bw = 120;
  const lifeBot = 290;

  // Participant positions
  const apiX = 30;
  const psX = 230;
  const nwX = 430;
  const sfX = 650;

  // ── Participant boxes ──
  d.box(apiX, y0, bw, bh, 'Integration API', { fill: C.blueFill, stroke: C.blueStroke, fontSize: 11 });
  d.box(psX, y0, bw, bh, 'Cloud Pub/Sub', { fill: C.greenFill, stroke: C.greenStroke, fontSize: 11 });
  d.box(nwX, y0, bw, bh, 'Notif Worker', { fill: C.orangeFill, stroke: C.orangeStroke, fontSize: 11 });
  d.box(sfX, y0, 140, bh, 'Salesforce MC', { fill: C.cyanFill, stroke: C.cyanStroke, fontSize: 11 });

  // ── Lifelines ──
  const apiC = apiX + bw / 2;
  const psC = psX + bw / 2;
  const nwC = nwX + bw / 2;
  const sfC = sfX + 70; // wider box

  d.line(apiC, y0 + bh, apiC, lifeBot, { stroke: C.textLight, strokeWidth: 1 });
  d.line(psC, y0 + bh, psC, lifeBot, { stroke: C.textLight, strokeWidth: 1 });
  d.line(nwC, y0 + bh, nwC, lifeBot, { stroke: C.textLight, strokeWidth: 1 });
  d.line(sfC, y0 + bh, sfC, lifeBot, { stroke: C.textLight, strokeWidth: 1 });

  // ── Messages ──
  let y = 85;

  // 1. Publish event
  d.numCircle(apiC - 18, y, 1, { fill: C.blueFill, stroke: C.blueStroke });
  d.arrow(apiC, y, psC, y, { stroke: C.blueStroke });
  d.note((apiC + psC) / 2, y - 8, 'Publish OrderConfirmedEvent', { anchor: 'middle', size: 10, color: C.blueStroke });

  // 2. Push delivery
  y += 50;
  d.numCircle(psC - 18, y, 2, { fill: C.greenFill, stroke: C.greenStroke });
  d.arrow(psC, y, nwC, y, { stroke: C.greenStroke });
  d.note((psC + nwC) / 2, y - 8, 'Push delivery (HTTP)', { anchor: 'middle', size: 10, color: C.greenStroke });

  // 3. OAuth2 token request
  y += 45;
  d.numCircle(nwC - 18, y, 3, { fill: C.orangeFill, stroke: C.orangeStroke });
  d.arrow(nwC, y, sfC, y, { stroke: C.orangeStroke });
  d.note((nwC + sfC) / 2, y - 8, 'OAuth2 token request', { anchor: 'middle', size: 10, color: C.orangeStroke });

  // 3b. access_token response
  y += 35;
  d.arrow(sfC, y, nwC, y, { stroke: C.cyanStroke });
  d.note((nwC + sfC) / 2, y - 8, 'access_token', { anchor: 'middle', size: 10, color: C.cyanStroke });

  // 4. Fire Journey
  y += 45;
  d.numCircle(nwC - 18, y, 4, { fill: C.orangeFill, stroke: C.orangeStroke });
  d.arrow(nwC, y, sfC, y, { stroke: C.orangeStroke });
  d.note((nwC + sfC) / 2, y - 8, 'Fire Journey', { anchor: 'middle', size: 10, color: C.orangeStroke });

  // ── Note on the right ──
  d.rect(sfX + 5, lifeBot - 30, 185, 40, { fill: C.cyanFill, stroke: C.cyanStroke, strokeWidth: 1.5 });
  d.note(sfX + 97, lifeBot - 14, 'SFMC decide canal:', { anchor: 'middle', size: 10, color: C.cyanStroke });
  d.note(sfX + 97, lifeBot, 'Email - SMS - WhatsApp - Push', { anchor: 'middle', size: 9, color: C.textMuted });
}
