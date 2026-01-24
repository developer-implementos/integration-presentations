## 🔄 Flujo de Trabajo del Desarrollador

> Del código al deploy: el ciclo completo

⬇️ _Navega hacia abajo para ver detalles_

Note:
Esta sección es CRÍTICA para el día a día.
Define cómo trabajan: commits, branches, PRs, reviews, CI/CD.
Seguir estas prácticas asegura calidad y evita problemas.


----

### 🔄 Flujo de Trabajo del Desarrollador

> Del código al deploy: el ciclo completo de desarrollo

⬇️ _Navega hacia abajo para ver el flujo completo_

Note:
Esta sección es CRÍTICA para el día a día.
Define cómo trabajan: commits, branches, PRs, reviews, CI/CD.
Seguir estas prácticas asegura calidad y evita problemas.

----

<!-- .slide: data-background="#1c1c1c" data-background-transition="fade" -->

### Ciclo de Desarrollo

<div style="text-align: center; background: #1e1e1e; padding: 20px; border-radius: 10px;">
<svg width="850" height="200" viewBox="0 0 850 200" xmlns="http://www.w3.org/2000/svg">
<!-- Flow Line -->
<line x1="50" y1="100" x2="800" y2="100" stroke="#34495e" stroke-width="3" stroke-dasharray="5,5"/>

<!-- Step 1: Code -->
<g transform="translate(80, 60)">
<rect x="-35" y="-35" width="70" height="70" rx="10" fill="#3498db" opacity="0.9"/>
<text x="0" y="8" text-anchor="middle" fill="white" font-size="24">CODE</text>
<text x="0" y="55" text-anchor="middle" fill="#ecf0f1" font-size="12" font-weight="bold">Código</text>
</g>

<!-- Arrow 1 -->
<path d="M 120 100 L 160 100" stroke="#3498db" stroke-width="3" marker-end="url(#arrowBlue)"/>

<!-- Step 2: Commit -->
<g transform="translate(200, 60)">
<rect x="-35" y="-35" width="70" height="70" rx="10" fill="#9b59b6" opacity="0.9"/>
<text x="0" y="8" text-anchor="middle" fill="white" font-size="20">GIT</text>
<text x="0" y="55" text-anchor="middle" fill="#ecf0f1" font-size="12" font-weight="bold">Commit</text>
</g>

<!-- Arrow 2 -->
<path d="M 240 100 L 280 100" stroke="#9b59b6" stroke-width="3"/>

<!-- Step 3: Push -->
<g transform="translate(320, 60)">
<rect x="-35" y="-35" width="70" height="70" rx="10" fill="#e67e22" opacity="0.9"/>
<text x="0" y="8" text-anchor="middle" fill="white" font-size="20">PUSH</text>
<text x="0" y="55" text-anchor="middle" fill="#ecf0f1" font-size="12" font-weight="bold">Push</text>
</g>

<!-- Arrow 3 -->
<path d="M 360 100 L 400 100" stroke="#e67e22" stroke-width="3"/>

<!-- Step 4: PR -->
<g transform="translate(440, 60)">
<rect x="-35" y="-35" width="70" height="70" rx="10" fill="#2ecc71" opacity="0.9"/>
<text x="0" y="8" text-anchor="middle" fill="white" font-size="20">PR</text>
<text x="0" y="55" text-anchor="middle" fill="#ecf0f1" font-size="12" font-weight="bold">PR</text>
</g>

<!-- Arrow 4 -->
<path d="M 480 100 L 520 100" stroke="#2ecc71" stroke-width="3"/>

<!-- Step 5: Review -->
<g transform="translate(560, 60)">
<rect x="-35" y="-35" width="70" height="70" rx="10" fill="#f1c40f" opacity="0.9"/>
<text x="0" y="8" text-anchor="middle" fill="#2c3e50" font-size="16">REVIEW</text>
<text x="0" y="55" text-anchor="middle" fill="#ecf0f1" font-size="12" font-weight="bold">Review</text>
</g>

<!-- Arrow 5 -->
<path d="M 600 100 L 640 100" stroke="#f1c40f" stroke-width="3"/>

<!-- Step 6: Merge -->
<g transform="translate(680, 60)">
<rect x="-35" y="-35" width="70" height="70" rx="10" fill="#1abc9c" opacity="0.9"/>
<text x="0" y="8" text-anchor="middle" fill="white" font-size="16">MERGE</text>
<text x="0" y="55" text-anchor="middle" fill="#ecf0f1" font-size="12" font-weight="bold">Merge</text>
</g>

<!-- Arrow 6 -->
<path d="M 720 100 L 760 100" stroke="#1abc9c" stroke-width="3"/>

<!-- Step 7: Deploy -->
<g transform="translate(800, 60)">
<rect x="-35" y="-35" width="70" height="70" rx="10" fill="#e74c3c" opacity="0.9"/>
<text x="0" y="8" text-anchor="middle" fill="white" font-size="14">DEPLOY</text>
<text x="0" y="55" text-anchor="middle" fill="#ecf0f1" font-size="12" font-weight="bold">Deploy</text>
</g>

<!-- Annotations -->
<text x="200" y="160" text-anchor="middle" fill="#9b59b6" font-size="10">Conventional</text>
<text x="200" y="175" text-anchor="middle" fill="#9b59b6" font-size="10">Commits</text>

<text x="440" y="160" text-anchor="middle" fill="#2ecc71" font-size="10">Branch</text>
<text x="440" y="175" text-anchor="middle" fill="#2ecc71" font-size="10">Protection</text>

<text x="560" y="160" text-anchor="middle" fill="#f1c40f" font-size="10">CODEOWNERS</text>

<text x="800" y="160" text-anchor="middle" fill="#e74c3c" font-size="10">Manual</text>
<text x="800" y="175" text-anchor="middle" fill="#e74c3c" font-size="10">Only</text>
</svg>
</div>

Note:
Este es el flujo completo que van a seguir.
Cada paso tiene reglas y herramientas.
Vamos a ver cada uno en detalle.

----

<!-- .slide: data-background="#181818" data-background-transition="fade" -->

### Conventional Commits

> Formato obligatorio para mensajes de commit

```bash
<type>(<scope>): <description>

# Ejemplos:
feat(inventory): add bulk import endpoint
fix(pricing): correct decimal precision in discount
docs(api): update pagination examples
refactor(core): extract validation to shared lib
test(catalogue): add unit tests for SKU validation
chore(deps): update nestjs to v11.0.0
```

Note:
Esto NO es opcional - es obligatorio.
El sistema de releases automáticos depende de esto.
feat = nueva funcionalidad = minor version bump
fix = corrección = patch version bump

----

<!-- .slide: data-background="#1c1c1c" data-background-transition="fade" -->

### Tipos de Commit

| Tipo | Uso | Ejemplo | Versión |
|------|-----|---------|---------|
| `feat` | Nueva funcionalidad | `feat(auth): add SSO login` | Minor ↑ |
| `fix` | Corrección de bug | `fix(cart): prevent double charge` | Patch ↑ |
| `docs` | Documentación | `docs: update API guide` | - |
| `refactor` | Reestructuración | `refactor: extract utils` | - |
| `test` | Tests | `test: add e2e for checkout` | - |
| `chore` | Mantenimiento | `chore(deps): update libs` | - |
| `perf` | Performance | `perf: optimize query` | Patch ↑ |

**Breaking Change**: Agregar `!` → `feat!: remove deprecated API`

Note:
feat y fix afectan el versionado automático.
Un breaking change (con !) genera major version.
Los otros tipos son importantes para el CHANGELOG pero no afectan versión.

----

<!-- .slide: data-background="#181818" data-background-transition="fade" -->

### Validacion en CI

> GitHub Actions valida automaticamente (enfoque BigTech)

<div style="text-align: center; background: #1e1e1e; padding: 20px; border-radius: 10px;">
<svg width="750" height="280" viewBox="0 0 750 280" xmlns="http://www.w3.org/2000/svg">
<!-- Developer -->
<g transform="translate(80, 80)">
<circle cx="0" cy="0" r="40" fill="#3498db"/>
<text x="0" y="8" text-anchor="middle" fill="white" font-size="14">DEV</text>
<text x="0" y="60" text-anchor="middle" fill="#ecf0f1" font-size="14">Developer</text>
</g>

<!-- Arrow to Editor -->
<path d="M 130 80 L 180 80" stroke="#555" stroke-width="2" marker-end="url(#arrow)"/>

<!-- Editor -->
<g transform="translate(240, 80)">
<rect x="-50" y="-40" width="100" height="80" rx="8" fill="#2c3e50" stroke="#3498db" stroke-width="2"/>
<text x="0" y="-10" text-anchor="middle" fill="#3498db" font-size="12">VS Code</text>
<text x="0" y="10" text-anchor="middle" fill="#ecf0f1" font-size="11">Format on Save</text>
<text x="0" y="25" text-anchor="middle" fill="#7f8c8d" font-size="10">Prettier + ESLint</text>
</g>

<!-- Arrow to git commit -->
<path d="M 300 80 L 350 80" stroke="#555" stroke-width="2" marker-end="url(#arrow)"/>
<text x="325" y="70" text-anchor="middle" fill="#7f8c8d" font-size="10">git commit</text>

<!-- CI Validation (enfoque BigTech) -->
<g transform="translate(440, 80)">
<rect x="-70" y="-50" width="140" height="100" rx="8" fill="#1e1e1e" stroke="#3498db" stroke-width="3"/>
<text x="0" y="-25" text-anchor="middle" fill="#3498db" font-size="12" font-weight="bold">GitHub Actions</text>
<text x="0" y="-5" text-anchor="middle" fill="#ecf0f1" font-size="11">CI Validation</text>
<text x="0" y="15" text-anchor="middle" fill="#7f8c8d" font-size="10">Lint + Test + Build</text>
<text x="0" y="30" text-anchor="middle" fill="#7f8c8d" font-size="10">en servidor</text>
</g>

<!-- Branch: Pass -->
<path d="M 520 60 L 580 30" stroke="#2ecc71" stroke-width="2"/>
<g transform="translate(620, 30)">
<rect x="-30" y="-20" width="60" height="40" rx="5" fill="#2ecc71"/>
<text x="0" y="5" text-anchor="middle" fill="white" font-size="12">PASS</text>
</g>
<path d="M 680 30 L 720 30" stroke="#2ecc71" stroke-width="2" marker-end="url(#arrow)"/>
<text x="720" y="50" text-anchor="middle" fill="#2ecc71" font-size="11">Merge OK</text>

<!-- Branch: Fail -->
<path d="M 520 100 L 580 130" stroke="#e74c3c" stroke-width="2"/>
<g transform="translate(620, 130)">
<rect x="-30" y="-20" width="60" height="40" rx="5" fill="#e74c3c"/>
<text x="0" y="5" text-anchor="middle" fill="white" font-size="12">FAIL</text>
</g>
<path d="M 650 150 C 680 180, 180 180, 130 100" stroke="#e74c3c" stroke-width="2" stroke-dasharray="5,5" marker-end="url(#arrow)"/>
<text x="400" y="200" text-anchor="middle" fill="#e74c3c" font-size="11">Fix locally and push again</text>

<!-- Tools list -->
<g transform="translate(440, 220)">
<text x="0" y="0" text-anchor="middle" fill="#7f8c8d" font-size="11">CI-only validation (enfoque Google/BigTech)</text>
</g>
</svg>
</div>

Note:
Usamos CI-only validation como Google - sin hooks locales.
Si el CI falla, arreglan los errores localmente y hacen push de nuevo.
Esto asegura uniform enforcement sin bloquear al developer.

----

<!-- .slide: data-background="#1c1c1c" data-background-transition="fade" -->

### Validacion en CI (enfoque BigTech)

> ADR-0073: CI-Only Code Validation

```bash
# Cuando haces push, CI ejecuta automaticamente:

nx affected -t lint      # ESLint
nx affected -t test      # Vitest
nx affected -t build     # TypeScript
# + SonarCloud analysis

# Recomendacion: validar localmente antes de push
pnpm lint:fix            # Arregla lint
pnpm test:affected       # Tests afectados
```

**¿Qué hace cada herramienta?**

| Herramienta | Propósito | Donde corre |
|-------------|-----------|-------------|
| **ESLint** | Calidad de código | CI + IDE |
| **Prettier** | Formateo | CI + IDE (format on save) |
| **GitHub Actions** | Validacion completa | CI (lint, test, build) |

Note:
ESLint encuentra bugs potenciales - como promesas no awaited.
Prettier solo formatea - no cambia la lógica.
CI valida todo automaticamente en cada push.
Recomendamos correr lint/test localmente para feedback rapido.

----

<!-- .slide: data-background="#181818" data-background-transition="fade" -->

### Reglas de ESLint Importantes

> Errores que CI atrapa automaticamente

```typescript
// ❌ @typescript-eslint/no-floating-promises
async function bad() {
  fetchData();  // Promise no awaited - BUG!
}

// ✅ Correcto
async function good() {
  await fetchData();
}

// ❌ @typescript-eslint/no-misused-promises
arr.forEach(async (n) => await process(n)); // BUG!

// ✅ Correcto
await Promise.all(arr.map((n) => process(n)));

// ❌ no-console (warning)
console.log('debug');

// ✅ Permitido
console.error('Error occurred');
console.warn('Deprecation warning');
```

Note:
Estas son las reglas más importantes.
Si ven errores de floating promises, SIEMPRE agregar await.
forEach con async es un error común - usar Promise.all.
console.log es warning - lo van a ver en dev pero evitar en prod.

----

<!-- .slide: data-background="#1c1c1c" data-background-transition="fade" -->

### VS Code Setup

> Configura tu editor para máxima productividad

```json
// .vscode/settings.json (ya configurado en el repo)
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.organizeImports": "explicit"
  },
  "eslint.validate": ["javascript", "typescript"],
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

**Extensiones requeridas:**

| Extensión | ID | Propósito |
|-----------|-----|-----------|
| Prettier | `esbenp.prettier-vscode` | Formateo |
| ESLint | `dbaeumer.vscode-eslint` | Linting |
| EditorConfig | `editorconfig.editorconfig` | Consistencia |

Note:
Estas extensiones están recomendadas en .vscode/extensions.json.
VS Code debería preguntarles si quieren instalarlas.
Con esto, el código se formatea automáticamente al guardar.
CI es la ultima linea de defensa - valida todo automaticamente.

----

<!-- .slide: data-background="#181818" data-background-transition="fade" -->

### Nomenclatura de Branches

```bash
# Formato: <tipo>/<descripción-corta>

feature/add-product-search      # Nueva funcionalidad
fix/inventory-sync-error        # Corrección de bug
refactor/extract-validation     # Reestructuración
docs/update-api-guide           # Documentación
chore/upgrade-dependencies      # Mantenimiento
hotfix/critical-payment-bug     # Fix urgente (desde main)
```

**Regla**: Siempre crear branch desde `main` actualizado

```bash
git checkout main
git pull origin main
git checkout -b feature/mi-feature
```

Note:
La nomenclatura es consistente con los tipos de commit.
Siempre partir de main actualizado evita conflictos.
hotfix es especial - se usa para bugs críticos en producción.

----

<!-- .slide: data-background="#181818" data-background-transition="fade" -->

### Branch Protection

> Reglas que protegen la calidad del código

<div style="text-align: center; background: #1e1e1e; padding: 20px; border-radius: 10px;">
<svg width="800" height="320" viewBox="0 0 800 320" xmlns="http://www.w3.org/2000/svg">
<!-- Main branch -->
<g transform="translate(400, 50)">
<rect x="-60" y="-25" width="120" height="50" rx="25" fill="#e74c3c" stroke="#c0392b" stroke-width="3"/>
<text x="0" y="7" text-anchor="middle" fill="white" font-size="18" font-weight="bold">main</text>
</g>

<!-- Protection shield -->
<g transform="translate(400, 50)">
<circle cx="70" cy="-15" r="18" fill="#f1c40f"/>
<text x="70" y="-9" text-anchor="middle" fill="#2c3e50" font-size="16">!</text>
</g>

<!-- Main rules -->
<g transform="translate(550, 30)">
<rect x="0" y="0" width="220" height="90" rx="5" fill="#2c3e50" stroke="#34495e" stroke-width="1"/>
<text x="10" y="20" fill="#e74c3c" font-size="12" font-weight="bold">main</text>
<text x="10" y="38" fill="#ecf0f1" font-size="11">+ 2 reviews requeridos</text>
<text x="10" y="53" fill="#ecf0f1" font-size="11">+ Commits firmados (GPG)</text>
<text x="10" y="68" fill="#ecf0f1" font-size="11">+ Todos los checks CI</text>
<text x="10" y="83" fill="#ecf0f1" font-size="11">- Force push bloqueado</text>
</g>

<!-- Develop branch (if exists) -->
<g transform="translate(200, 140)">
<rect x="-55" y="-22" width="110" height="44" rx="22" fill="#3498db" stroke="#2980b9" stroke-width="2"/>
<text x="0" y="6" text-anchor="middle" fill="white" font-size="14" font-weight="bold">develop</text>
</g>

<!-- Develop rules -->
<g transform="translate(30, 125)">
<rect x="0" y="0" width="180" height="70" rx="5" fill="#2c3e50" stroke="#34495e" stroke-width="1"/>
<text x="10" y="20" fill="#3498db" font-size="12" font-weight="bold">develop</text>
<text x="10" y="38" fill="#ecf0f1" font-size="11">+ 1 review requerido</text>
<text x="10" y="53" fill="#ecf0f1" font-size="11">+ Checks críticos</text>
<text x="10" y="68" fill="#ecf0f1" font-size="11">- Force push bloqueado</text>
</g>

<!-- Feature branches -->
<g transform="translate(200, 240)">
<rect x="-70" y="-20" width="140" height="40" rx="20" fill="#2ecc71" stroke="#27ae60" stroke-width="2"/>
<text x="0" y="6" text-anchor="middle" fill="white" font-size="12">feature/*, fix/*</text>
</g>

<!-- Hotfix branch -->
<g transform="translate(550, 180)">
<rect x="-50" y="-20" width="100" height="40" rx="20" fill="#e67e22" stroke="#d35400" stroke-width="2"/>
<text x="0" y="6" text-anchor="middle" fill="white" font-size="12">hotfix/*</text>
</g>

<!-- Hotfix rules -->
<g transform="translate(620, 145)">
<rect x="0" y="0" width="160" height="55" rx="5" fill="#2c3e50" stroke="#34495e" stroke-width="1"/>
<text x="10" y="18" fill="#e67e22" font-size="12" font-weight="bold">hotfix/*</text>
<text x="10" y="35" fill="#ecf0f1" font-size="11">+ 1 review (expedited)</text>
<text x="10" y="50" fill="#ecf0f1" font-size="11">+ Solo checks críticos</text>
</g>

<!-- Arrows -->
<path d="M 200 218 L 200 165" stroke="#2ecc71" stroke-width="2" marker-end="url(#arrow)"/>
<path d="M 255 140 L 340 75" stroke="#3498db" stroke-width="2" marker-end="url(#arrow)"/>
<path d="M 500 180 L 460 75" stroke="#e67e22" stroke-width="2" marker-end="url(#arrow)"/>
<text x="510" y="140" fill="#e67e22" font-size="10">Urgente</text>

<!-- Legend -->
<g transform="translate(200, 290)">
<text x="0" y="0" text-anchor="middle" fill="#7f8c8d" font-size="11">Las reglas se configuran en GitHub - Settings - Branches</text>
</g>
</svg>
</div>

Note:
Estas reglas son automáticas - GitHub las enforza.
No pueden hacer merge sin cumplirlas.
hotfix es para emergencias - permite un flujo más rápido.

----

<!-- .slide: data-background="#1c1c1c" data-background-transition="fade" -->

### Status Checks Requeridos

> CI debe pasar antes de poder mergear

| Check | Descripción | Timeout | Bloquea |
|-------|-------------|---------|---------|
| `Build` | Compilación TypeScript | 10 min | Si |
| `Test / Unit` | Vitest unit tests | 15 min | Si |
| `Lint` | ESLint + Prettier | 5 min | Si |
| `Security / Trivy` | Vulnerabilidades imagen | 10 min | main |
| `Security / CodeQL` | SAST scanning | 20 min | main |
| `Quality / SonarCloud` | Code quality | 15 min | main |

**Si cualquier check falla** → No puedes mergear → Arregla el problema

Note:
Esto es lo que ven en el PR como "checks".
Todo en verde = pueden pedir review.
Rojo = arreglen antes de pedir review.

----

<!-- .slide: data-background="#181818" data-background-transition="fade" -->

### Pull Request: Proceso Completo

<div style="text-align: center; background: #1e1e1e; padding: 20px; border-radius: 10px;">
<svg width="800" height="400" viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
<!-- Step 1: Create PR -->
<g transform="translate(100, 80)">
<rect x="-60" y="-40" width="120" height="80" rx="10" fill="#3498db"/>
<text x="0" y="-10" text-anchor="middle" fill="white" font-size="14" font-weight="bold">1. Crear PR</text>
<text x="0" y="10" text-anchor="middle" fill="#ecf0f1" font-size="11">gh pr create</text>
<text x="0" y="25" text-anchor="middle" fill="#bdc3c7" font-size="10">o GitHub UI</text>
</g>

<!-- Arrow -->
<path d="M 165 80 L 215 80" stroke="#555" stroke-width="2" marker-end="url(#arrow)"/>

<!-- Step 2: Fill Template -->
<g transform="translate(280, 80)">
<rect x="-60" y="-40" width="120" height="80" rx="10" fill="#9b59b6"/>
<text x="0" y="-10" text-anchor="middle" fill="white" font-size="14" font-weight="bold">2. Template</text>
<text x="0" y="10" text-anchor="middle" fill="#ecf0f1" font-size="11">Descripción</text>
<text x="0" y="25" text-anchor="middle" fill="#bdc3c7" font-size="10">Test plan</text>
</g>

<!-- Arrow -->
<path d="M 345 80 L 395 80" stroke="#555" stroke-width="2" marker-end="url(#arrow)"/>

<!-- Step 3: CI Runs -->
<g transform="translate(460, 80)">
<rect x="-60" y="-40" width="120" height="80" rx="10" fill="#e67e22"/>
<text x="0" y="-10" text-anchor="middle" fill="white" font-size="14" font-weight="bold">3. CI Runs</text>
<text x="0" y="10" text-anchor="middle" fill="#ecf0f1" font-size="11">Automático</text>
<text x="0" y="25" text-anchor="middle" fill="#bdc3c7" font-size="10">~5-10 min</text>
</g>

<!-- Arrow -->
<path d="M 525 80 L 575 80" stroke="#555" stroke-width="2" marker-end="url(#arrow)"/>

<!-- Step 4: Request Review -->
<g transform="translate(640, 80)">
<rect x="-60" y="-40" width="120" height="80" rx="10" fill="#f1c40f"/>
<text x="0" y="-10" text-anchor="middle" fill="#2c3e50" font-size="14" font-weight="bold">4. Review</text>
<text x="0" y="10" text-anchor="middle" fill="#2c3e50" font-size="11">Asignar</text>
<text x="0" y="25" text-anchor="middle" fill="#7f8c8d" font-size="10">reviewers</text>
</g>

<!-- Arrow down from Review -->
<path d="M 640 125 L 640 170" stroke="#555" stroke-width="2" marker-end="url(#arrow)"/>

<!-- Step 5: Address Feedback -->
<g transform="translate(640, 220)">
<rect x="-60" y="-40" width="120" height="80" rx="10" fill="#1abc9c"/>
<text x="0" y="-10" text-anchor="middle" fill="white" font-size="14" font-weight="bold">5. Feedback</text>
<text x="0" y="10" text-anchor="middle" fill="#ecf0f1" font-size="11">Atender</text>
<text x="0" y="25" text-anchor="middle" fill="#bdc3c7" font-size="10">comentarios</text>
</g>

<!-- Arrow left from Feedback -->
<path d="M 575 220 L 525 220" stroke="#555" stroke-width="2" marker-end="url(#arrow)"/>

<!-- Step 6: Approval -->
<g transform="translate(460, 220)">
<rect x="-60" y="-40" width="120" height="80" rx="10" fill="#2ecc71"/>
<text x="0" y="-10" text-anchor="middle" fill="white" font-size="14" font-weight="bold">6. Approved</text>
<text x="0" y="10" text-anchor="middle" fill="#ecf0f1" font-size="11">LGTM</text>
<text x="0" y="25" text-anchor="middle" fill="#bdc3c7" font-size="10">(Looks Good)</text>
</g>

<!-- Arrow left -->
<path d="M 395 220 L 345 220" stroke="#555" stroke-width="2" marker-end="url(#arrow)"/>

<!-- Step 7: Merge -->
<g transform="translate(280, 220)">
<rect x="-60" y="-40" width="120" height="80" rx="10" fill="#e74c3c"/>
<text x="0" y="-10" text-anchor="middle" fill="white" font-size="14" font-weight="bold">7. Merge</text>
<text x="0" y="10" text-anchor="middle" fill="#ecf0f1" font-size="11">Squash and</text>
<text x="0" y="25" text-anchor="middle" fill="#bdc3c7" font-size="10">Merge</text>
</g>

<!-- Iteration loop -->
<path d="M 580 250 C 540 300, 700 300, 700 180 L 700 125" stroke="#1abc9c" stroke-width="2" stroke-dasharray="5,5" marker-end="url(#arrow)"/>
<text x="650" y="310" fill="#1abc9c" font-size="10">Si hay cambios</text>

<!-- Tips -->
<g transform="translate(100, 320)">
<rect x="0" y="0" width="600" height="60" rx="5" fill="#2c3e50" stroke="#34495e"/>
<text x="20" y="22" fill="#f1c40f" font-size="12" font-weight="bold">Tips:</text>
<text x="20" y="40" fill="#ecf0f1" font-size="11">PRs pequeños = reviews rápidos</text>
<text x="230" y="40" fill="#ecf0f1" font-size="11">Responder feedback rápido</text>
<text x="430" y="40" fill="#ecf0f1" font-size="11">No tomar feedback personal</text>
</g>
</svg>
</div>

Note:
El proceso parece largo pero fluye rápido.
PRs pequeños y enfocados son la clave.
Si el PR es muy grande, divídanlo.

----

<!-- .slide: data-background="#1c1c1c" data-background-transition="fade" -->

### Etiquetas de Code Review

> Comunicación clara entre reviewer y autor

| Prefijo | Significado | Acción |
|---------|-------------|--------|
| `nit:` | Sugerencia menor | Opcional |
| `question:` | Pidiendo aclaración | Responder |
| `suggestion:` | Cambio recomendado | Considerar |
| `blocker:` | **Debe arreglarse** | Obligatorio |

**Ejemplo de comentarios:**

```markdown
nit: Podrías usar optional chaining aquí: user?.name

question: ¿Por qué elegiste Map en vez de objeto plano?

suggestion: Considera extraer esto a una función helper

blocker: Este query puede causar N+1 - usar eager loading
```

Note:
Esto hace el review más claro y profesional.
Si ven blocker, DEBEN arreglarlo antes del merge.
nit es opcional - pueden ignorarlo si no tienen tiempo.

----

<!-- .slide: data-background="#181818" data-background-transition="fade" -->

### CODEOWNERS

> Quién debe aprobar cambios en cada área

```bash
# .github/CODEOWNERS

# Default - todo el repositorio
*                           @developer-implementos/integration-developers

# Bounded Contexts - ownership por dominio
libs/inventory/             @developer-implementos/inventory-team
libs/pricing/               @developer-implementos/pricing-team
libs/notifications/         @developer-implementos/notifications-team

# Infraestructura - requiere Platform review
libs/shared/backend/        @developer-implementos/platform-team

# CI/CD - requiere DevOps review
.github/                    @developer-implementos/integration-developers

# Documentación
/docs/                      @developer-implementos/integration-developers
```

Note:
Esto es automático - GitHub asigna reviewers basado en qué archivos tocan.
Si tocan libs/shared/backend, platform-team es asignado automáticamente.
No pueden mergear sin approval del CODEOWNER.

----

<!-- .slide: data-background="#1c1c1c" data-background-transition="fade" -->

### Arquitectura CI/CD: devops-platform

> Workflows reutilizables centralizados

<div style="text-align: center; background: #1e1e1e; padding: 20px; border-radius: 10px;">
<svg width="800" height="350" viewBox="0 0 800 350" xmlns="http://www.w3.org/2000/svg">
<!-- devops-platform box -->
<g transform="translate(400, 80)">
<rect x="-280" y="-60" width="560" height="120" rx="10" fill="#1a1a2e" stroke="#3498db" stroke-width="3"/>
<text x="0" y="-35" text-anchor="middle" fill="#3498db" font-size="16" font-weight="bold">devops-platform (repositorio externo)</text>

<!-- Workflows inside -->
<g transform="translate(-200, 10)">
<rect x="-60" y="-25" width="120" height="50" rx="5" fill="#2c3e50"/>
<text x="0" y="0" text-anchor="middle" fill="#ecf0f1" font-size="10">node-monorepo</text>
<text x="0" y="15" text-anchor="middle" fill="#ecf0f1" font-size="10">-ci-pipeline.yml</text>
<text x="0" y="35" text-anchor="middle" fill="#7f8c8d" font-size="9">~800 líneas</text>
</g>

<g transform="translate(0, 10)">
<rect x="-60" y="-25" width="120" height="50" rx="5" fill="#2c3e50"/>
<text x="0" y="0" text-anchor="middle" fill="#ecf0f1" font-size="10">node-quality</text>
<text x="0" y="15" text-anchor="middle" fill="#ecf0f1" font-size="10">-gate.yml</text>
</g>

<g transform="translate(200, 10)">
<rect x="-60" y="-25" width="120" height="50" rx="5" fill="#2c3e50"/>
<text x="0" y="0" text-anchor="middle" fill="#ecf0f1" font-size="10">Composite</text>
<text x="0" y="15" text-anchor="middle" fill="#ecf0f1" font-size="10">Actions</text>
</g>
</g>

<!-- Arrow down -->
<path d="M 400 145 L 400 175" stroke="#3498db" stroke-width="3" marker-end="url(#arrow)"/>
<text x="420" y="165" fill="#3498db" font-size="10">workflow_call</text>

<!-- core/ci.yml box -->
<g transform="translate(400, 240)">
<rect x="-180" y="-50" width="360" height="100" rx="10" fill="#1a1a2e" stroke="#2ecc71" stroke-width="3"/>
<text x="0" y="-25" text-anchor="middle" fill="#2ecc71" font-size="16" font-weight="bold">core/.github/workflows/ci.yml</text>
<text x="0" y="0" text-anchor="middle" fill="#ecf0f1" font-size="12">Wrapper ligero (~135 líneas)</text>
<text x="0" y="20" text-anchor="middle" fill="#7f8c8d" font-size="11">Lista de apps</text>
<text x="0" y="35" text-anchor="middle" fill="#7f8c8d" font-size="11">Secrets y variables</text>
</g>

<!-- Benefits -->
<g transform="translate(100, 320)">
<text x="0" y="0" fill="#2ecc71" font-size="12">+ Mantenimiento centralizado</text>
<text x="250" y="0" fill="#2ecc71" font-size="12">+ Consistencia entre repos</text>
<text x="500" y="0" fill="#2ecc71" font-size="12">+ DRY - No repetir código</text>
</g>
</svg>
</div>

Note:
El CI "real" está en devops-platform.
core solo tiene un wrapper que llama al workflow centralizado.
Esto permite actualizar CI en un solo lugar para todos los repos.

----

<!-- .slide: data-background="#181818" data-background-transition="fade" -->

### CI Pipeline: Flujo Detallado

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          PR / Push to main                                   │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         1. PREFLIGHT (Setup)                                 │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  • Checkout código                                                   │    │
│  │  • Detectar proyectos afectados (Nx affected)                       │    │
│  │  • Generar matriz dinámica de apps                                  │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                    ┌───────────────┼───────────────┐
                    ▼               ▼               ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                      2. QUALITY GATE (Paralelo)                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │     Lint     │  │    Test      │  │  Typecheck   │  │   Security   │    │
│  │   ESLint +   │  │   Vitest     │  │     tsc      │  │    Trivy     │    │
│  │   Prettier   │  │  + Coverage  │  │   --noEmit   │  │   + CodeQL   │    │
│  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘    │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                    3. BUILD (Si Quality Gate pasa)                           │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  • Build de apps afectadas (matriz dinámica)                        │    │
│  │  • Docker build + push a Artifact Registry                          │    │
│  │  • Tag con SHA del commit                                           │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────────┘
```

Note:
Nx affected es clave - solo ejecuta en proyectos que cambiaron.
Esto hace el CI muy rápido (~5-10 min vs 30+ min).
Quality Gate corre en paralelo para máxima velocidad.

----

<!-- .slide: data-background="#1c1c1c" data-background-transition="fade" -->

### Self-Hosted Runners

> RFC-0036: Infraestructura de runners propios

<div style="text-align: center; background: #1e1e1e; padding: 20px; border-radius: 10px;">
<svg width="800" height="320" viewBox="0 0 800 320" xmlns="http://www.w3.org/2000/svg">
<!-- GitHub Actions cloud -->
<g transform="translate(400, 50)">
<ellipse cx="0" cy="0" rx="120" ry="40" fill="#2c3e50" stroke="#3498db" stroke-width="2"/>
<text x="0" y="8" text-anchor="middle" fill="#3498db" font-size="14" font-weight="bold">GitHub Actions</text>
</g>

<!-- Arrow down -->
<path d="M 400 95 L 400 130" stroke="#3498db" stroke-width="3" marker-end="url(#arrow)"/>
<text x="420" y="115" fill="#7f8c8d" font-size="10">Jobs</text>

<!-- Runner Pool -->
<g transform="translate(400, 200)">
<rect x="-350" y="-55" width="700" height="130" rx="10" fill="#1a1a2e" stroke="#2ecc71" stroke-width="3"/>
<text x="0" y="-30" text-anchor="middle" fill="#2ecc71" font-size="14" font-weight="bold">Runner Pool (Self-Hosted)</text>

<!-- Runner 1 -->
<g transform="translate(-220, 30)">
<rect x="-70" y="-35" width="140" height="70" rx="8" fill="#27ae60"/>
<text x="0" y="-10" text-anchor="middle" fill="white" font-size="12" font-weight="bold">Runner 1</text>
<text x="0" y="8" text-anchor="middle" fill="#ecf0f1" font-size="10">imp-agentesia</text>
<text x="0" y="23" text-anchor="middle" fill="#bdc3c7" font-size="9">Primary</text>
</g>

<!-- Runner 2 -->
<g transform="translate(0, 30)">
<rect x="-70" y="-35" width="140" height="70" rx="8" fill="#27ae60"/>
<text x="0" y="-10" text-anchor="middle" fill="white" font-size="12" font-weight="bold">Runner 2</text>
<text x="0" y="8" text-anchor="middle" fill="#ecf0f1" font-size="10">server-02</text>
<text x="0" y="23" text-anchor="middle" fill="#bdc3c7" font-size="9">Secondary</text>
</g>

<!-- Runner N -->
<g transform="translate(220, 30)">
<rect x="-70" y="-35" width="140" height="70" rx="8" fill="#34495e" stroke="#7f8c8d" stroke-dasharray="5,5"/>
<text x="0" y="-10" text-anchor="middle" fill="#7f8c8d" font-size="12">Runner N</text>
<text x="0" y="8" text-anchor="middle" fill="#7f8c8d" font-size="10">Expansion</text>
<text x="0" y="23" text-anchor="middle" fill="#7f8c8d" font-size="9">(futuro)</text>
</g>
</g>

<!-- Labels -->
<g transform="translate(400, 285)">
<rect x="-200" y="-15" width="400" height="30" rx="5" fill="#2c3e50"/>
<text x="0" y="5" text-anchor="middle" fill="#ecf0f1" font-size="11">Labels: [self-hosted, Linux, X64, docker]</text>
</g>
</svg>
</div>

Note:
Usamos servidores físicos propios en lugar de runners de GitHub.
Esto ahorra dinero y permite paralelismo real.
Los runners están siempre listos - no hay cold start.

----

<!-- .slide: data-background="#181818" data-background-transition="fade" -->

### Self-Hosted Runners: Beneficios

> ¿Por qué no usamos GitHub-hosted runners?

| Aspecto | GitHub-Hosted | Self-Hosted |
|---------|---------------|-------------|
| **Costo** | ~$0.008/min | $0 (servidores propios) |
| **Paralelismo** | Limitado por plan | 4+ jobs simultáneos |
| **Tiempo CI** | ~20 min (serial) | ~8 min (paralelo) |
| **Cold start** | Sí (VM nueva cada vez) | No (siempre listo) |
| **Cache** | Limitado | Disco local rápido |

**Ahorro estimado**: ~$50-200/mes

```yaml
# Uso en workflows
jobs:
  build:
    runs-on: self-hosted  # En vez de 'ubuntu-latest'
```

Note:
El costo de GitHub Actions puede crecer rápido en repos privados.
Con self-hosted, aprovechamos servidores que ya teníamos.
El cache local hace que pnpm install sea casi instantáneo.

----

<!-- .slide: data-background="#1c1c1c" data-background-transition="fade" -->

### Self-Hosted Runners: Seguridad

> Consideraciones importantes para juniors

<div style="text-align: center; background: #1e1e1e; padding: 20px; border-radius: 10px;">
<svg width="700" height="250" viewBox="0 0 700 250" xmlns="http://www.w3.org/2000/svg">
<!-- Security box -->
<g transform="translate(350, 60)">
<rect x="-320" y="-45" width="640" height="90" rx="10" fill="#2c3e50" stroke="#e74c3c" stroke-width="3"/>
<text x="0" y="-20" text-anchor="middle" fill="#e74c3c" font-size="16" font-weight="bold">Reglas de Seguridad</text>

<g transform="translate(-220, 15)">
<circle cx="0" cy="0" r="8" fill="#e74c3c"/>
<text x="15" y="5" fill="#ecf0f1" font-size="11" text-anchor="start">Solo repos privados</text>
</g>

<g transform="translate(0, 15)">
<circle cx="0" cy="0" r="8" fill="#e74c3c"/>
<text x="15" y="5" fill="#ecf0f1" font-size="11" text-anchor="start">Usuario dedicado (no root)</text>
</g>

<g transform="translate(220, 15)">
<circle cx="0" cy="0" r="8" fill="#e74c3c"/>
<text x="15" y="5" fill="#ecf0f1" font-size="11" text-anchor="start">Secrets en GitHub</text>
</g>
</g>

<!-- Info boxes -->
<g transform="translate(175, 160)">
<rect x="-140" y="-30" width="280" height="70" rx="8" fill="#1a1a2e" stroke="#f1c40f" stroke-width="2"/>
<text x="0" y="-8" text-anchor="middle" fill="#f1c40f" font-size="12" font-weight="bold">Para ustedes (Juniors)</text>
<text x="0" y="12" text-anchor="middle" fill="#ecf0f1" font-size="11">No necesitan acceder a los runners</text>
<text x="0" y="28" text-anchor="middle" fill="#7f8c8d" font-size="10">El CI "simplemente funciona"</text>
</g>

<g transform="translate(525, 160)">
<rect x="-140" y="-30" width="280" height="70" rx="8" fill="#1a1a2e" stroke="#3498db" stroke-width="2"/>
<text x="0" y="-8" text-anchor="middle" fill="#3498db" font-size="12" font-weight="bold">Si el CI falla</text>
<text x="0" y="12" text-anchor="middle" fill="#ecf0f1" font-size="11">Revisen los logs en GitHub Actions</text>
<text x="0" y="28" text-anchor="middle" fill="#7f8c8d" font-size="10">Si persiste, escalen a Platform Team</text>
</g>
</svg>
</div>

Note:
Ustedes no necesitan saber los detalles de los runners.
Lo importante es que sepan que existen y cómo funcionan.
Si ven errores de "runner offline", es problema de infra - escalen.
Nunca intenten conectarse a los servidores directamente.

----

<!-- .slide: data-background="#181818" data-background-transition="fade" -->

### Deploy: Solo Manual

> No hay auto-deploy - siempre requiere acción humana

```bash
# El deploy es via workflow_dispatch (GitHub UI o CLI)
gh workflow run deploy.yml \
  --field app=core-api \
  --field environment=qa-cl \
  --field image_tag=abc123

# O desde GitHub UI:
# Actions → Deploy → Run workflow → Seleccionar opciones
```

**¿Por qué manual?**

| Razón | Explicación |
|-------|-------------|
| **Control** | Decidimos cuándo deployan, no el CI |
| **Validación** | Tiempo para smoke tests manuales |
| **Rollback fácil** | Si algo falla, no hay cascada automática |
| **Multi-país** | Diferentes países pueden estar en diferentes versiones |

Note:
Esto es una decisión consciente - ver ADR-0045.
En BigTech también es común tener deploys manuales para producción.
QA puede ser más automático, pero prod siempre requiere approval.

----

<!-- .slide: data-background="#1c1c1c" data-background-transition="fade" -->

### Deploy: Workflow Completo

> ADR-0045: Flujo detallado de deployment

<div style="text-align: center; background: #1e1e1e; padding: 20px; border-radius: 10px;">
<svg width="800" height="380" viewBox="0 0 800 380" xmlns="http://www.w3.org/2000/svg">
<!-- CI Phase -->
<g transform="translate(150, 50)">
<rect x="-120" y="-35" width="240" height="70" rx="10" fill="#3498db"/>
<text x="0" y="-8" text-anchor="middle" fill="white" font-size="14" font-weight="bold">1. CI Pipeline</text>
<text x="0" y="12" text-anchor="middle" fill="#ecf0f1" font-size="11">Push a main</text>
<text x="0" y="26" text-anchor="middle" fill="#bdc3c7" font-size="10">Lint + Test + Build</text>
</g>

<!-- Arrow -->
<path d="M 270 50 L 330 50" stroke="#555" stroke-width="2" marker-end="url(#arrow)"/>

<!-- Build & Push -->
<g transform="translate(450, 50)">
<rect x="-100" y="-35" width="200" height="70" rx="10" fill="#9b59b6"/>
<text x="0" y="-8" text-anchor="middle" fill="white" font-size="14" font-weight="bold">2. Build & Push</text>
<text x="0" y="12" text-anchor="middle" fill="#ecf0f1" font-size="11">Docker image</text>
<text x="0" y="26" text-anchor="middle" fill="#bdc3c7" font-size="10">→ Artifact Registry</text>
</g>

<!-- Arrow -->
<path d="M 550 50 L 610 50" stroke="#555" stroke-width="2" marker-end="url(#arrow)"/>

<!-- Image Ready -->
<g transform="translate(700, 50)">
<rect x="-70" y="-30" width="140" height="60" rx="30" fill="#27ae60"/>
<text x="0" y="8" text-anchor="middle" fill="white" font-size="12" font-weight="bold">Imagen Lista</text>
</g>

<!-- Manual Barrier -->
<g transform="translate(400, 130)">
<rect x="-380" y="-15" width="760" height="30" rx="0" fill="#e74c3c"/>
<text x="0" y="6" text-anchor="middle" fill="white" font-size="14" font-weight="bold">BARRERA MANUAL - workflow_dispatch</text>
</g>

<!-- Operator Decision -->
<g transform="translate(150, 200)">
<polygon points="0,-40 60,0 0,40 -60,0" fill="#f1c40f"/>
<text x="0" y="5" text-anchor="middle" fill="#2c3e50" font-size="11" font-weight="bold">Operador</text>
</g>

<!-- Arrow to Deploy -->
<path d="M 210 200 L 280 200" stroke="#555" stroke-width="2" marker-end="url(#arrow)"/>
<text x="245" y="190" fill="#7f8c8d" font-size="10">Trigger</text>

<!-- Deploy Box -->
<g transform="translate(400, 200)">
<rect x="-100" y="-40" width="200" height="80" rx="10" fill="#2c3e50" stroke="#3498db" stroke-width="2"/>
<text x="0" y="-15" text-anchor="middle" fill="#3498db" font-size="13" font-weight="bold">3. Deploy</text>
<text x="0" y="5" text-anchor="middle" fill="#ecf0f1" font-size="11">Seleccionar:</text>
<text x="0" y="22" text-anchor="middle" fill="#7f8c8d" font-size="10">app + environment + image_tag</text>
</g>

<!-- Arrow to Health -->
<path d="M 500 200 L 560 200" stroke="#555" stroke-width="2" marker-end="url(#arrow)"/>

<!-- Health Check -->
<g transform="translate(650, 200)">
<rect x="-70" y="-35" width="140" height="70" rx="10" fill="#1abc9c"/>
<text x="0" y="-8" text-anchor="middle" fill="white" font-size="12" font-weight="bold">4. Health Check</text>
<text x="0" y="10" text-anchor="middle" fill="#ecf0f1" font-size="10">Cloud Run</text>
<text x="0" y="24" text-anchor="middle" fill="#bdc3c7" font-size="9">readiness probe</text>
</g>

<!-- Environments -->
<g transform="translate(400, 310)">
<rect x="-350" y="-40" width="700" height="80" rx="10" fill="#1a1a2e" stroke="#34495e" stroke-width="2"/>
<text x="0" y="-15" text-anchor="middle" fill="#ecf0f1" font-size="12" font-weight="bold">Ambientes Disponibles</text>

<g transform="translate(-250, 20)">
<rect x="-50" y="-18" width="100" height="36" rx="5" fill="#3498db"/>
<text x="0" y="5" text-anchor="middle" fill="white" font-size="11">QA</text>
</g>

<g transform="translate(-100, 20)">
<rect x="-50" y="-18" width="100" height="36" rx="5" fill="#f1c40f"/>
<text x="0" y="5" text-anchor="middle" fill="#2c3e50" font-size="11">Staging</text>
</g>

<g transform="translate(50, 20)">
<rect x="-50" y="-18" width="100" height="36" rx="5" fill="#e74c3c"/>
<text x="0" y="5" text-anchor="middle" fill="white" font-size="11">Production</text>
</g>

<g transform="translate(200, 20)">
<text x="0" y="0" text-anchor="middle" fill="#7f8c8d" font-size="10">x3 países</text>
<text x="0" y="15" text-anchor="middle" fill="#7f8c8d" font-size="10">(CL, PE, ES)</text>
</g>
</g>
</svg>
</div>

Note:
El flujo tiene una barrera explícita entre CI y CD.
Ustedes como juniors no harán deploys directamente.
Pero deben saber cómo funciona el proceso.
Si ven que su código no está en QA, pregunten si se hizo deploy.

----

<!-- .slide: data-background="#181818" data-background-transition="fade" -->

### Deploy: Opciones del Workflow

> Parámetros que se seleccionan al hacer deploy

```yaml
# .github/workflows/deploy.yml
on:
  workflow_dispatch:
    inputs:
      app:
        description: 'App a desplegar'
        type: choice
        options:
          - core-api
          - sync-worker
          - report-worker
          - notification-worker
          - all-services
          - all-workers

      environment:
        description: 'Ambiente destino'
        type: choice
        options:
          - qa-cl        # Chile QA
          - qa-pe        # Perú QA
          - qa-es        # España QA
          - staging-cl   # Chile Staging
          - prod-cl      # Chile Producción (requiere approval)
          # ... más ambientes

      image_tag:
        description: 'SHA del commit o versión'
        required: true
```

Note:
Estos son los parámetros que el operador selecciona.
image_tag es el SHA del commit - lo encuentran en GitHub Actions.
Producción tiene protección adicional - GitHub Environments.

----

<!-- .slide: data-background="#1c1c1c" data-background-transition="fade" -->

### Deploy: Protecciones de Producción

> GitHub Environments para control adicional

<div style="text-align: center; background: #1e1e1e; padding: 20px; border-radius: 10px;">
<svg width="750" height="280" viewBox="0 0 750 280" xmlns="http://www.w3.org/2000/svg">
<!-- QA Environment -->
<g transform="translate(150, 80)">
<rect x="-100" y="-50" width="200" height="100" rx="10" fill="#3498db"/>
<text x="0" y="-20" text-anchor="middle" fill="white" font-size="14" font-weight="bold">QA</text>
<text x="0" y="5" text-anchor="middle" fill="#ecf0f1" font-size="11">Sin protección</text>
<text x="0" y="25" text-anchor="middle" fill="#bdc3c7" font-size="10">Deploy inmediato</text>
</g>

<!-- Arrow -->
<path d="M 260 80 L 310 80" stroke="#555" stroke-width="2" marker-end="url(#arrow)"/>

<!-- Staging Environment -->
<g transform="translate(400, 80)">
<rect x="-100" y="-50" width="200" height="100" rx="10" fill="#f1c40f"/>
<text x="0" y="-20" text-anchor="middle" fill="#2c3e50" font-size="14" font-weight="bold">Staging</text>
<text x="0" y="5" text-anchor="middle" fill="#2c3e50" font-size="11">Wait timer: 10min</text>
<text x="0" y="25" text-anchor="middle" fill="#7f8c8d" font-size="10">Tiempo para cancelar</text>
</g>

<!-- Arrow -->
<path d="M 510 80 L 560 80" stroke="#555" stroke-width="2" marker-end="url(#arrow)"/>

<!-- Production Environment -->
<g transform="translate(650, 80)">
<rect x="-100" y="-50" width="200" height="100" rx="10" fill="#e74c3c" stroke="#c0392b" stroke-width="3"/>
<text x="0" y="-20" text-anchor="middle" fill="white" font-size="14" font-weight="bold">Production</text>
<text x="0" y="5" text-anchor="middle" fill="#ecf0f1" font-size="11">Required reviewers</text>
<text x="0" y="25" text-anchor="middle" fill="#bdc3c7" font-size="10">@platform-team</text>
</g>

<!-- Protection details -->
<g transform="translate(375, 200)">
<rect x="-340" y="-40" width="680" height="80" rx="10" fill="#2c3e50"/>
<text x="0" y="-15" text-anchor="middle" fill="#e74c3c" font-size="12" font-weight="bold">Protecciones de Producción</text>
<text x="-220" y="15" fill="#ecf0f1" font-size="11">1. Approval manual requerido</text>
<text x="20" y="15" fill="#ecf0f1" font-size="11">2. Branch protection</text>
<text x="220" y="15" fill="#ecf0f1" font-size="11">3. Audit log</text>
<text x="0" y="40" text-anchor="middle" fill="#7f8c8d" font-size="10">Configurado en GitHub → Settings → Environments</text>
</g>
</svg>
</div>

Note:
QA es libre - cualquiera puede deployar.
Staging tiene un timer - da tiempo para cancelar si fue un error.
Producción requiere que alguien del platform-team apruebe.
Esto es estándar en empresas grandes.

----

<!-- .slide: data-background="#181818" data-background-transition="fade" -->

### Resumen: Tu Día a Día

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         CHECKLIST DEL DESARROLLADOR                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  [ ] 1. ANTES de codear:                                                    │
│       git checkout main && git pull && git checkout -b feature/xxx          │
│                                                                             │
│  [ ] 2. COMMITS con formato:                                                │
│       feat(scope): descripción / fix(scope): descripción                    │
│                                                                             │
│  [ ] 3. PUSH y crear PR:                                                    │
│       git push -u origin feature/xxx && gh pr create                        │
│                                                                             │
│  [ ] 4. ESPERAR CI verde:                                                   │
│       Ver checks en GitHub - todos deben pasar                              │
│                                                                             │
│  [ ] 5. PEDIR review:                                                       │
│       Asignar reviewers (o esperar auto-assign por CODEOWNERS)              │
│                                                                             │
│  [ ] 6. ATENDER feedback:                                                   │
│       Responder comentarios, hacer cambios si es necesario                  │
│                                                                             │
│  [ ] 7. MERGE cuando aprobado:                                              │
│       Squash and merge (botón verde en GitHub)                              │
│                                                                             │
│  [ ] 8. DEPLOY es aparte:                                                   │
│       Coordinar con el equipo para deploys a QA/Prod                        │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

Note:
Este es el flujo que van a repetir cientos de veces.
Memorícenlo.
Si tienen dudas, pregunten ANTES de hacer algo incorrecto.
