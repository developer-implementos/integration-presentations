---
title: Local Development
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

# Local Development

### Setup rapido para ser productivo desde el dia 1

Note:
Esta presentacion cubre todo lo que necesitas para levantar el proyecto.
Tiempo estimado de setup: 30-60 minutos.

---

## 📋 Agenda

1. **🔧 Prerequisitos** - Lo que necesitas instalado
2. **📥 Instalacion** - Clone, install, configure
3. **🐳 Docker Compose** - Servicios locales
4. **⚙️ Variables de Entorno** - Configuracion
5. **🎯 Comandos NX** - Tu dia a dia
6. **🐛 Debugging** - VS Code configs
7. **🔥 Troubleshooting** - Problemas comunes

Note:
Esta agenda cubre todo lo necesario para el primer dia.
Si algo falla, ve directo a Troubleshooting al final.

---

## 🔧 Prerequisitos

> Lo que necesitas instalado antes de empezar

⬇️ _Navega hacia abajo para ver detalles_

Note:
Antes de clonar el proyecto, asegurate de tener todo instalado.
Si te falta algo, el setup fallara con errores confusos.

----

<!-- .slide: data-background="#1c1c1c" data-background-transition="fade" -->

### Software Requerido

```bash
# Verificar versiones
node --version    # v20+ (LTS)
pnpm --version    # v9+
docker --version  # Docker Desktop
git --version     # 2.40+
code --version    # VS Code
```

<div style="font-size: 0.7em;">

| Software | Version Minima | Como instalar |
|----------|----------------|---------------|
| Node.js | 20 LTS | `nvm install 20` |
| pnpm | 9.x | `npm install -g pnpm` |
| Docker Desktop | Latest | docker.com/desktop |
| Git | 2.40+ | git-scm.com |
| VS Code | Latest | code.visualstudio.com |

</div>

Note:
Usa nvm para manejar versiones de Node - te ahorrara problemas a futuro.
NUNCA uses npm en este proyecto - siempre pnpm.

----

<!-- .slide: data-background="#181818" data-background-transition="fade" -->

### Extensiones VS Code

**Obligatorias** (instalar antes de empezar):

```json
// Se instalan automaticamente al abrir el proyecto
// VS Code preguntara si quieres instalar las recomendadas → "Yes"
```

<div style="font-size: 0.7em;">

| Extension | Para que |
|-----------|----------|
| `dbaeumer.vscode-eslint` | Linting en tiempo real |
| `esbenp.prettier-vscode` | Formateo automatico |
| `nrwl.angular-console` | Panel de Nx |
| `eamodio.gitlens` | Git avanzado |
| `usernamehw.errorlens` | Errores inline |
| `vitest.explorer` | Runner de tests |

</div>

Note:
VS Code preguntara si quieres instalar las extensiones recomendadas.
Dile que si - estan configuradas en .vscode/extensions.json.
Error comun: si no ves las recomendaciones, busca "Extensions: Show Recommended Extensions" en el command palette.

---

## 📥 Instalacion Inicial

> De cero a API corriendo

⬇️ _Navega hacia abajo para ver detalles_

Note:
Sigue estos pasos EN ORDEN.
Si saltas un paso, probablemente tendras errores.

----

<!-- .slide: data-background="#1c1c1c" data-background-transition="fade" -->

### Paso a Paso

```bash
# 1. Clonar repositorio
git clone git@github.com:implementos/core.git
cd core

# 2. Instalar dependencias (SIEMPRE usar pnpm, NO npm)
pnpm install

# 3. Copiar archivo de entorno
cp apps/integration-api/.env.example apps/integration-api/.env.dev

# 4. Levantar servicios con Docker
docker compose up -d mongo-db redis

# 5. Verificar que todo funciona
pnpm nx serve integration-api

# API corriendo en http://localhost:3000
# Swagger en http://localhost:3000/api/docs
```

Note:
Usamos pnpm porque es mas rapido y usa menos disco que npm.
El archivo .env.dev NUNCA se commitea - tiene tus secrets locales.

----

<!-- .slide: data-background="#181818" data-background-transition="fade" -->

### Verificar Instalacion

```bash
# Verificar servicios Docker
docker compose ps
# NAME       STATUS    PORTS
# mongo-db   healthy   27017:27017
# redis      healthy   6379:6379

# Verificar API
curl http://localhost:3000/health
# {"status":"ok","timestamp":"..."}

# Verificar Swagger
open http://localhost:3000/api/docs
```

**Si algo falla, ve a la seccion de Troubleshooting**

Note:
Si el health check falla, revisa que Docker este corriendo y que los puertos no esten ocupados.
Error comun: tener otra app usando el puerto 3000.

---

## 🐳 Docker Compose

> MongoDB, Redis y herramientas de admin

⬇️ _Navega hacia abajo para ver detalles_

Note:
Docker Compose levanta la infraestructura local.
Sin esto, la API no puede conectarse a la base de datos.

----

<!-- .slide: data-background="#1c1c1c" data-background-transition="fade" -->

### Arquitectura Local

```mermaid
%%{init: {'theme': 'dark', 'themeVariables': {'lineColor': '#5dade2'}}}%%
flowchart LR
    subgraph LOCAL["Tu Maquina"]
        API["integration-api\n:3000"]
        ADMIN["admin\n:4200"]
    end

    subgraph DOCKER["Docker Compose"]
        MONGO["mongo-db\n:27017"]
        REDIS["redis\n:6379"]
        MONGOX["mongo-express\n:8081"]
    end

    API --> MONGO
    API --> REDIS
    ADMIN --> API
    MONGOX -.-> MONGO

    style API fill:#27ae60,color:#fff
    style ADMIN fill:#3498db,color:#fff
    style MONGO fill:#4db33d,color:#fff
    style REDIS fill:#dc382d,color:#fff
```

**Nota:** API y Admin corren con `pnpm nx serve`, NO en Docker

Note:
La API corre FUERA de Docker para tener hot-reload rapido.
Solo MongoDB y Redis van en Docker.

----

<!-- .slide: data-background="#181818" data-background-transition="fade" -->

### Servicios Disponibles

```bash
# Infraestructura basica (lo que necesitas siempre)
docker compose up -d mongo-db redis

# Con herramientas de admin (MongoDB UI)
docker compose --profile tools up -d

# Ver todos los servicios
docker compose ps
```

<div style="font-size: 0.7em;">

| Servicio | Puerto | Descripcion |
|----------|--------|-------------|
| `mongo-db` | 27017 | MongoDB 7 |
| `redis` | 6379 | Redis 7 Alpine |
| `mongo-express` | 8081 | UI para MongoDB (profile: tools) |

</div>

Note:
El profile "tools" es opcional - solo usalo cuando necesites ver datos en MongoDB.
No lo dejes corriendo todo el tiempo porque consume recursos.

----

<!-- .slide: data-background="#1c1c1c" data-background-transition="fade" -->

### Comandos Docker Utiles

```bash
# Levantar servicios
docker compose up -d mongo-db redis

# Ver logs en tiempo real
docker compose logs -f mongo-db

# Parar todo
docker compose down

# Parar y borrar datos (reset completo)
docker compose down -v

# Reiniciar un servicio
docker compose restart mongo-db

# Entrar a MongoDB shell
docker exec -it mongo-db mongosh

# Entrar a Redis CLI
docker exec -it redis redis-cli
```

Note:
El comando "docker compose down -v" BORRA todos los datos.
Usalo solo si quieres empezar de cero.

----

<!-- .slide: data-background="#181818" data-background-transition="fade" -->

### Mongo Express (UI)

```bash
# Levantar con profile tools
docker compose --profile tools up -d

# Abrir en navegador
open http://localhost:8081
```

**Util para:**
- Ver colecciones y documentos
- Ejecutar queries manuales
- Debug de datos

Note:
Mongo Express es opcional pero muy util para inspeccionar datos.

---

## ⚙️ Variables de Entorno

> Configuracion del proyecto

⬇️ _Navega hacia abajo para ver detalles_

Note:
Las variables de entorno controlan como se comporta la aplicacion.
En desarrollo usamos .env.dev, en produccion las variables vienen del cloud.

----

<!-- .slide: data-background="#1c1c1c" data-background-transition="fade" -->

### Archivo .env.dev

```bash
# apps/integration-api/.env.dev (NUNCA commitear)

# === Database ===
DATABASE_URL=mongodb://test_user:test_password@localhost:27017/core_db?authSource=admin

# === Redis ===
REDIS_ENABLED=true
REDIS_HOST=localhost
REDIS_PORT=6379

# === Auth ===
JWT_SECRET=local-dev-secret-change-in-prod
JWT_EXPIRATION=8h

# === Logging ===
LOG_LEVEL=debug
LOG_PRETTY=true

# === Swagger ===
SWAGGER_ENABLED=true
```

**Importante:** `.env.dev` esta en `.gitignore` - nunca se commitea

Note:
NUNCA commitees archivos .env - contienen secrets.
Si accidentalmente lo haces, avisa al equipo inmediatamente.

----

<!-- .slide: data-background="#181818" data-background-transition="fade" -->

### Variables Clave

<div style="font-size: 0.7em;">

| Variable | Valor Local | Descripcion |
|----------|-------------|-------------|
| `DATABASE_URL` | `mongodb://...` | URI de MongoDB |
| `REDIS_ENABLED` | `true` | Habilitar cache |
| `JWT_SECRET` | cualquier string | Firmar tokens |
| `LOG_LEVEL` | `debug` | Ver todo en dev |
| `LOG_PRETTY` | `true` | Logs legibles |
| `SWAGGER_ENABLED` | `true` | Documentacion API |

</div>

Note:
LOG_LEVEL=debug muestra TODO lo que pasa - muy util para entender errores.
En produccion esta en "info" para no llenar los logs.

----

<!-- .slide: data-background="#1c1c1c" data-background-transition="fade" -->

### Validacion de Variables

```typescript
// El proyecto valida variables al iniciar con Zod
// Si falta algo, veras un error claro:

// ERROR: Invalid environment variables
// {
//   DATABASE_URL: "Required",
//   JWT_SECRET: "String must contain at least 32 character(s)"
// }
```

**Si ves este error:**
1. Revisa que copiaste `.env.example` a `.env.dev`
2. Revisa que las variables obligatorias estan configuradas

Note:
El proyecto valida variables al arrancar - si falta algo, no inicia.
Esto previene errores en runtime que serian mas dificiles de debuggear.

---

## 🎯 Comandos NX

> Tu dia a dia de desarrollo

⬇️ _Navega hacia abajo para ver detalles_

Note:
Nx es el gestor del monorepo - todos los comandos pasan por el.
Memoriza los comandos basicos porque los usaras todo el tiempo.

----

<!-- .slide: data-background="#1c1c1c" data-background-transition="fade" -->

### Desarrollo

```bash
# Levantar API con hot-reload
pnpm nx serve integration-api

# Levantar admin frontend
pnpm nx serve admin

# Levantar ambos en paralelo
pnpm nx run-many -t serve -p integration-api,admin

# Levantar un worker
pnpm nx serve notification-worker
```

**Hot-reload**: Al guardar un archivo, se recompila automaticamente

Note:
Hot-reload significa que no tienes que reiniciar el servidor cada vez que cambias codigo.
Guarda el archivo y ve los cambios en segundos.

----

<!-- .slide: data-background="#181818" data-background-transition="fade" -->

### Anatomía de un Comando Nx

> Entendiendo la sintaxis para no confundirse

```text
pnpm nx <target> <project> [options]
        ───┬────  ───┬───   ───┬───
           │         │         └─ Opciones (--watch, --coverage)
           │         └─ Proyecto (integration-api, admin)
           └─ Target (serve, test, build, lint)
```

Note:
Este diagrama muestra la estructura básica de un comando Nx.
Siempre es: nx + qué quieres hacer + en qué proyecto.
Las opciones van al final y son opcionales.

----

<!-- .slide: data-background="#1c1c1c" data-background-transition="fade" -->

### ⚠️ Error Común en Nx

```bash
# ❌ INCORRECTO (sintaxis antigua)
pnpm nx serve:integration-api

# ✅ CORRECTO
pnpm nx serve integration-api
```

> Siempre separar con **espacios**, nunca con `:`

Note:
Este es un error MUY común para nuevos desarrolladores.
La sintaxis es: nx + target + project (separados por espacio).
Si ven documentación con `:` probablemente está desactualizada.

----

<!-- .slide: data-background="#181818" data-background-transition="fade" -->

### Testing

```bash
# Tests de un modulo
pnpm nx test inventory-domain

# Tests en watch mode (mientras desarrollas)
pnpm nx test inventory-domain --watch

# Solo tests afectados por tus cambios
pnpm nx affected -t test

# Con coverage
pnpm nx test inventory-domain --coverage
```

Ver presentacion [Testing Patterns](testing-patterns.md) para mas detalle

Note:
El comando affected es magico: solo corre tests de lo que cambio.
Usalo siempre antes de hacer push para no romper el CI.

----

<!-- .slide: data-background="#1c1c1c" data-background-transition="fade" -->

### Build y Verificacion

```bash
# Build de una app
pnpm nx build integration-api

# Lint de un proyecto
pnpm nx lint inventory-domain

# Type check
pnpm nx typecheck integration-api

# ANTES DE CADA COMMIT (lo que corre CI)
pnpm nx affected -t lint,test
```

Note:
Siempre corre lint y test antes de hacer push.
Si fallan en tu maquina, fallaran en CI y bloquearan tu PR.

----

<!-- .slide: data-background="#181818" data-background-transition="fade" -->

### Exploracion

```bash
# Ver grafo de dependencias (abre navegador)
pnpm nx graph

# Listar todos los proyectos
pnpm nx show projects

# Ver tareas disponibles para un proyecto
pnpm nx show project inventory-domain

# Buscar proyectos afectados por cambios
pnpm nx affected -t build --dry-run
```

**Tip:** `pnpm nx graph` es muy util para entender dependencias

Note:
El grafo de dependencias te ayuda a entender como se relacionan los modulos.
Si tu cambio afecta muchos proyectos, quizas estas modificando algo demasiado central.

---

## 🐛 Debugging

> Configuraciones de VS Code

⬇️ _Navega hacia abajo para ver detalles_

Note:
Saber debuggear es esencial - te ahorra horas de console.log.
VS Code tiene todo configurado, solo tienes que usarlo.

----

<!-- .slide: data-background="#1c1c1c" data-background-transition="fade" -->

### Launch Configurations

El proyecto incluye configs de debug en `.vscode/launch.json`:

```json
{
  "configurations": [
    {
      "name": "Debug integration-api",
      "type": "node",
      "request": "launch",
      "runtimeExecutable": "pnpm",
      "runtimeArgs": ["nx", "serve", "integration-api"],
      "env": { "NODE_OPTIONS": "--inspect=9229" }
    },
    {
      "name": "Debug Current Test File",
      "type": "node",
      "request": "launch",
      "runtimeExecutable": "pnpm",
      "runtimeArgs": ["vitest", "run", "${relativeFile}"]
    }
  ]
}
```

Note:
Estas configuraciones ya estan en el proyecto.
Solo tienes que ir a Run and Debug y seleccionar la correcta.

----

<!-- .slide: data-background="#181818" data-background-transition="fade" -->

### Como Debuggear

**Opcion 1: Debug API completa**
1. Ir a Run and Debug (Ctrl+Shift+D)
2. Seleccionar "Debug integration-api"
3. Click en Play o F5
4. Poner breakpoints en el codigo
5. Hacer request a la API

**Opcion 2: Debug un test**
1. Abrir archivo de test (`.spec.ts`)
2. Ir a Run and Debug
3. Seleccionar "Debug Current Test File"
4. Click en Play o F5

Note:
Debuggear tests es la forma mas rapida de entender bugs.
Puedes ver el estado de las variables en cada linea.

----

<!-- .slide: data-background="#1c1c1c" data-background-transition="fade" -->

### Tips de Debug

```typescript
// 1. Usar debugger statement
async function processOrder(order: Order) {
  debugger;  // VS Code pausara aqui
  const stock = await this.checkStock(order.sku);
  return stock;
}

// 2. Logging detallado
this.logger.debug('Processing order', {
  orderId: order.id,
  items: order.items.length,
});

// 3. Breakpoints condicionales
// Click derecho en breakpoint → Edit Breakpoint
// Condition: order.total > 1000
```

Note:
Los breakpoints condicionales son muy utiles para bugs que solo pasan con ciertos datos.
No tienes que pausar en cada iteracion de un loop.

---

## 🔥 Troubleshooting

> Problemas comunes y soluciones

⬇️ _Navega hacia abajo para ver detalles_

Note:
Si algo falla, revisa esta seccion antes de preguntar.
El 90% de los problemas tienen solucion aqui.

----

<!-- .slide: data-background="#1c1c1c" data-background-transition="fade" -->

### Puerto en Uso

```bash
# Error: Port 3000 already in use

# Solucion 1: Matar el proceso
lsof -ti:3000 | xargs kill -9

# Solucion 2: Usar otro puerto
PORT=3001 pnpm nx serve integration-api
```

Note:
El puerto ocupado es el problema mas comun en el primer dia.
Generalmente es porque dejaste otra terminal corriendo.

----

<!-- .slide: data-background="#181818" data-background-transition="fade" -->

### MongoDB Connection Failed

```bash
# Error: MongoServerSelectionError

# 1. Verificar que Docker esta corriendo
docker compose ps

# 2. Si no esta corriendo
docker compose up -d mongo-db

# 3. Verificar conexion manual
docker exec -it mongo-db mongosh

# 4. Verificar credenciales en .env.dev
# DATABASE_URL=mongodb://test_user:test_password@localhost:27017/...
```

Note:
Si MongoDB no conecta, primero verifica que Docker este corriendo.
Luego revisa que el container este "healthy" con docker compose ps.

----

<!-- .slide: data-background="#1c1c1c" data-background-transition="fade" -->

### pnpm install Falla

```bash
# Error: Cannot find module...

# Solucion 1: Limpiar y reinstalar
rm -rf node_modules
pnpm install

# Solucion 2: Limpiar cache de pnpm
pnpm store prune
rm -rf node_modules
pnpm install

# Solucion 3: Verificar version de Node
node --version  # Debe ser v20+
```

Note:
"Cannot find module" casi siempre se resuelve borrando node_modules y reinstalando.
Es un problema de cache, no de tu codigo.

----

<!-- .slide: data-background="#181818" data-background-transition="fade" -->

### Nx Cache Corrupto

```bash
# Error: Errores raros despues de cambiar branches

# Reset del cache de Nx
pnpm nx reset

# Si sigue fallando
rm -rf node_modules/.cache
pnpm nx reset
```

Note:
Si despues de cambiar de branch ves errores raros, es probable que el cache de Nx este corrupto.
"pnpm nx reset" lo limpia y resuelve el problema.

----

<!-- .slide: data-background="#1c1c1c" data-background-transition="fade" -->

### Variables de Entorno

```bash
# Error: Invalid environment variables

# 1. Verificar que existe .env.dev
ls -la apps/integration-api/.env*

# 2. Si no existe, copiar del example
cp apps/integration-api/.env.example apps/integration-api/.env.dev

# 3. Verificar variables obligatorias
grep -E "DATABASE_URL|JWT_SECRET" apps/integration-api/.env.dev
```

Note:
Si copiaste el .env.example y sigue fallando, revisa que no haya espacios extra.
Las variables de entorno son sensibles al formato.

----

<!-- .slide: data-background="#181818" data-background-transition="fade" -->

### Docker con Problemas

```bash
# Reset completo de Docker

# 1. Parar todo
docker compose down

# 2. Borrar volumenes (CUIDADO: borra datos)
docker compose down -v

# 3. Borrar imagenes
docker compose down --rmi local

# 4. Levantar desde cero
docker compose up -d mongo-db redis
```

Note:
El reset completo de Docker es el ultimo recurso.
Solo usalo si nada mas funciona porque borra TODOS los datos.

---

## ✅ Checklist del Primer Dia

⬇️ _Navega hacia abajo para ver detalles_

Note:
Usa este checklist para verificar que todo funciona.
Si todos los items estan marcados, estas listo para empezar a contribuir.

----

<!-- .slide: data-background="#1c1c1c" data-background-transition="fade" -->

### Verificacion Final

```text
[ ] Git clone exitoso
[ ] pnpm install sin errores
[ ] Docker Compose levantado (mongo-db, redis healthy)
[ ] .env.dev configurado
[ ] API corriendo en localhost:3000
[ ] Swagger accesible en localhost:3000/api/docs
[ ] Tests pasando (pnpm nx test inventory-domain)
[ ] VS Code con extensiones instaladas
[ ] Debug funcionando (breakpoints pausan)

Tiempo estimado: 30-60 minutos
```

Note:
Si tardas mas de una hora, pide ayuda.
Es normal que el primer setup tenga problemas, no te frustres.

---

## 📝 Resumen

Note:
Estos son los comandos y URLs que usaras todos los dias.
Guarda esta slide como referencia rapida.

----

<!-- .slide: data-background="#181818" data-background-transition="fade" -->

### Comandos Esenciales

<div style="font-size: 0.7em;">

| Comando | Proposito |
|---------|-----------|
| `pnpm install` | Instalar dependencias |
| `docker compose up -d mongo-db redis` | Levantar infra |
| `pnpm nx serve integration-api` | Levantar API |
| `pnpm nx test <project>` | Correr tests |
| `pnpm nx affected -t test` | Tests de cambios |
| `pnpm nx graph` | Ver dependencias |

</div>

Note:
Estos 6 comandos cubren el 90% de tu trabajo diario.
El mas importante es "affected" - usalo antes de cada push.

----

<!-- .slide: data-background="#1c1c1c" data-background-transition="fade" -->

### URLs Importantes

<div style="font-size: 0.7em;">

| URL | Que es |
|-----|--------|
| `http://localhost:3000` | Integration API |
| `http://localhost:3000/api/docs` | Swagger UI |
| `http://localhost:3000/health` | Health check |
| `http://localhost:4200` | Admin frontend |
| `http://localhost:8081` | Mongo Express (con --profile tools) |

</div>

Note:
Swagger en /api/docs es tu mejor amigo para probar endpoints.
Tiene ejemplos de requests y respuestas.

---

# 🙏 Gracias

Note:
No te frustres si algo no funciona a la primera.
El setup inicial siempre tiene fricciones.
