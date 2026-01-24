## 🚀 CI/CD Pipeline

> Integración y despliegue continuo

⬇️ _Navega hacia abajo para ver detalles_

Note:
El pipeline de CI/CD es lo que hace que nuestro código llegue a producción de forma segura.
Vamos a ver cómo funciona y qué checks debe pasar un PR.


----

### 🚀 CI/CD Pipeline

> GitHub Actions con GCS Remote Cache y SonarCloud

⬇️ _Navega hacia abajo para ver detalles_

Note:
CI/CD significa Continuous Integration / Continuous Deployment.
Es el proceso automatizado que verifica nuestro código cada vez que hacemos push.
Si todos los checks pasan, el código puede ir a producción.
Esto nos da confianza de que no rompemos nada al hacer cambios.

----

<!-- .slide: data-background="#181818" data-background-transition="fade" -->

### GitHub Actions Workflow

Note:
Este diagrama muestra el pipeline como una línea de producción.
El código pasa por 3 estaciones: Lint (formato y estilo), Test (pruebas), Build (compilar).
Si falla en cualquier estación, el PR no puede mergearse.
Esto garantiza que solo código de calidad llega a producción.

<div style="text-align: center; background: #1e1e1e; padding: 20px; border-radius: 10px;">
<svg width="800" height="250" viewBox="0 0 800 250" xmlns="http://www.w3.org/2000/svg">
<!-- Conveyor Belt Track -->
<line x1="50" y1="180" x2="750" y2="180" stroke="#34495e" stroke-width="4" />
<!-- Moving Belt Dashes -->
<line x1="50" y1="180" x2="750" y2="180" stroke="#7f8c8d" stroke-width="4" stroke-dasharray="20,20">
<animate attributeName="stroke-dashoffset" from="40" to="0" dur="1s" repeatCount="indefinite" />
</line>
<!-- Station 1: Lint (Scanner) -->
<g transform="translate(200, 100)">
<text x="0" y="-30" text-anchor="middle" fill="#ecf0f1" font-size="14" font-weight="bold">Lint</text>
<!-- Scanner Frame -->
<path d="M -30 0 L -30 80 L 30 80 L 30 0" fill="none" stroke="#3498db" stroke-width="3" />
<!-- Laser Beam -->
<line x1="-25" y1="10" x2="25" y2="10" stroke="#e74c3c" stroke-width="2" opacity="0.8">
<animate attributeName="y1" values="10;70;10" dur="1.5s" repeatCount="indefinite" />
<animate attributeName="y2" values="10;70;10" dur="1.5s" repeatCount="indefinite" />
</line>
</g>
<!-- Station 2: Test (Piston) -->
<g transform="translate(400, 80)">
<text x="0" y="-10" text-anchor="middle" fill="#ecf0f1" font-size="14" font-weight="bold">Test</text>
<!-- Cylinder -->
<rect x="-20" y="0" width="40" height="50" fill="#7f8c8d" />
<!-- Piston Head -->
<rect x="-15" y="50" width="30" height="10" fill="#2ecc71">
<animate attributeName="y" values="50;90;50" dur="1.5s" repeatCount="indefinite" />
<animate attributeName="height" values="10;20;10" dur="1.5s" repeatCount="indefinite" />
</rect>
</g>
<!-- Station 3: Build (Packager) -->
<g transform="translate(600, 100)">
<text x="0" y="-30" text-anchor="middle" fill="#ecf0f1" font-size="14" font-weight="bold">Build</text>
<!-- Box Wrapper -->
<rect x="-30" y="0" width="60" height="80" fill="none" stroke="#f1c40f" stroke-width="3" stroke-dasharray="5,5" />
</g>
<!-- Moving Code Box -->
<g>
<!-- The Box -->
<rect x="-20" y="-20" width="40" height="40" fill="#ecf0f1" rx="5" stroke="#2c3e50" stroke-width="2">
<!-- Color changes as it passes stations -->
<animate attributeName="fill" values="#ecf0f1;#3498db;#2ecc71;#f1c40f" keyTimes="0;0.3;0.6;0.9" dur="6s" repeatCount="indefinite" />
</rect>
<text x="0" y="5" text-anchor="middle" fill="#2c3e50" font-size="10" font-weight="bold">Code</text>
<!-- Movement Path -->
<animateMotion path="M 50 160 L 750 160" dur="6s" repeatCount="indefinite" calcMode="linear" />
</g>
<!-- Status Indicators (appear when box passes) -->
<text x="200" y="220" text-anchor="middle" fill="#3498db" font-size="12" opacity="0">
✅ Clean
<animate attributeName="opacity" values="0;1;0" keyTimes="0;0.25;0.35" dur="6s" repeatCount="indefinite" />
</text>
<text x="400" y="220" text-anchor="middle" fill="#2ecc71" font-size="12" opacity="0">
✅ Passed
<animate attributeName="opacity" values="0;0;1;0" keyTimes="0;0.5;0.6;0.7" dur="6s" repeatCount="indefinite" />
</text>
<text x="600" y="220" text-anchor="middle" fill="#f1c40f" font-size="12" opacity="0">
📦 Artifact
<animate attributeName="opacity" values="0;0;1;0" keyTimes="0;0.8;0.9;1" dur="6s" repeatCount="indefinite" />
</text>
</svg>
</div>

----

<!-- .slide: data-background="#1c1c1c" data-background-transition="fade" -->

### Features Enterprise

Note:
Estas son las features avanzadas de nuestro pipeline.
Nx Affected es clave: si solo tocas pricing, solo corren los tests de pricing. Ahorra MUCHO tiempo.
GCS Remote Cache guarda los resultados de compilación en la nube - si otro dev ya compiló lo mismo, reutilizamos.
Quality Gate de SonarCloud bloquea PRs con bugs o vulnerabilidades.
Todo esto es automático - no tienen que hacer nada especial.

- ⚡ **Nx Affected** → Solo analiza código que cambió
- ☁️ **GCS Remote Cache** → Cache distribuido en GCP
- 🔄 **Graceful Degradation** → Fallback a cache local
- 📊 **SonarCloud** → Quality Gate automático
- 📈 **Coverage Reports** → LCOV + JUnit
- 🚦 **Concurrency Control** → Cancela runs duplicados

----

<!-- .slide: data-background="#181818" data-background-transition="fade" -->

### Quality Gates

Note:
Quality Gates son reglas que el código DEBE cumplir para poder mergearse.
80% coverage significa que al menos 80% del código nuevo debe tener tests.
Duplicación baja evita copiar-pegar código.
Las ratings A/B/C/D miden mantenibilidad, confiabilidad y seguridad.
Si falla cualquier criterio, el PR se bloquea. No hay excepciones.
Esto puede parecer estricto, pero previene muchos bugs en producción.

```text
┌─────────────────────────────────────────────┐
│           SONARCLOUD QUALITY GATE           │
│                                             │
│  ✅ New Code Coverage      ≥ 80%           │
│  ✅ Duplicated Lines       ≤ 3%            │
│  ✅ Maintainability Rating = A             │
│  ✅ Reliability Rating     = A             │
│  ✅ Security Rating        = A             │
│  ✅ Security Hotspots      100% reviewed   │
│                                             │
│  ──────────────────────────────────────    │
│  🚦 PASS = Merge allowed                   │
│  🚫 FAIL = Block merge                     │
└─────────────────────────────────────────────┘
```

----

<!-- .slide: data-background="#181818" data-background-transition="fade" -->

### 🚦 Checks: Bloqueantes vs Warnings

<div style="text-align: center;">
<svg width="900" height="400" viewBox="0 0 900 400" xmlns="http://www.w3.org/2000/svg">
  <!-- Título -->
  <text x="450" y="25" text-anchor="middle" fill="#ecf0f1" font-weight="bold" font-size="14">¿Qué pasa cuando tu PR falla un check?</text>

  <!-- === COLUMNA IZQUIERDA: BLOQUEANTES === -->
  <rect x="20" y="45" width="420" height="340" rx="10" fill="#1a252f" stroke="#e74c3c" stroke-width="3"/>
  <rect x="20" y="45" width="420" height="40" rx="10" fill="#e74c3c"/>
  <text x="230" y="72" text-anchor="middle" fill="#fff" font-weight="bold" font-size="14">🚫 BLOQUEANTES (No puedes mergear)</text>

  <!-- Check 1: Tests -->
  <rect x="35" y="100" width="390" height="55" rx="6" fill="#2c3e50"/>
  <rect x="35" y="100" width="8" height="55" rx="3" fill="#e74c3c"/>
  <text x="55" y="122" fill="#e74c3c" font-weight="bold" font-size="11">nx affected -t test</text>
  <text x="55" y="140" fill="#95a5a6" font-size="9">Si un test falla, el PR se bloquea inmediatamente.</text>
  <text x="380" y="130" text-anchor="end" fill="#e74c3c" font-size="10">REQUIRED</text>

  <!-- Check 2: Lint -->
  <rect x="35" y="165" width="390" height="55" rx="6" fill="#2c3e50"/>
  <rect x="35" y="165" width="8" height="55" rx="3" fill="#e74c3c"/>
  <text x="55" y="187" fill="#e74c3c" font-weight="bold" font-size="11">nx affected -t lint</text>
  <text x="55" y="205" fill="#95a5a6" font-size="9">Errores de ESLint bloquean. Usa 'pnpm lint:fix' para arreglar.</text>
  <text x="380" y="195" text-anchor="end" fill="#e74c3c" font-size="10">REQUIRED</text>

  <!-- Check 3: Build -->
  <rect x="35" y="230" width="390" height="55" rx="6" fill="#2c3e50"/>
  <rect x="35" y="230" width="8" height="55" rx="3" fill="#e74c3c"/>
  <text x="55" y="252" fill="#e74c3c" font-weight="bold" font-size="11">nx affected -t build</text>
  <text x="55" y="270" fill="#95a5a6" font-size="9">Errores de TypeScript o build bloquean el merge.</text>
  <text x="380" y="260" text-anchor="end" fill="#e74c3c" font-size="10">REQUIRED</text>

  <!-- Check 4: SonarCloud -->
  <rect x="35" y="295" width="390" height="55" rx="6" fill="#2c3e50"/>
  <rect x="35" y="295" width="8" height="55" rx="3" fill="#e74c3c"/>
  <text x="55" y="317" fill="#e74c3c" font-weight="bold" font-size="11">SonarCloud Quality Gate</text>
  <text x="55" y="335" fill="#95a5a6" font-size="9">Coverage < 80% o issues críticos bloquean el PR.</text>
  <text x="380" y="325" text-anchor="end" fill="#e74c3c" font-size="10">REQUIRED</text>

  <!-- === COLUMNA DERECHA: WARNINGS === -->
  <rect x="460" y="45" width="420" height="340" rx="10" fill="#1a252f" stroke="#f39c12" stroke-width="2"/>
  <rect x="460" y="45" width="420" height="40" rx="10" fill="#f39c12"/>
  <text x="670" y="72" text-anchor="middle" fill="#fff" font-weight="bold" font-size="14">⚠️ WARNINGS (Puedes mergear, pero revisa)</text>

  <!-- Warning 1: Prettier format check -->
  <rect x="475" y="100" width="390" height="55" rx="6" fill="#2c3e50"/>
  <rect x="475" y="100" width="8" height="55" rx="3" fill="#f39c12"/>
  <text x="495" y="122" fill="#f39c12" font-weight="bold" font-size="11">prettier --check</text>
  <text x="495" y="140" fill="#95a5a6" font-size="9">Formatting incorrecto. Usa 'pnpm format' antes de push.</text>
  <text x="820" y="130" text-anchor="end" fill="#f39c12" font-size="10">WARNING</text>

  <!-- Warning 2: Bundle size -->
  <rect x="475" y="165" width="390" height="55" rx="6" fill="#2c3e50"/>
  <rect x="475" y="165" width="8" height="55" rx="3" fill="#f39c12"/>
  <text x="495" y="187" fill="#f39c12" font-weight="bold" font-size="11">Bundle Size Check</text>
  <text x="495" y="205" fill="#95a5a6" font-size="9">Alerta si el bundle crece > 5%. Revisa imports innecesarios.</text>
  <text x="820" y="195" text-anchor="end" fill="#f39c12" font-size="10">WARNING</text>

  <!-- Warning 3: Dependency review -->
  <rect x="475" y="230" width="390" height="55" rx="6" fill="#2c3e50"/>
  <rect x="475" y="230" width="8" height="55" rx="3" fill="#f39c12"/>
  <text x="495" y="252" fill="#f39c12" font-weight="bold" font-size="11">Dependency Review</text>
  <text x="495" y="270" fill="#95a5a6" font-size="9">Nuevas deps con vulnerabilidades conocidas. Requiere aprobación.</text>
  <text x="820" y="260" text-anchor="end" fill="#f39c12" font-size="10">WARNING</text>

  <!-- Warning 4: CodeRabbit (opcional) -->
  <rect x="475" y="295" width="390" height="55" rx="6" fill="#2c3e50"/>
  <rect x="475" y="295" width="8" height="55" rx="3" fill="#3498db"/>
  <text x="495" y="317" fill="#3498db" font-weight="bold" font-size="11">CodeRabbit AI Review</text>
  <text x="495" y="335" fill="#95a5a6" font-size="9">Sugerencias de AI. Informativo, no bloquea.</text>
  <text x="820" y="325" text-anchor="end" fill="#3498db" font-size="10">INFO</text>
</svg>
</div>

<p style="font-size: 0.5em; color: #95a5a6; margin-top: 5px;">Rojo = No puedes mergear hasta arreglar • Amarillo = Puedes mergear pero deberías revisar • Azul = Informativo</p>

Note:
**Checks Bloqueantes vs Warnings - Referencia Rápida para Juniors**

**¿Por qué algunos checks bloquean y otros no?**

Los **bloqueantes** son checks que garantizan que el código funciona:

- Tests: Si fallan, algo está roto
- Lint: Errores de código que pueden causar bugs
- Build: El código no compila
- SonarCloud: Vulnerabilidades o deuda técnica crítica

Los **warnings** son informativos pero no garantizan que algo está roto:

- Formatting: Estilo, no funcionalidad
- Bundle size: Performance, pero subjetivo
- Dependency review: Requiere evaluación humana

**Cómo ver el estado de los checks:**

1. Abre tu PR en GitHub
2. Scroll hasta la sección "Checks"
3. Los rojos con ❌ son bloqueantes
4. Los amarillos con ⚠️ son warnings
5. Click en "Details" para ver logs

**Comandos para arreglar antes de push:**

```bash
pnpm lint:fix        # Arregla errores de ESLint
pnpm format          # Arregla formatting Prettier
pnpm test:affected   # Corre tests localmente
```

----

<!-- .slide: data-background="#181818" data-background-transition="fade" -->

### 📋 Flujo Completo: Push → Merge

<div style="text-align: center;">
<svg width="900" height="380" viewBox="0 0 900 380" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="ci-flow-arr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
      <path d="M0,0 L6,3 L0,6 z" fill="#3498db"/>
    </marker>
    <marker id="ci-flow-arr-red" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
      <path d="M0,0 L6,3 L0,6 z" fill="#e74c3c"/>
    </marker>
    <marker id="ci-flow-arr-green" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
      <path d="M0,0 L6,3 L0,6 z" fill="#2ecc71"/>
    </marker>
  </defs>

  <!-- Timeline -->
  <line x1="50" y1="60" x2="850" y2="60" stroke="#34495e" stroke-width="3"/>

  <!-- Step 1: Git Push -->
  <circle cx="100" cy="60" r="20" fill="#9b59b6"/>
  <text x="100" y="65" text-anchor="middle" fill="#fff" font-weight="bold" font-size="10">1</text>
  <text x="100" y="95" text-anchor="middle" fill="#ecf0f1" font-size="10">git push</text>
  <text x="100" y="110" text-anchor="middle" fill="#95a5a6" font-size="8">Tu código</text>

  <!-- Step 2: CI Trigger -->
  <circle cx="220" cy="60" r="20" fill="#3498db"/>
  <text x="220" y="65" text-anchor="middle" fill="#fff" font-weight="bold" font-size="10">2</text>
  <text x="220" y="95" text-anchor="middle" fill="#ecf0f1" font-size="10">CI Trigger</text>
  <text x="220" y="110" text-anchor="middle" fill="#95a5a6" font-size="8">Automático</text>

  <!-- Step 3: Parallel Jobs -->
  <rect x="300" y="35" width="200" height="120" rx="8" fill="#1a252f" stroke="#3498db" stroke-width="2"/>
  <text x="400" y="25" text-anchor="middle" fill="#3498db" font-weight="bold" font-size="10">PARALELO (~3 min)</text>

  <!-- Job boxes inside -->
  <rect x="315" y="50" width="80" height="25" rx="4" fill="#2c3e50"/>
  <text x="355" y="67" text-anchor="middle" fill="#ecf0f1" font-size="8">Lint</text>

  <rect x="315" y="85" width="80" height="25" rx="4" fill="#2c3e50"/>
  <text x="355" y="102" text-anchor="middle" fill="#ecf0f1" font-size="8">Test</text>

  <rect x="315" y="120" width="80" height="25" rx="4" fill="#2c3e50"/>
  <text x="355" y="137" text-anchor="middle" fill="#ecf0f1" font-size="8">Build</text>

  <rect x="405" y="50" width="80" height="25" rx="4" fill="#2c3e50"/>
  <text x="445" y="67" text-anchor="middle" fill="#ecf0f1" font-size="8">SonarCloud</text>

  <rect x="405" y="85" width="80" height="25" rx="4" fill="#2c3e50"/>
  <text x="445" y="102" text-anchor="middle" fill="#ecf0f1" font-size="8">Format Check</text>

  <rect x="405" y="120" width="80" height="25" rx="4" fill="#2c3e50"/>
  <text x="445" y="137" text-anchor="middle" fill="#ecf0f1" font-size="8">Bundle Size</text>

  <!-- Step 4: Decision -->
  <polygon points="580,60 620,35 660,60 620,85" fill="#f39c12" stroke="#e67e22" stroke-width="2"/>
  <text x="620" y="65" text-anchor="middle" fill="#fff" font-weight="bold" font-size="9">?</text>
  <text x="620" y="105" text-anchor="middle" fill="#ecf0f1" font-size="9">¿Pasó todo?</text>

  <!-- Branch: SUCCESS -->
  <path d="M 660 50 L 720 50 L 720 180" stroke="#2ecc71" stroke-width="2" fill="none" marker-end="url(#ci-flow-arr-green)"/>
  <text x="730" y="115" fill="#2ecc71" font-size="9">SÍ</text>

  <!-- Branch: FAIL -->
  <path d="M 660 70 L 720 70 L 720 260" stroke="#e74c3c" stroke-width="2" fill="none" marker-end="url(#ci-flow-arr-red)"/>
  <text x="730" y="165" fill="#e74c3c" font-size="9">NO</text>

  <!-- SUCCESS PATH -->
  <rect x="680" y="190" width="180" height="70" rx="8" fill="#1a252f" stroke="#2ecc71" stroke-width="2"/>
  <text x="770" y="215" text-anchor="middle" fill="#2ecc71" font-weight="bold" font-size="11">✅ Ready to Merge</text>
  <text x="770" y="235" text-anchor="middle" fill="#95a5a6" font-size="9">Solicita review de equipo</text>
  <text x="770" y="250" text-anchor="middle" fill="#95a5a6" font-size="8">→ Squash & Merge</text>

  <!-- FAIL PATH -->
  <rect x="680" y="270" width="180" height="90" rx="8" fill="#1a252f" stroke="#e74c3c" stroke-width="2"/>
  <text x="770" y="295" text-anchor="middle" fill="#e74c3c" font-weight="bold" font-size="11">❌ Checks Failed</text>
  <text x="770" y="315" text-anchor="middle" fill="#95a5a6" font-size="9">1. Click "Details" en GitHub</text>
  <text x="770" y="330" text-anchor="middle" fill="#95a5a6" font-size="9">2. Lee el log del error</text>
  <text x="770" y="345" text-anchor="middle" fill="#95a5a6" font-size="9">3. Fix + push → CI re-runs</text>

  <!-- Arrows connecting steps -->
  <path d="M 120 60 L 200 60" stroke="#3498db" stroke-width="2" marker-end="url(#ci-flow-arr)"/>
  <path d="M 240 60 L 300 60" stroke="#3498db" stroke-width="2" marker-end="url(#ci-flow-arr)"/>
  <path d="M 500 60 L 580 60" stroke="#3498db" stroke-width="2" marker-end="url(#ci-flow-arr)"/>

  <!-- Tip box -->
  <rect x="50" y="180" width="220" height="80" rx="8" fill="#2c3e50" stroke="#1abc9c" stroke-width="1"/>
  <text x="160" y="205" text-anchor="middle" fill="#1abc9c" font-weight="bold" font-size="10">💡 Pro Tip para Juniors</text>
  <text x="60" y="225" fill="#95a5a6" font-size="8">Antes de push, corre localmente:</text>
  <text x="60" y="240" fill="#1abc9c" font-size="8" font-family="monospace">pnpm nx affected -t test,lint</text>
  <text x="60" y="255" fill="#95a5a6" font-size="8">Así evitas esperar 3 min por CI</text>

  <!-- Time indicator -->
  <rect x="50" y="280" width="220" height="50" rx="8" fill="#2c3e50"/>
  <text x="160" y="302" text-anchor="middle" fill="#ecf0f1" font-size="10">⏱️ Tiempos típicos:</text>
  <text x="160" y="320" text-anchor="middle" fill="#95a5a6" font-size="9">Sin cache: ~5 min • Con cache: ~2 min</text>
</svg>
</div>

Note:
**Flujo Completo de CI - Lo que pasa cuando haces push**

**Timeline detallado:**

1. **git push** (0s)
   - Tu código sube a GitHub
   - GitHub detecta el push y dispara el workflow

2. **CI Trigger** (5-10s)
   - GitHub Actions inicia los runners
   - Se prepara el ambiente (checkout, pnpm install)

3. **Jobs en Paralelo** (~3 min)
   - **Lint**: ESLint + Prettier check
   - **Test**: Vitest con Nx affected
   - **Build**: TypeScript compilation
   - **SonarCloud**: Análisis estático
   - **Format Check**: Prettier verification
   - **Bundle Size**: Compara con main

4. **Decisión automática**
   - Todos los REQUIRED pasan → ✅ Merge enabled
   - Algún REQUIRED falla → ❌ Merge blocked

**Qué hacer cuando falla:**

```bash
# 1. Ve a GitHub → tu PR → Checks → Click "Details" del check rojo
# 2. Lee el log - busca la línea con "Error:" o "FAILED"
# 3. Arregla localmente:
pnpm lint:fix                    # Si falla Lint
pnpm test:affected               # Si falla Test
pnpm nx build <proyecto>         # Si falla Build

# 4. Commit y push - CI corre de nuevo automáticamente
git add . && git commit -m "fix: resolve CI errors" && git push
```

**Cache de Nx:**

- Primera vez: ~5 min (sin cache)
- Segunda vez: ~2 min (con GCS cache)
- Solo archivos cambiados: Aún más rápido

----

<!-- .slide: data-background="#1c1c1c" data-background-transition="fade" -->

### Renovate - Dependency Management

Note:
Renovate es un bot que mantiene las dependencias actualizadas automáticamente.
Cada semana crea PRs para actualizar paquetes con nuevas versiones.
Esto es importante por seguridad - las nuevas versiones arreglan vulnerabilidades.
Los PRs corren todos los tests, así que si algo se rompe, lo detectamos antes de mergear.
Es mucho mejor que actualizar manualmente una vez al año con 100 cambios acumulados.

<div style="display: flex; justify-content: space-between; gap: 20px;">
<div style="flex: 1; background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); padding: 20px; border-radius: 10px; border: 1px solid #0f3460;">

**¿Qué es Renovate?**

Bot que automatiza actualizaciones de dependencias:

- 📦 **npm packages** → NestJS, Angular, Nx
- 🐳 **Docker images** → Base images, distroless
- 🔧 **GitHub Actions** → Versiones de actions
- 🔒 **Security patches** → CVEs críticos

</div>
<div style="flex: 1; background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); padding: 20px; border-radius: 10px; border: 1px solid #0f3460;">

**Configuración Enterprise**

```json
{
  "schedule": ["before 6am on monday"],
  "automerge": true,  // para patches
  "groupName": "nestjs",
  "labels": ["dependencies"]
}
```

</div>
</div>

----

<!-- .slide: data-background="#181818" data-background-transition="fade" -->

### Renovate - Flujo Automatizado

```
┌─────────────────────────────────────────────────────────────────┐
│                    RENOVATE WORKFLOW                             │
│                                                                  │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐  │
│  │  Scan    │───▶│  Create  │───▶│   CI     │───▶│  Merge   │  │
│  │  Deps    │    │   PR     │    │  Tests   │    │  Auto    │  │
│  └──────────┘    └──────────┘    └──────────┘    └──────────┘  │
│       │               │               │               │         │
│       ▼               ▼               ▼               ▼         │
│  Detecta         Agrupa por      Ejecuta        Auto-merge      │
│  versiones       ecosistema      pipeline       si pasa CI      │
│  nuevas          (NestJS,        completo       (patches)       │
│                  Angular...)                                    │
│                                                                  │
│  ────────────────────────────────────────────────────────────   │
│                                                                  │
│  📋 Grupos configurados:                                         │
│     • nestjs        → @nestjs/*                                 │
│     • angular       → @angular/*                                │
│     • nx-monorepo   → @nx/*, nx                                 │
│     • typescript    → typescript, @types/*                      │
│     • testing       → vitest, playwright                        │
│     • observability → @opentelemetry/*, @sentry/*               │
│                                                                  │
│  🔒 Security: Updates críticos se aplican inmediatamente        │
└─────────────────────────────────────────────────────────────────┘
```

----

<!-- .slide: data-background="#1c1c1c" data-background-transition="fade" -->

### Renovate vs Dependabot

| Característica | Renovate | Dependabot |
|---------------|----------|------------|
| **Agrupación de PRs** | ✅ Flexible | ❌ Un PR por dep |
| **Regex Managers** | ✅ Dockerfiles, configs | ❌ No |
| **Scheduling** | ✅ Cron completo | ⚠️ Limitado |
| **Auto-merge** | ✅ Nativo | ⚠️ Requiere Actions |
| **Monorepo Support** | ✅ Excelente | ⚠️ Básico |
| **Base Images** | ✅ Custom regex | ❌ No soportado |

> _Usamos Renovate por su superior soporte para monorepos y custom managers_
