---
title: "API Design - REST APIs Consistentes"
theme: black
highlightTheme: monokai
revealOptions:
  transition: slide
  transitionSpeed: default
  controls: true
  slideNumber: true
  progress: true
---

# API Design

## REST APIs consistentes, predecibles, faciles de usar

---

## Principios de Diseno

> APIs son contratos - una vez publicadas, son dificiles de cambiar

Note:
Las APIs son la cara publica de nuestro sistema.
Partners y otros equipos dependen de ellas.
Cambios breaking causan dolor y desconfianza.
Por eso seguimos convenciones estrictas.

----

### Convenciones REST

| Metodo | Proposito | Ejemplo |
|--------|-----------|---------|
| GET | Obtener recursos | `GET /products/123` |
| POST | Crear recursos | `POST /products` |
| PUT | Reemplazar completo | `PUT /products/123` |
| PATCH | Actualizar parcial | `PATCH /products/123` |
| DELETE | Eliminar | `DELETE /products/123` |

**Idempotencia:**

- GET, PUT, DELETE = idempotentes (repetir da mismo resultado)
- POST = NO idempotente (repetir crea duplicados)
- PATCH = depende de la implementacion

---

## Estructura de URLs

----

### Patron: Recursos y Subrecursos

```
# Recurso principal
GET    /products                    # Lista productos
POST   /products                    # Crear producto
GET    /products/{id}               # Obtener producto
PUT    /products/{id}               # Actualizar producto
DELETE /products/{id}               # Eliminar producto

# Subrecursos (relacion directa)
GET    /products/{id}/variants      # Variantes de un producto
POST   /products/{id}/variants      # Crear variante
GET    /products/{id}/variants/{vid} # Obtener variante

# Acciones (verbos como excepcion)
POST   /products/{id}/publish       # Accion especifica
POST   /orders/{id}/cancel          # Accion especifica
```

----

### Nombrado de Recursos

```
# BIEN - Sustantivos en plural
/products
/orders
/customers

# MAL - Verbos o singular
/getProducts
/product
/createOrder

# BIEN - Kebab-case para multi-palabra
/order-items
/shipping-addresses

# MAL - CamelCase o snake_case
/orderItems
/order_items
```

---

## Versionado de APIs

----

### Estrategia: URL Path

```
/api/v1/products   # Version actual
/api/v2/products   # Nueva version con breaking changes
```

```typescript
// app.module.ts
@Module({
  imports: [
    RouterModule.register([
      {
        path: 'api/v1',
        children: [
          { path: 'products', module: ProductsV1Module },
          { path: 'orders', module: OrdersV1Module },
        ],
      },
      {
        path: 'api/v2',
        children: [
          { path: 'products', module: ProductsV2Module },
        ],
      },
    ]),
  ],
})
export class AppModule {}
```

----

### Cuando Crear Nueva Version

| Cambio | Requiere v2? |
|--------|--------------|
| Agregar campo opcional | No |
| Agregar endpoint nuevo | No |
| Cambiar tipo de campo | SI |
| Renombrar campo | SI |
| Eliminar campo | SI |
| Cambiar estructura de response | SI |

**Regla**: Si el cliente actual romperia, es breaking change

---

## Request/Response Design

----

### DTOs de Request

```typescript
// libs/products/api/src/lib/dto/create-product.dto.ts

import { IsString, IsNumber, IsOptional, Min, Max, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ description: 'Product name', example: 'iPhone 15' })
  @IsString()
  @Length(1, 200)
  name: string;

  @ApiProperty({ description: 'SKU code', example: 'IPHONE-15-256GB' })
  @IsString()
  @Matches(/^[A-Z0-9-]+$/)
  sku: string;

  @ApiProperty({ description: 'Price in cents', example: 99900 })
  @IsNumber()
  @Min(0)
  @Max(99999999)
  price: number;

  @ApiPropertyOptional({ description: 'Product description' })
  @IsOptional()
  @IsString()
  @MaxLength(5000)
  description?: string;

  @ApiProperty({ description: 'Category ID' })
  @IsUUID()
  categoryId: string;
}
```

----

### DTOs de Response

```typescript
// libs/products/api/src/lib/dto/product.response.ts

export class ProductResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  sku: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  available: boolean;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  updatedAt: string;

  // Helper para transformar entidad a response
  static from(product: Product): ProductResponse {
    return {
      id: product.id,
      sku: product.sku.value,
      name: product.name,
      price: product.price.amount,
      available: product.isAvailable(),
      createdAt: product.createdAt.toISOString(),
      updatedAt: product.updatedAt.toISOString(),
    };
  }
}
```

----

### Response Wrapper

```typescript
// Respuestas exitosas

// GET /products/123
{
  "data": {
    "id": "123",
    "sku": "PROD-001",
    "name": "Product Name",
    "price": 9999
  }
}

// GET /products (lista)
{
  "data": [
    { "id": "1", "sku": "PROD-001", ... },
    { "id": "2", "sku": "PROD-002", ... }
  ],
  "meta": {
    "total": 100,
    "page": 1,
    "pageSize": 20,
    "totalPages": 5
  }
}

// POST /products (creacion)
{
  "data": {
    "id": "new-123",
    ...
  }
}
// HTTP 201 Created
// Header: Location: /api/v1/products/new-123
```

---

## Paginacion

----

### Offset-based Pagination

```typescript
// GET /products?page=2&pageSize=20

@Get()
async list(
  @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  @Query('pageSize', new DefaultValuePipe(20), ParseIntPipe) pageSize: number,
): Promise<PaginatedResponse<ProductResponse>> {
  const result = await this.productService.findAll({
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  return {
    data: result.items.map(ProductResponse.from),
    meta: {
      total: result.total,
      page,
      pageSize,
      totalPages: Math.ceil(result.total / pageSize),
    },
  };
}
```

----

### Cursor-based Pagination

```typescript
// GET /products?cursor=abc123&limit=20
// Mejor para datasets grandes o que cambian frecuentemente

@Get()
async list(
  @Query('cursor') cursor: string | undefined,
  @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
): Promise<CursorPaginatedResponse<ProductResponse>> {
  const result = await this.productService.findAll({
    cursor,
    limit: limit + 1,  // Pedir 1 extra para saber si hay mas
  });

  const hasMore = result.length > limit;
  const items = hasMore ? result.slice(0, -1) : result;
  const nextCursor = hasMore ? items[items.length - 1].id : null;

  return {
    data: items.map(ProductResponse.from),
    meta: {
      nextCursor,
      hasMore,
    },
  };
}
```

---

## Filtrado y Ordenamiento

----

### Query Parameters

```typescript
// GET /products?category=electronics&minPrice=100&sort=price:desc

@Get()
async list(
  @Query('category') category?: string,
  @Query('minPrice', new OptionalParseIntPipe()) minPrice?: number,
  @Query('maxPrice', new OptionalParseIntPipe()) maxPrice?: number,
  @Query('sort') sort?: string,  // "field:asc" o "field:desc"
): Promise<PaginatedResponse<ProductResponse>> {
  const filters = {
    ...(category && { category }),
    ...(minPrice && { price: { $gte: minPrice } }),
    ...(maxPrice && { price: { $lte: maxPrice } }),
  };

  const [field, order] = (sort || 'createdAt:desc').split(':');
  const sorting = { [field]: order === 'asc' ? 1 : -1 };

  return this.productService.findAll({ filters, sorting });
}
```

---

## Documentacion con OpenAPI

----

### Swagger Decorators

```typescript
@ApiTags('Products')
@Controller('api/v1/products')
export class ProductsController {
  @Get(':id')
  @ApiOperation({ summary: 'Get product by ID' })
  @ApiParam({ name: 'id', description: 'Product ID' })
  @ApiResponse({
    status: 200,
    description: 'Product found',
    type: ProductResponse,
  })
  @ApiResponse({
    status: 404,
    description: 'Product not found',
  })
  async findOne(@Param('id') id: string): Promise<ProductResponse> {
    // ...
  }

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiBody({ type: CreateProductDto })
  @ApiResponse({
    status: 201,
    description: 'Product created',
    type: ProductResponse,
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error',
  })
  async create(@Body() dto: CreateProductDto): Promise<ProductResponse> {
    // ...
  }
}
```

----

### Swagger UI

```typescript
// main.ts

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const config = new DocumentBuilder()
  .setTitle('Integration API')
  .setDescription('API de integracion para el sistema core')
  .setVersion('1.0')
  .addBearerAuth()
  .addApiKey({ type: 'apiKey', name: 'X-API-Key', in: 'header' }, 'api-key')
  .build();

const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('docs', app, document);

// Accesible en http://localhost:3000/docs
```

---

## Headers Importantes

----

### Request Headers

| Header | Proposito | Ejemplo |
|--------|-----------|---------|
| `Authorization` | JWT token | `Bearer eyJ...` |
| `X-API-Key` | API key para M2M | `vtx_live_abc123` |
| `X-Correlation-ID` | Trazabilidad | `uuid-v4` |
| `Content-Type` | Formato del body | `application/json` |
| `Accept-Language` | Idioma preferido | `es-CL` |

----

### Response Headers

| Header | Proposito | Ejemplo |
|--------|-----------|---------|
| `X-Correlation-ID` | Echo request | `uuid-v4` |
| `X-RateLimit-Limit` | Limite | `1000` |
| `X-RateLimit-Remaining` | Restantes | `999` |
| `X-RateLimit-Reset` | Reset | `1704067200` |
| `Location` | URL creado | `/products/123` |

---

## Controller Completo

```typescript
@ApiTags('Inventory')
@Controller('api/v1/inventory')
@UseGuards(AuthGuard)
export class InventoryController {
  constructor(private readonly stockService: StockService) {}

  @Get(':sku')
  @ApiOperation({ summary: 'Get stock by SKU' })
  async getStock(@Param('sku') sku: string): Promise<StockResponse> {
    const stock = await this.stockService.findBySku(sku);
    if (!stock) {
      throw new NotFoundException(`Stock for ${sku} not found`);
    }
    return StockResponse.from(stock);
  }

  @Post('reserve')
  @HttpCode(200)
  @ApiOperation({ summary: 'Reserve stock' })
  @RequireScopes('inventory:write')
  async reserve(@Body() dto: ReserveStockDto): Promise<ReservationResponse> {
    const reservation = await this.stockService.reserve(dto.sku, dto.quantity);
    return ReservationResponse.from(reservation);
  }

  @Delete('reservations/:id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Cancel reservation' })
  async cancelReservation(@Param('id') id: string): Promise<void> {
    await this.stockService.cancelReservation(id);
  }
}
```

---

## Resumen

| Aspecto | Convencion |
|---------|------------|
| URLs | `/recursos` en plural, kebab-case |
| Versionado | `/api/v1/...` en path |
| Paginacion | `?page=1&pageSize=20` o cursor |
| Filtros | Query params: `?status=active` |
| Responses | `{ data: ..., meta: ... }` |
| Errores | Formato estandar con error codes |
| Docs | OpenAPI/Swagger obligatorio |

**Swagger UI**: http://localhost:3000/docs

---

# 🙏 Gracias
