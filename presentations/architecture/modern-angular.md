---
title: Angular Moderno
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

# Angular Moderno

### Angular 21 con Signals, Control Flow y Standalone

Note:
Angular 21 es MUY diferente al Angular clasico.
Si vienes de versiones anteriores, esta presentacion es obligatoria.

---

## 📋 Agenda

1. **📡 Signals vs RxJS** - El nuevo modelo reactivo
2. **🔄 Control Flow** - @if, @for, @switch
3. **📦 Standalone Components** - Sin NgModules
4. **📥 Modern Inputs/Outputs** - input(), output()
5. **🗄️ Signal Store** - Estado global reactivo
6. **🔀 Migracion** - De clasico a moderno

Note:
Angular ha cambiado mucho desde la version 17.
Si vienes de versiones anteriores, esta presentacion te actualizara.

---

## 📡 Signals vs RxJS

> El cambio mas importante de Angular moderno

⬇️ _Navega hacia abajo para ver detalles_

Note:
Signals simplifican el manejo de estado en Angular.
Si RxJS te parecia complicado, vas a amar Signals.

----

<!-- .slide: data-background="#1c1c1c" data-background-transition="fade" -->

### Por que Signals?

```typescript
// ❌ RxJS Clasico - Complejo, muchos operadores
@Component({...})
export class OldComponent {
  count$ = new BehaviorSubject(0);
  doubled$ = this.count$.pipe(map(n => n * 2));

  increment() {
    this.count$.next(this.count$.value + 1);
  }

  ngOnInit() {
    // Hay que subscribirse manualmente o usar async pipe
    this.doubled$.subscribe(v => console.log(v));
  }

  ngOnDestroy() {
    // Hay que desuscribirse!
  }
}
```

**Problemas:**
- Muchos operadores que aprender
- Facil crear memory leaks
- Verbose para casos simples

Note:
Este codigo RxJS es lo que NO queremos escribir mas.
Es funcional pero demasiado complejo para algo tan simple.

----

<!-- .slide: data-background="#181818" data-background-transition="fade" -->

### Signals - Simple y Reactivo

```typescript
// ✅ Signals - Simple, directo, sin leaks
@Component({
  template: `
    <p>Count: {{ count() }}</p>
    <p>Doubled: {{ doubled() }}</p>
    <button (click)="increment()">+1</button>
  `
})
export class ModernComponent {
  // Signal = valor reactivo
  count = signal(0);

  // Computed = derivado automaticamente
  doubled = computed(() => this.count() * 2);

  increment() {
    // Actualizar de forma inmutable
    this.count.update(n => n + 1);
  }

  // No hay ngOnDestroy - no hay subscripciones manuales!
}
```

**Beneficios:**
- Sintaxis simple y familiar
- Sin memory leaks
- Change detection mas eficiente

Note:
Nota como el codigo es mucho mas corto y facil de entender.
No hay subscripciones que manejar ni operadores que memorizar.

----

<!-- .slide: data-background="#1c1c1c" data-background-transition="fade" -->

### API de Signals

```typescript
// Crear signal
const name = signal('John');           // WritableSignal<string>
const age = signal<number>(25);        // Con tipo explicito

// Leer valor (llamar como funcion)
console.log(name());                   // 'John'

// Actualizar valor
name.set('Jane');                      // Reemplazar
name.update(n => n.toUpperCase());     // Transformar

// Computed - derivados reactivos
const greeting = computed(() => `Hello, ${name()}!`);
// Se actualiza automaticamente cuando name cambia

// Effect - efectos secundarios
effect(() => {
  console.log(`Name changed to: ${name()}`);
  // Se ejecuta cada vez que name cambia
});
```

Note:
Memoriza: signal() para crear, computed() para derivar, effect() para side effects.
Estos 3 cubren el 95% de los casos.

----

<!-- .slide: data-background="#181818" data-background-transition="fade" -->

### Cuando Usar Cada Uno

| Caso de Uso | Signal | RxJS |
|-------------|--------|------|
| Estado del componente | signal() | - |
| Valores derivados | computed() | - |
| Efectos locales | effect() | - |
| HTTP requests | - | HttpClient (Observable) |
| WebSockets | - | RxJS |
| Eventos complejos (debounce, etc) | - | RxJS operators |
| Estado global | Signal Store | NgRx |

**Regla:** Signals para estado, RxJS para streams de eventos

Note:
Esta tabla es tu guia de decision.
HTTP y WebSockets siguen usando RxJS - no cambio eso.

----

<!-- .slide: data-background="#1c1c1c" data-background-transition="fade" -->

### Convertir Observable a Signal

```typescript
@Component({...})
export class ProductComponent {
  private http = inject(HttpClient);
  private productService = inject(ProductService);

  // Convertir Observable a Signal con toSignal()
  products = toSignal(
    this.productService.getProducts(),
    { initialValue: [] }  // Valor inicial requerido
  );

  // Con manejo de loading y error
  private productsResource = toSignal(
    this.productService.getProducts().pipe(
      map(data => ({ data, loading: false, error: null })),
      startWith({ data: [], loading: true, error: null }),
      catchError(err => of({ data: [], loading: false, error: err }))
    )
  );

  loading = computed(() => this.productsResource()?.loading ?? true);
  error = computed(() => this.productsResource()?.error);
  data = computed(() => this.productsResource()?.data ?? []);
}
```

Note:
toSignal() convierte Observables a Signals.
Usalo cuando quieras consumir datos de HTTP como Signal.

---

## 🔄 Control Flow Moderno

> @if, @for, @switch en lugar de *ngIf, *ngFor

⬇️ _Navega hacia abajo para ver detalles_

Note:
El nuevo control flow es mas legible y mas rapido.
Parece JavaScript normal, no directivas magicas.

----

<!-- .slide: data-background="#1c1c1c" data-background-transition="fade" -->

### @if - Condicionales

```html
<!-- ❌ Viejo - Directiva estructural -->
<div *ngIf="loading; else loaded">
  <app-spinner></app-spinner>
</div>
<ng-template #loaded>
  <div *ngIf="error; else content">
    <p>Error: {{ error }}</p>
  </div>
</ng-template>
<ng-template #content>
  <p>{{ data }}</p>
</ng-template>

<!-- ✅ Nuevo - Control flow nativo -->
@if (loading()) {
  <app-spinner />
} @else if (error()) {
  <p>Error: {{ error() }}</p>
} @else {
  <p>{{ data() }}</p>
}
```

**Beneficios:**
- Mas legible, como JS normal
- Menos ng-templates
- Mejor rendimiento

Note:
Nota como @if/@else if/@else es mucho mas claro que *ngIf con templates.
Puedes leer el template como codigo normal.

----

<!-- .slide: data-background="#181818" data-background-transition="fade" -->

### @for - Iteraciones

```html
<!-- ❌ Viejo - *ngFor con trackBy separado -->
<ul>
  <li *ngFor="let item of items; trackBy: trackByFn">
    {{ item.name }}
  </li>
</ul>

<!-- ✅ Nuevo - @for con track obligatorio -->
<ul>
  @for (item of items(); track item.id) {
    <li>{{ item.name }}</li>
  } @empty {
    <li>No items found</li>
  }
</ul>
```

**Novedades:**
- `track` es obligatorio (mejor performance por defecto)
- `@empty` para listas vacias (antes requeria *ngIf adicional)

Note:
track es OBLIGATORIO en @for - no es opcional.
Esto previene bugs de rendimiento que eran comunes con *ngFor.

----

<!-- .slide: data-background="#1c1c1c" data-background-transition="fade" -->

### @for - Variables de Contexto

```html
@for (item of items(); track item.id; let i = $index; let first = $first) {
  <div [class.highlighted]="first">
    {{ i + 1 }}. {{ item.name }}
  </div>
}
```

| Variable | Descripcion |
|----------|-------------|
| `$index` | Indice actual (0, 1, 2...) |
| `$first` | true si es el primer elemento |
| `$last` | true si es el ultimo elemento |
| `$even` | true si indice es par |
| `$odd` | true si indice es impar |
| `$count` | Total de elementos |

Note:
Estas variables de contexto son las mismas que en *ngFor.
$index es la mas usada para mostrar numeros de fila.

----

<!-- .slide: data-background="#181818" data-background-transition="fade" -->

### @switch - Multiples Casos

```html
<!-- ❌ Viejo - ngSwitch verboso -->
<div [ngSwitch]="status">
  <p *ngSwitchCase="'loading'">Cargando...</p>
  <p *ngSwitchCase="'error'">Error!</p>
  <p *ngSwitchCase="'success'">Completado</p>
  <p *ngSwitchDefault>Desconocido</p>
</div>

<!-- ✅ Nuevo - @switch limpio -->
@switch (status()) {
  @case ('loading') {
    <p>Cargando...</p>
  }
  @case ('error') {
    <p>Error!</p>
  }
  @case ('success') {
    <p>Completado</p>
  }
  @default {
    <p>Desconocido</p>
  }
}
```

---

## 📦 Standalone Components

> Sin NgModules - Componentes independientes

⬇️ _Navega hacia abajo para ver detalles_

Note:
Standalone components eliminan la necesidad de NgModules.
Cada componente declara sus propias dependencias - mucho mas simple.

----

<!-- .slide: data-background="#1c1c1c" data-background-transition="fade" -->

### Antes: NgModules

```typescript
// ❌ Viejo - Modulos para todo
@NgModule({
  declarations: [
    ProductListComponent,
    ProductCardComponent,
    ProductDetailComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
  ],
  exports: [
    ProductListComponent,
  ]
})
export class ProductModule {}

// El componente no sabe que necesita
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent {}
```

Note:
Este codigo viejo requiere un modulo separado solo para declarar componentes.
Es mucho boilerplate para algo que deberia ser simple.

----

<!-- .slide: data-background="#181818" data-background-transition="fade" -->

### Ahora: Standalone

```typescript
// ✅ Nuevo - Componente auto-contenido
@Component({
  selector: 'app-product-list',
  standalone: true,  // Independiente!
  imports: [
    // Solo lo que ESTE componente necesita
    ProductCardComponent,
    AsyncPipe,
    CurrencyPipe,
  ],
  template: `
    @for (product of products(); track product.id) {
      <app-product-card [product]="product" />
    }
  `
})
export class ProductListComponent {
  products = signal<Product[]>([]);
}
```

**Beneficios:**
- El componente declara sus dependencias
- Tree-shaking mas efectivo
- Mas facil de entender y testear

Note:
El imports array muestra exactamente que usa este componente.
No hay modulos "magicos" que importan cosas en segundo plano.

----

<!-- .slide: data-background="#1c1c1c" data-background-transition="fade" -->

### Estructura de Archivos

```
products/
├── product-list/
│   ├── product-list.component.ts      # Componente standalone
│   ├── product-list.component.html    # Template (opcional, puede ser inline)
│   └── product-list.component.spec.ts # Tests
├── product-card/
│   └── product-card.component.ts
├── product-detail/
│   └── product-detail.component.ts
└── index.ts                           # Barrel exports

// index.ts
export { ProductListComponent } from './product-list/product-list.component';
export { ProductCardComponent } from './product-card/product-card.component';
```

**No hay `products.module.ts`** - Cada componente se importa directamente.

Note:
Esta estructura es mas simple: cada feature es un folder con componentes.
No hay modulo que configure - solo imports directos.

----

<!-- .slide: data-background="#181818" data-background-transition="fade" -->

### Lazy Loading con Standalone

```typescript
// app.routes.ts

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./home/home.component').then(m => m.HomeComponent),
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./products/products.routes').then(m => m.PRODUCTS_ROUTES),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.routes').then(m => m.ADMIN_ROUTES),
    canActivate: [authGuard],
  },
];
```

**loadComponent** carga un componente, **loadChildren** carga rutas hijas.

Note:
Lazy loading funciona igual pero mas simple.
loadComponent carga UN componente, loadChildren carga rutas completas.

---

## 📥 Modern Inputs/Outputs

> input() y output() en lugar de decoradores

⬇️ _Navega hacia abajo para ver detalles_

Note:
Los nuevos inputs y outputs son funciones, no decoradores.
Son mas type-safe y se integran mejor con signals.

----

<!-- .slide: data-background="#1c1c1c" data-background-transition="fade" -->

### Inputs Clasicos vs Modernos

```typescript
// ❌ Viejo - Decoradores
@Component({...})
export class ProductCardComponent {
  @Input() product!: Product;           // Non-null assertion
  @Input() showActions = false;         // Default
  @Input({ required: true }) id!: string; // Required

  // Setter para transformacion
  private _price = 0;
  @Input()
  set price(value: number) {
    this._price = value * 1.19;  // Agregar IVA
  }
}

// ✅ Nuevo - Funciones signal-based
@Component({...})
export class ProductCardComponent {
  product = input.required<Product>();  // Required, es signal
  showActions = input(false);           // Default false
  id = input.required<string>();        // Required

  // Transform integrado
  price = input(0, {
    transform: (value: number) => value * 1.19
  });

  // Computed derivado del input
  formattedPrice = computed(() =>
    this.price().toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })
  );
}
```

Note:
input.required() hace que TypeScript marque error si no pasas el input.
Es mas seguro que @Input() con non-null assertion (!).

----

<!-- .slide: data-background="#181818" data-background-transition="fade" -->

### API de input()

```typescript
// Input opcional con valor default
readonly count = input(0);              // InputSignal<number>

// Input requerido (sin default)
readonly product = input.required<Product>();  // InputSignal<Product>

// Input con alias
readonly data = input([], { alias: 'items' }); // <comp [items]="...">

// Input con transformacion
readonly disabled = input(false, {
  transform: (value: boolean | string) =>
    typeof value === 'string' ? value !== 'false' : value
});

// En el template, llamar como signal
// {{ count() }} no {{ count }}
```

Note:
IMPORTANTE: los inputs son signals, hay que llamarlos con ().
Si olvidas los parentesis, veras [object Signal] en el template.

----

<!-- .slide: data-background="#1c1c1c" data-background-transition="fade" -->

### Outputs Clasicos vs Modernos

```typescript
// ❌ Viejo - EventEmitter
@Component({...})
export class ProductCardComponent {
  @Output() addToCart = new EventEmitter<Product>();
  @Output() remove = new EventEmitter<void>();

  onAddClick() {
    this.addToCart.emit(this.product);
  }
}

// ✅ Nuevo - output() function
@Component({...})
export class ProductCardComponent {
  product = input.required<Product>();

  addToCart = output<Product>();        // OutputEmitterRef<Product>
  remove = output<void>();              // OutputEmitterRef<void>

  onAddClick() {
    this.addToCart.emit(this.product());
  }
}
```

```html
<!-- Uso en template padre (igual que antes) -->
<app-product-card
  [product]="product"
  (addToCart)="handleAdd($event)"
  (remove)="handleRemove()"
/>
```

Note:
El uso en el template es identico al clasico.
Solo cambia la declaracion dentro del componente.

----

<!-- .slide: data-background="#181818" data-background-transition="fade" -->

### Ejemplo Completo

```typescript
@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CurrencyPipe],
  template: `
    <article class="card">
      <h3>{{ product().name }}</h3>
      <p>{{ product().price | currency:'CLP' }}</p>

      @if (showActions()) {
        <footer>
          <button (click)="addToCart.emit(product())">
            Agregar
          </button>
        </footer>
      }
    </article>
  `
})
export class ProductCardComponent {
  // Inputs como signals
  product = input.required<Product>();
  showActions = input(true);

  // Outputs
  addToCart = output<Product>();
}
```

Note:
Este es el patron completo: inputs como signals, outputs para eventos.
El template usa @if y emite eventos con output.emit().

---

## 🗄️ Signal Store

> Estado global reactivo sin NgRx boilerplate

⬇️ _Navega hacia abajo para ver detalles_

Note:
Signal Store es una alternativa ligera a NgRx.
Mucho menos boilerplate pero igual de poderoso para la mayoria de casos.

----

<!-- .slide: data-background="#1c1c1c" data-background-transition="fade" -->

### Por que Signal Store?

```typescript
// ❌ NgRx Clasico - Mucho boilerplate
// actions.ts, reducer.ts, effects.ts, selectors.ts
// 4+ archivos para una feature simple

// ✅ Signal Store - Todo en uno
@Injectable({ providedIn: 'root' })
export class ProductStore {
  // Estado como signals
  private products = signal<Product[]>([]);
  private loading = signal(false);
  private error = signal<string | null>(null);

  // Selectors como computed
  readonly products$ = this.products.asReadonly();
  readonly loading$ = this.loading.asReadonly();
  readonly totalProducts = computed(() => this.products().length);

  // Actions como metodos
  async loadProducts() {
    this.loading.set(true);
    try {
      const data = await this.api.getProducts();
      this.products.set(data);
    } catch (e) {
      this.error.set('Failed to load');
    } finally {
      this.loading.set(false);
    }
  }
}
```

Note:
Compare esto con NgRx: un archivo vs 4+ archivos.
Todo el estado, selectors y actions en un solo lugar.

----

<!-- .slide: data-background="#181818" data-background-transition="fade" -->

### Patron Signal Store Completo

```typescript
// product.store.ts
@Injectable({ providedIn: 'root' })
export class ProductStore {
  private readonly api = inject(ProductApiService);

  // === Estado Privado ===
  private readonly _products = signal<Product[]>([]);
  private readonly _selectedId = signal<string | null>(null);
  private readonly _loading = signal(false);
  private readonly _error = signal<Error | null>(null);

  // === Selectors Publicos (readonly) ===
  readonly products = this._products.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();

  // Selectors derivados
  readonly selectedProduct = computed(() => {
    const id = this._selectedId();
    return id ? this._products().find(p => p.id === id) : null;
  });

  readonly isEmpty = computed(() => this._products().length === 0);

  readonly summary = computed(() => ({
    total: this._products().length,
    active: this._products().filter(p => p.active).length,
  }));
```

Note:
Estado privado (_products) + selectors publicos (products).
Esto encapsula el estado y expone solo lo necesario.

----

<!-- .slide: data-background="#1c1c1c" data-background-transition="fade" -->

### Signal Store - Actions

```typescript
  // === Actions ===
  async loadProducts(): Promise<void> {
    this._loading.set(true);
    this._error.set(null);

    try {
      const products = await firstValueFrom(this.api.getAll());
      this._products.set(products);
    } catch (error) {
      this._error.set(error as Error);
    } finally {
      this._loading.set(false);
    }
  }

  selectProduct(id: string): void {
    this._selectedId.set(id);
  }

  addProduct(product: Product): void {
    this._products.update(list => [...list, product]);
  }

  removeProduct(id: string): void {
    this._products.update(list => list.filter(p => p.id !== id));
  }

  updateProduct(id: string, changes: Partial<Product>): void {
    this._products.update(list =>
      list.map(p => p.id === id ? { ...p, ...changes } : p)
    );
  }
}
```

Note:
Las actions son metodos normales que modifican el estado.
No hay actions, reducers, effects separados - todo en un lugar.

----

<!-- .slide: data-background="#181818" data-background-transition="fade" -->

### Usando el Store

```typescript
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductCardComponent],
  template: `
    @if (store.loading()) {
      <app-spinner />
    } @else if (store.error()) {
      <app-error [message]="store.error()!.message" />
    } @else {
      <header>
        <h1>Products ({{ store.summary().total }})</h1>
      </header>

      @for (product of store.products(); track product.id) {
        <app-product-card
          [product]="product"
          (remove)="store.removeProduct(product.id)"
        />
      } @empty {
        <p>No products found</p>
      }
    }
  `
})
export class ProductListComponent implements OnInit {
  readonly store = inject(ProductStore);

  ngOnInit() {
    this.store.loadProducts();
  }
}
```

Note:
El componente inyecta el store y usa sus signals directamente.
No hay async pipe ni subscripciones - solo signals.

---

## 🔀 Migracion

> De Angular clasico a moderno

⬇️ _Navega hacia abajo para ver detalles_

Note:
Si tienes codigo Angular viejo, puedes migrarlo gradualmente.
No tienes que reescribir todo - lo nuevo y lo viejo pueden coexistir.

----

<!-- .slide: data-background="#1c1c1c" data-background-transition="fade" -->

### Checklist de Migracion

```text
COMPONENTES
[ ] Agregar standalone: true
[ ] Mover imports del NgModule al componente
[ ] Eliminar NgModule cuando este vacio

TEMPLATES
[ ] *ngIf → @if
[ ] *ngFor → @for (agregar track!)
[ ] [ngSwitch] → @switch
[ ] Verificar que @empty maneja listas vacias

ESTADO
[ ] BehaviorSubject → signal()
[ ] .pipe(map(...)) → computed()
[ ] .subscribe() para side effects → effect()

INPUTS/OUTPUTS
[ ] @Input() → input() o input.required()
[ ] @Output() EventEmitter → output()
[ ] Agregar () cuando se lea el input en template
```

Note:
Este checklist es tu guia de migracion.
Ve paso a paso, no intentes cambiar todo de una vez.

----

<!-- .slide: data-background="#181818" data-background-transition="fade" -->

### Ejemplo de Migracion

```typescript
// ANTES
@Component({
  selector: 'app-counter',
  template: `
    <p *ngIf="count > 0">Count: {{ count }}</p>
    <button (click)="increment()">+1</button>
  `
})
export class CounterComponent {
  @Input() initialValue = 0;
  @Output() valueChange = new EventEmitter<number>();
  count = 0;

  ngOnInit() {
    this.count = this.initialValue;
  }

  increment() {
    this.count++;
    this.valueChange.emit(this.count);
  }
}
```

Note:
Este es un componente clasico tipico.
Nota: @Input con !, ngOnInit para inicializar, EventEmitter.

----

<!-- .slide: data-background="#1c1c1c" data-background-transition="fade" -->

### Despues de Migrar

```typescript
// DESPUES
@Component({
  selector: 'app-counter',
  standalone: true,
  template: `
    @if (count() > 0) {
      <p>Count: {{ count() }}</p>
    }
    <button (click)="increment()">+1</button>
  `
})
export class CounterComponent {
  initialValue = input(0);
  valueChange = output<number>();

  count = signal(0);

  constructor() {
    // Inicializar count cuando initialValue este disponible
    effect(() => {
      this.count.set(this.initialValue());
    }, { allowSignalWrites: true });
  }

  increment() {
    this.count.update(n => n + 1);
    this.valueChange.emit(this.count());
  }
}
```

Note:
El codigo migrado es mas limpio y type-safe.
El effect() reemplaza ngOnInit para inicializar el count.

----

<!-- .slide: data-background="#181818" data-background-transition="fade" -->

### Tips de Migracion

**1. Migrar por feature, no todo a la vez**
```bash
# Empezar con componentes hoja (sin hijos)
products/product-card/  # Primero
products/product-list/  # Despues (importa card)
```

**2. Usar el CLI de Angular**
```bash
# Migrar a standalone
ng generate @angular/core:standalone

# Migrar control flow
ng generate @angular/core:control-flow
```

**3. Tests pueden seguir funcionando**
```typescript
// Los tests de componentes standalone son mas simples
await TestBed.configureTestingModule({
  imports: [ProductCardComponent]  // Solo el componente
}).compileComponents();
```

Note:
El CLI de Angular tiene comandos de migracion automatica.
Usalos para convertir componentes existentes sin errores.

---

## 📝 Resumen

Note:
Esta tabla es tu referencia rapida para las diferencias.
Consultala cuando tengas dudas sobre la sintaxis moderna.

----

<!-- .slide: data-background="#1c1c1c" data-background-transition="fade" -->

### Angular Moderno vs Clasico

| Feature | Clasico | Moderno |
|---------|---------|---------|
| Estado | BehaviorSubject | signal() |
| Derivados | .pipe(map()) | computed() |
| Efectos | .subscribe() | effect() |
| Condicional | *ngIf | @if |
| Iteracion | *ngFor | @for |
| Inputs | @Input() | input() |
| Outputs | @Output() | output() |
| Modulos | NgModule | standalone: true |

Note:
La columna "Moderno" es lo que debes usar en codigo nuevo.
La columna "Clasico" sigue funcionando pero no es el patron preferido.

----

<!-- .slide: data-background="#181818" data-background-transition="fade" -->

### Reglas de Oro

```text
1. Usar signal() para todo estado local
2. Usar computed() para valores derivados
3. Usar effect() solo para side effects
4. Usar @if/@for/@switch en templates
5. Todos los componentes son standalone
6. RxJS solo para HTTP y streams complejos
7. Signal Store para estado global
```

Note:
Estas 7 reglas resumen Angular moderno.
Siguelas y tu codigo sera limpio, rapido y facil de mantener.

---

# 🙏 Gracias

Note:
Practica creando componentes pequenos primero.
Los signals son intuitivos una vez que los usas.

