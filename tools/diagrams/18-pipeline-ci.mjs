/**
 * Pipeline CI/CD — 6 etapas del pipeline de integracion continua
 */
import { DiagramEngine, C } from '../lib/diagram-engine.mjs';

export const name = 'pipeline-ci';
export const description = 'Pipeline CI/CD de 6 etapas con quality gates y deploy multi-pais';
export const width = 800;
export const height = 430;

export function draw(d, C) {
  // Stage 1: Detect
  d.box(300, 10, 200, 42, '1. Detect Changes', { fill: C.blueFill, stroke: C.blueStroke, fontSize: 13 });
  d.note(400, 42, 'Nx affected (solo lo que cambio)', { anchor: 'middle', size: 9 });
  d.arrow(400, 52, 400, 75, { stroke: C.textLight });

  // Stage 2: Quality Gates (parallel)
  d.region(10, 75, 780, 55, { stroke: C.greenStroke });
  d.note(20, 90, '2. Quality Gates (paralelo)', { size: 10, color: C.greenStroke });
  const gates = ['Lint (ESLint)', 'Tests (Vitest)', 'Typecheck (tsc)', 'Format (Prettier)', 'SAST (Semgrep)'];
  gates.forEach((g, i) => {
    d.box(20 + i * 155, 98, 145, 25, g, { fill: C.greenFill, stroke: C.greenStroke, fontSize: 10 });
  });
  d.arrow(400, 130, 400, 150, { stroke: C.textLight });

  // Stage 3: Build
  d.box(240, 150, 320, 42, '3. Build Docker Image', { fill: C.purpleFill, stroke: C.purpleStroke, fontSize: 13 });
  d.note(400, 182, 'Multi-stage + Push to Artifact Registry', { anchor: 'middle', size: 9 });
  d.arrow(400, 192, 400, 215, { stroke: C.textLight });

  // Stage 4: Security
  d.box(240, 215, 320, 42, '4. Security Scan', { fill: C.redFill, stroke: C.redStroke, fontSize: 13 });
  d.note(400, 247, 'Trivy (CVE) + Supply Chain (SHA pinning)', { anchor: 'middle', size: 9 });
  d.arrow(400, 257, 400, 280, { stroke: C.textLight });

  // Stage 5: Deploy Multi-Pais
  d.region(10, 280, 780, 65, { stroke: C.yellowStroke });
  d.note(20, 295, '5. Deploy Multi-Pais (matrix paralelo)', { size: 10, color: C.yellowStroke });
  d.box(100, 308, 190, 30, 'Chile (CL)', { fill: C.orangeFill, stroke: C.orangeStroke, fontSize: 12 });
  d.box(305, 308, 190, 30, 'Peru (PE)', { fill: C.orangeFill, stroke: C.orangeStroke, fontSize: 12 });
  d.box(510, 308, 190, 30, 'España (ES)', { fill: C.orangeFill, stroke: C.orangeStroke, fontSize: 12 });
  d.arrow(400, 345, 400, 370, { stroke: C.textLight });

  // Stage 6: Smoke Tests
  d.box(240, 370, 320, 42, '6. Smoke Tests + Notification', { fill: C.tealFill, stroke: C.tealStroke, fontSize: 13 });
  d.note(400, 402, '/health, /docs, response-time SLA', { anchor: 'middle', size: 9 });
}
