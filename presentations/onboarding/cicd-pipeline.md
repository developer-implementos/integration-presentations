---
title: CI/CD Pipeline
theme: black
highlightTheme: monokai
revealOptions:
  transition: slide
  backgroundTransition: fade
  controls: true
  progress: true
  center: true
  hash: true
  slideNumber: true
  navigationMode: default
  mermaid:
    theme: dark
---

# CI/CD Pipeline

### Integracion y despliegue continuo

Note:
Esta presentacion cubre el pipeline de CI/CD.
Explica que pasa despues de hacer push y como llega el codigo a produccion.

---

## 📋 Agenda

1. **🔧 GitHub Actions** - Nuestro pipeline
2. **⚡ Nx Affected** - Optimizacion inteligente
3. **🛡️ Quality Gates** - SonarCloud
4. **✅ Checks** - Bloqueantes vs Warnings
5. **📦 Renovate** - Dependencias automaticas

---

## 🚀 El Pipeline

> Que pasa cuando haces `git push`

⬇️ _Navega hacia abajo para ver detalles_

Note:
El pipeline de CI/CD es lo que hace que nuestro codigo llegue a produccion de forma segura.
Vamos a ver como funciona y que checks debe pasar un PR.

---

## 🔧 GitHub Actions

> El motor de nuestro CI/CD

⬇️ _Navega hacia abajo para ver detalles_

Note:
CI/CD significa Continuous Integration / Continuous Deployment.
Es el proceso automatizado que verifica nuestro codigo cada vez que hacemos push.

----

<!-- .slide: data-background="#181818" data-background-transition="fade" -->

### Workflow Visual

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
<!-- Status Indicators -->
<text x="200" y="220" text-anchor="middle" fill="#3498db" font-size="12" opacity="0">
Clean
<animate attributeName="opacity" values="0;1;0" keyTimes="0;0.25;0.35" dur="6s" repeatCount="indefinite" />
</text>
<text x="400" y="220" text-anchor="middle" fill="#2ecc71" font-size="12" opacity="0">
Passed
<animate attributeName="opacity" values="0;0;1;0" keyTimes="0;0.5;0.6;0.7" dur="6s" repeatCount="indefinite" />
</text>
<text x="600" y="220" text-anchor="middle" fill="#f1c40f" font-size="12" opacity="0">
Artifact
<animate attributeName="opacity" values="0;0;1;0" keyTimes="0;0.8;0.9;1" dur="6s" repeatCount="indefinite" />
</text>
</svg>
</div>

Note:
Este diagrama muestra el pipeline como una linea de produccion.
El codigo pasa por 3 estaciones: Lint, Test, Build.
Si falla en cualquier estacion, el PR no puede mergearse.

----

<!-- .slide: data-background="#1c1c1c" data-background-transition="fade" -->

### Jobs en Paralelo

```text
┌─────────────────────────────────────────────┐
│           GITHUB ACTIONS CI                 │
│                                             │
│    ┌─────────┐  ┌─────────┐  ┌─────────┐   │
│    │  Lint   │  │  Test   │  │  Build  │   │
│    │ ESLint  │  │ Vitest  │  │   Nx    │   │
│    └────┬────┘  └────┬────┘  └────┬────┘   │
│         │            │            │         │
│         └────────────┼────────────┘         │
│                      ▼                      │
│              ┌─────────────┐                │
│              │  SonarCloud │                │
│              │  Analysis   │                │
│              └─────────────┘                │
└─────────────────────────────────────────────┘
```

**Tiempo tipico**: ~3 minutos (con cache)

---

## ⚡ Features Enterprise

> Optimizaciones que aceleran el desarrollo

⬇️ _Navega hacia abajo para ver detalles_

----

<!-- .slide: data-background="#181818" data-background-transition="fade" -->

### Nx Affected

Solo analiza y ejecuta lo que cambio:

```bash
# En lugar de correr TODO:
pnpm test              # Corre TODOS los tests (~15 min)

# Nx Affected corre solo lo necesario:
pnpm test:affected     # Solo tests de codigo modificado (~2 min)
```

**Resultado**: 4-5x mas rapido

Note:
Nx Affected es clave: si solo tocas pricing, solo corren los tests de pricing.
Ahorra MUCHO tiempo tanto en CI como localmente.

----

<!-- .slide: data-background="#1c1c1c" data-background-transition="fade" -->

### GCS Remote Cache

```text
┌─────────────────────────────────────────────┐
│           GCS REMOTE CACHE                  │
│                                             │
│   Developer A                Developer B    │
│       │                          │          │
│       │  build inventory         │          │
│       ▼                          │          │
│   ┌───────┐                      │          │
│   │ Build │ ──────────────────►  │          │
│   └───────┘     Upload cache     │          │
│                      │           │          │
│              ┌───────▼───────┐   │          │
│              │  GCS Bucket   │   │          │
│              │ nx-cache-prod │   │          │
│              └───────┬───────┘   │          │
│                      │           │          │
│                Download cache    │          │
│                      │           ▼          │
│                      └────► ┌───────┐       │
│                             │ Cache │       │
│                             │  Hit! │       │
│                             └───────┘       │
│                                             │
│   Sin cache: ~5 min    Con cache: ~30 seg   │
└─────────────────────────────────────────────┘
```

Note:
GCS Remote Cache guarda los resultados de compilacion en la nube.
Si otro dev ya compilo lo mismo, reutilizamos el resultado.

----

<!-- .slide: data-background="#181818" data-background-transition="fade" -->

### Lista de Features

| Feature | Descripcion |
|---------|-------------|
| **Nx Affected** | Solo analiza codigo que cambio |
| **GCS Remote Cache** | Cache distribuido en GCP |
| **Graceful Degradation** | Fallback a cache local |
| **SonarCloud** | Quality Gate automatico |
| **Coverage Reports** | LCOV + JUnit |
| **Concurrency Control** | Cancela runs duplicados |

---

## 🛡️ Quality Gates

> SonarCloud: el guardian de la calidad

⬇️ _Navega hacia abajo para ver detalles_

----

<!-- .slide: data-background="#1c1c1c" data-background-transition="fade" -->

### Criterios de Calidad

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
│  PASS = Merge allowed                       │
│  FAIL = Merge blocked                       │
└─────────────────────────────────────────────┘
```

Note:
Quality Gates son reglas que el codigo DEBE cumplir para poder mergearse.
80% coverage significa que al menos 80% del codigo nuevo debe tener tests.

----

<!-- .slide: data-background="#181818" data-background-transition="fade" -->

### Por Que 80% Coverage?

```text
┌─────────────────────────────────────────────┐
│  Coverage vs Confianza                      │
│                                             │
│  100% ████████████████████████ Perfecto     │
│   80% ████████████████░░░░░░░░ Optimo       │
│   60% ████████████░░░░░░░░░░░░ Aceptable    │
│   40% ████████░░░░░░░░░░░░░░░░ Riesgoso     │
│   20% ████░░░░░░░░░░░░░░░░░░░░ Peligroso    │
│                                             │
│  80% es el punto optimo:                    │
│  - Cubre casos importantes                  │
│  - No es tan estricto que bloquee           │
│  - Permite edge cases sin test              │
└─────────────────────────────────────────────┘
```

---

## ✅ Checks

> Bloqueantes vs Warnings

⬇️ _Navega hacia abajo para ver detalles_

----

<!-- .slide: data-background="#1c1c1c" data-background-transition="fade" -->

### Checks Bloqueantes

Estos DEBEN pasar para poder mergear:

| Check | Comando | Que verifica |
|-------|---------|--------------|
| **Lint** | `nx affected -t lint` | ESLint sin errores |
| **Test** | `nx affected -t test` | Tests unitarios |
| **Build** | `nx affected -t build` | Compila sin errores |
| **SonarCloud** | Automatico | Quality gate |

```bash
# Si falla, corre localmente:
pnpm lint:fix        # Arregla errores de ESLint
pnpm test:affected   # Corre tests
```

----

<!-- .slide: data-background="#181818" data-background-transition="fade" -->

### Warnings (No Bloquean)

Puedes mergear, pero deberias revisar:

| Check | Que indica |
|-------|------------|
| **Prettier** | Formato incorrecto |
| **Bundle Size** | Bundle crecio > 5% |
| **Dependency Review** | Nueva dep con vulnerabilidad |

```bash
# Para arreglar antes de push:
pnpm format          # Arregla Prettier
```

----

<!-- .slide: data-background="#1c1c1c" data-background-transition="fade" -->

### Resumen Visual

```text
┌────────────────────────┬────────────────────────┐
│   BLOQUEANTES          │   WARNINGS             │
│   (No merge sin fix)   │   (Merge con cuidado)  │
├────────────────────────┼────────────────────────┤
│ ❌ nx affected -t test │ ⚠️ prettier --check    │
│ ❌ nx affected -t lint │ ⚠️ bundle size check   │
│ ❌ nx affected -t build│ ⚠️ dependency review   │
│ ❌ SonarCloud QG       │ ℹ️ CodeRabbit AI       │
└────────────────────────┴────────────────────────┘
```

---

## 🔄 Flujo Completo

> Push → Merge paso a paso

⬇️ _Navega hacia abajo para ver detalles_

----

<!-- .slide: data-background="#181818" data-background-transition="fade" -->

### Timeline

```text
┌─────────────────────────────────────────────────────┐
│  1. git push                                        │
│     └─► GitHub detecta push, dispara workflow       │
│                                                     │
│  2. CI Trigger (~10 seg)                            │
│     └─► Checkout, pnpm install, prepare             │
│                                                     │
│  3. Jobs en Paralelo (~3 min)                       │
│     ├─► Lint (ESLint)                               │
│     ├─► Test (Vitest + coverage)                    │
│     ├─► Build (TypeScript)                          │
│     └─► SonarCloud (analisis estatico)              │
│                                                     │
│  4. Decision                                        │
│     ├─► TODO OK → ✅ Ready to merge                 │
│     └─► ALGO FALLO → ❌ Blocked                     │
└─────────────────────────────────────────────────────┘
```

----

<!-- .slide: data-background="#1c1c1c" data-background-transition="fade" -->

### Cuando Falla el CI

```bash
# 1. Ve a GitHub → tu PR → Checks
# 2. Click "Details" en el check rojo
# 3. Lee el log - busca "Error:" o "FAILED"

# 4. Arregla localmente:
pnpm lint:fix                    # Si falla Lint
pnpm test:affected               # Si falla Test
pnpm nx build <proyecto>         # Si falla Build

# 5. Commit y push - CI corre de nuevo
git add . && git commit -m "fix: resolve CI errors"
git push
```

----

<!-- .slide: data-background="#181818" data-background-transition="fade" -->

### Tiempos Tipicos

| Escenario | Tiempo |
|-----------|--------|
| Sin cache, todo el repo | ~5-7 min |
| Con GCS cache | ~2-3 min |
| Solo archivos afectados | ~1-2 min |
| Cache hit completo | ~30 seg |

**Pro tip**: Corre `pnpm test:affected` localmente antes de push

---

## 📦 Renovate

> Dependencias siempre actualizadas

⬇️ _Navega hacia abajo para ver detalles_

Note:
Renovate es un bot que mantiene las dependencias actualizadas automaticamente.

----

<!-- .slide: data-background="#1c1c1c" data-background-transition="fade" -->

### Que es Renovate?

Bot que automatiza actualizaciones:

| Tipo | Ejemplos |
|------|----------|
| **npm packages** | NestJS, Angular, Nx |
| **Docker images** | Base images, distroless |
| **GitHub Actions** | Versiones de actions |
| **Security patches** | CVEs criticos |

----

<!-- .slide: data-background="#181818" data-background-transition="fade" -->

### Flujo Automatizado

```text
┌─────────────────────────────────────────────────────┐
│                 RENOVATE WORKFLOW                   │
│                                                     │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌─────┐ │
│  │  Scan    │─▶│  Create  │─▶│   CI     │─▶│Merge│ │
│  │  Deps    │  │   PR     │  │  Tests   │  │Auto │ │
│  └──────────┘  └──────────┘  └──────────┘  └─────┘ │
│       │             │             │           │     │
│       ▼             ▼             ▼           ▼     │
│   Detecta       Agrupa por    Ejecuta    Auto-merge │
│   versiones     ecosistema    pipeline   si pasa CI │
│   nuevas        (NestJS...)   completo   (patches)  │
└─────────────────────────────────────────────────────┘
```

----

<!-- .slide: data-background="#1c1c1c" data-background-transition="fade" -->

### Configuracion

```json
{
  "schedule": ["before 6am on monday"],
  "automerge": true,
  "groupName": "all non-major",
  "packageRules": [
    {
      "matchUpdateTypes": ["patch", "minor"],
      "automerge": true
    },
    {
      "matchUpdateTypes": ["major"],
      "automerge": false
    }
  ]
}
```

**Estrategia**: Patches auto-merge, majors requieren review

----

<!-- .slide: data-background="#181818" data-background-transition="fade" -->

### Renovate vs Dependabot

| Caracteristica | Renovate | Dependabot |
|---------------|----------|------------|
| **Agrupacion de PRs** | Flexible | Un PR por dep |
| **Monorepo Support** | Excelente | Basico |
| **Auto-merge** | Nativo | Requiere Actions |
| **Custom Managers** | Dockerfiles, etc | No |

> Usamos Renovate por su superior soporte para monorepos

---

## ⌨️ Comandos Utiles

> Tu referencia rapida

⬇️ _Navega hacia abajo para ver detalles_

----

<!-- .slide: data-background="#1c1c1c" data-background-transition="fade" -->

### Antes de Push

```bash
# Validar todo localmente (recomendado)
pnpm lint:fix        # Arregla lint automaticamente
pnpm format          # Formatea con Prettier
pnpm test:affected   # Tests de codigo modificado
pnpm typecheck       # Verifica tipos TypeScript

# Verificar que build funciona
pnpm nx build <app>  # Build especifico
```

----

<!-- .slide: data-background="#181818" data-background-transition="fade" -->

### Debugging CI

```bash
# Ver que proyectos estan afectados
pnpm nx show projects --affected

# Correr exactamente lo que corre CI
pnpm nx affected -t lint,test,build

# Ver el grafo de dependencias
pnpm nx graph
```

---

## 📝 Resumen

> Lo esencial de CI/CD

⬇️ _Navega hacia abajo para ver detalles_

----

<!-- .slide: data-background="#1c1c1c" data-background-transition="fade" -->

### Checklist

| Concepto | Lo Importante |
|----------|--------------|
| **Pipeline** | Lint → Test → Build → SonarCloud |
| **Nx Affected** | Solo corre lo que cambio (4-5x rapido) |
| **Quality Gate** | 80% coverage, 0 bugs criticos |
| **Bloqueantes** | lint, test, build, sonar |
| **Renovate** | Deps actualizadas automaticamente |

----

<!-- .slide: data-background="#181818" data-background-transition="fade" -->

### Tu Flujo

```bash
# 1. Desarrolla tu feature
# 2. Antes de push, valida localmente:
pnpm lint:fix && pnpm test:affected

# 3. Push y crea PR
git push

# 4. CI corre automaticamente
# 5. Si falla, lee logs y arregla
# 6. Cuando todo pasa → merge!
```

---

# 🙏 Gracias

Note:
Si tienen dudas sobre CI/CD, revisen los logs de GitHub Actions.
Siempre pueden preguntar en Slack #dev-help.
