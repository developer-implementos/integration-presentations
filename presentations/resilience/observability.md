---
title: "Observabilidad - Los Tres Pilares"
theme: black
highlightTheme: monokai
revealOptions:
  transition: slide
  transitionSpeed: default
  controls: true
  slideNumber: true
  progress: true
---

# Observabilidad

## Los tres pilares para operar sistemas en produccion

---

## Que es Observabilidad

> La capacidad de entender que pasa DENTRO del sistema mirando desde AFUERA

⬇️ _Navega hacia abajo para ver detalles_

Note:
Sin observabilidad, operar en produccion es como manejar con los ojos cerrados.
Cuando algo falla a las 3am, necesitas herramientas que te digan QUE y DONDE.
La observabilidad tiene tres pilares: Logs, Metricas, y Traces.

```
         OBSERVABILIDAD
              |
    +---------+---------+
    |         |         |
  LOGS     METRICAS   TRACES
   |         |          |
  Que       Cuanto     Como
 paso?      paso?      paso?
```

----

### Los Tres Pilares

| Pilar | Pregunta que responde | Ejemplo |
|-------|----------------------|---------|
| **Logs** | Que paso? | "Error al conectar con Salesforce" |
| **Metricas** | Cuanto paso? | "99.5% de requests exitosas" |
| **Traces** | Como paso? | "Request paso por Auth -> Service -> DB" |

Note:
Logs nos dicen que eventos ocurrieron - errores, warnings, info.
Metricas son numeros agregados - requests por segundo, latencia, uso de CPU.
Traces muestran el camino de una request a traves de todos los componentes.

----

### Arquitectura de Observabilidad

```
Aplicacion                  Colectores              Visualizacion
    |                           |                        |
 Integration API  -->  Pino     -->  Cloud Logging   \
    |                                           \
 Integration API  -->  OTel     -->  Prometheus     --> Grafana --> Alerting
    |                                           /
 Integration API  -->  OTel     -->  Cloud Trace    /
```

---

## Logging Estructurado

> JSON, no texto plano

⬇️ _Navega hacia abajo para ver detalles_

----

### Por Que JSON

```typescript
// Texto plano - dificil de parsear y buscar
console.log('Error updating stock for SKU-123: insufficient quantity');

// JSON estructurado - facil de parsear y buscar
logger.error({
  message: 'Error updating stock',
  sku: 'SKU-123',
  reason: 'insufficient_quantity',
  currentStock: 5,
  requestedQuantity: 10,
  correlationId: 'abc-123'
});
```

**Ventajas del JSON:**

- Busquedas rapidas: `SELECT * WHERE sku = 'SKU-123'`
- Agregaciones: `COUNT(*) GROUP BY reason`
- Alertas automaticas basadas en campos

Note:
Las maquinas pueden parsear JSON y hacer queries.
Con texto plano, necesitas regex y esperanza.

----

### Pino: El Logger Mas Rapido

```typescript
// libs/shared/backend/observability/src/lib/logger/pino.config.ts

import { pino } from 'pino';

export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  formatters: {
    level: (label) => ({ level: label }),
  },
  base: {
    service: 'integration-api',
    environment: process.env.NODE_ENV,
  },
});

// Output:
{
  "level": "info",
  "message": "Stock updated",
  "service": "integration-api",
  "environment": "production",
  "correlationId": "abc-123",
  "timestamp": "2024-12-04T10:30:00Z",
  "data": {
    "sku": "PROD-001",
    "previousStock": 100,
    "newStock": 95
  }
}
```

Note:
Pino es el logger mas rapido para Node.js.
Cada log incluye contexto automatico: service, environment, correlationId.
El correlationId permite rastrear una request a traves de todo el sistema.

----

### Correlation ID: Trazabilidad End-to-End

```
Request del cliente
      |
      v
  [API Gateway] correlationId: "abc-123"
      |
      v
  [Auth Service] correlationId: "abc-123"
      |
      v
  [Inventory Service] correlationId: "abc-123"
      |
      v
  [Database] correlationId: "abc-123"
```

**Todos los logs de esta request tienen el mismo ID**

```sql
-- Encontrar TODOS los logs de una request
SELECT * FROM logs WHERE correlationId = 'abc-123' ORDER BY timestamp;
```

Note:
Si una request pasa por 5 servicios, todos los logs tienen el mismo ID.
Esto permite reconstruir todo el flujo cuando hay problemas.

----

### Niveles de Log

| Nivel | Cuando usar | Ejemplo |
|-------|-------------|---------|
| **error** | Algo fallo que necesita atencion | `DB connection failed` |
| **warn** | Algo sospechoso pero no critico | `Retry attempt 2/3` |
| **info** | Eventos importantes de negocio | `Order created` |
| **debug** | Info detallada para debugging | `Cache hit for key X` |

```typescript
// Usar el nivel correcto
logger.error('Database connection failed', { error });    // Alerta!
logger.warn('Retry attempt', { attempt: 2, maxAttempts: 3 });
logger.info('Order created', { orderId, total });
logger.debug('Cache hit', { key, ttl });
```

Note:
En produccion normalmente tenemos level: 'info'.
Solo bajamos a 'debug' cuando investigamos un problema especifico.

---

## Metricas con OpenTelemetry

> Numeros que te dicen como esta tu sistema

⬇️ _Navega hacia abajo para ver detalles_

----

### Tipos de Metricas

| Tipo | Que mide | Ejemplo |
|------|----------|---------|
| **Counter** | Cosas que solo suben | Total de requests, errores |
| **Gauge** | Valor actual | Conexiones activas, memoria |
| **Histogram** | Distribucion de valores | Latencia de requests |

```typescript
// Contador: Total de requests procesadas
const requestCounter = meter.createCounter('http_requests_total', {
  description: 'Total HTTP requests',
});
requestCounter.add(1, { method: 'GET', path: '/api/products' });

// Gauge: Conexiones activas a la DB
const dbConnections = meter.createObservableGauge('db_connections', {
  description: 'Active database connections',
});

// Histogram: Latencia de requests
const latencyHistogram = meter.createHistogram('http_request_duration_ms', {
  description: 'HTTP request latency in milliseconds',
});
latencyHistogram.record(45, { method: 'GET', path: '/api/products' });
```

----

### Las 4 Golden Signals (SRE de Google)

```
+------------------+------------------+
|     LATENCY      |     TRAFFIC      |
|  Cuanto tarda?   |  Cuanto llega?   |
|  P50, P95, P99   |   req/seg        |
+------------------+------------------+
|     ERRORS       |   SATURATION     |
|  Cuanto falla?   |  Cuanto queda?   |
|   % error rate   |   % CPU, mem     |
+------------------+------------------+
```

**Si monitoreas estas 4, cubres el 80% de los problemas**

Note:
Estas son las metricas que Google considera esenciales.
Latency: P99 significa que el 99% de requests son mas rapidas que ese valor.
Traffic: Requests por segundo, te dice si hay picos o caidas.
Errors: Porcentaje de requests que fallan.
Saturation: Cuanta capacidad tienes disponible.

----

### Dashboard de Metricas

```
+------------------------------------------------------------------+
|                    INTEGRATION-API DASHBOARD                             |
+------------------------------------------------------------------+
|  Request Rate: 1,234 req/s        |  Error Rate: 0.12%           |
|  [====================........]    |  [=........................] |
+------------------------------------------------------------------+
|  Latency (P99): 145ms             |  CPU: 34%  |  Memory: 67%    |
|  [================............]    |  [===..]   |  [======..]    |
+------------------------------------------------------------------+
|                                                                   |
|  Latency Distribution (last 5 min)                               |
|                                                                   |
|  250ms |                                                          |
|  200ms |                    *                                     |
|  150ms |        * * *     * * *                                   |
|  100ms |    * * * * * * * * * * *                                |
|   50ms |  * * * * * * * * * * * * *                              |
|        +--------------------------------------------------        |
|         9:00  9:05  9:10  9:15  9:20  9:25  9:30                 |
+------------------------------------------------------------------+
```

Note:
Este es un ejemplo de como se ve un dashboard en Grafana.
Los numeros verdes son buenos, amarillos son warning, rojos son criticos.

---

## Traces: El Viaje de una Request

> Entiende como fluye una request a traves del sistema

⬇️ _Navega hacia abajo para ver detalles_

----

### Anatomia de un Trace

```
Trace: abc-123 (duracion total: 156ms)

[API Gateway]────────────────────────────────────────────> 156ms
    |
    └──[Auth Middleware]────────────────────> 12ms
           |
           └──[Inventory Controller]─────────────────> 120ms
                  |
                  ├──[Inventory Service]──────────> 85ms
                  |       |
                  |       └──[MongoDB Query]───> 45ms
                  |
                  └──[Cache Check]──> 8ms

Spans:
1. api-gateway/handle-request: 156ms
2. auth/validate-token: 12ms
3. inventory/get-stock: 120ms
4. inventory-service/find-by-sku: 85ms
5. mongodb/find-one: 45ms
6. cache/get: 8ms
```

Note:
Cada linea es un "span" - una operacion dentro del trace.
Puedes ver exactamente donde se gasta el tiempo.
En este ejemplo: la DB toma 45ms, que es el 29% del tiempo total.

----

### OpenTelemetry: Instrumentacion Automatica

```typescript
// bootstrap.ts - La magia ocurre en el startup

import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';

const sdk = new NodeSDK({
  traceExporter: new OTLPTraceExporter({
    url: 'https://otel-collector.example.com',
  }),
  instrumentations: [
    getNodeAutoInstrumentations({
      // Instrumenta automaticamente:
      // - HTTP requests
      // - MongoDB queries
      // - Redis commands
      // - Express/Fastify routes
    }),
  ],
});

sdk.start();
```

**Automaticamente instrumenta**: HTTP, MongoDB, Redis, Express, y mas

Note:
No tienes que agregar codigo manual para cada operacion.
OpenTelemetry instrumenta automaticamente las librerias mas comunes.
Solo tienes que inicializarlo al arrancar la aplicacion.

---

## Health Checks

> Kubernetes necesita saber si tu app esta viva

⬇️ _Navega hacia abajo para ver detalles_

----

### Endpoints de Health

| Endpoint | Proposito | Kubernetes |
|----------|-----------|------------|
| `/health` | Esta el proceso vivo? | livenessProbe |
| `/health/ready` | Puede recibir trafico? | readinessProbe |
| `/health/live` | Detalles de componentes | Debugging |

```typescript
// health.controller.ts

@Controller('health')
export class HealthController {
  @Get()
  check(): { status: string } {
    return { status: 'ok' };
  }

  @Get('ready')
  async ready(): Promise<{ status: string; checks: Record<string, boolean> }> {
    const checks = {
      database: await this.checkDatabase(),
      redis: await this.checkRedis(),
      pubsub: await this.checkPubSub(),
    };
    const allHealthy = Object.values(checks).every(Boolean);

    return {
      status: allHealthy ? 'ok' : 'degraded',
      checks,
    };
  }
}
```

Note:
Liveness: "Estas vivo?" - si no responde, Kubernetes reinicia el pod.
Readiness: "Puedes recibir trafico?" - tal vez esta vivo pero aun conectandose a la DB.

----

### Kubernetes usa estos endpoints

```yaml
# deployment.yaml

spec:
  containers:
    - name: integration-api
      livenessProbe:
        httpGet:
          path: /health
          port: 3000
        initialDelaySeconds: 10
        periodSeconds: 10
      readinessProbe:
        httpGet:
          path: /health/ready
          port: 3000
        initialDelaySeconds: 5
        periodSeconds: 5
```

Note:
Kubernetes llama a estos endpoints cada pocos segundos.
Si liveness falla 3 veces seguidas, reinicia el pod.
Si readiness falla, deja de enviarle trafico (pero no lo reinicia).

---

## Error Budget (RFC-0012)

> Cuantos errores podemos tener antes de romper nuestras promesas

⬇️ _Navega hacia abajo para ver detalles_

----

### SLO, SLI, y Error Budget

| Concepto | Que es | Ejemplo |
|----------|--------|---------|
| **SLI** | Metrica que medimos | % de requests exitosas |
| **SLO** | Objetivo que prometemos | 99.9% disponibilidad |
| **Error Budget** | Margen de error permitido | 0.1% = 43 min/mes |

```
Si prometemos 99.9% uptime (SLO)
Tenemos 0.1% de "presupuesto de errores"
En un mes de 30 dias = 43,200 minutos
0.1% = 43.2 minutos de downtime permitido
```

Note:
Error Budget es un concepto de SRE de Google.
Es una forma de balancear velocidad de desarrollo con estabilidad.

----

### Error Budget Dashboard

```
+-----------------------------------------------------+
|              ERROR BUDGET DASHBOARD                  |
|                                                      |
|  SLO Target:     99.9% availability                 |
|  Current:        99.95%                             |
|                                                      |
|  Budget (30d):   43.2 min downtime allowed          |
|  Used:           12.5 min (29%)                     |
|  Remaining:      30.7 min                           |
|                                                      |
|  [========..........................] 29%           |
|                                                      |
|  Status: HEALTHY - Safe to deploy                   |
+-----------------------------------------------------+
```

----

### Acciones segun Error Budget

| Budget Restante | Estado | Acciones Permitidas |
|-----------------|--------|---------------------|
| **>50%** | HEALTHY | Deploys normales, features nuevas |
| **25-50%** | WARNING | Requiere approval extra para deploys |
| **<25%** | CRITICAL | Solo hotfixes criticos |
| **0%** | FROZEN | No deploys hasta recuperar budget |

Note:
Cuando el budget se agota, paramos features y nos enfocamos en estabilidad.
Cuando hay budget disponible, podemos tomar mas riesgos con deploys.

---

## Resumen

| Pilar | Herramienta | Uso |
|-------|-------------|-----|
| Logs | Pino + Cloud Logging | Debug y auditoria |
| Metricas | OpenTelemetry + Prometheus | Dashboards y alertas |
| Traces | OpenTelemetry + Cloud Trace | Analisis de performance |

---

## Donde Encontrar el Codigo

```
libs/shared/backend/observability/
  src/lib/
    logger/
      pino.config.ts
    metrics/
      otel.config.ts
    tracing/
      tracing.config.ts
    health/
      health.controller.ts
```

---

# 🙏 Gracias
