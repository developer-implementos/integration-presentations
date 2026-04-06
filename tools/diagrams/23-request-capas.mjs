/**
 * Request a traves de Capas — Flujo completo de un request por clean architecture
 *
 * Client → Controller → Facade → Service → Entity → Repository → MongoDB
 */
import { DiagramEngine, C } from '../lib/diagram-engine.mjs';

export const name = 'request-capas';
export const description = 'Flujo de un request POST /v1/stock/reserve a traves de las capas de clean architecture';
export const width = 900;
export const height = 400;

export function draw(d, C) {
  const y0 = 10;
  const bh = 36;
  const lifeBot = 385;

  // Participant positions and widths
  const parts = [
    { x: 5,   w: 80,  label: 'Client',     fill: C.darkFill,   stroke: C.darkStroke },
    { x: 110, w: 100, label: 'Controller',  fill: C.blueFill,   stroke: C.blueStroke },
    { x: 235, w: 90,  label: 'Facade',      fill: C.greenFill,  stroke: C.greenStroke },
    { x: 350, w: 90,  label: 'Service',     fill: C.greenFill,  stroke: C.greenStroke },
    { x: 465, w: 90,  label: 'Entity',      fill: C.purpleFill, stroke: C.purpleStroke },
    { x: 580, w: 100, label: 'Repository',  fill: C.orangeFill, stroke: C.orangeStroke },
    { x: 710, w: 90,  label: 'MongoDB',     fill: C.yellowFill, stroke: C.yellowStroke },
  ];

  // ── Draw participants and lifelines ──
  const cx = [];
  for (const p of parts) {
    d.box(p.x, y0, p.w, bh, p.label, { fill: p.fill, stroke: p.stroke, fontSize: 10 });
    const c = p.x + p.w / 2;
    cx.push(c);
    d.line(c, y0 + bh, c, lifeBot, { stroke: C.textLight, strokeWidth: 1 });
  }

  // Indices: 0=Client, 1=Controller, 2=Facade, 3=Service, 4=Entity, 5=Repository, 6=MongoDB
  let y = 65;
  const step = 28;

  // 1. POST /v1/stock/reserve
  d.arrow(cx[0], y, cx[1], y, { stroke: C.darkStroke });
  d.note((cx[0] + cx[1]) / 2, y - 7, 'POST /v1/stock/reserve', { anchor: 'middle', size: 9, color: C.darkStroke });

  // 2. Validar DTO
  y += step;
  d.arrow(cx[1], y, cx[2], y, { stroke: C.blueStroke });
  d.note((cx[1] + cx[2]) / 2, y - 7, 'reserveStock(dto)', { anchor: 'middle', size: 9, color: C.blueStroke });

  // 3. execute(command)
  y += step;
  d.arrow(cx[2], y, cx[3], y, { stroke: C.greenStroke });
  d.note((cx[2] + cx[3]) / 2, y - 7, 'execute(command)', { anchor: 'middle', size: 9, color: C.greenStroke });

  // 4. findBySku(sku)
  y += step;
  d.arrow(cx[3], y, cx[5], y, { stroke: C.greenStroke });
  d.note((cx[3] + cx[5]) / 2, y - 7, 'findBySku(sku)', { anchor: 'middle', size: 9, color: C.greenStroke });

  // 5. findOne → DB
  y += step;
  d.arrow(cx[5], y, cx[6], y, { stroke: C.orangeStroke });
  d.note((cx[5] + cx[6]) / 2, y - 7, 'findOne()', { anchor: 'middle', size: 9, color: C.orangeStroke });

  // 6. document ←
  y += step;
  d.arrow(cx[6], y, cx[5], y, { stroke: C.yellowStroke });
  d.note((cx[5] + cx[6]) / 2, y - 7, 'document', { anchor: 'middle', size: 9, color: C.yellowStroke });

  // 7. Stock entity ←
  y += step;
  d.arrow(cx[5], y, cx[3], y, { stroke: C.orangeStroke });
  d.note((cx[3] + cx[5]) / 2, y - 7, 'Stock entity', { anchor: 'middle', size: 9, color: C.orangeStroke });

  // 8. stock.reserve(qty) → Entity
  y += step;
  d.arrow(cx[3], y, cx[4], y, { stroke: C.purpleStroke });
  d.note((cx[3] + cx[4]) / 2, y - 7, 'stock.reserve(qty)', { anchor: 'middle', size: 9, color: C.purpleStroke });

  // 9. Validar reglas / OK ←
  y += step;
  d.arrow(cx[4], y, cx[3], y, { stroke: C.purpleStroke });
  d.note((cx[3] + cx[4]) / 2, y - 7, 'OK / Error', { anchor: 'middle', size: 9, color: C.purpleStroke });

  // 10. save(stock) → Repo
  y += step;
  d.arrow(cx[3], y, cx[5], y, { stroke: C.greenStroke });
  d.note((cx[3] + cx[5]) / 2, y - 7, 'save(stock)', { anchor: 'middle', size: 9, color: C.greenStroke });

  // 11. updateOne → DB
  y += step;
  d.arrow(cx[5], y, cx[6], y, { stroke: C.orangeStroke });
  d.note((cx[5] + cx[6]) / 2, y - 7, 'updateOne()', { anchor: 'middle', size: 9, color: C.orangeStroke });

  // 12. void ←
  y += step;
  d.arrow(cx[6], y, cx[1], y, { stroke: C.yellowStroke });
  d.note((cx[3] + cx[6]) / 2, y - 7, 'void', { anchor: 'middle', size: 9, color: C.yellowStroke });

  // 13. 200 OK ← Client
  y += step;
  d.arrow(cx[1], y, cx[0], y, { stroke: C.blueStroke });
  d.note((cx[0] + cx[1]) / 2, y - 7, '200 OK', { anchor: 'middle', size: 9, color: C.blueStroke });
}
