---
title: "Patrones Avanzados"
theme: black
highlightTheme: monokai
revealOptions:
  transition: slide
  transitionSpeed: default
  controls: true
  slideNumber: true
  progress: true
---

# Patrones Avanzados

## Caching y Feature Flags

> Patrones para performance y control dinamico

---

## Advanced Caching (RFC-0015)

> Mas alla del Cache-Aside basico

Note:
El cache es crucial para performance - puede reducir latencia de 100ms a 1ms.
Pero cachear correctamente es dificil. Hay problemas sutiles que pueden causar bugs o inconsistencias.
Vamos a ver 4 patrones avanzados que resuelven problemas comunes.

----

### 4 Patrones de Caching

```
┌─────────────────────────────────────────────────────────────┐
│              CACHING PATTERNS (RFC-0015)                     │
│                                                              │
│  1. STAMPEDE PROTECTION                                     │
│     └─▶ Singleflight + Probabilistic Early Refresh          │
│         Evita thundering herd en cache miss                  │
│                                                              │
│  2. WRITE-THROUGH                                           │
│     └─▶ Escritura atomica DB + Cache                        │
│         Invalidacion por tags                                │
│                                                              │
│  3. CACHE COHERENCE                                         │
│     └─▶ Sincronizacion cross-module via Redis Pub/Sub       │
│         Inventory invalida → Pricing se entera              │
│                                                              │
│  4. REFRESH-AHEAD                                           │
│     └─▶ Pre-carga automatica de hot keys                    │
│         Renueva antes de expirar                            │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

Note:
Multi-tier: tenemos cache en memoria Y en Redis. El mas rapido es memoria, Redis es fallback.
Stampede Protection: cuando el cache expira, evitamos que 1000 requests golpeen la DB simultaneamente.
TTL Refresh: refrescamos el cache ANTES de que expire, asi nunca hay "miss".
Cache-Through: escribimos a cache y DB juntos, no hay inconsistencia.

---

## Stampede Protection

> Evita que 1000 requests golpeen la DB simultaneamente

----

### El Problema: Thundering Herd

```
Cache expira a las 10:00:00.000

10:00:00.001 - Request 1 → Cache MISS → Query DB
10:00:00.002 - Request 2 → Cache MISS → Query DB
10:00:00.003 - Request 3 → Cache MISS → Query DB
...
10:00:00.100 - Request 1000 → Cache MISS → Query DB

Resultado: 1000 queries simultaneas a la DB
           DB saturada, latencia altisima, posible crash
```

----

### La Solucion: Singleflight

```typescript
// Sin proteccion: 1000 requests = 1000 queries DB
// Con proteccion: 1000 requests = 1 query DB

@Cacheable({
  key: 'product:{sku}',
  ttl: 3600,
  stampedeProtection: {
    enabled: true,
    probabilisticRefresh: 0.1  // 10% refresh early
  }
})
async getProduct(sku: string): Promise<Product> {
  return this.repository.findBySku(sku);
}
```

**Como funciona:**

1. Request 1 llega, cache miss, inicia query
2. Requests 2-1000 llegan, ven que Request 1 ya esta cargando
3. Requests 2-1000 ESPERAN a Request 1
4. Request 1 termina, TODAS reciben el resultado

Note:
Stampede (estampida) es cuando muchas requests llegan al mismo tiempo y el cache no tiene el dato.
Sin proteccion, TODAS van a la DB simultaneamente. Puede tumbar el sistema.
Con Stampede Protection, solo UNA request va a la DB, las demas esperan.
El probabilisticRefresh refresca ANTES de expirar - asi nunca hay un "miss" real.

----

### Probabilistic Early Refresh

```
TTL = 3600s (1 hora)
probabilisticRefresh = 0.1 (10%)

Timeline:
─────────────────────────────────────────────────────▶
0s                                              3240s  3600s
│                                                 │      │
│         Normal (servir del cache)              │ 10%  │
│                                                │chance│ Expira
│                                                │refres│
```

**10% chance de refrescar en los ultimos 6 minutos**

Resultado: El cache casi nunca expira "de verdad"

---

## Write-Through Cache

> Escritura atomica a DB y Cache

----

### El Problema: Cache Stale

```
Sin Write-Through:

1. UPDATE product SET price = 100 WHERE sku = 'ABC'  ✓ DB actualizada
2. Cache sigue teniendo price = 90                   ✗ Inconsistente!
3. Usuario ve precio viejo por 1 hora (TTL)
```

----

### La Solucion: Write-Through

```typescript
@CacheInvalidate({
  keys: ['product:{sku}', 'product-list:*'],
  tags: ['products']
})
async updatePrice(sku: string, newPrice: number): Promise<void> {
  // 1. Actualiza DB
  await this.repository.updatePrice(sku, newPrice);

  // 2. Automaticamente invalida cache
  // El decorator hace esto por nosotros
}
```

**Invalidacion por tags:**

```typescript
// Invalida TODOS los caches con tag 'products'
await this.cacheService.invalidateByTag('products');
```

---

## Cache Coherence

> Sincronizacion entre modulos

----

### El Problema: Modulos Desincronizados

```
Inventory actualiza stock de SKU-123

Pero Pricing tiene cacheado:
  - Lista de productos con stock > 0
  - Precios calculados con disponibilidad

Resultado: Pricing muestra producto "disponible"
           cuando ya no hay stock
```

----

### La Solucion: Redis Pub/Sub para Cache

```typescript
// Inventory publica invalidacion
await this.cacheEvents.publish('cache:invalidate', {
  tags: ['stock', `sku:${sku}`],
  source: 'inventory'
});

// Pricing escucha
this.cacheEvents.subscribe('cache:invalidate', async (event) => {
  if (event.tags.includes('stock')) {
    await this.cacheService.invalidateByTags(event.tags);
    this.logger.info('Cache invalidated by Inventory', event);
  }
});
```

**Flujo:**

1. Inventory actualiza stock
2. Inventory publica evento de invalidacion
3. Pricing recibe evento y limpia su cache
4. Proximo request a Pricing trae datos frescos

---

## Feature Flags y Kill-Switch

> Control dinamico sin redeploy

Note:
Los Kill-Switches son como interruptores de emergencia.
Si algo esta fallando en produccion, podemos apagarlo SIN hacer un nuevo deploy.
Los Feature Flags permiten activar/desactivar features para ciertos usuarios o porcentajes.
Esto permite lanzar features gradualmente y revertir rapido si hay problemas.

----

### Kill-Switch Pattern

```typescript
// Deshabilitar feature en runtime sin redeploy

@Injectable()
export class PricingService {
  constructor(private killSwitch: KillSwitchService) {}

  async calculatePrice(sku: string): Promise<Price> {
    // Kill-switch para promociones
    if (this.killSwitch.isKilled('promotions')) {
      return this.getBasePrice(sku);
    }

    // Feature flag para nuevo algoritmo
    if (this.killSwitch.isEnabled('new-pricing-v2')) {
      return this.calculatePriceV2(sku);
    }

    return this.calculatePriceV1(sku);
  }
}
```

Note:
Miren el codigo: antes de calcular promociones, verificamos si el kill-switch esta activado.
Si las promociones estan causando problemas, simplemente las "matamos" desde configuracion.
El sistema sigue funcionando con precios base - degradacion elegante.

----

### Casos de Uso

| Escenario | Accion | Tiempo |
|-----------|--------|--------|
| Bug critico en produccion | Kill feature | Segundos |
| Promocion Black Friday | Enable/Disable | Inmediato |
| Rollout gradual | % de usuarios | Configurable |
| A/B Testing | Variantes | Por request |
| Mantenimiento DB | Degraded mode | Temporal |

**Sin redeploy, sin downtime**

----

### Configuracion de Feature Flags

```typescript
// feature-flags.config.ts

export const featureFlags = {
  'new-pricing-v2': {
    enabled: false,
    rollout: 0,  // 0% de usuarios
    allowlist: ['internal-users'],
  },
  'promotions': {
    enabled: true,
    killable: true,  // Puede desactivarse en emergencia
  },
  'experimental-search': {
    enabled: true,
    rollout: 10,  // 10% de usuarios
  }
};
```

**Rollout gradual:**

```
Semana 1: rollout: 5    (5% de usuarios)
Semana 2: rollout: 25   (25% de usuarios)
Semana 3: rollout: 50   (50% de usuarios)
Semana 4: rollout: 100  (todos)
```

---

## Resumen

| Patron | Problema que resuelve | Cuando usar |
|--------|----------------------|-------------|
| **Stampede Protection** | DB saturada en cache miss | Datos muy accedidos |
| **Write-Through** | Cache inconsistente | Datos que cambian frecuentemente |
| **Cache Coherence** | Modulos desincronizados | Multiples caches del mismo dato |
| **Feature Flags** | Necesidad de redeploy | Cualquier feature nueva |
| **Kill-Switch** | Bugs en produccion | Features que pueden fallar |

---

## Donde Encontrar el Codigo

```
libs/shared/backend/cache/
  src/lib/
    decorators/
      cacheable.decorator.ts
      cache-invalidate.decorator.ts
    services/
      cache.service.ts
      stampede-protection.service.ts
    events/
      cache-events.service.ts

libs/shared/backend/feature-flags/
  src/lib/
    services/
      feature-flag.service.ts
      kill-switch.service.ts
```

---

## Preguntas?

```bash
npx reveal-md advanced-patterns.md --theme night
```
