/**
 * Capacidades de Negocio — Business capabilities map
 */
import { DiagramEngine, C } from '../lib/diagram-engine.mjs';

export const name = 'capacidades-negocio';
export const description = 'Business capabilities map with core systems and operational layers';
export const width = 1000;
export const height = 520;

export function draw(d, C) {
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
}
