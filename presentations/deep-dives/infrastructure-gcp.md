---
title: Infraestructura GCP - Decisiones Técnicas
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

# ☁️ Infraestructura GCP

### Decisiones Técnicas

#### Integration API

Note:
Esta presentación cubre las decisiones de infraestructura que tomamos para el proyecto.
Vamos a ver: ¿quién administra la infraestructura? ¿GCP o nosotros?
Managed = GCP lo administra (Firestore, Memorystore). Self-hosted = nosotros lo administramos (MongoDB, Redis en VMs).
Veremos ventajas, desventajas, costos de cada opción.

---

## 📋 Agenda

1. **🎯 Filosofía: Managed vs Self-Hosted**
2. **💾 Database: Firestore vs MongoDB**
3. **⚡ Cache: Memorystore vs Redis**
4. **📬 Messaging: Pub/Sub vs Kafka**
5. **🚀 Compute: Cloud Run vs Compute Engine**
6. **🔐 Secrets: Secret Manager**
7. **🌎 Infraestructura Multi-País**
8. **💰 Análisis de Costos**
9. **📊 Resumen de Decisiones**

Note:
Vamos a seguir este orden lógico: primero la filosofía general, luego cada servicio específico.
Para cada uno veremos ventajas, desventajas, costos y por qué elegimos lo que elegimos.

---

## 🎯 Filosofía: Managed vs Self-Hosted

> Preferir managed cuando sea posible, self-hosted solo cuando sea necesario

⬇️ _Navega hacia abajo para ver detalles_

Note:
Esta es nuestra filosofía general de infraestructura.
No es "todo managed" ni "todo self-hosted" - es pragmático.
Vamos a ver los criterios de decisión.

----

<!-- .slide: data-background="#1a1a2e" -->

### Criterios de Decisión

<table style="font-size: 0.7em; width: 100%;">
<thead>
<tr>
<th style="text-align: left; padding: 8px 30px 8px 0;">Criterio</th>
<th style="text-align: left; padding: 8px 30px 8px 0;">Managed</th>
<th style="text-align: left; padding: 8px 0;">Self-Hosted</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Mantenimiento</strong></td>
<td>✅ Automático</td>
<td>❌ Manual</td>
</tr>
<tr>
<td><strong>Escalabilidad</strong></td>
<td>✅ Auto</td>
<td>⚠️ Manual</td>
</tr>
<tr>
<td><strong>HA</strong></td>
<td>✅ Built-in</td>
<td>❌ Configurar</td>
</tr>
<tr>
<td><strong>Backups</strong></td>
<td>✅ Auto</td>
<td>❌ Manual</td>
</tr>
<tr>
<td><strong>Costo inicial</strong></td>
<td>✅ Bajo</td>
<td>❌ Alto</td>
</tr>
<tr>
<td><strong>Costo escala</strong></td>
<td>⚠️ Alto</td>
<td>✅ Bajo</td>
</tr>
<tr>
<td><strong>Control</strong></td>
<td>❌ Limitado</td>
<td>✅ Total</td>
</tr>
<tr>
<td><strong>Customización</strong></td>
<td>⚠️ Limitada</td>
<td>✅ Completa</td>
</tr>
</tbody>
</table>

Note:
Esta tabla resume los pros y contras de cada opción.
Cuando GCP administra (managed): ellos hacen el trabajo operacional, nosotros perdemos control.
Cuando nosotros administramos (self-hosted): control total pero requiere tiempo y expertise del equipo.
No hay opción perfecta - siempre ganas algo y pierdes algo.

----

<!-- .slide: data-background="#16213e" -->

### Cuándo Elegir Managed

✅ **Managed es mejor cuando:**
- No tienes expertise específica del servicio
- El equipo es pequeño (<10 developers)
- Quieres enfocarte en funcionalidades, no en infraestructura
- La carga es variable (traffic spikes)
- Compliance/SLAs requieren alta disponibilidad
- Startup/MVP donde el time-to-market es crítico

⚠️ **Managed puede ser caro a escala muy grande**

Note:
Estos son los casos donde conviene que GCP administre por nosotros.
En nuestro caso, somos un equipo pequeño enfocado en funcionalidades de negocio.
No queremos perder tiempo configurando replicas de MongoDB o tuneando Kafka.
Preferimos pagar un poco más y que GCP lo maneje.

----

<!-- .slide: data-background="#0f3460" -->

### Cuándo Elegir Self-Hosted

✅ **Self-hosted es mejor cuando:**
- Tienes expertise dedicada (DevOps/SRE team)
- Necesitas customización específica no disponible en managed
- La escala es MUY grande y los costos managed son prohibitivos
- Compliance requiere control total de datos/configuración
- Workload es estable y predecible

⚠️ **Self-hosted requiere tiempo de equipo y expertise**

Note:
Self-hosted hace sentido para empresas grandes con equipos dedicados.
Si tienes un equipo de SRE de 5+ personas, puedes optimizar costos con self-hosted.
Pero nosotros NO estamos en ese caso - somos una startup enfocada en funcionalidades.

---

## 💾 Database: Firestore vs MongoDB

> **Decisión: Firestore**

⬇️ _Navega hacia abajo para comparación_

Note:
Esta fue una de las decisiones más importantes.
Elegimos Firestore Enterprise que es compatible con MongoDB API.
Vamos a ver por qué.

----

<!-- .slide: data-background="#1c1c1c" -->

### Firestore vs MongoDB Self-Hosted

<div style="display: flex; justify-content: space-around; font-size: 0.75em;">

<div style="width: 45%; text-align: left;">
<h4>Firestore</h4>

**Ventajas:**
- ✅ Escalado automático
- ✅ Multi-region replication
- ✅ Backups automáticos
- ✅ Zero downtime maintenance
- ✅ Compatible MongoDB API
- ✅ Pay-per-operation

**Desventajas:**
- ❌ Más caro a escala grande
- ❌ Algunas funcionalidades no disponibles
- ❌ Vendor lock-in (GCP)
</div>

<div style="width: 45%; text-align: left;">
<h4>MongoDB</h4>

**Ventajas:**
- ✅ Control total
- ✅ Todas las funcionalidades
- ✅ Más barato a escala grande
- ✅ Portable (no vendor lock-in)

**Desventajas:**
- ❌ Configurar replica sets
- ❌ Configurar backups y monitoring
- ❌ Planificar capacidad
- ❌ Aplicar patches y updates
- ❌ On-call para issues DB
</div>

</div>

Note:
Firestore nos da MongoDB API sin el overhead operacional.
No tenemos que configurar replica sets, backups, sharding, etc.
GCP se encarga de todo eso.
El costo es más alto por operación, pero el equipo puede enfocarse en funcionalidades.

----

<!-- .slide: data-background="#181818" -->

### Migración Futura (si es necesario)

```typescript
// Como usamos MongoDB API, la migración es simple
// Solo cambiar connection string

// Actual (Firestore)
const uri = 'mongodb://firestore.googleapis.com/...'

// Futuro (MongoDB Atlas o Self-hosted)
const uri = 'mongodb://mongodb-cluster.example.com/...'

// El código de la aplicación NO cambia
```

<div style="text-align: left;">

**Exit strategy clara:** 
<br>
Firestore Enterprise usa MongoDB wire protocol, podemos migrar a MongoDB Atlas o self-hosted sin cambiar código.

</div>

Note:
Una de las razones para elegir Firestore Enterprise es que usa MongoDB wire protocol.
Si en el futuro los costos de Firestore son prohibitivos, podemos migrar a MongoDB Atlas o self-hosted.
Solo cambiamos la connection string - el código de la app no cambia.
Esto nos da flexibilidad.

---

## ⚡ Cache: Memorystore vs Redis

> **Decisión: Memorystore**

⬇️ _Navega hacia abajo para comparación_

Note:
Para caching elegimos Memorystore for Redis.
Es un Redis managed de GCP.

----

<!-- .slide: data-background="#1a1a2e" -->

### Memorystore vs Redis Self-Hosted

<div style="display: flex; justify-content: space-around; font-size: 0.75em;">

<div style="width: 45%; text-align: left;">
<h4>Memorystore</h4>

**Ventajas:**
- ✅ Redis compatible
- ✅ Alta disponibilidad
- ✅ Failover automático (<30s)
- ✅ Backups automáticos
- ✅ Zero downtime
- ✅ VPC nativa

**Desventajas:**
- ❌ Costo ~2x más
- ❌ No Redis Cluster
- ❌ Limited modules
</div>

<div style="width: 45%; text-align: left;">
<h4>Redis</h4>

**Ventajas:**
- ✅ Más económico
- ✅ Redis Cluster
- ✅ Todos los modules
- ✅ Control total

**Desventajas:**
- ❌ Configurar HA manual
- ❌ Backups manuales
- ❌ Monitorear memoria
- ❌ Failover tarda minutos
- ❌ Requiere expertise
</div>

</div>

Note:
Memorystore nos da Redis sin preocuparnos por HA, failover, backups.
Sí, es más caro - pagamos ~2x comparado con self-hosted.
Pero el tiempo del equipo es mucho más valioso que ese costo adicional.
Redis es crítico para performance - no queremos que falle porque olvidamos configurar algo.

----

<!-- .slide: data-background="#16213e" -->

### Arquitectura Memorystore

<div class="mermaid">
graph TB
    subgraph "Cloud Run Services"
        A[integration-api]
        B[notif-worker]
        C[report-worker]
    end

    subgraph "Memorystore Redis"
        D[Primary Redis]
        E[Replica Standby]
    end

    subgraph "Backup"
        F[Cloud Storage]
    end

    A -->|VPC Connector| D
    B -->|VPC Connector| D
    C -->|VPC Connector| D

    D -->|Auto Failover| E
    D -->|Auto Backup| F

    style D fill:#3498db
    style E fill:#2ecc71
</div>

**Standard Tier:**
- 1 primary + 1 replica (cross-zone)
- Failover automático en <30 segundos
- Backups diarios automáticos
- 99.9% SLA

Note:
Usamos Memorystore Standard Tier que nos da alta disponibilidad.
Hay un primary y un replica en zonas diferentes.
Si el primary falla, el replica se promociona automáticamente en <30 segundos.
Los backups son automáticos y van a Cloud Storage.
No tenemos que configurar nada de esto - GCP lo maneja.

---

## 📬 Messaging: Pub/Sub vs Kafka

> **Decisión: Cloud Pub/Sub**

⬇️ _Navega hacia abajo para comparación_

Note:
Para messaging asíncrono elegimos Cloud Pub/Sub.
Es el sistema de mensajería managed de GCP.

----

<!-- .slide: data-background="#1c1c1c" -->

### Pub/Sub vs Kafka

<div style="display: flex; justify-content: space-around; font-size: 0.75em;">

<div style="width: 45%; text-align: left;">
<h4>Pub/Sub</h4>

**Ventajas:**
- ✅ Global y multi-region
- ✅ Escalado infinito auto
- ✅ At-least-once garantizado
- ✅ Zero ops

**Desventajas:**
- ❌ No Kafka API
- ❌ No transactions
- ❌ Vendor lock-in
</div>

<div style="width: 45%; text-align: left;">
<h4>Kafka</h4>

**Ventajas:**
- ✅ Kafka API (portable)
- ✅ Exactly-once
- ✅ Ecosistema completo
- ✅ Más económico a escala

**Desventajas:**
- ❌ Configurar cluster (3+ brokers)
- ❌ Configurar Zookeeper/KRaft
- ❌ Monitorear lag, disk
- ❌ Expertise requerida
</div>

</div>

Note:
Pub/Sub es mucho más simple que Kafka.
No hay brokers, no hay Zookeeper, no hay configuración de partitions.
Solo publicas mensajes y suscribes consumers.
GCP maneja todo el escalado, la replicación, el retry.
Sí, perdemos algunas funcionalidades de Kafka (como exactly-once semantics).
Pero para nuestros casos de uso (notificaciones, reportes, sync), at-least-once es suficiente.

----

<!-- .slide: data-background="#181818" -->

### Arquitectura Pub/Sub

<div class="mermaid">
graph TB
    subgraph "Publishers"
        A[integration-api]
    end

    subgraph "Cloud Pub/Sub"
        T1[Topic: notifications]
        T2[Topic: reports]
        T3[Topic: sync-events]
    end

    subgraph "Subscribers"
        S1[notification-worker]
        S2[report-worker]
        S3[sync-worker]
    end

    A -->|Publish| T1
    A -->|Publish| T2
    A -->|Publish| T3

    T1 -->|Pull| S1
    T2 -->|Pull| S2
    T3 -->|Pull| S3

    S1 -.->|Ack| T1
    S2 -.->|Ack| T2
    S3 -.->|Ack| T3

    style T1 fill:#3498db
    style T2 fill:#3498db
    style T3 fill:#3498db
</div>

Note:
Nuestra arquitectura de Pub/Sub es simple.
integration-api publica eventos a topics.
Los workers (Cloud Run) son subscribers que procesan esos eventos.
Si un worker falla, Pub/Sub hace retry automático.
Si el worker está saturado, Pub/Sub hace backoff.
No tenemos que configurar nada de esto.

---

## 🚀 Compute: Cloud Run vs Compute Engine

> **Decisión: Cloud Run (managed, serverless)**

⬇️ _Navega hacia abajo para comparación_

Note:
Para compute elegimos Cloud Run, que es serverless.
Es contenedores sin servidores que administrar.

----

<!-- .slide: data-background="#1a1a2e" -->

### Cloud Run vs Compute Engine

<div style="display: flex; justify-content: space-between; font-size: 0.75em;">

<div style="width: 48%; text-align: left;">
<h4>Cloud Run</h4>

**Ventajas:**
- ✅ Serverless (no VMs que administrar)
- ✅ Escala a cero (costo cero en idle)
- ✅ Escala automático (0 → 1000+ instancias)
- ✅ Pay-per-request (no pagar idle time)
- ✅ Deploy con un comando
- ✅ Blue/green deployment automático
- ✅ Traffic splitting built-in

**Desventajas:**
- ❌ Cold starts (~500ms-2s)
- ❌ Límite de memoria (8GB max)
- ❌ Límite de request timeout (60 min max)
</div>

<div style="width: 48%; text-align: left;">
<h4>Compute Engine</h4>

**Ventajas:**
- ✅ No cold starts
- ✅ Memoria ilimitada (hasta 12TB)
- ✅ Long-running processes (sin timeout)
- ✅ Control total del OS

**Desventajas:**
- ❌ Administrar VMs (patches, updates)
- ❌ Configurar auto-scaling
- ❌ Configurar load balancer
- ❌ Pagar por VMs idle
- ❌ Configurar health checks
- ❌ Deploys más complejos
</div>

</div>

Note:
Cloud Run es perfecto para APIs web y workers.
No administramos VMs, no configuramos auto-scaling, no configuramos load balancers.
Solo hacemos `gcloud run deploy` y GCP maneja todo.
Escala automáticamente de 0 a 1000 instancias según el traffic.
Cuando no hay traffic, escala a cero y no pagamos nada.
Los cold starts son aceptables para nuestra use case (~500ms).

----

<!-- .slide: data-background="#16213e" -->

### Arquitectura Cloud Run

<div class="mermaid">
graph TB
    subgraph "Internet"
        U[Users/Clients]
    end

    subgraph "Cloud Run Services"
        API[integration-api<br/>0-100 instances]
        ADMIN[admin-app]
        NW[notification-worker<br/>0-10 instances]
        RW[report-worker<br/>0-5 instances]
        SW[sync-worker<br/>0-3 instances]
    end

    subgraph "GCP Managed Services"
        LB[Cloud Load Balancer]
        PS[Cloud Pub/Sub]
        FS[(Firestore)]
        MS[(Memorystore)]
    end

    U --> LB
    LB --> API
    LB --> ADMIN

    API --> PS
    PS --> NW
    PS --> RW
    PS --> SW

    API --> FS
    API --> MS
    NW --> FS
    RW --> FS
    SW --> FS

    style API fill:#2ecc71
    style NW fill:#3498db
    style RW fill:#3498db
    style SW fill:#3498db
    style LB fill:#e74c3c
</div>

**Escala automática:** De 0 a 100+ instancias según load.

Note:
Nuestra arquitectura usa Cloud Run para todo.
integration-api es el servicio principal que maneja requests HTTP.
Los workers (notification, report, sync) son servicios separados trigger

eados por Pub/Sub.
Todo escala automáticamente - no configuramos nada.
El Load Balancer es managed también.

----

<!-- .slide: data-background="#0f3460" -->

### Cold Starts: Mitigación

```yaml
# cloud-run.yaml
apiVersion: serving.knative.dev/v1
kind: Service
metadata:
  name: integration-api
spec:
  template:
    metadata:
      annotations:
        # Mantener mínimo 1 instancia warm
        autoscaling.knative.dev/minScale: "1"
        # Escalar hasta 100 instancias
        autoscaling.knative.dev/maxScale: "100"
    spec:
      containers:
      - image: gcr.io/implementos/integration-api:latest
        resources:
          limits:
            cpu: "2"
            memory: 2Gi
```

**Estrategia:**
- Mantener `minScale: 1` en producción (elimina cold starts)
- Cost: ~$50/mes por tener 1 instancia siempre warm
- Benefit: Zero cold starts, respuestas <100ms

Note:
Los cold starts de Cloud Run pueden ser ~500ms-2s.
Para eliminarlos, configuramos minScale: 1 en producción.
Esto significa que siempre hay al menos 1 instancia warm.
Cuesta ~$50/mes pero elimina completamente los cold starts.
Para workers que no son críticos, dejamos minScale: 0 para ahorrar costos.

---

## 🔐 Secrets: Secret Manager

> **Decisión: Secret Manager**

⬇️ _Navega hacia abajo para detalles_

Note:
Para secrets (API keys, passwords, certificates) usamos Secret Manager de GCP.
Es una de las decisiones más obvias - nunca self-host secrets.

----

<!-- .slide: data-background="#1c1c1c" -->

### Secret Manager vs Alternativas

<div style="display: flex; justify-content: space-around; font-size: 0.75em;">

<div style="width: 45%; text-align: left;">
<h4>Secret Manager </h4>

**Ventajas:**
- ✅ Encryption at rest y in transit
- ✅ Versionado automático
- ✅ Audit logs (quién accedió qué)
- ✅ IAM integration (fine-grained access)
- ✅ Rotation automation
- ✅ Workload Identity (no API keys)

**Desventajas:**
- ❌ Vendor lock-in GCP
- ❌ Costo por secret y por access
</div>

<div style="width: 45%; text-align: left;">
<h4>Alternativas</h4>

**HashiCorp Vault (self-hosted):**
- ❌ Configurar Vault cluster
- ❌ Configurar unseal keys
- ❌ Expertise Vault requerida
- ❌ Alta complejidad operacional

**Environment Variables:**
- ❌ No encryption
- ❌ No audit logs
- ❌ No rotation
- ⚠️ Riesgo de leak en logs
</div>

</div>

Note:
Secret Manager es la opción obvia para secrets.
Nunca deberías self-host secrets management - es demasiado crítico.
Vault es bueno pero requiere expertise y configuración compleja.
Environment variables son inseguras - pueden hacer leak en logs.
Secret Manager nos da encryption, audit logs, versionado, todo managed.

----

<!-- .slide: data-background="#181818" -->

### Arquitectura Secret Manager

```typescript
// Acceder secrets desde código usando Workload Identity
import { SecretManagerServiceClient } from '@google-cloud/secret-manager';

const client = new SecretManagerServiceClient();

// No API keys - usa Workload Identity
const [version] = await client.accessSecretVersion({
  name: 'projects/implementos/secrets/mongodb-uri/versions/latest'
});

const mongoUri = version.payload.data.toString();

// Secret está encriptado en tránsito y en reposo
// Audit log registra el acceso
```

**Ventajas:**
- No API keys en código
- Workload Identity usa service account de Cloud Run
- Audit logs rastrean todo acceso
- Secrets versionados (rollback fácil)

Note:
Secret Manager se integra con Workload Identity.
No necesitamos API keys - Cloud Run usa su service account para acceder secrets.
Cada acceso queda registrado en audit logs.
Los secrets están versionados - si rotamos un secret y algo falla, hacemos rollback fácil.

---

### 🌎 Infraestructura Multi-País

> Deployment independiente por país con aislamiento total

⬇️ _Navega hacia abajo para ver detalles_

Note:
Implementos opera en varios países: Chile, Perú, y más por venir.
Cada país tiene su propia infraestructura completamente aislada.
Esto significa que un problema en Chile no afecta a Perú.
También permite cumplir con regulaciones locales de datos.

----

<!-- .slide: data-background="#181818" data-background-transition="fade" -->

### Arquitectura Multi-País

<div class="mermaid">
graph TB
    subgraph "GitHub Actions"
        CI[CI Pipeline]
        DEPLOY[Deploy Workflow]
    end

    subgraph "Chile"
        QA_CL[QA Chile]
        PROD_CL[PROD Chile]
    end

    subgraph "Peru"
        QA_PE[QA Peru]
        PROD_PE[PROD Peru]
    end

    CI --> DEPLOY
    DEPLOY -->|workflow_dispatch| QA_CL
    DEPLOY -->|workflow_dispatch| PROD_CL
    DEPLOY -->|workflow_dispatch| QA_PE
    DEPLOY -->|workflow_dispatch| PROD_PE

    style QA_CL fill:#f1c40f
    style PROD_CL fill:#2ecc71
    style QA_PE fill:#f1c40f
    style PROD_PE fill:#2ecc71
</div>

**Características**:
- Deployments manuales (workflow_dispatch)
- Aislamiento total entre países
- Service Accounts dedicados por país-ambiente

Note:
Cada país tiene sus propios ambientes: QA para testing, PROD para producción.
Los deploys son manuales (workflow_dispatch) - elegimos cuándo y dónde desplegar.
El código es el mismo, pero la configuración es diferente por país.
Los colores muestran: amarillo para QA, verde para producción.

----

<!-- .slide: data-background="#1c1c1c" data-background-transition="fade" -->

### Workload Identity Federation

```
┌─────────────────────────────────────────────────────────────┐
│              WORKLOAD IDENTITY FEDERATION                    │
│                                                              │
│  ┌──────────────┐         ┌──────────────┐                  │
│  │   GitHub     │  OIDC   │    GCP       │                  │
│  │   Actions    │ ──────▶ │   IAM        │                  │
│  │   Runner     │  Token  │   Workload   │                  │
│  └──────────────┘         │   Identity   │                  │
│                           └──────────────┘                  │
│                                  │                          │
│                                  ▼                          │
│                     ┌────────────────────────┐              │
│                     │   Service Account      │              │
│                     │   (sin JSON keys)      │              │
│                     └────────────────────────┘              │
│                                                              │
│  ✅ Sin secretos estáticos                                  │
│  ✅ Tokens de corta duración                                │
│  ✅ Auditoría completa                                      │
│  ✅ Rotación automática                                     │
└─────────────────────────────────────────────────────────────┘
```

Note:
Este es un patrón de seguridad moderno para CI/CD.
Tradicionalmente guardábamos credenciales de GCP como secrets en GitHub. Peligroso.
Con Workload Identity Federation, GitHub Actions se autentica directamente con GCP usando OIDC.
No hay secretos estáticos que puedan filtrarse.
Los tokens duran solo lo que dura el job - segundos o minutos.
Es la forma recomendada por Google para CI/CD.

> Zero secrets - Autenticación via OIDC

----

<!-- .slide: data-background="#181818" data-background-transition="fade" -->

### Service Accounts por País

<div style="font-size: 0.7em;">

| Ambiente | Chile | Perú |
|----------|-------|------|
| **Terraform QA** | sa-terraform-qa-chile | sa-terraform-qa-peru |
| **Terraform PROD** | sa-terraform-prod-chile | sa-terraform-prod-peru |
| **Deploy QA** | sa-deploy-qa-chile | sa-deploy-qa-peru |
| **Deploy PROD** | sa-deploy-prod-chile | sa-deploy-prod-peru |

</div>

> **Principio**: Zero cross-environment access

Note:
Cada país-ambiente tiene su propio service account.
sa-deploy-qa-chile solo puede desplegar a QA Chile - no puede tocar PROD ni Perú.
Zero cross-environment access = si hackean QA Chile, no compromete PROD ni otros países.
Seguridad por aislamiento.

---

## 💰 Análisis de Costos

> Costos estimados mensuales (producción)

⬇️ _Navega hacia abajo para breakdown_

Note:
Ahora veamos los costos reales de estas decisiones.
Estos son números aproximados para nuestro caso de uso.

----

<!-- .slide: data-background="#1a1a2e" -->

### Breakdown de Costos Mensuales

<div style="font-size: 0.55em;">

| Servicio | Configuración | Costo Mensual | Alternativa Self-Hosted | Ahorro |
|----------|---------------|---------------|------------------------|--------|
| **Firestore** | 100GB, 10M reads, 5M writes | ~$150 | MongoDB (n1-standard-2) | -$100 |
| **Memorystore** | Standard M1 (5GB) | ~$50 | Redis (e2-small) | -$20 |
| **Pub/Sub** | 1M messages/day | ~$10 | Kafka (3x e2-medium) | -$60 |
| **Cloud Run (API)** | Min 1, Max 100, avg 5 | ~$100 | GCE (n1-standard-2) | -$30 |
| **Cloud Run (Workers)** | Min 0, triggered | ~$20 | GCE (3x e2-small) | -$30 |
| **Secret Manager** | 50 secrets, 1M accesses | ~$5 | Vault (e2-small) | -$15 |
| **Load Balancer** | Global HTTPS | ~$20 | Self-managed nginx | -$0 |

**Total Managed:** ~$355/mes<br>
**Total Self-Hosted:** ~$100/mes<br>
**Diferencia:** ~$255/mes (~3x más caro)

</div>

Note:
Sí, que GCP administre es ~3x más caro que administrar nosotros.
Pero esto NO incluye el costo del tiempo del equipo.
Si un developer dedica 20% de su tiempo a ops, eso son ~$2000/mes (asumiendo $10k/mes salary).
Cuando GCP administra, el equipo se enfoca 100% en funcionalidades.
$255/mes extra es MUCHO más barato que el tiempo del equipo.

----

<!-- .slide: data-background="#16213e" -->

### ROI: Managed vs Self-Hosted

```text
Escenario: Equipo de 3 developers full-stack

=== Self-Hosted ===
Infraestructura:        $100/mes
Tiempo ops (20% x 3):   $6,000/mes  (20% de $10k/dev x 3)
Total:                  $6,100/mes

Problemas:
- Oncall para DB issues
- Tiempo configurando Kafka
- Debuggear Redis failover
- Aplicar patches MongoDB

=== Managed ===
Infraestructura:        $355/mes
Tiempo ops (2% x 3):    $600/mes    (2% de $10k/dev x 3)
Total:                  $955/mes

Beneficios:
- GCP maneja ops
- Equipo enfocado en funcionalidades
- Menos context switching
- Menos riesgo de outages

AHORRO: $5,145/mes con managed services
```

Note:
Este es el cálculo real que importa.
Si nosotros administramos, el equipo gasta 20% del tiempo en ops.
Si GCP administra, solo gastamos 2% (monitoreo básico).
La diferencia (18% x 3 devs x $10k) son $5,400/mes.
Pagar a GCP cuesta $255/mes extra pero ahorra $5,400/mes en tiempo del equipo.
ROI es obvio: pagamos $255 para ahorrar $5,400.

---

## 📊 Resumen de Decisiones

<div style="font-size: 0.7em;">

| Servicio | Decisión | Razón Principal |
|----------|----------|-----------------|
| **Database** | Firestore | MongoDB API, zero ops, auto-scaling |
| **Cache** | Memorystore | Redis managed, auto-failover |
| **Messaging** | Cloud Pub/Sub | Zero config, infinite scale |
| **Compute** | Cloud Run | Serverless, auto-scale, zero idle cost |
| **Secrets** | Secret Manager | Seguridad crítica, audit logs |

<br>

<div style="text-align: left;">

**Filosofía:** 
<br>
Preferir managed para enfocarnos en funcionalidades, no en infraestructura.

**Exit strategy:** 
<br>
Firestore usa MongoDB wire protocol → podemos migrar a MongoDB Atlas/self-hosted sin cambiar código.

</div>

</div>

Note:
Este es el resumen de todas nuestras decisiones.
La filosofía es clara: que GCP administre cuando sea posible.
Somos una startup enfocada en funcionalidades de negocio.
No queremos perder tiempo configurando infraestructura.
Pagamos un premium (~3x) pero ahorramos mucho más en tiempo del equipo.

---

## 🎯 Próximos Pasos

1. **Monitorear costos:** 
<br>
Revisar billing mensualmente
2. **Optimizar donde tenga sentido:**
<br> 
Ej. reducir Firestore reads con caching
3. **Re-evaluar a escala:**
<br> 
Si llegamos a 10x traffic, revisar self-hosted
4. **Documentar cambios:**
<br>
ADRs para decisiones de infraestructura

Note:
Estas decisiones no son permanentes.
Monitoreamos costos y optimizamos donde tiene sentido.
Si llegamos a escala masiva (10x+ traffic), podemos re-evaluar y administrar nosotros.
Pero por ahora, que GCP administre es la decisión correcta para nuestro equipo.

---

# 🙏 Gracias

Note:
Fin de la presentación.
Espero que esto ayude a entender por qué tomamos estas decisiones.
La clave es ser pragmático: que GCP administre cuando sea posible, nosotros administrar solo cuando sea necesario.
