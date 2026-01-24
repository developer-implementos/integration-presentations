# Presentaciones de Integración

Material de capacitación para developers del equipo Core API y partners de integración.

## Quick Start

```bash
# Levantar una presentación (tema oscuro recomendado)
npx reveal-md presentations/developer-workflow.md --theme night

# Abrir en puerto específico
npx reveal-md presentations/developer-workflow.md --theme night --port 3000
```

## Presentaciones Disponibles

### Presentaciones Standalone (Recomendadas)

Presentaciones autocontenidas, listas para usar:

| Presentacion | Archivo | Audiencia | Duracion |
|--------------|---------|-----------|----------|
| **Monorepo Overview** | [core-monorepo-overview.md](presentations/core-monorepo-overview.md) | Nuevos | ~30 min |
| **Local Development** | [local-development.md](presentations/local-development.md) | Nuevos | ~45 min |
| **Developer Workflow** | [developer-workflow.md](presentations/developer-workflow.md) | Todos | ~45 min |
| **CI/CD Pipeline** | [cicd-pipeline.md](presentations/cicd-pipeline.md) | Todos | ~45 min |
| **Testing Patterns** | [testing-patterns.md](presentations/testing-patterns.md) | Todos | ~60 min |
| **Clean Architecture** | [clean-architecture.md](presentations/clean-architecture.md) | Todos | ~45 min |
| **Angular Moderno** | [angular-moderno.md](presentations/angular-moderno.md) | Frontend | ~60 min |
| **Por Qué Monolito Modular** | [why-modular-monolith.md](presentations/why-modular-monolith.md) | Todos | ~20 min |
| **Patrones Enterprise** | [enterprise-patterns.md](presentations/enterprise-patterns.md) | Avanzados | ~45 min |
| **Infraestructura GCP** | [infrastructure-gcp.md](presentations/infrastructure-gcp.md) | DevOps/Architects | ~30 min |

### Descripcion de Cada Presentacion

#### Local Development

Setup del entorno de desarrollo local desde cero.

**Contenido:**

- Prerequisitos (Node, pnpm, Docker)
- Instalacion paso a paso
- Docker Compose (MongoDB, Redis)
- Variables de entorno (.env.dev)
- Comandos Nx esenciales
- Debugging en VS Code
- Troubleshooting de problemas comunes

**Levantar:**

```bash
npx reveal-md presentations/local-development.md --theme night
```

---

#### Developer Workflow

Tu dia a dia como developer: commits, branches, PRs, code review.

**Contenido:**
- Conventional Commits (formato obligatorio)
- AI-Assisted Commits (GitLens/Copilot configurados)
- Nomenclatura de branches
- Crear PRs desde VS Code
- Code review y etiquetas
- Validacion en CI

**Levantar:**
```bash
npx reveal-md presentations/developer-workflow.md --theme night
```

---

#### CI/CD Pipeline
Como funciona el pipeline de integracion y deploy continuo.

**Contenido:**
- GitHub Actions workflows
- Quality gates y SonarCloud
- Nx affected y cache distribuido
- Deploy automatico a Cloud Run
- Estrategias de rollback

**Levantar:**
```bash
npx reveal-md presentations/cicd-pipeline.md --theme night
```

---

#### Testing Patterns

Como escribir y ejecutar tests en el proyecto.

**Contenido:**

- Piramide de testing (Unit, Integration, E2E)
- Unit tests con Vitest (AAA pattern, mocking)
- Integration tests con MongoDB Memory Server
- E2E tests con Playwright (Page Objects)
- Best practices y anti-patrones
- Comandos de testing

**Levantar:**
```bash
npx reveal-md presentations/testing-patterns.md --theme night
```

---

#### Clean Architecture

Las 5 capas del Monolito Modular y como leer cualquier codigo.

**Contenido:**

- Por que Clean Architecture
- Las 5 capas (Domain, Application, Infrastructure, API, Config)
- Regla de dependencia
- Entities vs Value Objects
- Patron Facade
- Ejemplo practico completo
- Errores comunes a evitar

**Levantar:**
```bash
npx reveal-md presentations/clean-architecture.md --theme night
```

---

#### Angular Moderno

Angular 21 con Signals - muy diferente al Angular clasico.

**Contenido:**

- Signals vs RxJS (signal, computed, effect)
- Control Flow moderno (@if, @for, @switch)
- Standalone Components (sin NgModules)
- Modern Inputs/Outputs (input(), output())
- Signal Store para estado global
- Guia de migracion de clasico a moderno

**Levantar:**
```bash
npx reveal-md presentations/angular-moderno.md --theme night
```

---

#### Monorepo Overview

Presentación principal e índice del sistema de presentaciones modulares.

**Contenido:**
- Tu primer día (setup y comandos básicos)
- Conoce el sistema (estructura y módulos)
- Clean Architecture (las 5 capas)
- Referencias a presentaciones especializadas
- Guía de onboarding por semanas

**Levantar:**
```bash
npx reveal-md presentations/core-monorepo-overview.md --theme night
```

---

#### Por Qué Monolito Modular

Justificación arquitectónica y comparación con microservicios.

**Contenido:**
- Comparación detallada: Microservicios vs Monolito Modular
- Latencia acumulada (network vs in-process)
- Costos de infraestructura
- Consistencia de datos (ACID vs Eventual)
- Complejidad de despliegue
- Depuración y trazabilidad
- Resiliencia de red
- Mantenibilidad

**Levantar:**
```bash
npx reveal-md presentations/why-modular-monolith.md --theme night
```

---

#### Patrones Enterprise

Patrones avanzados de aplicación, caso de estudio completo y métricas del proyecto.

**Contenido:**
- Facade Pattern (ADR-0002)
- Circuit Breaker y políticas de resiliencia
- Observability (logging, health checks, SRE)
- Security patterns
- Transactional Outbox Pattern
- Event-Driven Architecture (Pub/Sub patterns)
- Caching avanzado y Feature Flags
- Caso de Estudio: Sistema de Notificaciones
- Métricas y Roadmap del proyecto

**Levantar:**
```bash
npx reveal-md presentations/enterprise-patterns.md --theme night
```

---

#### Infraestructura GCP

Decisiones técnicas de infraestructura: managed vs self-hosted, pros/contras y costos.

**Contenido:**
- Filosofía: Managed vs Self-Hosted (criterios de decisión)
- Storage: Firestore vs MongoDB en VM
- Cache: Memorystore vs Redis en VM
- Messaging: Pub/Sub vs Kafka en VM
- Compute: Cloud Run vs Compute Engine
- Secrets: Secret Manager
- Infraestructura Multi-País (deployment por país con aislamiento total)
- Workload Identity Federation (autenticación OIDC sin secrets)
- Service Accounts por País
- Análisis de costos (ROI de managed services)
- Exit strategies y migración

**Levantar:**
```bash
npx reveal-md presentations/infrastructure-gcp.md --theme night
```

---

## Orden Recomendado para Onboarding

### Semana 1: Foundations

```text
Dia 1:   Monorepo Overview + Local Development (setup, estructura básica)
Dia 2-3: Developer Workflow (commits, branches, PRs)
Dia 4:   CI/CD Pipeline (validacion, deploy)
Dia 5:   Clean Architecture (las 5 capas)
```

### Semana 2: Core Patterns

```text
Dia 1-2: Testing Patterns (unit, integration, e2e)
Dia 3:   Por Qué Monolito Modular (justificación arquitectónica)
Dia 4-5: Practica con primer feature + tests
```

### Semana 3: Frontend (si aplica)

```text
Dia 1-2: Angular Moderno (Signals, Control Flow, Standalone)
Dia 3-5: Practica con componentes del admin
```

### Semana 4: Enterprise Patterns

```text
Dia 1-2: Patrones Enterprise (Facade, Circuit Breaker, Outbox)
Dia 3:   Caso de Estudio: Notificaciones
Dia 4-5: Aplicar patrones en features propias
```

### Semana 5+: Deep Dives

**Para DevOps/Architects:**
- Infraestructura GCP (decisiones técnicas y compromisos)

**Secciones modulares según necesidad:**
- DDD en practica
- API design avanzado
- Error handling patterns
- Observabilidad y SRE

## Navegacion en Reveal.js

| Tecla | Accion |
|-------|--------|
| `→` | Siguiente slide |
| `←` | Slide anterior |
| `↓` | Slide vertical (detalles) |
| `↑` | Volver arriba |
| `Esc` | Vista general |
| `S` | Speaker notes |
| `F` | Fullscreen |
| `O` | Overview mode |

## Tips para Presentadores

1. **Usa Speaker Notes**: Presiona `S` para ver notas
2. **Tema oscuro**: Mejor para proyectar codigo
3. **Slides verticales**: Usa `↓` para profundizar en temas
4. **Overview**: Presiona `Esc` para ver todas las slides

## Estructura de Archivos

```
integration-presentations/
├── README.md                      # Este archivo
├── package.json                   # Scripts npm
├── vercel.json                    # Config Vercel
│
├── assets/                        # Recursos estáticos
│   ├── css/
│   │   └── custom.css             # Estilos personalizados
│   └── images/                    # Screenshots y diagramas
│
├── presentations/                 # Slides reveal.js
│   ├── core-monorepo-overview.md  # Índice (~30 min)
│   ├── local-development.md       # Setup entorno (DIA 1)
│   ├── developer-workflow.md      # Workflow diario
│   ├── cicd-pipeline.md           # Pipeline CI/CD
│   ├── testing-patterns.md        # Testing
│   ├── clean-architecture.md      # Las 5 capas
│   ├── angular-moderno.md         # Angular 21 Signals
│   ├── why-modular-monolith.md    # Justificación (~20 min)
│   ├── enterprise-patterns.md     # Patrones avanzados (~45 min)
│   └── infrastructure-gcp.md      # Infra GCP (~30 min)
│
└── dist/                          # Build estático (generado)
```

## Deploy

### Vercel (Recomendado)

1. Conecta el repo a Vercel
2. Vercel detecta `vercel.json` automáticamente
3. Deploy automático en cada push

### Local Preview

```bash
npm install
npm run build    # Genera dist/
npm run preview  # Sirve en localhost:3000
```

## Agregar Screenshots

Para agregar imágenes a las presentaciones:

1. Guarda la imagen en `assets/images/`
2. Referencia desde el .md:
   ```markdown
   ![Descripcion](../assets/images/nombre-imagen.png)
   ```
3. Los placeholders `<!-- INSERT_IMAGE: ... -->` indican donde agregar screenshots

## Contribuir

1. Editar el archivo `.md` correspondiente
2. Probar con `npx reveal-md presentations/` antes de commit
3. Seguir el formato de slides existente:
   - `---` para slides horizontales
   - `----` para slides verticales
   - `Note:` para speaker notes
