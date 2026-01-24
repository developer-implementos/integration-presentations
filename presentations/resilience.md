---
title: "Resiliencia - Patrones para Sistemas Robustos"
theme: black
highlightTheme: monokai
revealOptions:
  transition: slide
  transitionSpeed: default
  controls: true
  slideNumber: true
  progress: true
---

# Resiliencia

## Patrones para sistemas que NO se caen

> El 73% de los outages se deben a fallos en cascada

---

## Por Que Resiliencia

Note:
**Para juniors**: Imaginen que llaman a un API externo y este no responde.
Sin resiliencia: tu sistema se queda esperando y eventualmente se cae.
Con resiliencia: tu sistema detecta el problema, responde gracefully, y se recupera solo.

Netflix popularizo estos patrones despues de su migracion a AWS.
Amazon, Google, y todas las big tech los usan.

----

### Los 4 Patrones Clave

```
RESILIENCIA = DETECTAR + AISLAR + RECUPERAR

1. CIRCUIT BREAKER     "El interruptor automatico"
   Si el servicio falla mucho, dejamos de llamarlo

2. TIMEOUT             "No esperes para siempre"
   Cancela requests que tardan demasiado

3. RETRY               "Intentalo de nuevo"
   Reintenta con backoff exponencial

4. BULKHEAD            "Compartimentos estancos"
   Aisla fallos para que no se propaguen
```

Note:
Cada patron resuelve un problema diferente:
- Circuit Breaker: evita saturar un servicio que ya esta mal
- Timeout: no desperdicies recursos esperando
- Retry: muchos errores son temporales
- Bulkhead: que un fallo no tumbe TODO el sistema

---

## Circuit Breaker

> El interruptor que protege tu sistema

Note:
El Circuit Breaker funciona como un interruptor electrico.
Si hay muchas fallas, se "abre" y corta el circuito.
Esto evita que saturemos un servicio que ya esta mal.
Despues de un cooldown, probamos con UNA request (half-open).
Si funciona, volvemos a normal.

----

<!-- .slide: data-background="#181818" -->

### Diagrama Animado

<div style="text-align: center; background: #1e1e1e; padding: 20px; border-radius: 10px;">
<svg width="800" height="320" viewBox="0 0 800 320" xmlns="http://www.w3.org/2000/svg">
<!-- Dashboard -->
<rect x="250" y="20" width="300" height="40" fill="#2c3e50" rx="5" stroke="#34495e" />
<text x="400" y="47" text-anchor="middle" fill="#ecf0f1" font-family="monospace" font-size="18">Threshold: 2 | Failures:</text>
<!-- Counter Numbers -->
<g transform="translate(530, 47)">
<!-- 0: Visible 0-3.5s AND 11.0s-14s -->
<text text-anchor="middle" fill="#2ecc71" font-family="monospace" font-size="18" font-weight="bold">0
<animate attributeName="opacity" values="1;1;0;0;1;1" keyTimes="0;0.25;0.251;0.79;0.791;1" dur="14s" repeatCount="indefinite" />
</text>
<!-- 1: Visible 3.5s-5.5s -->
<text text-anchor="middle" fill="#e67e22" font-family="monospace" font-size="18" font-weight="bold" opacity="0">1
<animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.25;0.251;0.393;0.394;1" dur="14s" repeatCount="indefinite" />
</text>
<!-- 2: Visible 5.5s-11.0s -->
<text text-anchor="middle" fill="#e74c3c" font-family="monospace" font-size="18" font-weight="bold" opacity="0">2
<animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.393;0.394;0.79;0.791;1" dur="14s" repeatCount="indefinite" />
</text>
</g>
<!-- Client -->
<rect x="40" y="100" width="120" height="80" fill="#3498db" rx="5" />
<text x="100" y="145" text-anchor="middle" fill="white" font-size="20" font-weight="bold">Client</text>
<!-- Server -->
<rect x="640" y="100" width="120" height="80" fill="#2ecc71" rx="5" />
<text x="700" y="145" text-anchor="middle" fill="white" font-size="20" font-weight="bold">Server</text>
<!-- Circuit Breaker Gate -->
<g transform="translate(400, 140)">
<!-- Barrier -->
<rect x="-10" y="-60" width="20" height="120" fill="#e74c3c" rx="2" opacity="0">
<animate attributeName="opacity" values="0;0;1;1;0.4;0.4;0;0" keyTimes="0;0.393;0.394;0.679;0.68;0.79;0.791;1" dur="14s" repeatCount="indefinite" />
<animate attributeName="fill" values="#e74c3c;#e74c3c;#f1c40f;#f1c40f" keyTimes="0;0.679;0.68;1" dur="14s" repeatCount="indefinite" />
</rect>
<!-- Labels -->
<text x="0" y="85" text-anchor="middle" font-size="18" font-weight="bold" fill="#2ecc71">
CLOSED
<animate attributeName="opacity" values="1;1;0;0;1;1" keyTimes="0;0.393;0.394;0.79;0.791;1" dur="14s" repeatCount="indefinite" />
</text>
<text x="0" y="85" text-anchor="middle" font-size="18" font-weight="bold" fill="#e74c3c" opacity="0">
OPEN
<animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.394;0.395;0.679;0.68;1" dur="14s" repeatCount="indefinite" />
</text>
<text x="0" y="85" text-anchor="middle" font-size="18" font-weight="bold" fill="#f1c40f" opacity="0">
HALF-OPEN
<animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.68;0.681;0.79;0.791;1" dur="14s" repeatCount="indefinite" />
</text>
</g>
<!-- Cooldown Timer -->
<g transform="translate(350, 270)">
<text x="50" y="-10" text-anchor="middle" fill="#e74c3c" font-size="14" font-family="monospace" opacity="0">
TIMEOUT COOLDOWN
<animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.394;0.395;0.679;0.68;1" dur="14s" repeatCount="indefinite" />
</text>
<rect x="0" y="0" width="100" height="6" fill="#333" rx="3" opacity="0">
<animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.394;0.395;0.679;0.68;1" dur="14s" repeatCount="indefinite" />
</rect>
<rect x="0" y="0" width="0" height="6" fill="#e74c3c" rx="3" opacity="0">
<animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.394;0.395;0.679;0.68;1" dur="14s" repeatCount="indefinite" />
<animate attributeName="width" values="0;0;100;100;0" keyTimes="0;0.395;0.679;0.68;1" dur="14s" repeatCount="indefinite" />
</rect>
</g>
<!-- Packets animation -->
<circle cx="160" cy="140" r="10" fill="#2ecc71" opacity="0">
<animate attributeName="cx" values="160;160;640;640" keyTimes="0;0.035;0.107;1" dur="14s" repeatCount="indefinite" />
<animate attributeName="opacity" values="0;1;1;0;0" keyTimes="0;0.035;0.10;0.107;1" dur="14s" repeatCount="indefinite" />
</circle>
</svg>
</div>

----

### Circuit Breaker: Codigo Real

> Como lo usamos con servicios externos

```typescript
// libs/shared/backend/resilience/src/lib/circuit-breakers.ts

import { CircuitBreaker, ConsecutiveBreaker } from 'cockatiel';

// Configuracion del Circuit Breaker para Salesforce
export const salesforceCircuitBreaker = new CircuitBreaker({
  halfOpenAfter: 30_000,              // 30s en estado OPEN antes de probar
  breaker: new ConsecutiveBreaker(2), // 2 fallos consecutivos = OPEN
});

// Uso en el servicio
async sendToSalesforce(notification: Notification): Promise<void> {
  try {
    await salesforceCircuitBreaker.execute(async () => {
      await this.salesforceClient.triggerJourney(notification);
    });
  } catch (error) {
    if (error instanceof BrokenCircuitError) {
      // Circuit esta OPEN - fallamos rapido, no intentamos
      this.logger.warn('Circuit breaker OPEN, skipping Salesforce call');
      throw new RetryableError('Salesforce temporarily unavailable');
    }
    throw error;
  }
}
```

Note:
Cockatiel es la libreria que usamos - es de Microsoft.
ConsecutiveBreaker(2) significa: 2 fallos seguidos = abrir el circuito.
Cuando el circuito esta OPEN, fallamos RAPIDO - no perdemos tiempo.

----

### Circuit Breaker: Estados

| Estado | Descripcion | Que pasa |
|--------|-------------|----------|
| **CLOSED** | Operacion normal | Requests pasan al servidor |
| **OPEN** | Demasiados fallos | Requests fallan inmediatamente |
| **HALF-OPEN** | Probando recuperacion | 1 request de prueba pasa |

**Escenario real: Salesforce en mantenimiento**

```text
Request 1 -> Timeout (30s) -> Fallo #1
Request 2 -> Timeout (30s) -> Fallo #2 -> CIRCUIT OPENS
Request 3-100 -> BrokenCircuitError (inmediato, 0ms)
... 30 segundos despues ...
Request 101 -> HALF-OPEN -> Prueba -> OK -> CIRCUIT CLOSES
```

Note:
Sin Circuit Breaker: 100 requests esperando 30s = 3000s desperdiciados
Con Circuit Breaker: 2 requests de 30s + 98 de 0ms = 60s total

---

## Timeout Pattern

> No esperes para siempre

<!-- .slide: data-background="#1c1c1c" -->

```typescript
import { timeout, TimeoutStrategy } from 'cockatiel';

// Timeout de 5 segundos para llamadas a APIs externas
const apiTimeout = timeout(5000, TimeoutStrategy.Aggressive);

async function fetchExternalData(url: string) {
  return apiTimeout.execute(async () => {
    const response = await fetch(url);
    return response.json();
  });
}

// Si tarda mas de 5s, lanza TimeoutError
```

----

### Por que 5 segundos?

- P99 de nuestros endpoints: ~200ms
- Si algo tarda >5s, probablemente esta mal
- Mejor fallar rapido y reintentar

Note:
Timeout agresivo cancela la operacion inmediatamente.
El servidor puede seguir procesando, pero ya no esperamos la respuesta.
Esto libera recursos de nuestro lado rapidamente.

---

## Retry Pattern

> Muchos errores son temporales

<!-- .slide: data-background="#181818" -->

```typescript
import { retry, handleAll, ExponentialBackoff } from 'cockatiel';

const retryPolicy = retry(handleAll, {
  maxAttempts: 3,
  backoff: new ExponentialBackoff({
    initialDelay: 100,   // Primer retry: 100ms
    maxDelay: 10_000,    // Maximo: 10s
    exponent: 2,         // 100ms -> 200ms -> 400ms -> ...
  }),
});

async function saveWithRetry(data: Entity) {
  return retryPolicy.execute(async () => {
    return this.repository.save(data);
  });
}
```

----

### Exponential Backoff

Cada retry espera el doble:

- Intento 1: inmediato
- Intento 2: 100ms despues
- Intento 3: 200ms despues
- Intento 4: 400ms despues

Note:
El backoff exponencial evita saturar un servicio que esta recuperandose.
Si todos reintentan inmediatamente, empeoramos el problema.
Dando tiempo entre reintentos, permitimos que el servicio se recupere.

---

## Bulkhead Pattern

> Compartimentos estancos: aisla los fallos

<!-- .slide: data-background="#1c1c1c" -->

```typescript
import { bulkhead } from 'cockatiel';

// Maximo 10 llamadas concurrentes a Salesforce
// Maximo 100 en cola de espera
const salesforceBulkhead = bulkhead(10, 100);

async function sendNotification(notification: Notification) {
  return salesforceBulkhead.execute(async () => {
    return this.salesforceClient.send(notification);
  });
}
```

**Analogia del barco**: Si se rompe un compartimento,
el agua no inunda todo el barco.

Note:
Sin Bulkhead: un servicio lento consume TODOS los threads.
Con Bulkhead: un servicio lento solo consume SU cuota.
El resto del sistema sigue funcionando normalmente.

---

## Composicion de Politicas

> Los patrones se combinan como una cadena

<div style="text-align: center; background: #1e1e1e; padding: 20px; border-radius: 10px;">
<svg width="800" height="200" viewBox="0 0 800 200" xmlns="http://www.w3.org/2000/svg">
<!-- Connecting Line -->
<line x1="50" y1="100" x2="750" y2="100" stroke="#555" stroke-width="4" stroke-dasharray="10,5" />
<!-- 1. Bulkhead -->
<g transform="translate(100, 50)">
<rect x="0" y="0" width="100" height="100" rx="10" fill="#1e1e1e" stroke="#9b59b6" stroke-width="3"/>
<text x="50" y="45" text-anchor="middle" fill="#9b59b6" font-size="24">|||</text>
<text x="50" y="75" text-anchor="middle" fill="#9b59b6" font-size="12">Bulkhead</text>
</g>
<!-- 2. Timeout -->
<g transform="translate(250, 50)">
<rect x="0" y="0" width="100" height="100" rx="10" fill="#1e1e1e" stroke="#e67e22" stroke-width="3"/>
<text x="50" y="50" text-anchor="middle" fill="#e67e22" font-size="24">T</text>
<text x="50" y="75" text-anchor="middle" fill="#e67e22" font-size="12">Timeout</text>
</g>
<!-- 3. Circuit Breaker -->
<g transform="translate(400, 50)">
<rect x="0" y="0" width="100" height="100" rx="10" fill="#1e1e1e" stroke="#e74c3c" stroke-width="3"/>
<text x="50" y="50" text-anchor="middle" fill="#e74c3c" font-size="24">CB</text>
<text x="50" y="75" text-anchor="middle" fill="#e74c3c" font-size="12">Circuit Breaker</text>
</g>
<!-- 4. Retry -->
<g transform="translate(550, 50)">
<rect x="0" y="0" width="100" height="100" rx="10" fill="#1e1e1e" stroke="#3498db" stroke-width="3"/>
<text x="50" y="50" text-anchor="middle" fill="#3498db" font-size="24">R</text>
<text x="50" y="75" text-anchor="middle" fill="#3498db" font-size="12">Retry</text>
</g>
<!-- 5. Target -->
<g transform="translate(700, 60)">
<rect x="0" y="0" width="80" height="80" rx="5" fill="#2ecc71"/>
<text x="40" y="45" text-anchor="middle" fill="#fff" font-size="12" font-weight="bold">Target</text>
</g>
</svg>
</div>

----

### Codigo de Composicion

```typescript
// El orden importa: Bulkhead -> Timeout -> Circuit Breaker -> Retry
const resilientPolicy = wrap(
  salesforceBulkhead,    // 1. Limita concurrencia
  timeout(30_000),       // 2. Cancela si tarda >30s
  salesforceCircuitBreaker, // 3. Corta si hay muchos fallos
  retryPolicy            // 4. Reintenta si falla
);

await resilientPolicy.execute(() => salesforce.send(data));
```

---

## Configuracion por Ambiente

```typescript
// libs/shared/backend/resilience/src/lib/config.ts

export const resilienceConfig = {
  circuitBreaker: {
    threshold: 5,        // Fallos para abrir
    resetTimeout: 30000  // Tiempo para probar recuperacion
  },
  retry: {
    maxAttempts: 3,
    initialDelay: 100,
    maxDelay: 10000
  },
  timeout: {
    default: 5000,       // APIs rapidas
    external: 30000      // APIs externas (Salesforce, etc)
  },
  bulkhead: {
    maxConcurrent: 10,
    maxQueue: 100
  }
};
```

Note:
Estos valores son configurables por ambiente.
En QA podemos ser mas agresivos (timeouts cortos).
En PROD somos mas conservadores.

---

## Cuando Usar Cada Patron

| Patron | Usa cuando... | No uses cuando... |
|--------|---------------|-------------------|
| **Circuit Breaker** | Llamas a servicios externos | Es una operacion local |
| **Timeout** | La operacion puede colgarse | Ya tienes timeout en cliente |
| **Retry** | Errores pueden ser temporales | Es un error de negocio (400) |
| **Bulkhead** | Un servicio puede saturarse | El servicio escala automaticamente |

**Regla general**: APIs externas (Salesforce, VTEX, etc) = TODOS los patrones

---

## Ejemplo Completo: Salesforce Integration

```typescript
// libs/notifications/infrastructure/src/lib/salesforce/salesforce.client.ts

@Injectable()
export class SalesforceClient {
  private readonly resilientPolicy = wrap(
    bulkhead(10, 100),
    timeout(30_000),
    new CircuitBreaker({
      halfOpenAfter: 30_000,
      breaker: new ConsecutiveBreaker(2),
    }),
    retry(handleAll, { maxAttempts: 3 })
  );

  async triggerJourney(notification: Notification): Promise<void> {
    return this.resilientPolicy.execute(async () => {
      const response = await this.httpClient.post(
        `${this.baseUrl}/journeys/trigger`,
        this.buildPayload(notification),
      );

      if (!response.ok) {
        throw new ExternalServiceError('Salesforce', response.status);
      }
    });
  }
}
```

Note:
Este es codigo REAL de nuestro proyecto.
Cada llamada a Salesforce pasa por toda la cadena de resiliencia.
Si algo falla, el sistema se recupera automaticamente.

---

## Resumen

| Patron | Que hace | Libreria |
|--------|----------|----------|
| Circuit Breaker | Corta llamadas a servicios caidos | Cockatiel |
| Timeout | Cancela operaciones lentas | Cockatiel |
| Retry | Reintenta con backoff | Cockatiel |
| Bulkhead | Aisla fallos | Cockatiel |

**Cockatiel** = Libreria de Microsoft para resiliencia en TypeScript

---

## Donde Encontrar el Codigo

```
libs/shared/backend/resilience/
  src/lib/
    circuit-breakers.ts
    retry-policies.ts
    timeout-policies.ts
    bulkhead-policies.ts
```

---

## Preguntas?

```
npx reveal-md resiliencia.md --watch
```
