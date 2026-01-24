# Presentacion Modularizada - Enterprise Grade

Este directorio contiene las secciones restantes de la presentacion principal para onboarding. La mayoria del contenido tecnico ha sido migrado a **presentaciones standalone** para mayor flexibilidad.

## Presentaciones Standalone

Las siguientes presentaciones estan disponibles como archivos independientes en `docs/presentations/`:

| Presentacion | Archivo | Duracion | Contenido |
|--------------|---------|----------|-----------|
| Clean Architecture | `clean-architecture.md` | 45 min | DDD, Capas, Error Handling |
| Angular Moderno | `angular-moderno.md` | 60 min | Signals, Control Flow |
| Testing Patterns | `testing-patterns.md` | 45 min | Unit, Integration, E2E |
| Local Development | `local-development.md` | 45 min | Docker, env vars, debugging |
| Developer Workflow | `developer-workflow.md` | 45 min | Git, commits, PRs |
| CI/CD Pipeline | `cicd-pipeline.md` | 45 min | GitHub Actions |
| Platform Architecture | `platform-architecture.md` | 45 min | Monolito vs Microservicios |
| Resiliencia | `resiliencia.md` | 35 min | Circuit Breaker, Retry |
| Observabilidad | `observabilidad.md` | 45 min | Logs, Metricas, Traces |
| Seguridad | `seguridad.md` | 45 min | Auth, Rate Limiting |
| Event-Driven | `event-driven.md` | 45 min | Pub/Sub, Outbox Pattern |
| API Design | `api-design.md` | 45 min | REST, DTOs, Swagger |

## Secciones Restantes (Onboarding Principal)

Este directorio mantiene las secciones de contexto general:

| Archivo | Duracion | Contenido |
|---------|----------|-----------|
| `00-intro.md` | 15 min | Bienvenida, agenda |
| `01-tu-primer-dia.md` | 45 min | Setup inicial, comandos |
| `02-conoce-el-sistema.md` | 45 min | Estructura del monorepo |
| `04-developer-workflow.md` | 45 min | Git, commits basicos |
| `05-stack-tecnologico.md` | 45 min | NestJS, MongoDB, Angular |
| `07-patrones-enterprise.md` | 45 min | Intro a patrones |
| `08-cicd.md` | 45 min | Intro a CI/CD |
| `09-notificaciones.md` | 60 min | Caso de estudio |
| `10-metricas-roadmap.md` | 45 min | Metricas y futuro |
| `11-cierre.md` | 15 min | Recursos, Q&A |

## Como Usar

### Renderizar una presentacion standalone

```bash
npx reveal-md docs/presentations/resiliencia.md --watch
npx reveal-md docs/presentations/observabilidad.md --watch
npx reveal-md docs/presentations/platform-architecture.md --watch
```

### Renderizar una seccion

```bash
npx reveal-md docs/presentations/sections/00-intro.md --theme night
```

## Guia de Onboarding Sugerida

### Semana 1: Primeros Pasos

```text
Dia 1: 00-intro + 01-tu-primer-dia
Dia 2: local-development.md (standalone)
Dia 3: 02-conoce-el-sistema
Dia 4: clean-architecture.md (standalone)
Dia 5: developer-workflow.md (standalone) + primer PR
```

### Semana 2: Stack y Patrones

```text
Dia 1: 05-stack-tecnologico
Dia 2: clean-architecture.md - DDD section (standalone)
Dia 3: testing-patterns.md (standalone)
Dia 4: api-design.md (standalone)
Dia 5: Practica con primer feature
```

### Semana 3: Topicos Avanzados

```text
Dia 1: platform-architecture.md (standalone)
Dia 2: resiliencia.md (standalone)
Dia 3: observabilidad.md (standalone)
Dia 4: seguridad.md (standalone)
Dia 5: event-driven.md (standalone)
```

### Semana 4+: Profundizacion

```text
angular-moderno.md (si trabajan en frontend)
cicd-pipeline.md
09-notificaciones (caso de estudio)
10-metricas-roadmap
```

## Convenciones

- Cada archivo comienza con `---` (separador de Reveal.js)
- Los slides verticales usan `----`
- Speaker Notes van despues de `Note:`
- Codigo con syntax highlighting: ` ```typescript `
- Mermaid diagrams soportados
- SVGs animados para visualizaciones complejas

## Mantenimiento

1. **Nuevo tema tecnico**: Crear presentacion standalone en `docs/presentations/`
2. **Contexto general**: Agregar a este directorio
3. **Testing**: Verificar con `npx reveal-md` antes de merge
