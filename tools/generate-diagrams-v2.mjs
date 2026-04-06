#!/usr/bin/env node
/**
 * Diagram Runner — Plugin Architecture
 *
 * Descubre todos los archivos en tools/diagrams/ y genera SVGs automáticamente.
 * Cada diagrama es un módulo independiente que exporta { name, width, height, draw }.
 *
 * Uso:
 *   node tools/generate-diagrams-v2.mjs              # Genera todos
 *   node tools/generate-diagrams-v2.mjs la-solucion  # Genera uno solo
 *   node tools/generate-diagrams-v2.mjs --list       # Lista disponibles
 *   node tools/generate-diagrams-v2.mjs --validate   # Verifica refs en markdown
 *
 * Para agregar un nuevo diagrama:
 *   1. Crear tools/diagrams/mi-diagrama.mjs
 *   2. Exportar { name, width, height, draw(d, C) }
 *   3. Ejecutar: node tools/generate-diagrams-v2.mjs
 */
import { writeFileSync, mkdirSync, readdirSync, readFileSync, existsSync } from 'fs';
import { resolve, dirname, basename } from 'path';
import { fileURLToPath } from 'url';
import { DiagramEngine, C } from './lib/diagram-engine.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const DIAGRAMS_DIR = resolve(__dirname, 'diagrams');
const OUT_DIR = resolve(ROOT, 'assets/images/excalidraw-detailed');
const SERVE_DIR = resolve(ROOT, 'presentations/assets/excalidraw-detailed');

// ─── Discover Diagrams ───────────────────────────────
async function discoverDiagrams() {
  const files = readdirSync(DIAGRAMS_DIR).filter(f => f.endsWith('.mjs'));
  const diagrams = [];

  for (const file of files.sort()) {
    const mod = await import(`./diagrams/${file}`);
    if (!mod.name || !mod.draw) {
      console.warn(`  ⚠ ${file}: missing 'name' or 'draw' export, skipping`);
      continue;
    }
    diagrams.push({
      file,
      name: mod.name,
      width: mod.width || 900,
      height: mod.height || 450,
      draw: mod.draw,
      description: mod.description || '',
    });
  }

  return diagrams;
}

// ─── Generate Single Diagram ─────────────────────────
function generate(diagram) {
  const d = new DiagramEngine(diagram.width, diagram.height);
  diagram.draw(d, C);
  const svg = d.toSvg();

  writeFileSync(resolve(OUT_DIR, `${diagram.name}.svg`), svg);
  writeFileSync(resolve(SERVE_DIR, `${diagram.name}.svg`), svg);

  const sizeKB = (svg.length / 1024).toFixed(1);
  console.log(`  ✓ ${diagram.name}.svg (${sizeKB} KB)`);
  return svg;
}

// ─── Validate References ─────────────────────────────
function validate() {
  const mdFiles = readdirSync(resolve(ROOT, 'presentations/architecture'))
    .filter(f => f.endsWith('.md'));

  let issues = 0;

  for (const mdFile of mdFiles) {
    const content = readFileSync(resolve(ROOT, 'presentations/architecture', mdFile), 'utf8');
    const refs = content.matchAll(/!\[.*?\]\(\.\.\/assets\/excalidraw-detailed\/(.+?\.svg)\)/g);

    for (const match of refs) {
      const svgName = match[1];
      const svgPath = resolve(SERVE_DIR, svgName);
      if (!existsSync(svgPath)) {
        console.error(`  ✗ ${mdFile}: references ${svgName} but file not found`);
        issues++;
      }
    }
  }

  return issues;
}

// ─── Main ────────────────────────────────────────────
async function main() {
  const args = process.argv.slice(2);

  mkdirSync(OUT_DIR, { recursive: true });
  mkdirSync(SERVE_DIR, { recursive: true });

  const diagrams = await discoverDiagrams();

  // --list: show available diagrams
  if (args.includes('--list')) {
    console.log(`\n${diagrams.length} diagrams available:\n`);
    for (const d of diagrams) {
      console.log(`  ${d.name.padEnd(25)} ${d.width}x${d.height}  ${d.description}`);
    }
    return;
  }

  // --validate: check markdown references
  if (args.includes('--validate')) {
    console.log('\nValidating SVG references in markdown files...\n');
    const issues = validate();
    if (issues === 0) {
      console.log('  ✓ All references valid');
    } else {
      console.error(`\n  ✗ ${issues} broken reference(s) found`);
      process.exit(1);
    }
    return;
  }

  // Generate specific diagram(s) or all
  const filter = args.filter(a => !a.startsWith('--'));

  if (filter.length > 0) {
    console.log(`\nGenerating ${filter.length} diagram(s)...\n`);
    for (const name of filter) {
      const diagram = diagrams.find(d => d.name === name);
      if (!diagram) {
        console.error(`  ✗ "${name}" not found. Use --list to see available diagrams.`);
        process.exit(1);
      }
      generate(diagram);
    }
  } else {
    console.log(`\nGenerating all ${diagrams.length} diagrams...\n`);
    for (const diagram of diagrams) {
      generate(diagram);
    }
  }

  console.log(`\n✓ Done — output: ${OUT_DIR}/`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
