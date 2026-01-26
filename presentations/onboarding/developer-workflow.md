---
title: Developer Workflow
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

# Developer Workflow

### Tu dia a dia: del codigo al merge

Note:
Esta presentacion cubre el flujo de trabajo diario.
Es material esencial que usaran todos los dias.

---

## 📋 Agenda

1. **📝 Conventional Commits** - Formato obligatorio
2. **🌿 Branches** - Nomenclatura y flujo
3. **🔀 Pull Requests** - Proceso completo
4. **👀 Code Review** - Como revisar y ser revisado
5. **✅ Validacion de Codigo** - CI valida automaticamente

Note:
Este workflow es OBLIGATORIO - no es opcional ni sugerencia.
El CI rechaza commits que no siguen estas reglas.

---

## 🔄 El Ciclo Diario

> Del codigo al deploy: el ciclo completo

⬇️ _Navega hacia abajo para ver detalles_

Note:
Este es el flujo que van a seguir todos los dias.
Cada paso tiene reglas especificas que vamos a ver.

----

<!-- .slide: data-background="#181818" data-background-transition="fade" -->

### Ciclo de Desarrollo

```text
CODE → COMMIT → PUSH → PR → REVIEW → MERGE
```

| Paso | Herramienta | Regla |
|------|-------------|-------|
| Code | VS Code | Format on save |
| Commit | Git | Conventional commits |
| Push | Git | Branch feature/* |
| PR | GitHub | Template obligatorio |
| Review | GitHub | CODEOWNERS |
| Merge | GitHub | Squash merge |

Note:
Este ciclo se repite cientos de veces al dia en el equipo.
Si todos seguimos las mismas reglas, el historial de Git es limpio y util.

---

## 📝 Conventional Commits

> Formato obligatorio para mensajes de commit

⬇️ _Navega hacia abajo para ver detalles_

Note:
Los conventional commits son OBLIGATORIOS.
El CI rechaza commits que no siguen el formato.
Si tu commit es rechazado, revisa el mensaje antes de pedir ayuda.

----

<!-- .slide: data-background="#1c1c1c" data-background-transition="fade" -->

### Estructura del Commit

```bash
<type>(<scope>): <description>
```

**Ejemplos reales:**

```bash
feat(inventory): add bulk import endpoint
fix(pricing): correct decimal precision
docs(api): update pagination examples
refactor(core): extract validation to shared lib
test(catalogue): add unit tests for SKU
chore(deps): update nestjs to v11
```

Note:
type = que tipo de cambio es
scope = que modulo afecta
description = que hiciste (imperativo, minusculas)

----

<!-- .slide: data-background="#181818" data-background-transition="fade" -->

### Tipos de Commit

| Tipo | Cuando usar | Version |
|------|-------------|---------|
| `feat` | Nueva funcionalidad | Minor ↑ |
| `fix` | Corregir un bug | Patch ↑ |
| `docs` | Solo documentacion | - |
| `refactor` | Cambiar sin agregar feature | - |
| `test` | Agregar o modificar tests | - |
| `chore` | Tareas de mantenimiento | - |
| `perf` | Mejoras de rendimiento | Patch ↑ |

Note:
feat y fix afectan el versionado automatico.
Los otros tipos son importantes para el CHANGELOG pero no afectan version.

----

<!-- .slide: data-background="#1c1c1c" data-background-transition="fade" -->

### Scope

El scope indica el modulo afectado:

```bash
feat(inventory): ...     # Modulo de inventario
fix(pricing): ...        # Modulo de precios
test(catalogue): ...     # Modulo de catalogo
chore(deps): ...         # Dependencias
```

Si afecta varios modulos, omitir scope:

```bash
feat: add global search across modules
```

Note:
El scope ayuda a filtrar commits en el historial.
Usa el nombre de la carpeta en libs/ como scope.

----

<!-- .slide: data-background="#181818" data-background-transition="fade" -->

### Breaking Changes

Si tu cambio rompe compatibilidad:

```bash
# Opcion 1: Agregar "!"
feat!: remove deprecated v1 API endpoints

# Opcion 2: En el body
feat(auth): change token format

BREAKING CHANGE: tokens now use JWT instead of opaque.
```

**Breaking change = version mayor (1.0 → 2.0)**

Note:
Los breaking changes son serios - rompen compatibilidad.
Antes de agregar un "!" consulta con el equipo.

----

<!-- .slide: data-background="#1c1c1c" data-background-transition="fade" -->

### AI-Assisted Commits

GitLens y GitHub Copilot estan configurados para generar commits en español:

```text
┌─────────────────────────────────────────────────────────────┐
│  Source Control (Ctrl+Shift+G)                              │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ Message: [________________] [✨ Generate]             │  │
│  └───────────────────────────────────────────────────────┘  │
│                            ↓                                │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ feat(inventory): agregar endpoint de importacion      │  │
│  │                                                       │  │
│  │ Cambios:                                              │  │
│  │ - Crear BulkImportController con validacion          │  │
│  │ - Implementar BulkImportService con batch processing │  │
│  │ - Agregar tests unitarios para edge cases            │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

**Ya configurado** en `.vscode/settings.json` - solo usa el boton ✨

Note:
La AI genera un borrador - SIEMPRE revisalo antes de aceptar.
A veces el scope esta mal o el mensaje es demasiado generico.

---

## 🌿 Branches

> Una branch por feature, siempre desde main

⬇️ _Navega hacia abajo para ver detalles_

Note:
Cada branch debe tener un proposito claro.
Si tu branch hace muchas cosas, dividela en varias.

----

<!-- .slide: data-background="#1c1c1c" data-background-transition="fade" -->

### Nomenclatura

```bash
# Patron: <type>/<ticket>-<descripcion-corta>

feature/CORE-123-add-bulk-import
fix/CORE-456-pricing-decimal
refactor/CORE-789-extract-validation
docs/CORE-101-api-examples
```

**NO hacer:**

```bash
my-branch        # Sin tipo ni ticket
feature/test     # Sin ticket
CORE-123         # Sin descripcion
```

Note:
El numero de ticket es obligatorio para trazabilidad.
Usa el nombre del ticket en Jira como base para la descripcion.

----

<!-- .slide: data-background="#181818" data-background-transition="fade" -->

### Flujo de Branches

<div style="display: flex; justify-content: center; transform: scale(1.4); margin: 40px 0; margin-left: 80px;">

```mermaid
%%{init: {'theme': 'dark', 'gitGraph': {'mainBranchName': 'main'}}}%%
gitGraph
   commit id: "initial"
   branch feature/CORE-123
   commit id: "feat-endpoint"
   commit id: "add-tests"
   checkout main
   merge feature/CORE-123 id: "squash-1"
   branch fix/CORE-456
   commit id: "fix-bug"
   checkout main
   merge fix/CORE-456 id: "squash-2"
```

</div>

**Reglas:**
- Siempre crear desde `main` actualizado
- Una branch = un ticket/feature
- Merge via PR (nunca directo a main)

Note:
NUNCA hagas push directo a main - esta protegido.
Siempre crea una branch y un PR, aunque sea un cambio pequeno.

----

<!-- .slide: data-background="#1c1c1c" data-background-transition="fade" -->

### Mantener tu Branch Actualizada

```bash
# Opcion 1: Rebase (preferido)
git fetch origin
git rebase origin/main

# Opcion 2: Merge
git fetch origin
git merge origin/main

# Despues de resolver conflictos
git push --force-with-lease
```

Note:
Rebase mantiene el historial mas limpio.
force-with-lease es mas seguro que force.

---

## 🔀 Pull Requests

> El PR es donde ocurre la magia del code review

⬇️ _Navega hacia abajo para ver detalles_

Note:
El PR es tu oportunidad de explicar tu trabajo.
Un buen PR hace que el review sea rapido y facil.

----

<!-- .slide: data-background="#181818" data-background-transition="fade" -->

### Crear un PR

```bash
# Desde terminal
gh pr create --title "feat(inventory): add bulk import"

# O desde GitHub UI
# 1. Push tu branch
# 2. Click "Compare & pull request"
# 3. Llenar template
```

Note:
gh CLI es mas rapido que la UI web para crear PRs.
Aprende los comandos basicos de gh - te ahorraran tiempo.

----

<!-- .slide: data-background="#1c1c1c" data-background-transition="fade" -->

### Crear PR desde VS Code (Recomendado)

La extension **GitHub Pull Requests** permite crear PRs sin salir del editor:

```text
┌─────────────────────────────────────────────────────────────┐
│  Source Control (Ctrl+Shift+G)                              │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  ☰ BRANCHES                                           │  │
│  │    ├─ main                                            │  │
│  │    └─ feature/CORE-123-bulk-import  ←  tu branch      │  │
│  │                                                       │  │
│  │  [Create Pull Request]  ← Click aqui                  │  │
│  └───────────────────────────────────────────────────────┘  │
│                            ↓                                │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  Title: feat(inventory): add bulk import              │  │
│  │  Base: main  ←  Into: feature/CORE-123                │  │
│  │  Description: [___________________________]           │  │
│  │                                                       │  │
│  │  [Create]                                             │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

<!-- INSERT_IMAGE: screenshot-create-pr-vscode.png -->

----

<!-- .slide: data-background="#181818" data-background-transition="fade" -->

### Review PRs desde VS Code

Revisar codigo directamente en el editor con syntax highlighting:

```text
┌─────────────────────────────────────────────────────────────┐
│  GitHub Pull Requests (Panel izquierdo)                     │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  ☰ PULL REQUESTS                                      │  │
│  │    ├─ #123 feat(inventory): bulk import   ← Asignado  │  │
│  │    ├─ #124 fix(pricing): decimal error                │  │
│  │    └─ #125 docs: update README                        │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                             │
│  Al hacer click en un PR:                                   │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  - Ver diff con syntax highlighting                   │  │
│  │  - Agregar comentarios inline                         │  │
│  │  - Aprobar / Solicitar cambios                        │  │
│  │  - Merge desde VS Code                                │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

<!-- INSERT_IMAGE: screenshot-review-pr-vscode.png -->

**Extension**: `GitHub Pull Requests and Issues` (ya en recomendadas)

Note:
Revisar PRs en VS Code es mas comodo que en el navegador.
Puedes ver el codigo con syntax highlighting y navegar entre archivos.

----

<!-- .slide: data-background="#1c1c1c" data-background-transition="fade" -->

### Template de PR

```markdown
## Descripcion
Breve descripcion del cambio.

## Tipo de cambio
- [ ] Bug fix
- [ ] Nueva feature
- [ ] Refactor

## Ticket
CORE-123

## Checklist
- [ ] Tests agregados/actualizados
- [ ] Lint pasa sin errores
```

Note:
Llena el template completo - no lo dejes vacio.
Un PR sin descripcion sera rechazado o tardara mas en ser revisado.

----

<!-- .slide: data-background="#181818" data-background-transition="fade" -->

### Status Checks

Antes de merge, tu PR debe pasar:

| Check | Que verifica | Obligatorio |
|-------|--------------|-------------|
| `lint` | ESLint sin errores | ✅ |
| `test` | Tests unitarios | ✅ |
| `build` | Compila sin errores | ✅ |
| `sonar` | Quality gate | ✅ |
| `review` | Aprobacion CODEOWNERS | ✅ |

Note:
Si un check falla, el merge esta bloqueado.
Lee el error del check antes de pedir ayuda - generalmente es claro.

---

## 👀 Code Review

> Aprender y mejorar juntos

⬇️ _Navega hacia abajo para ver detalles_

Note:
No solo busques errores - busca oportunidades de mejora.
Tambien reconoce el buen trabajo con "praise:".

----

<!-- .slide: data-background="#1c1c1c" data-background-transition="fade" -->

### Como Reviewer

**Cosas a revisar:**

1. **LOGICA** - El codigo hace lo que dice?
2. **TESTS** - Hay tests para el cambio?
3. **SEGURIDAD** - Input validation? No secrets?
4. **ESTILO** - Sigue los patrones del proyecto?

Note:
El code review no es para criticar - es para mejorar el codigo.
Se especifico y constructivo en tus comentarios.

----

<!-- .slide: data-background="#181818" data-background-transition="fade" -->

### Etiquetas de Comentarios

| Etiqueta | Significado | Bloquea? |
|----------|-------------|----------|
| `blocking:` | Debe corregirse | ✅ Si |
| `suggestion:` | Mejora opcional | ❌ No |
| `question:` | Necesito entender | ⚠️ Depende |
| `nit:` | Nitpicking menor | ❌ No |
| `praise:` | Buen trabajo! | ❌ No |

Note:
Usa las etiquetas para que el autor sepa si es bloqueante o no.
"blocking:" DEBE corregirse. "nit:" es solo una sugerencia.

----

<!-- .slide: data-background="#1c1c1c" data-background-transition="fade" -->

### Ejemplos de Comentarios

```markdown
blocking: Este query puede causar N+1, usar eager loading

suggestion: Podrias extraer esto a un helper

nit: Prefiero `const` sobre `let` aqui

praise: Excelente manejo del edge case!
```

Note:
No olvides el "praise:" - reconocer buen trabajo motiva al equipo.
Un review solo con criticas es desmoralizante.

----

<!-- .slide: data-background="#181818" data-background-transition="fade" -->

### CODEOWNERS

```bash
# .github/CODEOWNERS

/libs/core/           @team-leads
/libs/inventory/      @inventory-team
/libs/pricing/        @pricing-team
/.github/workflows/   @devops-team
```

Tu PR necesita approval del CODEOWNER del codigo que modificaste.

Note:
CODEOWNERS protege codigo critico de cambios sin supervision.
Si modificas libs/core/ necesitas aprobacion de un tech lead.

---

## ✅ Validacion de Codigo

> CI valida todo - sin hooks locales (enfoque BigTech)

Note:
No usamos pre-commit hooks porque son lentos y molestos.
CI valida todo despues del push - es mas rapido para el developer.

----

<!-- .slide: data-background="#1c1c1c" data-background-transition="fade" -->

### Flujo de Validacion

```mermaid
%%{init: {'theme': 'dark', 'themeVariables': {'lineColor': '#5dade2'}}}%%
flowchart LR
    subgraph TU["🖥️ Tu Maquina"]
        A["git commit"] --> B["git push"]
    end

    B -->|"⚡ instantaneo"| CI

    subgraph CI["⚙️ GitHub Actions ~3min"]
        C["lint"] & D["test"] & E["build"]
    end

    CI --> F{"¿Paso?"}
    F -->|"✅"| G["MERGE"]
    F -->|"❌"| H["BLOCKED"]
    H -.->|"fix → commit → push"| A

    style G fill:#27ae60,color:#fff
    style H fill:#c0392b,color:#fff
    style F fill:#f39c12,color:#fff
```

**No hay pre-commit hooks** - commits inmediatos, CI valida despues

Note:
Los commits son instantaneos - CI corre en paralelo mientras sigues trabajando.
Si falla, arreglas y vuelves a pushear.

----

<!-- .slide: data-background="#181818" data-background-transition="fade" -->

### VS Code te Ayuda

```json
// .vscode/settings.json (ya configurado)
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

Al guardar: Prettier formatea + ESLint corrige = menos errores en CI

Note:
Format on save es tu mejor amigo - el codigo se formatea automaticamente.
Si no funciona, verifica que las extensiones esten instaladas.

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
```

Note:
Estas son las reglas mas importantes.
Si ven errores de floating promises, SIEMPRE agregar await.
forEach con async es un error comun - usar Promise.all.

----

<!-- .slide: data-background="#1c1c1c" data-background-transition="fade" -->

### Mas Detalles

Para entender el pipeline completo de CI/CD:

📚 **Ver presentacion**: [CI/CD Pipeline](cicd-pipeline.md)

**Contenido**:

- GitHub Actions workflows
- Quality gates y SonarCloud
- Deploy automatico a Cloud Run
- Nx affected y cache distribuido

Note:
Si quieres entender mas sobre CI/CD, ve la presentacion dedicada.
Por ahora solo necesitas saber que CI valida tu codigo.

---

## 📖 Resumen

> Tu dia a dia en 4 pasos

⬇️ _Navega hacia abajo para ver detalles_

Note:
Este resumen es tu guia de referencia rapida.
Guardalo o imprimelo para tu primer dia.

----

<!-- .slide: data-background="#181818" data-background-transition="fade" -->

### Tu Dia a Dia

```bash
# 1. Crear branch
git checkout main && git pull
git checkout -b feature/CORE-123-mi-feature

# 2. Commits
git commit -m "feat(modulo): descripcion"

# 3. Push y PR
git push -u origin feature/CORE-123-mi-feature
gh pr create

# 4. Responder review y merge
```

Note:
Estos 4 pasos son tu rutina diaria.
Si algo falla, revisa esta presentacion antes de pedir ayuda.

----

<!-- .slide: data-background="#1c1c1c" data-background-transition="fade" -->

### Comandos Utiles

```bash
git status              # Ver estado
git diff                # Ver diferencias
git log --oneline -10   # Ver historial
git commit --amend      # Enmendar ultimo commit
git rebase origin/main  # Actualizar branch
```

Note:
git status y git diff son tus mejores amigos para entender que cambio.
Usalos antes de cada commit para no incluir archivos por accidente.

---

# 🙏 Gracias

Note:
Si tienen dudas sobre el workflow, pregunten al equipo.
