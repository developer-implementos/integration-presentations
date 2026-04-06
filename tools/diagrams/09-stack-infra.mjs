/**
 * Stack de Infraestructura GCP
 */
import { DiagramEngine, C } from '../lib/diagram-engine.mjs';

export const name = 'stack-infra';
export const description = 'GCP infrastructure stack with networking, compute, data, messaging, observability, and security layers';
export const width = 800;
export const height = 420;

export function draw(d, C) {
  // GCP outer border
  d.region(10, 5, 780, 405, { stroke: C.gcpBlue });
  d.text(400, 28, 'Google Cloud Platform', { size: 15, anchor: 'middle', weight: 'bold', color: C.gcpBlue });

  const leftLabel = 55;
  const leftBox = 170;
  const boxW = 130;
  const boxGap = 10;

  // Row 1: Networking
  d.rect(30, 45, 740, 55, { fill: C.redFill, stroke: C.redStroke, strokeWidth: 1.5 });
  d.text(leftLabel, 77, 'NETWORKING', { size: 10, weight: 'bold', color: C.redStroke });
  const netItems = ['Cloud Run TLS', 'VPC + Direct Egress', 'VPC Peering', 'IAM + SA'];
  netItems.forEach((item, i) => {
    d.box(leftBox + i * (boxW + boxGap), 55, boxW, 35, item, { fill: C.redFill, stroke: C.redStroke, fontSize: 10 });
  });

  // Row 2: Compute
  d.rect(30, 110, 740, 65, { fill: C.blueFill, stroke: C.blueStroke, strokeWidth: 1.5 });
  d.text(leftLabel, 147, 'COMPUTE', { size: 10, weight: 'bold', color: C.blueStroke });
  const compItems = [
    { name: 'Cloud Run', sub: 'API + Workers' },
    { name: 'Cloud Scheduler', sub: 'Cron Jobs' },
    { name: 'Cloud Tasks', sub: 'Async Processing' },
    { name: 'Artifact Registry', sub: 'Docker Images' },
  ];
  compItems.forEach((item, i) => {
    d.boxSub(leftBox + i * (boxW + boxGap), 120, boxW, 48, item.name, item.sub, { fill: C.blueFill, stroke: C.blueStroke, fontSize: 11 });
  });

  // Row 3: Data
  d.rect(30, 185, 740, 60, { fill: C.gcpYellowFill, stroke: C.gcpYellow, strokeWidth: 1.5 });
  d.text(leftLabel, 220, 'DATA', { size: 10, weight: 'bold', color: C.gcpYellow });
  const dataItems = [
    { name: 'Firestore', sub: 'MongoDB API' },
    { name: 'Memorystore', sub: 'Redis Cache' },
    { name: 'Secret Manager', sub: 'Credenciales' },
    { name: 'Cloud Storage', sub: 'Archivos' },
  ];
  dataItems.forEach((item, i) => {
    d.boxSub(leftBox + i * (boxW + boxGap), 195, boxW, 42, item.name, item.sub, { fill: C.gcpYellowFill, stroke: C.gcpYellow, fontSize: 10 });
  });

  // Row 4a: Messaging
  d.rect(30, 255, 380, 55, { fill: C.greenFill, stroke: C.greenStroke, strokeWidth: 1.5 });
  d.text(leftLabel, 287, 'MESSAGING', { size: 10, weight: 'bold', color: C.greenStroke });
  d.box(leftBox, 265, boxW, 35, 'Cloud Pub/Sub', { fill: C.greenFill, stroke: C.greenStroke, fontSize: 10 });
  d.box(leftBox + boxW + boxGap, 265, boxW, 35, 'Dead Letter Queue', { fill: C.greenFill, stroke: C.greenStroke, fontSize: 10 });

  // Row 4b: Observability
  d.rect(420, 255, 350, 55, { fill: C.grafanaFill, stroke: C.grafanaStroke, strokeWidth: 1.5 });
  d.text(445, 287, 'OBSERVABILITY', { size: 10, weight: 'bold', color: C.grafanaStroke });
  d.box(540, 265, boxW, 35, 'Grafana Cloud', { fill: C.grafanaFill, stroke: C.grafanaStroke, fontSize: 10 });
  d.box(540 + boxW + boxGap, 265, boxW, 35, 'Cloud Logging', { fill: C.darkFill, stroke: C.darkStroke, fontSize: 10 });

  // Row 5: Security
  d.rect(30, 320, 740, 45, { fill: C.redFill, stroke: C.redStroke, strokeWidth: 1.5 });
  d.text(leftLabel, 348, 'SECURITY', { size: 10, weight: 'bold', color: C.redStroke });
  const secItems = ['Workload Identity', 'IAM + Service Accts', 'VPC Peering', 'KMS Encryption'];
  secItems.forEach((item, i) => {
    d.box(leftBox + i * (boxW + boxGap), 330, boxW, 28, item, { fill: C.redFill, stroke: C.redStroke, fontSize: 9 });
  });
}
