/**
 * Observabilidad — Los 3 pilares: Logging, Metrics, Traces
 */
import { DiagramEngine, C } from '../lib/diagram-engine.mjs';

export const name = 'observabilidad';
export const description = 'Los 3 pilares de observabilidad: Logging, Metrics y Traces';
export const width = 800;
export const height = 280;

export function draw(d, C) {
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
}
