/**
 * Sync Stock — Flujo de sincronizacion de stock desde Dynamics AX
 *
 * Cloud Scheduler → Sync Worker → Dynamics AX SQL → Firestore
 */
import { DiagramEngine, C } from '../lib/diagram-engine.mjs';

export const name = 'sync-stock';
export const description = 'Flujo de sincronizacion de stock: Cloud Scheduler → Sync Worker → Dynamics AX → Firestore';
export const width = 850;
export const height = 300;

export function draw(d, C) {
  const y0 = 10;   // top of participant boxes
  const bh = 40;   // box height
  const bw = 120;  // box width
  const lifeBot = 280; // bottom of lifelines

  // Participant positions (center X = px + bw/2)
  const csX = 40;
  const swX = 250;
  const axX = 460;
  const fsX = 670;

  // ── Participant boxes ──
  d.box(csX, y0, bw, bh, 'Cloud Scheduler', { fill: C.greenFill, stroke: C.greenStroke, fontSize: 11 });
  d.box(swX, y0, bw, bh, 'Sync Worker', { fill: C.blueFill, stroke: C.blueStroke, fontSize: 11 });
  d.box(axX, y0, bw, bh, 'Dynamics AX', { fill: C.darkFill, stroke: C.darkStroke, fontSize: 11 });
  d.box(fsX, y0, bw, bh, 'Firestore', { fill: C.yellowFill, stroke: C.yellowStroke, fontSize: 11 });

  // ── Lifelines ──
  const csC = csX + bw / 2;
  const swC = swX + bw / 2;
  const axC = axX + bw / 2;
  const fsC = fsX + bw / 2;

  d.line(csC, y0 + bh, csC, lifeBot, { stroke: C.textLight, strokeWidth: 1 });
  d.line(swC, y0 + bh, swC, lifeBot, { stroke: C.textLight, strokeWidth: 1 });
  d.line(axC, y0 + bh, axC, lifeBot, { stroke: C.textLight, strokeWidth: 1 });
  d.line(fsC, y0 + bh, fsC, lifeBot, { stroke: C.textLight, strokeWidth: 1 });

  // ── Messages ──
  let y = 80;

  // 1. Trigger
  d.numCircle(csC - 20, y, 1, { fill: C.greenFill, stroke: C.greenStroke });
  d.arrow(csC, y, swC, y, { stroke: C.greenStroke });
  d.note((csC + swC) / 2, y - 8, 'Trigger (cada hora)', { anchor: 'middle', size: 10, color: C.greenStroke });

  // 2. SELECT delta
  y += 50;
  d.numCircle(swC - 20, y, 2, { fill: C.blueFill, stroke: C.blueStroke });
  d.arrow(swC, y, axC, y, { stroke: C.blueStroke });
  d.note((swC + axC) / 2, y - 8, 'SELECT WHERE updated > lastSync', { anchor: 'middle', size: 10, color: C.blueStroke });

  // 3. Rows (delta)
  y += 40;
  d.arrow(axC, y, swC, y, { stroke: C.darkStroke });
  d.note((swC + axC) / 2, y - 8, 'rows (delta)', { anchor: 'middle', size: 10, color: C.darkStroke });

  // 4. Upsert stock
  y += 50;
  d.numCircle(swC - 20, y, 3, { fill: C.blueFill, stroke: C.blueStroke });
  d.arrow(swC, y, fsC, y, { stroke: C.yellowStroke });
  d.note((swC + fsC) / 2, y - 8, 'upsert stock por sucursal', { anchor: 'middle', size: 10, color: C.yellowStroke });

  // 5. Actualizar lastSync
  y += 40;
  d.numCircle(swC - 20, y, 4, { fill: C.blueFill, stroke: C.blueStroke });
  d.arrow(swC, y, fsC, y, { stroke: C.yellowStroke });
  d.note((swC + fsC) / 2, y - 8, 'actualizar lastSync', { anchor: 'middle', size: 10, color: C.yellowStroke });
}
