/**
 * Circuit Breaker — Diagrama de estados (Cockatiel)
 *
 * CLOSED (normal) → OPEN (fail-fast) → HALF_OPEN (probe) → CLOSED / OPEN
 */
import { DiagramEngine, C } from '../lib/diagram-engine.mjs';

export const name = 'circuit-breaker';
export const description = 'Diagrama de estados del Circuit Breaker: CLOSED, OPEN, HALF_OPEN';
export const width = 800;
export const height = 300;

export function draw(d, C) {
  const bw = 160;
  const bh = 50;
  const yBox = 60;

  // ── State boxes ──
  const closedX = 40;
  const openX = 320;
  const halfX = 600;

  // CLOSED
  d.box(closedX, yBox, bw, bh, 'CLOSED', { fill: C.greenFill, stroke: C.greenStroke, fontSize: 14 });
  d.note(closedX + bw / 2, yBox + bh + 18, 'Trafico normal', { anchor: 'middle', size: 11, color: C.greenStroke });
  d.note(closedX + bw / 2, yBox + bh + 34, 'Contando errores', { anchor: 'middle', size: 10, color: C.textMuted });

  // OPEN
  d.box(openX, yBox, bw, bh, 'OPEN', { fill: C.redFill, stroke: C.redStroke, fontSize: 14 });
  d.note(openX + bw / 2, yBox + bh + 18, 'Fail-fast inmediato', { anchor: 'middle', size: 11, color: C.redStroke });
  d.note(openX + bw / 2, yBox + bh + 34, 'No llegan requests al servicio', { anchor: 'middle', size: 10, color: C.textMuted });

  // HALF_OPEN
  d.box(halfX, yBox, bw, bh, 'HALF_OPEN', { fill: C.yellowFill, stroke: C.yellowStroke, fontSize: 14 });
  d.note(halfX + bw / 2, yBox + bh + 18, 'Probe: 1 request de prueba', { anchor: 'middle', size: 11, color: C.yellowStroke });
  d.note(halfX + bw / 2, yBox + bh + 34, 'Decide si cerrar o reabrir', { anchor: 'middle', size: 10, color: C.textMuted });

  // ── Transitions ──

  // CLOSED → OPEN (top arrow)
  const arrowY1 = yBox + 10;
  d.arrow(closedX + bw, arrowY1, openX, arrowY1, { stroke: C.redStroke });
  d.note((closedX + bw + openX) / 2, arrowY1 - 10, '5 errores consecutivos', { anchor: 'middle', size: 10, color: C.redStroke });

  // OPEN → HALF_OPEN (top arrow)
  d.arrow(openX + bw, arrowY1, halfX, arrowY1, { stroke: C.yellowStroke });
  d.note((openX + bw + halfX) / 2, arrowY1 - 10, 'Timeout 30s', { anchor: 'middle', size: 10, color: C.yellowStroke });

  // HALF_OPEN → CLOSED (bottom curved — use two-segment path via bottom)
  const returnY = 200;
  // Draw as bottom path: HALF_OPEN down, across, up to CLOSED
  d.line(halfX + bw / 2, yBox + bh, halfX + bw / 2, returnY, { stroke: C.greenStroke, strokeWidth: 1.5 });
  d.line(halfX + bw / 2, returnY, closedX + bw / 2, returnY, { stroke: C.greenStroke, strokeWidth: 1.5 });
  d.arrow(closedX + bw / 2, returnY, closedX + bw / 2, yBox + bh, { stroke: C.greenStroke, strokeWidth: 1.5 });
  d.note((closedX + halfX + bw) / 2, returnY - 8, 'Probe OK → cerrar circuito', { anchor: 'middle', size: 10, color: C.greenStroke });

  // HALF_OPEN → OPEN (bottom return)
  const failY = 250;
  d.line(halfX + bw / 2 + 20, yBox + bh, halfX + bw / 2 + 20, failY, { stroke: C.redStroke, strokeWidth: 1.5 });
  d.line(halfX + bw / 2 + 20, failY, openX + bw / 2, failY, { stroke: C.redStroke, strokeWidth: 1.5 });
  d.arrow(openX + bw / 2, failY, openX + bw / 2, yBox + bh, { stroke: C.redStroke, strokeWidth: 1.5 });
  d.note((openX + halfX + bw) / 2 + 10, failY - 8, 'Probe falla → reabrir', { anchor: 'middle', size: 10, color: C.redStroke });

  // ── Title ──
  d.title(400, 30, 'Circuit Breaker — Estados', { size: 18 });
}
