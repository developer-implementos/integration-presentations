---
title: "Seguridad - Defense in Depth"
theme: black
highlightTheme: monokai
revealOptions:
  transition: slide
  transitionSpeed: default
  controls: true
  slideNumber: true
  progress: true
---

# Seguridad

## Defense in Depth: Multiples capas de proteccion

---

## Por Que Multiples Capas

> Si una capa falla, las otras siguen protegiendo

```
                    INTERNET
                        |
                        v
    +-------------------------------------------+
    |            WAF / Cloud Armor              |  <-- Capa 1: DDoS protection
    +-------------------------------------------+
                        |
    +-------------------------------------------+
    |            API Gateway                     |  <-- Capa 2: Rate Limiting
    +-------------------------------------------+
                        |
    +-------------------------------------------+
    |            Autenticacion                   |  <-- Capa 3: JWT / API Key
    +-------------------------------------------+
                        |
    +-------------------------------------------+
    |            Autorizacion                    |  <-- Capa 4: RBAC / Scopes
    +-------------------------------------------+
                        |
    +-------------------------------------------+
    |            Input Validation                |  <-- Capa 5: Sanitizacion
    +-------------------------------------------+
                        |
                        v
                    APLICACION
```

Note:
Esto se llama "defense in depth" - defensa en profundidad.
Es como tener multiples puertas con diferentes llaves.
Si alguien pasa una, todavia tiene que pasar las otras.

----

### Las 8 Capas de Seguridad

| Capa | Que protege | Como |
|------|-------------|------|
| WAF | DDoS, SQL injection | Cloud Armor |
| Rate Limiting | Abuso de API | 3 niveles |
| Autenticacion | Identidad | JWT + API Keys |
| Autorizacion | Permisos | RBAC + Scopes |
| Input Validation | Datos maliciosos | class-validator |
| Security Headers | XSS, clickjacking | Helmet.js |
| CORS | Origenes no autorizados | Whitelist |
| Data Redaction | Datos en logs | Automatico |

---

## Autenticacion Dual

> Humanos vs Maquinas

----

### Dos Tipos de Clientes

```
HUMANOS (Usuarios internos)          MAQUINAS (Partners/M2M)
        |                                    |
        v                                    v
   POST /auth/login                    API Key Header
   { email, password }                 X-API-Key: vtx_...
        |                                    |
        v                                    v
   JWT Token                           API Key + Scopes
   (expira en 8h)                      (no expira, pero revocable)
        |                                    |
        v                                    v
   Acceso via RBAC                     Acceso via Scopes
   (roles: admin, user)                (vtex:catalog:read)
```

Note:
Usuarios humanos: login -> JWT -> acceso basado en roles
Partners externos: API Key -> acceso basado en scopes
Ambos llegan a la misma API pero con diferentes mecanismos.

----

### JWT para Humanos

```typescript
// auth.controller.ts

@Post('login')
async login(@Body() dto: LoginDto): Promise<TokenResponse> {
  const user = await this.authService.validateCredentials(dto);

  const token = await this.jwtService.sign({
    sub: user.id,
    email: user.email,
    roles: user.roles,        // ['admin', 'inventory-manager']
    tenantId: user.tenantId,  // Multi-tenant support
  }, {
    expiresIn: '8h',
  });

  return { accessToken: token, expiresIn: 28800 };
}
```

**El JWT contiene:**

- `sub`: ID del usuario
- `roles`: Permisos del usuario
- `tenantId`: Organizacion del usuario
- `exp`: Cuando expira

----

### API Keys para Maquinas

```typescript
// API Key con scopes granulares

// Header enviado por el partner
X-API-Key: vtx_live_abc123def456

// Lo que contiene internamente
{
  "keyId": "key_123",
  "partnerId": "partner_vtex",
  "scopes": [
    "vtex:catalog:read",      // Puede leer catalogo
    "vtex:catalog:write",     // Puede escribir catalogo
    "vtex:inventory:read"     // Puede leer inventario
    // NO tiene vtex:inventory:write
  ],
  "rateLimit": {
    "requestsPerMinute": 1000
  },
  "createdAt": "2024-01-01T00:00:00Z",
  "expiresAt": null           // No expira, pero es revocable
}
```

Note:
Scopes granulares permiten dar solo los permisos necesarios.
Un partner de catalogo no necesita acceso a inventario.
Si la key se compromete, podemos revocarla inmediatamente.

----

### Guard de Autenticacion

```typescript
// guards/auth.guard.ts

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    // Opcion 1: JWT Bearer Token
    const bearerToken = this.extractBearerToken(request);
    if (bearerToken) {
      request.user = await this.validateJwt(bearerToken);
      return true;
    }

    // Opcion 2: API Key
    const apiKey = request.headers['x-api-key'];
    if (apiKey) {
      request.apiClient = await this.validateApiKey(apiKey);
      return true;
    }

    throw new UnauthorizedException('Missing authentication');
  }
}
```

---

## Autorizacion: RBAC + Scopes

> Quien puede hacer que

----

### RBAC para Usuarios Humanos

```typescript
// decorators/roles.decorator.ts
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);

// guards/roles.guard.ts
@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!requiredRoles) return true;

    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.some(role => user.roles.includes(role));
  }
}

// Uso en controller
@Get('admin/reports')
@Roles('admin', 'manager')
getReports() {
  // Solo admin y manager pueden acceder
}
```

----

### Scopes para API Keys

```typescript
// decorators/scopes.decorator.ts
export const RequireScopes = (...scopes: string[]) =>
  SetMetadata('requiredScopes', scopes);

// guards/scopes.guard.ts
@Injectable()
export class ScopesGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const requiredScopes = this.reflector.get<string[]>('requiredScopes', context.getHandler());
    if (!requiredScopes) return true;

    const { apiClient } = context.switchToHttp().getRequest();
    return requiredScopes.every(scope => apiClient.scopes.includes(scope));
  }
}

// Uso en controller
@Post('catalog/products')
@RequireScopes('vtex:catalog:write')
createProduct(@Body() dto: CreateProductDto) {
  // Solo API keys con scope vtex:catalog:write
}
```

---

## Rate Limiting

> Proteccion contra abuso

----

### Tres Niveles de Rate Limiting

```
Nivel 1: GLOBAL
  1000 req/s total para toda la API
  Protege contra DDoS masivo

Nivel 2: POR IP
  100 req/min por IP
  Protege contra abuso individual

Nivel 3: POR API KEY
  Configurable por partner
  vtex_partner_a: 1000 req/min
  vtex_partner_b: 5000 req/min
```

```typescript
// rate-limit.config.ts

@Module({
  imports: [
    ThrottlerModule.forRoot([
      // Nivel global
      { name: 'global', ttl: 1000, limit: 1000 },
      // Nivel por IP
      { name: 'ip', ttl: 60000, limit: 100 },
    ]),
  ],
})
export class AppModule {}
```

----

### Rate Limit por API Key

```typescript
// Configuracion personalizada por partner

const apiKeyRateLimits = {
  'vtx_live_vtex': { requestsPerMinute: 5000 },     // Partner premium
  'vtx_live_erp': { requestsPerMinute: 1000 },      // Partner standard
  'vtx_test_*': { requestsPerMinute: 100 },         // Keys de testing
};

// Response cuando se excede
HTTP 429 Too Many Requests
{
  "statusCode": 429,
  "message": "Rate limit exceeded",
  "retryAfter": 45  // segundos hasta poder reintentar
}
```

---

## Input Validation

> Rechaza datos maliciosos antes de procesarlos

----

### class-validator + class-transformer

```typescript
// dto/create-product.dto.ts

import { IsString, IsNumber, Min, Max, IsUUID, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateProductDto {
  @IsString()
  @Length(1, 100)
  @Transform(({ value }) => value.trim())  // Sanitiza espacios
  name: string;

  @IsNumber()
  @Min(0)
  @Max(999999)
  price: number;

  @IsUUID()
  categoryId: string;

  @IsOptional()
  @IsString()
  @Length(0, 1000)
  description?: string;
}
```

**Rechaza automaticamente:**

- Campos faltantes o con tipo incorrecto
- Valores fuera de rango
- Strings demasiado largos (posible DoS)

----

### Validacion Global en NestJS

```typescript
// main.ts

app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,          // Elimina campos no definidos en DTO
    forbidNonWhitelisted: true, // Error si envian campos extra
    transform: true,          // Transforma tipos automaticamente
    transformOptions: {
      enableImplicitConversion: true,
    },
  }),
);

// Request con campos extra:
// POST /products { name: "Test", malicious: "<script>..." }
// Error: "property malicious should not exist"
```

---

## Data Redaction (RFC-0020)

> Datos sensibles NUNCA aparecen en logs

----

### El Problema

```typescript
// Sin Data Redaction - MUY PELIGROSO
logger.info('User login', {
  email: 'john@example.com',
  password: 'super_secret_123',     // EN LOGS!
  creditCard: '4111111111111111',   // EN LOGS!
});

// Cualquiera con acceso a logs puede ver esto
```

Note:
Los logs son accesibles por muchas personas: devs, ops, soporte.
Datos sensibles en logs es una violacion seria de privacidad.
Tambien puede violar regulaciones como GDPR, PCI-DSS.

----

### La Solucion: Redaccion Automatica

```typescript
// Lo que escribes
logger.info('User login', {
  email: 'john@example.com',
  password: 'super_secret_123',
  creditCard: '4111111111111111',
  apiKey: 'vtx_live_abc123',
  phone: '+56912345678',
});

// Lo que aparece en logs
{
  "email": "j***@example.com",     // Parcialmente oculto
  "password": "[REDACTED]",         // Completamente eliminado
  "creditCard": "****-****-****-1111", // Solo ultimos 4
  "apiKey": "[REDACTED]",           // Completamente eliminado
  "phone": "+569****5678"           // Parcialmente oculto
}
```

----

### Como Funciona

```typescript
// libs/shared/backend/observability/src/lib/logger/redaction.ts

const REDACTION_PATTERNS = {
  // Campos que se eliminan completamente
  fullRedact: ['password', 'apiKey', 'token', 'secret', 'authorization'],

  // Campos que se enmascaran parcialmente
  partialRedact: {
    email: (value: string) => {
      const [local, domain] = value.split('@');
      return `${local[0]}***@${domain}`;
    },
    creditCard: (value: string) => {
      return `****-****-****-${value.slice(-4)}`;
    },
    phone: (value: string) => {
      return `${value.slice(0, 4)}****${value.slice(-4)}`;
    },
  },
};

// Se aplica automaticamente a todos los logs
```

---

## Flujo de Autenticacion Completo

<div style="text-align: center; background: #1e1e1e; padding: 20px; border-radius: 10px;">
<svg width="700" height="300" viewBox="0 0 700 300" xmlns="http://www.w3.org/2000/svg">
  <!-- External Client -->
  <g transform="translate(50, 50)">
    <rect x="0" y="0" width="100" height="60" rx="5" fill="#e74c3c"/>
    <text x="50" y="25" text-anchor="middle" fill="white" font-size="12" font-weight="bold">External</text>
    <text x="50" y="42" text-anchor="middle" fill="white" font-size="10">(Partner)</text>
  </g>

  <!-- Internal Client -->
  <g transform="translate(50, 180)">
    <rect x="0" y="0" width="100" height="60" rx="5" fill="#3498db"/>
    <text x="50" y="25" text-anchor="middle" fill="white" font-size="12" font-weight="bold">Internal</text>
    <text x="50" y="42" text-anchor="middle" fill="white" font-size="10">(Admin)</text>
  </g>

  <!-- API Gateway -->
  <g transform="translate(250, 50)">
    <rect x="0" y="0" width="120" height="60" rx="5" fill="#f1c40f"/>
    <text x="60" y="25" text-anchor="middle" fill="#2c3e50" font-size="12" font-weight="bold">API Gateway</text>
    <text x="60" y="42" text-anchor="middle" fill="#2c3e50" font-size="9">Rate Limit + Scopes</text>
  </g>

  <!-- Core API -->
  <g transform="translate(500, 115)">
    <rect x="0" y="0" width="140" height="70" rx="5" fill="#2ecc71"/>
    <text x="70" y="30" text-anchor="middle" fill="#2c3e50" font-size="14" font-weight="bold">Core API</text>
    <text x="70" y="50" text-anchor="middle" fill="#2c3e50" font-size="10">AuthGuard + RolesGuard</text>
  </g>

  <!-- Arrows -->
  <path d="M 150 80 L 250 80" stroke="#e74c3c" stroke-width="2" marker-end="url(#arrow)"/>
  <text x="200" y="70" text-anchor="middle" fill="#e74c3c" font-size="9">X-API-Key</text>

  <path d="M 370 80 C 450 80, 450 150, 500 150" stroke="#f1c40f" stroke-width="2" marker-end="url(#arrow)"/>

  <path d="M 150 210 C 350 210, 350 150, 500 150" stroke="#3498db" stroke-width="2" marker-end="url(#arrow)"/>
  <text x="280" y="200" text-anchor="middle" fill="#3498db" font-size="9">JWT Bearer</text>

  <defs>
    <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
      <path d="M0,0 L0,6 L9,3 z" fill="#555" />
    </marker>
  </defs>
</svg>
</div>

**Partner (rojo)**: API Key -> Gateway -> Core API
**Admin (azul)**: JWT -> Core API (bypass Gateway)

---

## Resumen

| Capa | Implementacion | Donde |
|------|----------------|-------|
| Autenticacion | JWT + API Keys | AuthGuard |
| Autorizacion | RBAC + Scopes | RolesGuard, ScopesGuard |
| Rate Limiting | ThrottlerModule | Global + por key |
| Validation | class-validator | ValidationPipe global |
| Data Redaction | Pino formatters | Logger config |

---

## Donde Encontrar el Codigo

```
libs/shared/backend/
  auth/
    guards/auth.guard.ts
    guards/roles.guard.ts
    guards/scopes.guard.ts
  observability/
    logger/redaction.ts
```

**Nunca comprometas en seguridad** - pregunta si no estas seguro

---

## Preguntas?

```
npx reveal-md seguridad.md --watch
```
