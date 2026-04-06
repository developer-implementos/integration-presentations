/**
 * Error Jerarquia — Arbol de errores tipados por modulo
 */
import { DiagramEngine, C } from '../lib/diagram-engine.mjs';

export const name = 'error-jerarquia';
export const description = 'Jerarquia de errores de dominio tipados por modulo';
export const width = 800;
export const height = 350;

export function draw(d, C) {
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
}
