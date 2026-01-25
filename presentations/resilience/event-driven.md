---
title: "Event-Driven Architecture"
theme: black
highlightTheme: monokai
revealOptions:
  transition: slide
  transitionSpeed: default
  controls: true
  slideNumber: true
  progress: true
---

# Event-Driven Architecture

## Comunicacion asincrona entre modulos via Cloud Pub/Sub

---

## Por Que Event-Driven

> Los modulos no se llaman directamente - publican eventos

⬇️ _Navega hacia abajo para ver detalles_

```
SIN Event-Driven:
  Orders -> Inventory.reserveStock()
  Orders -> Pricing.calculateTotal()
  Orders -> Notifications.sendEmail()
  (Acoplamiento directo, si uno falla, todo falla)

CON Event-Driven:
  Orders -> publish("order.created")
  Inventory escucha -> reserva stock
  Pricing escucha -> calcula total
  Notifications escucha -> envia email
  (Desacoplado, fallos aislados)
```

Note:
Event-Driven Architecture permite que los modulos se comuniquen sin conocerse.
Orders no sabe que Notifications existe - solo publica eventos.
Si Notifications esta caido, Orders sigue funcionando.

----

### Cloud Pub/Sub vs BullMQ/Redis

| Aspecto | BullMQ/Redis | Cloud Pub/Sub |
|---------|--------------|---------------|
| Infraestructura | Mantener Redis | Fully managed |
| Modelo | Pull (workers consultan) | Push (eventos llegan) |
| Integracion GCP | Ninguna | Nativa |
| Escalado | Manual | Automatico |
| Dead Letter | Configurar manualmente | Built-in |
| Costo | Redis instance 24/7 | Pay per message |

**Decision**: Cloud Pub/Sub por ser GCP-native y zero-ops

---

## Arquitectura de Eventos

<div style="text-align: center;">
<svg width="800" height="250" viewBox="0 0 800 250" xmlns="http://www.w3.org/2000/svg">
  <!-- Producers -->
  <g transform="translate(50, 50)">
    <rect x="0" y="0" width="150" height="150" rx="8" fill="#1a252f" stroke="#9b59b6" stroke-width="2"/>
    <text x="75" y="30" text-anchor="middle" fill="#9b59b6" font-weight="bold">PRODUCTORES</text>

    <rect x="15" y="50" width="55" height="30" rx="4" fill="#3498db"/>
    <text x="42" y="70" text-anchor="middle" fill="#fff" font-size="9">Inventory</text>

    <rect x="80" y="50" width="55" height="30" rx="4" fill="#2ecc71"/>
    <text x="107" y="70" text-anchor="middle" fill="#fff" font-size="9">Pricing</text>

    <rect x="15" y="90" width="55" height="30" rx="4" fill="#e67e22"/>
    <text x="42" y="110" text-anchor="middle" fill="#fff" font-size="9">Orders</text>

    <rect x="80" y="90" width="55" height="30" rx="4" fill="#e74c3c"/>
    <text x="107" y="110" text-anchor="middle" fill="#fff" font-size="9">Catalog</text>
  </g>

  <!-- Arrow to Pub/Sub -->
  <path d="M 200 125 L 280 125" stroke="#9b59b6" stroke-width="2" marker-end="url(#evt-arrow)"/>

  <!-- Pub/Sub -->
  <g transform="translate(290, 50)">
    <rect x="0" y="0" width="200" height="150" rx="8" fill="#1a252f" stroke="#4285f4" stroke-width="2"/>
    <text x="100" y="30" text-anchor="middle" fill="#4285f4" font-weight="bold">Cloud Pub/Sub</text>

    <rect x="15" y="50" width="80" height="25" rx="4" fill="#2c3e50"/>
    <text x="55" y="67" text-anchor="middle" fill="#3498db" font-size="8">stock-events</text>

    <rect x="105" y="50" width="80" height="25" rx="4" fill="#2c3e50"/>
    <text x="145" y="67" text-anchor="middle" fill="#2ecc71" font-size="8">price-events</text>

    <rect x="15" y="85" width="80" height="25" rx="4" fill="#2c3e50"/>
    <text x="55" y="102" text-anchor="middle" fill="#e67e22" font-size="8">order-events</text>

    <rect x="105" y="85" width="80" height="25" rx="4" fill="#2c3e50"/>
    <text x="145" y="102" text-anchor="middle" fill="#e74c3c" font-size="8">notif-events</text>

    <text x="100" y="130" text-anchor="middle" fill="#95a5a6" font-size="8">Push subscriptions</text>
  </g>

  <!-- Arrow to Consumers -->
  <path d="M 490 125 L 570 125" stroke="#2ecc71" stroke-width="2" marker-end="url(#evt-arrow-green)"/>

  <!-- Consumers -->
  <g transform="translate(580, 50)">
    <rect x="0" y="0" width="150" height="150" rx="8" fill="#1a252f" stroke="#2ecc71" stroke-width="2"/>
    <text x="75" y="30" text-anchor="middle" fill="#2ecc71" font-weight="bold">CONSUMIDORES</text>

    <rect x="15" y="50" width="120" height="30" rx="4" fill="#2c3e50"/>
    <text x="75" y="70" text-anchor="middle" fill="#ecf0f1" font-size="9">notification-worker</text>

    <rect x="15" y="90" width="120" height="30" rx="4" fill="#2c3e50"/>
    <text x="75" y="110" text-anchor="middle" fill="#ecf0f1" font-size="9">sync-worker</text>
  </g>

  <defs>
    <marker id="evt-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
      <path d="M0,0 L6,3 L0,6 z" fill="#9b59b6"/>
    </marker>
    <marker id="evt-arrow-green" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
      <path d="M0,0 L6,3 L0,6 z" fill="#2ecc71"/>
    </marker>
  </defs>
</svg>
</div>

---

## El Problema: Dual Write

> Que pasa si guardas en DB pero fallas al publicar?

⬇️ _Navega hacia abajo para ver detalles_

----

### Escenario Problematico

```typescript
// PELIGROSO - Dual Write Problem

async createOrder(dto: CreateOrderDto) {
  // 1. Guardar en DB - EXITO
  const order = await this.orderRepository.save(dto);

  // 2. Publicar evento - FALLA (red caida, Pub/Sub down, etc)
  await this.pubsub.publish('order-events', {
    type: 'order.created',
    data: order,
  });
  // Si falla aqui, el order existe pero nadie fue notificado
}

// Resultado: DB tiene el order, pero Inventory nunca reservo stock
// El cliente recibe confirmacion pero no hay producto
```

Note:
Este es uno de los problemas mas dificiles de sistemas distribuidos.
La DB y Pub/Sub son dos sistemas separados - no hay transaccion atomica.

----

### Solucion: Transactional Outbox Pattern

```
Service --> DB: BEGIN TRANSACTION
         |
         +--> DB: 1. Save Order
         |
         +--> Outbox: 2. Save Event (PENDING)
         |
         +--> DB: COMMIT

         (Transaccion ACID garantiza ambos)

Publisher --> Outbox: 3. Poll PENDING events
           |
           +--> Pub/Sub: 4. Publish
           |
           +--> Outbox: 5. Mark PUBLISHED
```

**Garantia**: Si el order existe, el evento EVENTUALMENTE se publicara

----

### Implementacion del Outbox

```typescript
// libs/shared/backend/pubsub/src/lib/outbox.service.ts

@Injectable()
export class OutboxService {
  async saveAndPublish<T>(params: {
    eventType: string;
    payload: T;
    topic: string;
  }): Promise<void> {
    // 1. Guardar evento en tabla outbox (misma transaccion que la entidad)
    const outboxEvent = await this.outboxRepository.save({
      eventType: params.eventType,
      payload: params.payload,
      topic: params.topic,
      status: 'PENDING',
      createdAt: new Date(),
    });

    // 2. Intentar publicar inmediatamente
    try {
      await this.pubSubService.publish(params.topic, params.payload);
      await this.outboxRepository.markAsPublished(outboxEvent.id);
    } catch (error) {
      // Si falla, el OutboxProcessor lo reintentara despues
      this.logger.warn('Immediate publish failed, will retry', { eventId: outboxEvent.id });
    }
  }
}
```

----

### OutboxProcessor: El Reintentador

```typescript
// Cron job que reintenta eventos pendientes cada 30 segundos

@Injectable()
export class OutboxProcessor {
  @Cron('*/30 * * * * *')  // Cada 30 segundos
  async processPendingEvents() {
    const pendingEvents = await this.outboxRepository.findPending({
      limit: 100,
      olderThan: 30_000,  // Solo eventos de hace >30s
    });

    for (const event of pendingEvents) {
      try {
        await this.pubSubService.publish(event.topic, event.payload);
        await this.outboxRepository.markAsPublished(event.id);
      } catch (error) {
        await this.outboxRepository.incrementRetryCount(event.id);

        if (event.retryCount >= 10) {
          await this.outboxRepository.markAsFailed(event.id);
          this.alertService.notify('Outbox event exhausted retries', event);
        }
      }
    }
  }
}
```

---

## Publicar un Evento: Paso a Paso

----

### Paso 1: Definir el Evento

```typescript
// libs/inventory/domain/src/lib/events/stock-reserved.event.ts

export class StockReservedEvent {
  static readonly eventType = 'inventory.stock.reserved';

  constructor(
    public readonly sku: string,
    public readonly quantity: number,
    public readonly orderId: string,
    public readonly warehouseId: string,
  ) {}
}

// Convencion de nombres: <modulo>.<entidad>.<accion>
// inventory.stock.reserved
// orders.order.created
// notifications.email.sent
```

----

### Paso 2: Publicar desde el Servicio

```typescript
// libs/inventory/application/src/lib/services/stock.service.ts

@Injectable()
export class StockService {
  constructor(private outboxService: OutboxService) {}

  async reserveStock(sku: string, qty: number, orderId: string) {
    // 1. Logica de negocio
    const reservation = await this.repository.reserve(sku, qty);

    // 2. Publicar evento (transaccional)
    await this.outboxService.saveAndPublish({
      eventType: StockReservedEvent.eventType,
      payload: new StockReservedEvent(sku, qty, orderId, reservation.warehouseId),
      topic: 'stock-events',
    });

    return reservation;
  }
}
```

**Nota**: `saveAndPublish` usa la misma transaccion de DB que `reserve`

----

### Paso 3: Consumir el Evento

```typescript
// apps/notification-worker/src/handlers/stock.handler.ts

@Controller('pubsub/stock')
export class StockEventHandler extends BasePubSubController {
  @Post('reserved')
  async handleStockReserved(@Body() message: PubSubMessage) {
    // 1. Decodificar mensaje
    const event = this.decode<StockReservedEvent>(message);

    // 2. Verificar idempotencia (evitar procesar duplicados)
    if (await this.idempotentHandler.wasProcessed(message.messageId)) {
      return { status: 'duplicate' };
    }

    // 3. Procesar evento
    await this.notificationService.sendStockConfirmation(event);

    // 4. Marcar como procesado
    await this.idempotentHandler.markProcessed(message.messageId);

    return { status: 'ok' };
  }
}
```

---

## Idempotencia: Procesar Solo Una Vez

> Pub/Sub garantiza "at-least-once" - puede enviar duplicados

⬇️ _Navega hacia abajo para ver detalles_

----

### El Problema de Duplicados

```
Pub/Sub envia mensaje M1 -> Worker lo procesa -> Envia email
Pub/Sub no recibe ACK a tiempo -> Reenvia M1 -> Worker procesa de nuevo
Resultado: Cliente recibe 2 emails identicos
```

**Solucion**: IdempotentHandler verifica si ya procesamos el mensaje

```typescript
// libs/shared/backend/pubsub/src/lib/idempotent-handler.ts

@Injectable()
export class IdempotentHandler {
  constructor(private redis: RedisService) {}

  async wasProcessed(messageId: string): Promise<boolean> {
    const key = `pubsub:processed:${messageId}`;
    const exists = await this.redis.exists(key);
    return exists > 0;
  }

  async markProcessed(messageId: string, ttl = 86400): Promise<void> {
    const key = `pubsub:processed:${messageId}`;
    await this.redis.setex(key, ttl, '1');
  }
}
```

----

### Patron Completo con Idempotencia

```typescript
@Post('order-created')
async handleOrderCreated(@Body() message: PubSubMessage) {
  const eventId = message.messageId;

  // 1. Check idempotencia
  if (await this.idempotent.wasProcessed(eventId)) {
    this.logger.debug('Duplicate message, skipping', { eventId });
    return { status: 'duplicate' };
  }

  try {
    // 2. Procesar
    const event = this.decode<OrderCreatedEvent>(message);
    await this.processOrderCreated(event);

    // 3. Marcar como procesado SOLO si exito
    await this.idempotent.markProcessed(eventId);

    return { status: 'ok' };
  } catch (error) {
    // 4. Si falla, NO marcamos como procesado
    // Pub/Sub reintentara automaticamente
    this.logger.error('Failed to process', { eventId, error });
    throw error;  // 500 -> Pub/Sub reintenta
  }
}
```

---

## Dead Letter Queue (DLQ)

> Que pasa con mensajes que siempre fallan?

⬇️ _Navega hacia abajo para ver detalles_

----

### Flujo con DLQ

```
Mensaje M1 -> Worker -> Falla
           -> Retry 1 -> Falla
           -> Retry 2 -> Falla
           -> Retry 3 -> Falla
           -> Retry 4 -> Falla
           -> Retry 5 -> DEAD LETTER QUEUE

DLQ:
- Mensaje se guarda para inspeccion manual
- Alerta se envia al equipo
- No bloquea otros mensajes
```

```typescript
// Configuracion de subscription en GCP

{
  "name": "stock-events-sub",
  "topic": "stock-events",
  "deadLetterPolicy": {
    "deadLetterTopic": "stock-events-dlq",
    "maxDeliveryAttempts": 5
  },
  "retryPolicy": {
    "minimumBackoff": "10s",
    "maximumBackoff": "600s"
  }
}
```

---

## Topics Disponibles

| Topic | Eventos | Consumidores |
|-------|---------|--------------|
| `stock-events` | stock.reserved, stock.released | notification-worker |
| `price-events` | price.updated, promotion.applied | sync-worker |
| `order-events` | order.created, order.cancelled | notification-worker, sync-worker |
| `notification-events` | notification.requested | notification-worker |

---

## Resumen

| Componente | Proposito | Ubicacion |
|------------|-----------|-----------|
| OutboxService | Garantiza consistencia | libs/shared/backend/pubsub/ |
| PubSubService | Publica mensajes | libs/shared/backend/pubsub/ |
| IdempotentHandler | Evita duplicados | libs/shared/backend/pubsub/ |
| BasePubSubController | Handler base | libs/shared/backend/pubsub/ |

----

### Garantias

- **At-least-once delivery** (Pub/Sub)
- **Exactamente-una-vez procesamiento** (Idempotencia)
- **Consistencia DB-Evento** (Outbox Pattern)
- **Manejo de fallos** (DLQ)

---

# 🙏 Gracias
