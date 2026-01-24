## 🚀 Tu Primer Día

> Lo esencial para empezar a contribuir HOY

⬇️ _Navega hacia abajo para ver detalles_

Note:
Esta es la parte más importante para ustedes: cómo empezar a contribuir.
Vamos a ver el setup del proyecto, los comandos que usarán todos los días, y cómo escribir tests.
No se preocupen si al principio parece mucho - todos empezamos así.


----

<!-- .slide: data-background="#181818" data-background-transition="fade" -->

### Setup Local

Note:
Estos son los pasos para configurar el proyecto en su máquina.
Es importante seguirlos en orden - si algo falla, pregunten en Slack.
El comando más importante es pnpm install - instala todas las dependencias.
NUNCA modifiquen el archivo .env directamente - usen el ejemplo.

```bash
# Clonar
git clone https://github.com/developer-implementos/core.git

# Instalar dependencias
pnpm install

# Configurar variables de entorno
cp apps/core-api/.env.example apps/core-api/.env

# Levantar MongoDB
docker-compose up -d

# Iniciar desarrollo
pnpm nx serve core-api
```

----

<!-- .slide: data-background="#1c1c1c" data-background-transition="fade" -->

### Comandos Útiles

Note:
Estos comandos los van a usar todos los días.
pnpm nx serve core-api arranca el servidor local.
pnpm nx test <proyecto> corre los tests.
pnpm nx affected -t test es mágico: solo corre tests de lo que cambió.
Memoricen estos - se vuelven segunda naturaleza rápido.

```bash
# Desarrollo
pnpm nx serve core-api         # Iniciar API
pnpm nx serve admin            # Iniciar Admin

# Testing
pnpm nx test <proyecto>        # Tests unitarios
pnpm nx e2e admin-e2e          # Tests E2E

# Calidad
pnpm nx lint <proyecto>        # Linting
pnpm nx affected -t test       # Solo tests afectados

# Build
pnpm nx build core-api         # Build producción
pnpm nx graph                  # Ver grafo de dependencias
```

----

<!-- .slide: data-background="#181818" data-background-transition="fade" -->

### Anatomía de un Comando Nx

> Entendiendo la sintaxis para no confundirse

```text
pnpm nx <target> <project> [options]
       │         │         │
       │         │         └── Opciones adicionales (--watch, --coverage)
       │         │
       │         └── Nombre del proyecto (core-api, admin, inventory-api)
       │
       └── Target/tarea a ejecutar (serve, test, build, lint)
```

**Ejemplos correctos:**

| Comando | Qué hace |
|---------|----------|
| `pnpm nx serve core-api` | Levanta core-api en modo desarrollo |
| `pnpm nx test notifications-domain` | Tests del dominio de notificaciones |
| `pnpm nx build core-api --configuration=production` | Build para producción |
| `pnpm nx affected -t test` | Tests SOLO de proyectos afectados |

**Error común:**

```bash
# ❌ INCORRECTO (sintaxis antigua)
pnpm nx serve:core-api

# ✅ CORRECTO
pnpm nx serve core-api
```

Note:
Este es un error MUY común para nuevos desarrolladores.
La sintaxis es: nx + target + project (separados por espacio).
El comando `affected` es especial - usa `-t` para indicar el target.
Si ven documentación con `:` probablemente está desactualizada.

----

### 🧪 Testing para Juniors

> Cómo escribir y correr tests en el proyecto

⬇️ _Navega hacia abajo para ver ejemplos_

Note:
Testing es una habilidad fundamental. Si no sabes escribir tests, no puedes contribuir código de calidad.
En este proyecto usamos Vitest (como Jest pero más rápido) y Playwright para E2E.
Vamos a ver cómo correr tests, cómo escribir tu primer test, y los patrones que usamos.

----

<!-- .slide: data-background="#181818" data-background-transition="fade" -->

### Comandos de Testing

<div style="text-align: center;">
<svg width="850" height="350" viewBox="0 0 850 350" xmlns="http://www.w3.org/2000/svg">
  <!-- Título -->
  <text x="425" y="25" text-anchor="middle" fill="#ecf0f1" font-weight="bold" font-size="14">Comandos que usarás todos los días</text>

  <!-- Comando 1: Test específico -->
  <rect x="30" y="50" width="380" height="85" rx="8" fill="#1a252f" stroke="#2ecc71" stroke-width="2"/>
  <text x="50" y="75" fill="#2ecc71" font-weight="bold" font-size="12">🎯 Test de un proyecto específico</text>
  <rect x="45" y="85" width="350" height="25" rx="4" fill="#2c3e50"/>
  <text x="55" y="103" fill="#1abc9c" font-family="monospace" font-size="11">pnpm nx test inventory-domain</text>
  <text x="50" y="128" fill="#95a5a6" font-size="9">Corre todos los tests del módulo inventory-domain</text>

  <!-- Comando 2: Test affected -->
  <rect x="440" y="50" width="380" height="85" rx="8" fill="#1a252f" stroke="#3498db" stroke-width="2"/>
  <text x="460" y="75" fill="#3498db" font-weight="bold" font-size="12">⚡ Tests afectados (lo más común)</text>
  <rect x="455" y="85" width="350" height="25" rx="4" fill="#2c3e50"/>
  <text x="465" y="103" fill="#1abc9c" font-family="monospace" font-size="11">pnpm nx affected -t test</text>
  <text x="460" y="128" fill="#95a5a6" font-size="9">Solo corre tests de código que cambiaste</text>

  <!-- Comando 3: Test con watch -->
  <rect x="30" y="150" width="380" height="85" rx="8" fill="#1a252f" stroke="#f39c12" stroke-width="2"/>
  <text x="50" y="175" fill="#f39c12" font-weight="bold" font-size="12">👀 Watch mode (mientras desarrollas)</text>
  <rect x="45" y="185" width="350" height="25" rx="4" fill="#2c3e50"/>
  <text x="55" y="203" fill="#1abc9c" font-family="monospace" font-size="11">pnpm nx test inventory-domain --watch</text>
  <text x="50" y="228" fill="#95a5a6" font-size="9">Re-corre tests automáticamente al guardar</text>

  <!-- Comando 4: Test con coverage -->
  <rect x="440" y="150" width="380" height="85" rx="8" fill="#1a252f" stroke="#9b59b6" stroke-width="2"/>
  <text x="460" y="175" fill="#9b59b6" font-weight="bold" font-size="12">📊 Con reporte de cobertura</text>
  <rect x="455" y="185" width="350" height="25" rx="4" fill="#2c3e50"/>
  <text x="465" y="203" fill="#1abc9c" font-family="monospace" font-size="11">pnpm nx test inventory-domain --coverage</text>
  <text x="460" y="228" fill="#95a5a6" font-size="9">Genera reporte HTML en coverage/</text>

  <!-- Comando 5: Test un archivo -->
  <rect x="30" y="250" width="380" height="85" rx="8" fill="#1a252f" stroke="#e74c3c" stroke-width="2"/>
  <text x="50" y="275" fill="#e74c3c" font-weight="bold" font-size="12">📄 Un solo archivo de test</text>
  <rect x="45" y="285" width="350" height="25" rx="4" fill="#2c3e50"/>
  <text x="55" y="303" fill="#1abc9c" font-family="monospace" font-size="10">pnpm nx test inventory-domain --testFile=stock.spec.ts</text>
  <text x="50" y="328" fill="#95a5a6" font-size="9">Útil cuando trabajas en un test específico</text>

  <!-- Comando 6: E2E -->
  <rect x="440" y="250" width="380" height="85" rx="8" fill="#1a252f" stroke="#1abc9c" stroke-width="2"/>
  <text x="460" y="275" fill="#1abc9c" font-weight="bold" font-size="12">🌐 Tests E2E (Playwright)</text>
  <rect x="455" y="285" width="350" height="25" rx="4" fill="#2c3e50"/>
  <text x="465" y="303" fill="#1abc9c" font-family="monospace" font-size="11">pnpm nx e2e admin-e2e</text>
  <text x="460" y="328" fill="#95a5a6" font-size="9">Tests de integración del frontend admin</text>
</svg>
</div>

Note:
**Comandos de Testing - Referencia Rápida**

**El más importante: `pnpm nx affected -t test`**

Este comando es mágico:
1. Detecta qué archivos cambiaste
2. Encuentra qué proyectos dependen de esos archivos
3. Solo corre los tests necesarios

**Workflow recomendado:**

```bash
# 1. Mientras desarrollas (terminal separada)
pnpm nx test <proyecto> --watch

# 2. Antes de commit
pnpm nx affected -t test

# 3. Para verificar cobertura
pnpm nx test <proyecto> --coverage
# Abre coverage/lcov-report/index.html en browser
```

**Tips:**

- `--watch` es tu mejor amigo durante desarrollo
- Si un test falla en CI pero pasa local, corre `pnpm nx reset` y reintenta
- Los tests E2E son lentos (~2 min), solo córrelos si tocaste el frontend

----

<!-- .slide: data-background="#181818" data-background-transition="fade" -->

### Anatomía de un Test

```typescript [1-5|7-15|17-25|27-35]
// Ubicación: libs/<modulo>/domain/src/lib/__tests__/stock.service.spec.ts
// Convención: mismo nombre que el archivo + .spec.ts

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { StockService } from '../services/stock.service';

// describe() agrupa tests relacionados
describe('StockService', () => {
  let service: StockService;
  let mockRepository: any;

  // beforeEach() prepara el estado antes de CADA test
  beforeEach(() => {
    mockRepository = { findBySku: vi.fn(), save: vi.fn() };
    service = new StockService(mockRepository);
  });

  // describe() anidado para agrupar por método
  describe('reserveStock', () => {

    // it() define UN caso de prueba
    it('should reserve stock when available', async () => {
      // Arrange (preparar)
      mockRepository.findBySku.mockResolvedValue({ available: 100 });

      // Act (ejecutar)
      await service.reserveStock('SKU-001', 50);

      // Assert (verificar)
      expect(mockRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({ reserved: 50 })
      );
    });

    it('should throw InsufficientStockError when not enough stock', async () => {
      mockRepository.findBySku.mockResolvedValue({ available: 10 });

      await expect(service.reserveStock('SKU-001', 50))
        .rejects.toThrow('Stock insuficiente');
    });
  });
});
```

Note:
**Anatomía de un Test - Estructura AAA**

**Patrón AAA (Arrange-Act-Assert):**

```typescript
it('should do something', async () => {
  // Arrange - Preparar datos y mocks
  const input = { sku: 'SKU-001', qty: 10 };
  mockRepo.findBySku.mockResolvedValue({ available: 100 });

  // Act - Ejecutar lo que estás probando
  const result = await service.doSomething(input);

  // Assert - Verificar el resultado
  expect(result).toBe(expectedValue);
});
```

**Estructura de archivos:**

```
libs/inventory/domain/src/lib/
├── services/
│   └── stock.service.ts          # Código
├── __tests__/
│   └── stock.service.spec.ts     # Tests
```

**Convenciones de nombres:**

- `describe('NombreClase')` - Nombre de la clase
- `describe('nombreMetodo')` - Nombre del método
- `it('should...')` - Describe el comportamiento esperado

**Vitest vs Jest:**

- Misma API (`describe`, `it`, `expect`)
- `vi.fn()` en lugar de `jest.fn()`
- `vi.mock()` en lugar de `jest.mock()`
- 10x más rápido

----

<!-- .slide: data-background="#181818" data-background-transition="fade" -->

### Tu Primer Test: Paso a Paso

<div style="display: flex; gap: 20px; justify-content: center;">
<div style="flex: 1; max-width: 450px; background: #1a252f; padding: 15px; border-radius: 10px; border: 2px solid #2ecc71;">

**1️⃣ Crea el archivo de test**

```bash
# Si el archivo es:
# libs/pricing/domain/src/lib/services/calculator.ts

# El test va en:
# libs/pricing/domain/src/lib/__tests__/calculator.spec.ts
```

**2️⃣ Estructura básica**

```typescript
import { describe, it, expect } from 'vitest';
import { Calculator } from '../services/calculator';

describe('Calculator', () => {
  describe('calculateTotal', () => {
    it('should calculate total with tax', () => {
      const calc = new Calculator();

      const result = calc.calculateTotal(100, 0.19);

      expect(result).toBe(119);
    });
  });
});
```

</div>
<div style="flex: 1; max-width: 450px; background: #1a252f; padding: 15px; border-radius: 10px; border: 2px solid #3498db;">

**3️⃣ Corre el test**

```bash
pnpm nx test pricing-domain --watch
```

**4️⃣ Verifica que falle primero** ⚠️

Si el test pasa sin implementar la lógica, algo está mal.

**5️⃣ Implementa la lógica**

```typescript
// services/calculator.ts
export class Calculator {
  calculateTotal(base: number, taxRate: number) {
    return base * (1 + taxRate);
  }
}
```

**6️⃣ Verifica que pase** ✅

```bash
✓ Calculator
  ✓ calculateTotal
    ✓ should calculate total with tax
```

</div>
</div>

Note:
**Tu Primer Test - El Ciclo TDD**

**Red-Green-Refactor:**

1. **Red**: Escribe un test que FALLE
2. **Green**: Escribe el código mínimo para que PASE
3. **Refactor**: Mejora el código sin romper el test

**¿Por qué fallar primero?**

Si el test pasa antes de implementar:
- El test no está probando lo que crees
- Hay un mock mal configurado
- El test está mal escrito

**Checklist antes de commit:**

- [ ] Test falla sin la implementación
- [ ] Test pasa con la implementación
- [ ] Test tiene nombre descriptivo (`should...`)
- [ ] Test usa patrón AAA
- [ ] Coverage >= 80% del código nuevo

**Errores comunes de juniors:**

- ❌ Olvidar `async/await` en tests asíncronos
- ❌ No mockear dependencias externas
- ❌ Tests que dependen de otros tests
- ❌ Tests que no prueban nada útil

----

<!-- .slide: data-background="#181818" data-background-transition="fade" -->

### Mocking: Aislar Dependencias

```typescript [1-8|10-20|22-32]
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NotificationService } from '../services/notification.service';

// vi.fn() crea una función mock
const mockSalesforceClient = {
  sendEmail: vi.fn(),      // Mock de método
  sendSms: vi.fn(),
};

describe('NotificationService', () => {
  let service: NotificationService;

  beforeEach(() => {
    // Resetear mocks antes de cada test
    vi.clearAllMocks();

    // Inyectar el mock en lugar del cliente real
    service = new NotificationService(mockSalesforceClient);
  });

  it('should call Salesforce with correct payload', async () => {
    // Arrange: Configurar qué retorna el mock
    mockSalesforceClient.sendEmail.mockResolvedValue({ success: true });

    // Act
    await service.sendOrderConfirmation('order-123', 'user@example.com');

    // Assert: Verificar que se llamó correctamente
    expect(mockSalesforceClient.sendEmail).toHaveBeenCalledWith({
      to: 'user@example.com',
      template: 'ORDER_CONFIRMATION',
      data: expect.objectContaining({ orderId: 'order-123' }),
    });
  });

  it('should throw when Salesforce fails', async () => {
    // Simular error de Salesforce
    mockSalesforceClient.sendEmail.mockRejectedValue(new Error('API Error'));

    await expect(service.sendOrderConfirmation('order-123', 'user@example.com'))
      .rejects.toThrow('API Error');
  });
});
```

Note:
**Mocking - Por Qué y Cómo**

**¿Por qué mockear?**

1. **Aislamiento**: Probar UNA cosa a la vez
2. **Velocidad**: No llamar APIs reales (lentas)
3. **Determinismo**: Controlar el comportamiento
4. **Sin efectos secundarios**: No enviar emails reales

**Métodos útiles de vi (Vitest):**

```typescript
vi.fn()                          // Crear función mock
vi.fn().mockReturnValue(42)      // Retorna valor sync
vi.fn().mockResolvedValue({})    // Retorna Promise resolved
vi.fn().mockRejectedValue(err)   // Retorna Promise rejected
vi.clearAllMocks()               // Limpia llamadas
vi.resetAllMocks()               // Limpia llamadas + implementación
```

**Assertions útiles:**

```typescript
expect(mock).toHaveBeenCalled()           // Fue llamado
expect(mock).toHaveBeenCalledTimes(2)     // Llamado N veces
expect(mock).toHaveBeenCalledWith(arg)    // Llamado con args
expect(mock).not.toHaveBeenCalled()       // NO fue llamado
```

**Patrón objectContaining:**

```typescript
expect(mock).toHaveBeenCalledWith(
  expect.objectContaining({ key: 'value' })
  // Solo verifica que tenga esa propiedad, ignora el resto
);
```
