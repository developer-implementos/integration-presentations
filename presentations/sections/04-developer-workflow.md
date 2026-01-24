---
title: Developer Workflow
---

## Developer Workflow

> Tu dia a dia: del codigo al merge

---

### El Ciclo Diario

```
   CODE          COMMIT         PUSH           PR            REVIEW         MERGE
    |              |              |             |               |              |
    v              v              v             v               v              v
 [Escribir]  [Conventional]  [Branch]     [Template]     [CODEOWNERS]    [Squash]
  codigo       Commits       feature/      obligatorio    revisores      a main
                              xxx-xxx                    asignados
```

**Tiempo tipico por ciclo**: 1-3 dias

Note:
Este es el flujo que van a seguir todos los dias.
Cada paso tiene reglas especificas que vamos a ver.

---

### Conventional Commits

> Formato obligatorio para mensajes de commit

----

### Estructura del Commit

```bash
<type>(<scope>): <description>

# Ejemplos reales del proyecto:
feat(inventory): add bulk import endpoint
fix(pricing): correct decimal precision in discount
docs(api): update pagination examples
refactor(core): extract validation to shared lib
test(catalogue): add unit tests for SKU validation
chore(deps): update nestjs to v11.0.0
```

**Esto NO es opcional** - El CI rechaza commits mal formateados

----

### Tipos de Commit

| Tipo | Cuando usar | Ejemplo |
|------|-------------|---------|
| `feat` | Nueva funcionalidad | `feat(auth): add SSO login` |
| `fix` | Corregir un bug | `fix(cart): prevent double charge` |
| `docs` | Solo documentacion | `docs: update API guide` |
| `refactor` | Cambiar sin agregar feature | `refactor: extract utils` |
| `test` | Agregar o modificar tests | `test: add e2e for checkout` |
| `chore` | Tareas de mantenimiento | `chore(deps): update libs` |
| `perf` | Mejoras de rendimiento | `perf: optimize query` |

----

### Scope: Donde Hiciste el Cambio

```bash
# El scope indica el modulo afectado
feat(inventory): ...     # Modulo de inventario
fix(pricing): ...        # Modulo de precios
test(catalogue): ...     # Modulo de catalogo
chore(deps): ...         # Dependencias generales

# Si afecta varios modulos, omitir scope
feat: add global search across modules
```

----

### Breaking Changes

```bash
# Si tu cambio rompe compatibilidad, agregar "!"
feat!: remove deprecated v1 API endpoints

# O en el body del commit
feat(auth): change token format

BREAKING CHANGE: tokens now use JWT instead of opaque strings.
Clients must update their token parsing logic.
```

**Breaking change = version mayor (1.0.0 -> 2.0.0)**

----

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

---

### Branches

> Una branch por feature, siempre desde main

----

### Nomenclatura de Branches

```bash
# Patron: <type>/<ticket>-<descripcion-corta>

feature/CORE-123-add-bulk-import
fix/CORE-456-pricing-decimal
refactor/CORE-789-extract-validation
docs/CORE-101-api-examples

# Malas practicas (NO hacer):
my-branch              # Sin tipo ni ticket
feature/test           # Sin ticket
CORE-123               # Sin descripcion
```

----

### Flujo de Branches

```
main (protegido)
  |
  +-- feature/CORE-123-new-endpoint
  |     |
  |     +-- commits...
  |     |
  |     +-- PR -> Review -> Merge (squash)
  |
  +-- fix/CORE-456-bug-fix
        |
        +-- commits...
        |
        +-- PR -> Review -> Merge (squash)
```

**Reglas:**
- Siempre crear desde `main` actualizado
- Una branch = un ticket/feature
- Merge via PR (nunca directo a main)

----

### Mantener tu Branch Actualizada

```bash
# Opcion 1: Rebase (preferido para branches cortas)
git fetch origin
git rebase origin/main

# Opcion 2: Merge (si hay conflictos complejos)
git fetch origin
git merge origin/main

# Despues de resolver conflictos
git push --force-with-lease  # Solo para rebase
```

Note:
Rebase mantiene el historial mas limpio.
Si tu branch tiene muchos commits, considera squash antes de rebase.

---

### Pull Requests

> El PR es donde ocurre la magia del code review

----

### Crear un PR

```bash
# Desde terminal
gh pr create --title "feat(inventory): add bulk import" --body "..."

# O desde GitHub UI
# 1. Push tu branch
# 2. Click "Compare & pull request"
# 3. Llenar template
```

----

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
└─────────────────────────────────────────────────────────────┘
```

<!-- INSERT_IMAGE: screenshot-create-pr-vscode.png -->

----

### Review PRs desde VS Code

Revisar codigo directamente en el editor:

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
│  - Ver diff con syntax highlighting                         │
│  - Agregar comentarios inline                               │
│  - Aprobar / Solicitar cambios                              │
│  - Merge desde VS Code                                      │
└─────────────────────────────────────────────────────────────┘
```

<!-- INSERT_IMAGE: screenshot-review-pr-vscode.png -->

**Extension**: `GitHub Pull Requests and Issues` (ya en recomendadas)

----

### Template de PR (Obligatorio)

```markdown
## Descripcion
Breve descripcion del cambio y por que se hizo.

## Tipo de cambio
- [ ] Bug fix
- [ ] Nueva feature
- [ ] Refactor
- [ ] Docs

## Ticket
CORE-123

## Checklist
- [ ] Tests agregados/actualizados
- [ ] Documentacion actualizada
- [ ] Sin console.log
- [ ] Lint pasa sin errores

## Screenshots (si aplica)
```

----

### Status Checks

Antes de merge, tu PR debe pasar:

| Check | Que verifica | Obligatorio |
|-------|--------------|-------------|
| `lint` | ESLint sin errores | Si |
| `test` | Tests unitarios pasan | Si |
| `build` | Compila sin errores | Si |
| `sonar` | Quality gate (coverage, bugs) | Si |
| `codeowners` | Aprobacion de owners | Si |

```
PR Status:
  [x] lint .............. passed
  [x] test .............. passed
  [x] build ............. passed
  [x] sonar ............. passed
  [ ] review ............ 0/1 approvals
```

---

### Code Review

> Aprender y mejorar juntos

----

### Como Reviewer

```markdown
# Cosas a revisar:

1. LOGICA
   - El codigo hace lo que dice que hace?
   - Hay edge cases no manejados?

2. TESTS
   - Hay tests para el cambio?
   - Cubren casos importantes?

3. SEGURIDAD
   - Input validation?
   - No hay secrets hardcodeados?

4. ESTILO
   - Sigue los patrones del proyecto?
   - Nombres claros?
```

----

### Etiquetas de Comentarios

| Etiqueta | Significado | Bloquea merge? |
|----------|-------------|----------------|
| `blocking:` | Debe corregirse | Si |
| `suggestion:` | Mejora opcional | No |
| `question:` | Necesito entender | Depende |
| `nit:` | Nitpicking menor | No |
| `praise:` | Buen trabajo! | No |

```markdown
# Ejemplos:
blocking: Este query puede causar N+1, usar eager loading

suggestion: Podrias extraer esto a un helper, pero no es obligatorio

nit: Prefiero `const` sobre `let` aqui

praise: Excelente manejo del edge case!
```

----

### CODEOWNERS

```bash
# .github/CODEOWNERS

# Arquitectura requiere approval de leads
/libs/core/                    @team-leads
/libs/shared/                  @team-leads

# Cada modulo tiene su owner
/libs/inventory/               @inventory-team
/libs/pricing/                 @pricing-team
/libs/catalogue/               @catalogue-team

# Cambios en CI requieren DevOps
/.github/workflows/            @devops-team
```

**Tu PR necesita approval del CODEOWNER del codigo que modificaste**

---

### Validacion de Codigo

> CI valida todo - sin hooks locales (enfoque BigTech)

----

### Flujo de Validacion

```text
  Tu maquina                    GitHub Actions
  ──────────                    ──────────────
  git commit ──→ git push ──→ CI valida todo
                               (lint, test, build)
                                     │
                              ┌──────┴──────┐
                              ↓             ↓
                            PASS          FAIL
                         (merge ok)    (PR bloqueado)
```

**No hay pre-commit hooks** - commits inmediatos, CI valida despues

----

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

----

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

### Mas Detalles sobre CI/CD

📚 **Ver presentacion**: [CI/CD Pipeline](../cicd-pipeline.md)

**Contenido**:

- GitHub Actions workflows
- Quality gates y SonarCloud
- Deploy automatico a Cloud Run
- Nx affected y cache distribuido

---

### Resumen: Tu Dia a Dia

```bash
# 1. Crear branch desde main actualizado
git checkout main && git pull
git checkout -b feature/CORE-123-mi-feature

# 2. Hacer cambios y commits
git add .
git commit -m "feat(modulo): descripcion clara"

# 3. Push y crear PR
git push -u origin feature/CORE-123-mi-feature
gh pr create

# 4. Responder al code review
# ... hacer cambios pedidos ...
git commit -m "fix: aplicar feedback del review"
git push

# 5. Merge (lo hace el reviewer o tu)
# Squash merge via GitHub UI
```

---

### Comandos Utiles

```bash
# Ver estado de tu branch
git status

# Ver diferencias antes de commit
git diff

# Deshacer cambios no commiteados
git checkout -- <file>

# Enmendar ultimo commit (antes de push)
git commit --amend

# Ver historial de commits
git log --oneline -10

# Cambiar a otra branch
git checkout <branch>

# Traer cambios de main
git fetch origin && git rebase origin/main
```
