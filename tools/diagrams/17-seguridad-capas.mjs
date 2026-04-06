/**
 * Seguridad — 8 capas de seguridad desde Internet hasta la aplicacion
 */
import { DiagramEngine, C } from '../lib/diagram-engine.mjs';

export const name = 'seguridad-capas';
export const description = '8 capas de seguridad desde Internet hasta la aplicacion';
export const width = 700;
export const height = 500;

export function draw(d, C) {
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
}
