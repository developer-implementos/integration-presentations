---
title: Por Qué Monolito Modular
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

# 🎯 ¿Por Qué Monolito Modular?

## Comparación con microservicios y ventajas arquitectónicas

---

## 🎯 ¿Por Qué Monolito Modular?

> Comparación con microservicios (contexto técnico)

⬇️ _Navega hacia abajo para ver detalles_

Note:
Ya vieron la estructura del proyecto. Ahora pueden entender mejor por qué elegimos esta arquitectura.
Esta sección es más para contexto - no es necesario memorizarla, pero ayuda a entender las decisiones.
Cuando tengan más experiencia, van a apreciar estas comparaciones.


----

### 🎯 ¿Por Qué Monolito Modular?

Note:
Esta es la pregunta clave que siempre nos hacen.
"¿Por qué no microservicios?" - bueno, veamos las diferencias reales.

<table style="font-size: 0.7em; margin: 0 auto;">
  <thead>
    <tr>
      <th></th>
      <th>Microservicios</th>
      <th>Monolito Modular</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Complejidad operacional</td>
      <td>🔴 Alta</td>
      <td>🟢 Baja</td>
    </tr>
    <tr>
      <td>Latencia entre módulos</td>
      <td>🔴 Red (ms)</td>
      <td>🟢 In-process (μs)</td>
    </tr>
    <tr>
      <td>Consistencia de datos</td>
      <td>🟡 Eventual</td>
      <td>🟢 Fuerte</td>
    </tr>
    <tr>
      <td>Costo infraestructura</td>
      <td>🔴 Alto</td>
      <td>🟢 Bajo</td>
    </tr>
    <tr>
      <td>Velocidad desarrollo</td>
      <td>🔴 Lenta</td>
      <td>🟢 Rápida</td>
    </tr>
  </tbody>
</table>

> **BigTech**: Shopify, GitHub, Basecamp usan monolitos modulares

Note:
Miren esta tabla comparativa.
Complejidad operacional: con microservicios tienes que manejar múltiples deployments, redes, logs separados. Aquí es todo uno.
Latencia: cuando un servicio llama a otro por red, puede tardar milisegundos. Aquí es una llamada de función, microsegundos.
Consistencia: en microservicios los datos pueden quedar desincronizados. Aquí podemos usar transacciones.
Costo: menos infraestructura = menos dinero.
Dato importante: Shopify maneja BILLONES de dólares con un monolito. GitHub también. No es solo para proyectos pequeños.

----
<!-- .slide: data-background="#191919" data-background-transition="fade" -->

### Latencia acumulada

<div style="display: flex; justify-content: space-around; align-items: flex-start; margin-top: 20px;">

<!-- Microservicios -->
<div style="text-align: center; width: 45%;">
<h4>Microservicios</h4>
<p style="font-size: 0.5em; color: #e74c3c;">Client → GW → Cart → GW → [Services] → GW → Cart → Client</p>
<svg width="350" height="220" viewBox="0 0 350 220" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <!-- Nodes -->
  <rect x="5" y="90" width="40" height="40" fill="#95a5a6" rx="5" />
  <text x="25" y="115" text-anchor="middle" fill="white" font-size="10">User</text>

  <rect x="80" y="60" width="40" height="100" fill="#3498db" rx="2" />
  <text x="100" y="115" text-anchor="middle" fill="white" font-size="10" transform="rotate(-90, 100, 115)">Gateway</text>

  <rect x="160" y="90" width="50" height="40" fill="#e74c3c" rx="5" />
  <text x="185" y="115" text-anchor="middle" fill="white" font-size="10" font-weight="bold">Cart</text>

  <rect x="280" y="30" width="60" height="30" fill="#e74c3c" rx="5" />
  <text x="310" y="50" text-anchor="middle" fill="white" font-size="10">Pricing</text>

  <rect x="280" y="95" width="60" height="30" fill="#e74c3c" rx="5" />
  <text x="310" y="115" text-anchor="middle" fill="white" font-size="10">Inventory</text>

  <rect x="280" y="160" width="60" height="30" fill="#e74c3c" rx="5" />
  <text x="310" y="180" text-anchor="middle" fill="white" font-size="10">Catalogue</text>

  <!-- Connections -->
  <line x1="45" y1="110" x2="80" y2="110" stroke="white" stroke-width="1" opacity="0.3" />
  <line x1="120" y1="110" x2="160" y2="110" stroke="white" stroke-width="1" opacity="0.3" />
  
  <!-- GW to Services -->
  <path d="M 120 110 L 140 110 L 140 45 L 280 45" fill="none" stroke="white" stroke-width="1" opacity="0.3" stroke-dasharray="3,3" />
  <path d="M 120 110 L 280 110" fill="none" stroke="white" stroke-width="1" opacity="0.3" stroke-dasharray="3,3" />
  <path d="M 120 110 L 140 110 L 140 175 L 280 175" fill="none" stroke="white" stroke-width="1" opacity="0.3" stroke-dasharray="3,3" />

  <!-- Paths -->
  <path id="ms-p1" d="M 25 110 L 100 110 L 185 110 L 100 110" fill="none" stroke="none" />
  <path id="ms-p2a" d="M 100 110 L 140 110 L 140 45 L 310 45 L 140 45 L 140 110 L 100 110" fill="none" stroke="none" />
  <path id="ms-p2b" d="M 100 110 L 310 110 L 100 110" fill="none" stroke="none" />
  <path id="ms-p2c" d="M 100 110 L 140 110 L 140 175 L 310 175 L 140 175 L 140 110 L 100 110" fill="none" stroke="none" />
  <path id="ms-p3" d="M 100 110 L 185 110 L 100 110 L 25 110" fill="none" stroke="none" />

  <!-- Ball 1: User -> GW -> Cart -> GW -->
  <circle r="5" fill="#f1c40f" opacity="0">
    <animateMotion dur="12s" repeatCount="indefinite" begin="0s" keyPoints="0;1;1" keyTimes="0;0.333;1" calcMode="linear">
      <mpath xlink:href="#ms-p1" />
    </animateMotion>
    <animate attributeName="opacity" values="1;1;0;0" keyTimes="0;0.333;0.334;1" dur="12s" repeatCount="indefinite" begin="0s" />
  </circle>

  <!-- Ball 2a: GW -> Pricing -> GW -->
  <circle r="5" fill="#f1c40f" opacity="0">
    <animateMotion dur="12s" repeatCount="indefinite" begin="0s" keyPoints="0;0;1;1" keyTimes="0;0.333;0.666;1" calcMode="linear">
       <mpath xlink:href="#ms-p2a" />
    </animateMotion>
    <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.333;0.334;0.666;0.667;1" dur="12s" repeatCount="indefinite" begin="0s" />
  </circle>

  <!-- Ball 2b: GW -> Inventory -> GW -->
  <circle r="5" fill="#f1c40f" opacity="0">
    <animateMotion dur="12s" repeatCount="indefinite" begin="0s" keyPoints="0;0;1;1" keyTimes="0;0.333;0.666;1" calcMode="linear">
       <mpath xlink:href="#ms-p2b" />
    </animateMotion>
    <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.333;0.334;0.666;0.667;1" dur="12s" repeatCount="indefinite" begin="0s" />
  </circle>

  <!-- Ball 2c: GW -> Catalogue -> GW -->
  <circle r="5" fill="#f1c40f" opacity="0">
    <animateMotion dur="12s" repeatCount="indefinite" begin="0s" keyPoints="0;0;1;1" keyTimes="0;0.333;0.666;1" calcMode="linear">
       <mpath xlink:href="#ms-p2c" />
    </animateMotion>
    <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.333;0.334;0.666;0.667;1" dur="12s" repeatCount="indefinite" begin="0s" />
  </circle>

  <!-- Ball 3: GW -> Cart -> GW -> User -->
  <circle r="5" fill="#f1c40f" opacity="0">
    <animateMotion dur="12s" repeatCount="indefinite" begin="0s" keyPoints="0;0;1" keyTimes="0;0.666;1" calcMode="linear">
      <mpath xlink:href="#ms-p3" />
    </animateMotion>
    <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.666;0.667;1" dur="12s" repeatCount="indefinite" begin="0s" />
  </circle>

</svg>
<p style="font-size: 0.5em;">Latencia acumulada: Alta 🔴</p>
</div>

<!-- Monolito Modular -->
<div style="text-align: center; width: 45%;">
<h4>Monolito Modular</h4>
<p style="font-size: 0.5em; color: #2ecc71;">Client → GW → Cart → [Internal Calls] → GW → Client</p>
<svg width="350" height="220" viewBox="0 0 350 220" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <!-- Nodes -->
  <rect x="5" y="90" width="40" height="40" fill="#95a5a6" rx="5" />
  <text x="25" y="115" text-anchor="middle" fill="white" font-size="10">User</text>

  <rect x="80" y="60" width="40" height="100" fill="#3498db" rx="2" />
  <text x="100" y="115" text-anchor="middle" fill="white" font-size="10" transform="rotate(-90, 100, 115)">Gateway</text>

  <!-- Monolith Boundary -->
  <rect x="150" y="10" width="195" height="200" fill="none" stroke="#2ecc71" stroke-width="2" rx="10" />
  <text x="247" y="205" text-anchor="middle" fill="#2ecc71" font-size="10">MONOLITH PROCESS</text>

  <rect x="170" y="90" width="50" height="40" fill="#27ae60" rx="5" />
  <text x="195" y="115" text-anchor="middle" fill="white" font-size="10" font-weight="bold">Cart</text>

  <rect x="270" y="30" width="60" height="30" fill="#27ae60" rx="5" />
  <text x="300" y="50" text-anchor="middle" fill="white" font-size="10">Pricing</text>

  <rect x="270" y="95" width="60" height="30" fill="#27ae60" rx="5" />
  <text x="300" y="115" text-anchor="middle" fill="white" font-size="10">Inventory</text>

  <rect x="270" y="160" width="60" height="30" fill="#27ae60" rx="5" />
  <text x="300" y="180" text-anchor="middle" fill="white" font-size="10">Catalogue</text>

  <!-- Connections -->
  <line x1="45" y1="110" x2="80" y2="110" stroke="white" stroke-width="1" opacity="0.3" />
  <line x1="120" y1="110" x2="170" y2="110" stroke="white" stroke-width="1" opacity="0.3" />
  
  <!-- Internal Links (Orthogonal) -->
  <!-- Cart to Pricing -->
  <path d="M 220 110 L 245 110 L 245 45 L 270 45" fill="none" stroke="white" stroke-width="1" opacity="0.3" />
  <!-- Cart to Inventory -->
  <path d="M 220 110 L 270 110" fill="none" stroke="white" stroke-width="1" opacity="0.3" />
  <!-- Cart to Catalogue -->
  <path d="M 220 110 L 245 110 L 245 175 L 270 175" fill="none" stroke="white" stroke-width="1" opacity="0.3" />

  <!-- Paths -->
  <path id="mono-p1" d="M 25 110 L 100 110 L 195 110" fill="none" stroke="none" />
  
  <!-- Cart -> Pricing -> Cart (Orthogonal) -->
  <path id="mono-p2a" d="M 195 110 L 245 110 L 245 45 L 300 45 L 245 45 L 245 110 L 195 110" fill="none" stroke="none" />
  
  <!-- Cart -> Inventory -> Cart -->
  <path id="mono-p2b" d="M 195 110 L 300 110 L 195 110" fill="none" stroke="none" />
  
  <!-- Cart -> Catalogue -> Cart (Orthogonal) -->
  <path id="mono-p2c" d="M 195 110 L 245 110 L 245 175 L 300 175 L 245 175 L 245 110 L 195 110" fill="none" stroke="none" />
  
  <path id="mono-p3" d="M 195 110 L 100 110 L 25 110" fill="none" stroke="none" />

  <!-- Ball 1: User -> GW -> Cart -->
  <circle r="5" fill="#f1c40f" opacity="0">
    <animateMotion dur="6s" repeatCount="indefinite" begin="0s" keyPoints="0;1;1" keyTimes="0;0.333;1" calcMode="linear">
      <mpath xlink:href="#mono-p1" />
    </animateMotion>
    <!-- Visible 0-0.33 -->
    <animate attributeName="opacity" values="1;1;0;0" keyTimes="0;0.333;0.334;1" dur="6s" repeatCount="indefinite" begin="0s" />
  </circle>

  <!-- Ball 2a: Cart -> Pricing -> Cart -->
  <circle r="5" fill="#f1c40f" opacity="0">
    <animateMotion dur="6s" repeatCount="indefinite" begin="0s" keyPoints="0;0;1;1" keyTimes="0;0.333;0.666;1" calcMode="linear">
      <mpath xlink:href="#mono-p2a" />
    </animateMotion>
    <!-- Visible 0.33-0.66 -->
    <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.333;0.334;0.666;0.667;1" dur="6s" repeatCount="indefinite" begin="0s" />
  </circle>

  <!-- Ball 2b: Cart -> Inventory -> Cart -->
  <circle r="5" fill="#f1c40f" opacity="0">
    <animateMotion dur="6s" repeatCount="indefinite" begin="0s" keyPoints="0;0;1;1" keyTimes="0;0.333;0.666;1" calcMode="linear">
      <mpath xlink:href="#mono-p2b" />
    </animateMotion>
    <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.333;0.334;0.666;0.667;1" dur="6s" repeatCount="indefinite" begin="0s" />
  </circle>

  <!-- Ball 2c: Cart -> Catalogue -> Cart -->
  <circle r="5" fill="#f1c40f" opacity="0">
    <animateMotion dur="6s" repeatCount="indefinite" begin="0s" keyPoints="0;0;1;1" keyTimes="0;0.333;0.666;1" calcMode="linear">
      <mpath xlink:href="#mono-p2c" />
    </animateMotion>
    <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.333;0.334;0.666;0.667;1" dur="6s" repeatCount="indefinite" begin="0s" />
  </circle>

  <!-- Ball 3: Cart -> GW -> User -->
  <circle r="5" fill="#f1c40f" opacity="0">
    <animateMotion dur="6s" repeatCount="indefinite" begin="0s" keyPoints="0;0;1" keyTimes="0;0.666;1" calcMode="linear">
      <mpath xlink:href="#mono-p3" />
    </animateMotion>
    <!-- Visible 0.66-1 -->
    <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.666;0.667;1" dur="6s" repeatCount="indefinite" begin="0s" />
  </circle>

</svg>
<p style="font-size: 0.5em;">Latencia acumulada: Baja 🟢</p>
</div>

</div>

Note:
Ahora veamos esto visualmente.
A la izquierda: microservicios. Cada llamada pasa por el Gateway, va a un servicio, vuelve al Gateway, y así.
Imaginen que cada flecha es 5-10ms de latencia. Si hay 10 llamadas, ya son 50-100ms solo en red.
A la derecha: monolito modular. El Gateway entra UNA vez, y después todas las llamadas entre módulos son internas.
Es como la diferencia entre llamar a un colega por teléfono vs. simplemente girar la silla y hablarle.

----
<!-- .slide: data-background="#1c1c1c" -->

## Costos de Infraestructura

<div style="display: flex; justify-content: space-around; align-items: flex-start; margin-top: 20px;">

<!-- Microservicios -->
<div style="text-align: center; width: 45%;">
<h4>Microservicios</h4>
<p style="font-size: 0.5em; color: #e74c3c;">Múltiples instancias base + Escalado fragmentado</p>
<svg width="350" height="250" viewBox="0 0 350 250" xmlns="http://www.w3.org/2000/svg">
<defs>
<g id="u-ms">
<circle cx="10" cy="8" r="4" fill="#ecf0f1" />
<path d="M 3 20 Q 10 10 17 20" fill="#ecf0f1" />
</g>
</defs>
<!-- Traffic Header -->
<text x="175" y="15" text-anchor="middle" fill="#95a5a6" font-size="10">Incoming Traffic</text>
<!-- User 1 (Always) -->
<use href="#u-ms" x="165" y="20" />
<!-- Users Group 2 (Medium) -->
<g opacity="0">
<animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.33;0.9;1" dur="6s" repeatCount="indefinite" />
<use href="#u-ms" x="145" y="20" />
<use href="#u-ms" x="185" y="20" />
</g>
<!-- Users Group 3 (High) -->
<g opacity="0">
<animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.33;0.66;0.9;1" dur="6s" repeatCount="indefinite" />
<use href="#u-ms" x="125" y="20" />
<use href="#u-ms" x="205" y="20" />
</g>
<!-- Down Arrows -->
<path d="M 175 45 L 175 70" stroke="#f1c40f" stroke-width="2" stroke-dasharray="4 2">
<animate attributeName="stroke-dashoffset" values="12;0" dur="1s" repeatCount="indefinite" />
</path>
<!-- Base Instances -->
<g>
<rect x="20" y="150" width="60" height="40" fill="#e74c3c" rx="2" opacity="0.8" />
<text x="50" y="175" text-anchor="middle" fill="white" font-size="10">Cart</text>
<rect x="100" y="150" width="60" height="40" fill="#e74c3c" rx="2" opacity="0.8" />
<text x="130" y="175" text-anchor="middle" fill="white" font-size="10">Pricing</text>
<rect x="180" y="150" width="60" height="40" fill="#e74c3c" rx="2" opacity="0.8" />
<text x="210" y="175" text-anchor="middle" fill="white" font-size="10">Inventory</text>
<rect x="260" y="150" width="60" height="40" fill="#e74c3c" rx="2" opacity="0.8" />
<text x="290" y="175" text-anchor="middle" fill="white" font-size="10">Catalogue</text>
</g>
<!-- Scaled Instances (Medium) -->
<g opacity="0">
<animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.33;0.9;1" dur="6s" repeatCount="indefinite" />
<rect x="100" y="105" width="60" height="40" fill="#e74c3c" rx="2" opacity="0.6" />
</g>
<!-- Scaled Instances (High) -->
<g opacity="0">
<animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.33;0.66;0.9;1" dur="6s" repeatCount="indefinite" />
<rect x="100" y="60" width="60" height="40" fill="#e74c3c" rx="2" opacity="0.6" />
<rect x="20" y="105" width="60" height="40" fill="#e74c3c" rx="2" opacity="0.6" />
</g>
<!-- Individual Firestores -->
<g transform="translate(0, 210)">
  <!-- Cart DB -->
  <rect x="30" y="0" width="40" height="20" fill="#f39c12" rx="2" />
  <text x="50" y="13" text-anchor="middle" fill="white" font-size="8">DB</text>
  <!-- Cart DB Scale -->
  <rect x="35" y="5" width="40" height="20" fill="#f39c12" rx="2" opacity="0">
    <animate attributeName="opacity" values="0;0;0.5;0.5;0" keyTimes="0;0.33;0.66;0.9;1" dur="6s" repeatCount="indefinite" />
    <animateTransform attributeName="transform" type="translate" values="0 0; 0 0; 5 5; 5 5; 0 0" keyTimes="0;0.33;0.66;0.9;1" dur="6s" repeatCount="indefinite" />
  </rect>

  <!-- Pricing DB -->
  <rect x="110" y="0" width="40" height="20" fill="#f39c12" rx="2" />
  <text x="130" y="13" text-anchor="middle" fill="white" font-size="8">DB</text>
  <!-- Pricing DB Scale (Medium & High) -->
  <rect x="115" y="5" width="40" height="20" fill="#f39c12" rx="2" opacity="0">
    <animate attributeName="opacity" values="0;0.5;0.5;0" keyTimes="0;0.33;0.9;1" dur="6s" repeatCount="indefinite" />
    <animateTransform attributeName="transform" type="translate" values="0 0; 5 5; 5 5; 0 0" keyTimes="0;0.33;0.9;1" dur="6s" repeatCount="indefinite" />
  </rect>

  <!-- Inv DB -->
  <rect x="190" y="0" width="40" height="20" fill="#f39c12" rx="2" />
  <text x="210" y="13" text-anchor="middle" fill="white" font-size="8">DB</text>

  <!-- Cat DB -->
  <rect x="270" y="0" width="40" height="20" fill="#f39c12" rx="2" />
  <text x="290" y="13" text-anchor="middle" fill="white" font-size="8">DB</text>
</g>
</svg>
<p style="font-size: 0.5em;">Costo de Infraestructura: Alto 🔴</p>
</div>

<!-- Monolito Modular -->
<div style="text-align: center; width: 45%;">
<h4>Monolito Modular</h4>
<p style="font-size: 0.5em; color: #2ecc71;">Instancia única base + Escalado eficiente</p>
<svg width="350" height="250" viewBox="0 0 350 250" xmlns="http://www.w3.org/2000/svg">
<defs>
<g id="u-mono">
<circle cx="10" cy="8" r="4" fill="#ecf0f1" />
<path d="M 3 20 Q 10 10 17 20" fill="#ecf0f1" />
</g>
</defs>
<!-- Traffic Header -->
<text x="175" y="15" text-anchor="middle" fill="#95a5a6" font-size="10">Incoming Traffic</text>
<!-- User 1 (Always) -->
<use href="#u-mono" x="165" y="20" />
<!-- Users Group 2 (Medium) -->
<g opacity="0">
<animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.33;0.9;1" dur="6s" repeatCount="indefinite" />
<use href="#u-mono" x="145" y="20" />
<use href="#u-mono" x="185" y="20" />
</g>
<!-- Users Group 3 (High) -->
<g opacity="0">
<animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.33;0.66;0.9;1" dur="6s" repeatCount="indefinite" />
<use href="#u-mono" x="125" y="20" />
<use href="#u-mono" x="205" y="20" />
</g>
<!-- Down Arrows -->
<path d="M 175 45 L 175 70" stroke="#f1c40f" stroke-width="2" stroke-dasharray="4 2">
<animate attributeName="stroke-dashoffset" values="12;0" dur="1s" repeatCount="indefinite" />
</path>
<!-- Base Instance -->
<g>
<rect x="100" y="150" width="150" height="40" fill="#2ecc71" rx="2" opacity="0.8" />
<text x="175" y="175" text-anchor="middle" fill="white" font-size="10">Monolith (All Modules)</text>
</g>
<!-- Scaled Instances (Medium) -->
<g opacity="0">
<animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.33;0.9;1" dur="6s" repeatCount="indefinite" />
<rect x="100" y="105" width="150" height="40" fill="#2ecc71" rx="2" opacity="0.6" />
</g>
<!-- Scaled Instances (High) -->
<g opacity="0">
<animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.33;0.66;0.9;1" dur="6s" repeatCount="indefinite" />
<rect x="100" y="60" width="150" height="40" fill="#2ecc71" rx="2" opacity="0.6" />
</g>
<!-- Firestore (Shared & Scaling) -->
<g transform="translate(20, 210)">
  <!-- Scaling Replica (Behind) -->
  <rect x="5" y="5" width="300" height="30" fill="#f39c12" rx="5" opacity="0">
     <animate attributeName="opacity" values="0;0.5;0.5;0" keyTimes="0;0.33;0.9;1" dur="6s" repeatCount="indefinite" />
     <animateTransform attributeName="transform" type="translate" values="0 0; 5 5; 5 5; 0 0" keyTimes="0;0.33;0.9;1" dur="6s" repeatCount="indefinite" />
  </rect>
  <!-- Main DB -->
  <rect x="0" y="0" width="300" height="30" fill="#f39c12" rx="5" />
  <text x="150" y="20" text-anchor="middle" fill="white" font-size="12">DB</text>
</g>
</svg>
<p style="font-size: 0.5em;">Costo de Infraestructura: Bajo 🟢</p>
</div>

</div>

Note:
Hablemos de dinero - algo que le importa mucho al negocio.
A la izquierda ven microservicios: cada servicio necesita su propia instancia mínima corriendo 24/7.
Si tienes 10 servicios, pagas 10 instancias base aunque nadie esté usando el sistema.
Y cuando escalas, cada servicio escala independientemente - muy ineficiente.
A la derecha: UNA instancia que contiene todo. Cuando escalas, escalas todo junto.
La diferencia puede ser de miles de dólares al mes en cloud.

----
<!-- .slide: data-background="#181818" -->

## Consistencia de Datos

<div style="display: flex; justify-content: space-around; align-items: flex-start; margin-top: 20px;">

<!-- Microservicios -->
<div style="text-align: center; width: 45%;">
<h4>Microservicios</h4>
<p style="font-size: 0.5em; color: #f1c40f;">Consistencia Eventual<br/>(Riesgo de desincronización)</p>
<svg width="350" height="250" viewBox="0 0 350 250" xmlns="http://www.w3.org/2000/svg">
  <!-- Service A -->
  <rect x="50" y="50" width="80" height="40" fill="#e74c3c" rx="2" />
  <text x="90" y="75" text-anchor="middle" fill="white" font-size="10">Order</text>
  
  <!-- DB A -->
  <rect x="60" y="100" width="60" height="30" fill="#f39c12" rx="2" />
  <text x="90" y="120" text-anchor="middle" fill="white" font-size="8">Order DB</text>

  <!-- Service B -->
  <rect x="220" y="50" width="80" height="40" fill="#e74c3c" rx="2" />
  <text x="260" y="75" text-anchor="middle" fill="white" font-size="10">Inventory</text>

  <!-- DB B -->
  <rect x="230" y="100" width="60" height="30" fill="#f39c12" rx="2" />
  <text x="260" y="120" text-anchor="middle" fill="white" font-size="8">Inv DB</text>

  <!-- Transaction A (Order -> DB) -->
  <circle cx="90" r="5" fill="#2ecc71" opacity="0">
    <animate attributeName="cy" values="70;115;115;70" keyTimes="0;0.2;0.9;1" dur="4s" repeatCount="indefinite" begin="0s" />
    <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.8;1" dur="4s" repeatCount="indefinite" begin="0s" />
  </circle>

  <!-- Visual Path -->
  <path d="M 130 70 L 220 70" stroke="#ecf0f1" stroke-width="1" stroke-dasharray="4 2" opacity="0.5" />

  <!-- Event Packet (Order -> Inv) -->
  <circle cx="130" cy="70" r="4" fill="#ffffff" opacity="0">
    <animate attributeName="cx" values="130;130;220;220" keyTimes="0;0.25;0.6;1" dur="4s" repeatCount="indefinite" begin="0s" />
    <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.25;0.3;0.6;0.65;1" dur="4s" repeatCount="indefinite" begin="0s" />
  </circle>

  <!-- Transaction B (Inv -> DB) -->
  <circle cx="260" r="5" fill="#2ecc71" opacity="0">
    <animate attributeName="cy" values="70;70;115;115" keyTimes="0;0.65;0.85;1" dur="4s" repeatCount="indefinite" begin="0s" />
    <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.65;0.7;0.9;1" dur="4s" repeatCount="indefinite" begin="0s" />
  </circle>

  <!-- Inconsistency Warning -->
  <text x="175" y="150" text-anchor="middle" fill="#e74c3c" font-size="10" opacity="0">
    ⚠️ Inconsistent State
    <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.2;0.3;0.6;0.7" dur="4s" repeatCount="indefinite" begin="0s" />
  </text>
</svg>
<p style="font-size: 0.5em;">Consistencia: Eventual 🟡</p>
</div>

<!-- Monolito Modular -->
<div style="text-align: center; width: 45%;">
<h4>Monolito Modular</h4>
<p style="font-size: 0.5em; color: #2ecc71;">Consistencia Fuerte<br/>(ACID Transaction)</p>
<svg width="350" height="250" viewBox="0 0 350 250" xmlns="http://www.w3.org/2000/svg">
  <!-- Monolith Container -->
  <rect x="40" y="40" width="270" height="80" fill="none" stroke="#2ecc71" stroke-width="2" rx="5" />
  <text x="175" y="30" text-anchor="middle" fill="#2ecc71" font-size="10">Monolith Process</text>

  <!-- Module A -->
  <rect x="60" y="60" width="80" height="40" fill="#2ecc71" rx="2" opacity="0.8" />
  <text x="100" y="85" text-anchor="middle" fill="white" font-size="10">Order</text>

  <!-- Module B -->
  <rect x="210" y="60" width="80" height="40" fill="#2ecc71" rx="2" opacity="0.8" />
  <text x="250" y="85" text-anchor="middle" fill="white" font-size="10">Inventory</text>

  <!-- Shared DB -->
  <rect x="100" y="150" width="150" height="30" fill="#f39c12" rx="2" />
  <text x="175" y="170" text-anchor="middle" fill="white" font-size="10">Shared DB (ACID)</text>

  <!-- Transaction Scope -->
  <rect x="50" y="50" width="250" height="140" fill="none" stroke="#f1c40f" stroke-width="2" stroke-dasharray="5 5" rx="5" opacity="0">
    <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1" dur="4s" repeatCount="indefinite" begin="0s" />
  </rect>
  <text x="175" y="210" text-anchor="middle" fill="#f1c40f" font-size="10" opacity="0">
    Transaction Scope
    <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1" dur="4s" repeatCount="indefinite" begin="0s" />
  </text>

  <!-- Write A (Order -> Shared DB) -->
  <circle r="5" fill="#2ecc71" opacity="0">
    <animate attributeName="cx" values="100;100;175;175" keyTimes="0;0.2;0.5;1" dur="4s" repeatCount="indefinite" begin="0s" />
    <animate attributeName="cy" values="80;80;165;165" keyTimes="0;0.2;0.5;1" dur="4s" repeatCount="indefinite" begin="0s" />
    <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.2;0.3;0.8;1" dur="4s" repeatCount="indefinite" begin="0s" />
  </circle>

  <!-- Write B (Inventory -> Shared DB) -->
  <circle r="5" fill="#2ecc71" opacity="0">
    <animate attributeName="cx" values="250;250;175;175" keyTimes="0;0.2;0.5;1" dur="4s" repeatCount="indefinite" begin="0s" />
    <animate attributeName="cy" values="80;80;165;165" keyTimes="0;0.2;0.5;1" dur="4s" repeatCount="indefinite" begin="0s" />
    <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.2;0.3;0.8;1" dur="4s" repeatCount="indefinite" begin="0s" />
  </circle>

</svg>
<p style="font-size: 0.5em;">Consistencia: Fuerte 🟢</p>
</div>

</div>

Note:
Este es un tema MUY importante para entender.
A la izquierda: microservicios. Cuando Order crea un pedido, tiene que avisar a Inventory para que reserve stock.
Eso pasa por la red. ¿Qué pasa si Order guarda el pedido pero el mensaje a Inventory se pierde? Inconsistencia.
A la derecha: monolito modular. Todo pasa en UNA transacción de base de datos.
O se guarda TODO (pedido + reserva de stock) o no se guarda NADA. Esto se llama ACID.
Para sistemas de e-commerce donde el dinero está involucrado, esto es crítico.

----
<!-- .slide: data-background="#1c1c1c" -->

## Complejidad de Despliegue

<div style="display: flex; justify-content: space-around; align-items: flex-start; margin-top: 20px;">

<!-- Microservicios -->
<div style="text-align: center; width: 45%;">
<h4>Microservicios</h4>
<p style="font-size: 0.5em; color: #e74c3c;">Despliegues Fragmentados<br/>(Riesgo de Incompatibilidad)</p>
<svg width="350" height="250" viewBox="0 0 350 250" xmlns="http://www.w3.org/2000/svg">
  <!-- Repos -->
  <rect x="30" y="30" width="60" height="30" fill="#95a5a6" rx="2" />
  <text x="60" y="50" text-anchor="middle" fill="white" font-size="8">Repo A</text>
  
  <rect x="145" y="30" width="60" height="30" fill="#95a5a6" rx="2" />
  <text x="175" y="50" text-anchor="middle" fill="white" font-size="8">Repo B</text>
  
  <rect x="260" y="30" width="60" height="30" fill="#95a5a6" rx="2" />
  <text x="290" y="50" text-anchor="middle" fill="white" font-size="8">Repo C</text>

  <!-- Pipelines -->
  <!-- Pipe A -->
  <rect x="40" y="80" width="40" height="60" fill="#34495e" rx="2" />
  <rect x="40" y="140" width="40" height="0" fill="#e74c3c" rx="2">
    <animate attributeName="height" values="0;60;60;0" keyTimes="0;0.3;0.9;1" dur="5s" repeatCount="indefinite" />
    <animate attributeName="y" values="140;80;80;140" keyTimes="0;0.3;0.9;1" dur="5s" repeatCount="indefinite" />
  </rect>

  <!-- Pipe B (Slower) -->
  <rect x="155" y="80" width="40" height="60" fill="#34495e" rx="2" />
  <rect x="155" y="140" width="40" height="0" fill="#f1c40f" rx="2">
    <animate attributeName="height" values="0;60;60;0" keyTimes="0;0.5;0.9;1" dur="5s" repeatCount="indefinite" />
    <animate attributeName="y" values="140;80;80;140" keyTimes="0;0.5;0.9;1" dur="5s" repeatCount="indefinite" />
  </rect>

  <!-- Pipe C -->
  <rect x="270" y="80" width="40" height="60" fill="#34495e" rx="2" />
  <rect x="270" y="140" width="40" height="0" fill="#e74c3c" rx="2">
    <animate attributeName="height" values="0;60;60;0" keyTimes="0;0.35;0.9;1" dur="5s" repeatCount="indefinite" />
    <animate attributeName="y" values="140;80;80;140" keyTimes="0;0.35;0.9;1" dur="5s" repeatCount="indefinite" />
  </rect>

  <!-- Deployed Versions -->
  <g opacity="0">
    <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.5;0.6;0.9;1" dur="5s" repeatCount="indefinite" />
    <rect x="30" y="160" width="60" height="30" fill="#e74c3c" rx="2" />
    <text x="60" y="180" text-anchor="middle" fill="white" font-size="8">v2.0</text>
    <rect x="145" y="160" width="60" height="30" fill="#f1c40f" rx="2" />
    <text x="175" y="180" text-anchor="middle" fill="black" font-size="8">v1.5</text> <!-- Outdated -->
    <rect x="260" y="160" width="60" height="30" fill="#e74c3c" rx="2" />
    <text x="290" y="180" text-anchor="middle" fill="white" font-size="8">v2.0</text>
  </g>

  <!-- Error Connection -->
  <path d="M 90 175 L 145 175" stroke="#e74c3c" stroke-width="2" stroke-dasharray="4 2" opacity="0">
     <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.6;0.7;0.9;1" dur="5s" repeatCount="indefinite" />
  </path>
  <text x="117" y="170" text-anchor="middle" fill="#e74c3c" font-size="10" opacity="0">
    ❌ Error
    <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.6;0.7;0.9;1" dur="5s" repeatCount="indefinite" />
  </text>

</svg>
<p style="font-size: 0.5em;">Complejidad: Alta 🔴</p>
</div>

<!-- Monolito Modular -->
<div style="text-align: center; width: 45%;">
<h4>Monolito Modular</h4>
<p style="font-size: 0.5em; color: #2ecc71;">Despliegue Atómico<br/>(Sincronización Garantizada)</p>
<svg width="350" height="250" viewBox="0 0 350 250" xmlns="http://www.w3.org/2000/svg">
  <!-- Repo -->
  <rect x="100" y="30" width="150" height="30" fill="#95a5a6" rx="2" />
  <text x="175" y="50" text-anchor="middle" fill="white" font-size="10">Monorepo</text>

  <!-- Pipeline -->
  <rect x="125" y="80" width="100" height="60" fill="#34495e" rx="2" />
  <rect x="125" y="140" width="100" height="0" fill="#2ecc71" rx="2">
    <animate attributeName="height" values="0;60;60;0" keyTimes="0;0.4;0.9;1" dur="5s" repeatCount="indefinite" />
    <animate attributeName="y" values="140;80;80;140" keyTimes="0;0.4;0.9;1" dur="5s" repeatCount="indefinite" />
  </rect>

  <!-- Deployed Version -->
  <g opacity="0">
    <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.45;0.55;0.9;1" dur="5s" repeatCount="indefinite" />
    <rect x="100" y="160" width="150" height="30" fill="#2ecc71" rx="2" />
    <text x="175" y="180" text-anchor="middle" fill="white" font-size="10">v2.0 (All Modules)</text>
  </g>

  <!-- Success Check -->
  <circle cx="175" cy="210" r="10" fill="#2ecc71" opacity="0">
     <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.55;0.65;0.9;1" dur="5s" repeatCount="indefinite" />
  </circle>
  <path d="M 170 210 L 173 214 L 180 206" stroke="white" stroke-width="2" fill="none" opacity="0">
     <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.55;0.65;0.9;1" dur="5s" repeatCount="indefinite" />
  </path>

</svg>
<p style="font-size: 0.5em;">Complejidad: Baja 🟢</p>
</div>

</div>

Note:
Este es un problema que NO ven en los tutoriales de microservicios.
A la izquierda: cada servicio tiene su propio repo y pipeline. Se despliegan en tiempos diferentes.
¿Qué pasa si Service A espera que Service B tenga un endpoint nuevo, pero B aún no se desplegó? Error en producción.
A la derecha: TODO el código está junto, TODO se despliega junto.
Si algo no compila o los tests fallan, NADA se despliega. Imposible tener incompatibilidades.
Esto reduce MUCHO el estrés de hacer releases.

----
<!-- .slide: data-background="#191919" -->

## Depuración y Trazabilidad

<div style="display: flex; justify-content: space-around; align-items: flex-start; margin-top: 20px;">

<!-- Microservicios -->
<div style="text-align: center; width: 45%;">
<h4>Microservicios</h4>
<p style="font-size: 0.5em; color: #e74c3c;">Logs Dispersos<br/>(Puzzle Distribuido)</p>
<svg width="350" height="250" viewBox="0 0 350 250" xmlns="http://www.w3.org/2000/svg">
  <!-- Services -->
  <rect x="30" y="30" width="60" height="40" fill="#3498db" rx="2" />
  <text x="60" y="55" text-anchor="middle" fill="white" font-size="10">Svc A</text>
  <rect x="145" y="30" width="60" height="40" fill="#3498db" rx="2" />
  <text x="175" y="55" text-anchor="middle" fill="white" font-size="10">Svc B</text>
  <rect x="260" y="30" width="60" height="40" fill="#3498db" rx="2" />
  <text x="290" y="55" text-anchor="middle" fill="white" font-size="10">Svc C</text>

  <!-- Logs -->
  <rect x="30" y="100" width="60" height="60" fill="#34495e" rx="2" />
  <text x="60" y="130" text-anchor="middle" fill="#7f8c8d" font-size="8">Log A</text>
  <rect x="145" y="100" width="60" height="60" fill="#34495e" rx="2" />
  <text x="175" y="130" text-anchor="middle" fill="#7f8c8d" font-size="8">Log B</text>
  <rect x="260" y="100" width="60" height="60" fill="#34495e" rx="2" />
  <text x="290" y="130" text-anchor="middle" fill="#7f8c8d" font-size="8">Log C</text>

  <!-- Request Flow (0-2s) -->
  <circle cx="60" cy="50" r="5" fill="#f1c40f" opacity="0">
    <animate attributeName="cx" values="60;175;290;290" keyTimes="0;0.25;0.5;1" dur="4s" repeatCount="indefinite" />
    <animate attributeName="opacity" values="1;1;0;0" keyTimes="0;0.45;0.5;1" dur="4s" repeatCount="indefinite" />
  </circle>

  <!-- Error at C (2s-4s) -->
  <text x="290" y="45" text-anchor="middle" font-size="20" opacity="0">
    💥
    <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.5;0.55;0.9;1" dur="4s" repeatCount="indefinite" />
  </text>

  <!-- Debugging Process (2.2s - 3.8s) -->
  <g opacity="0">
    <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.55;0.6;0.95;1" dur="4s" repeatCount="indefinite" />
    <!-- Searcher Icon (Magnifying Glass) -->
    <g>
       <!-- Handle -->
       <line x1="5" y1="5" x2="11" y2="11" stroke="#95a5a6" stroke-width="3" stroke-linecap="round" />
       <!-- Glass -->
       <circle cx="0" cy="0" r="6" fill="#3498db" fill-opacity="0.3" stroke="#95a5a6" stroke-width="2" />
       <!-- Reflection -->
       <path d="M -3 -3 A 4 4 0 0 1 0 -4" stroke="white" stroke-width="1" fill="none" opacity="0.5" stroke-linecap="round" />
       <animateTransform attributeName="transform" type="translate" values="60,130;60,130;175,130;175,130;290,130;290,130" keyTimes="0;0.65;0.7;0.8;0.85;1" dur="4s" repeatCount="indefinite" />
    </g>
    <!-- Status Indicators -->
    <text x="60" y="180" text-anchor="middle" fill="#95a5a6" font-size="10" opacity="0">
        ❓
        <animate attributeName="opacity" values="0;0;1;0;0" keyTimes="0;0.6;0.65;0.7;1" dur="4s" repeatCount="indefinite" />
    </text>
    <text x="175" y="180" text-anchor="middle" fill="#95a5a6" font-size="10" opacity="0">
        ❓
        <animate attributeName="opacity" values="0;0;0;1;0;0" keyTimes="0;0.7;0.75;0.8;0.85;1" dur="4s" repeatCount="indefinite" />
    </text>
    <text x="290" y="180" text-anchor="middle" fill="#e74c3c" font-size="10" opacity="0">
        FOUND!
        <animate attributeName="opacity" values="0;0;0;0;1;1;0" keyTimes="0;0.8;0.85;0.85;0.9;0.95;1" dur="4s" repeatCount="indefinite" />
    </text>
  </g>
</svg>
<p style="font-size: 0.5em;">Depuración: Lenta 🔴</p>
</div>

<!-- Monolito Modular -->
<div style="text-align: center; width: 45%;">
<h4>Monolito Modular</h4>
<p style="font-size: 0.5em; color: #2ecc71;">Traza Unificada<br/>(Contexto Completo)</p>
<svg width="350" height="250" viewBox="0 0 350 250" xmlns="http://www.w3.org/2000/svg">
  <!-- Monolith -->
  <rect x="50" y="20" width="250" height="60" fill="none" stroke="#2ecc71" stroke-width="2" rx="5" />
  <text x="175" y="15" text-anchor="middle" fill="#2ecc71" font-size="10">Monolith</text>
  
  <rect x="60" y="30" width="60" height="40" fill="#27ae60" rx="2" opacity="0.8" />
  <text x="90" y="55" text-anchor="middle" fill="white" font-size="10">Mod A</text>
  <rect x="145" y="30" width="60" height="40" fill="#27ae60" rx="2" opacity="0.8" />
  <text x="175" y="55" text-anchor="middle" fill="white" font-size="10">Mod B</text>
  <rect x="230" y="30" width="60" height="40" fill="#27ae60" rx="2" opacity="0.8" />
  <text x="260" y="55" text-anchor="middle" fill="white" font-size="10">Mod C</text>

  <!-- Unified Log -->
  <rect x="50" y="100" width="250" height="80" fill="#34495e" rx="2" />
  <text x="175" y="120" text-anchor="middle" fill="#ecf0f1" font-size="10">Unified Log Stream</text>
  
  <!-- Stack Trace Lines -->
  <line x1="60" y1="135" x2="290" y2="135" stroke="#7f8c8d" stroke-width="2" stroke-dasharray="5,5" />
  <line x1="60" y1="150" x2="290" y2="150" stroke="#7f8c8d" stroke-width="2" stroke-dasharray="5,5" />
  <line x1="60" y1="165" x2="290" y2="165" stroke="#7f8c8d" stroke-width="2" stroke-dasharray="5,5" />

  <!-- Request Flow (0-2s) -->
  <circle cx="90" cy="50" r="5" fill="#f1c40f" opacity="0">
    <animate attributeName="cx" values="90;175;260;260" keyTimes="0;0.25;0.5;1" dur="4s" repeatCount="indefinite" />
    <animate attributeName="opacity" values="1;1;0;0" keyTimes="0;0.45;0.5;1" dur="4s" repeatCount="indefinite" />
  </circle>

  <!-- Error at C (2s-4s) -->
  <text x="260" y="45" text-anchor="middle" font-size="20" opacity="0">
    💥
    <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.5;0.55;0.9;1" dur="4s" repeatCount="indefinite" />
  </text>

  <!-- Debugging Process (Instant at 2.2s) -->
  <g opacity="0">
    <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.55;0.6;0.95;1" dur="4s" repeatCount="indefinite" />
    <!-- Error Highlight in Log -->
    <rect x="60" y="130" width="230" height="40" fill="#e74c3c" opacity="0.3" rx="2">
        <!-- Blinks -->
        <animate attributeName="opacity" values="0.3;0.6;0.3" keyTimes="0;0.5;1" dur="1s" repeatCount="indefinite" />
    </rect>
    <text x="175" y="155" text-anchor="middle" fill="#e74c3c" font-weight="bold" font-size="12">
        Error in Mod C (Called by B -> A)
    </text>
    <!-- Direct Link -->
    <path d="M 175 130 L 260 70" stroke="#e74c3c" stroke-width="2" stroke-dasharray="4 2" opacity="0.6" />
  </g>

</svg>
<p style="font-size: 0.5em;">Depuración: Rápida 🟢</p>
</div>

</div>

Note:
Ahora hablemos de cuando las cosas fallan - porque SIEMPRE fallan eventualmente.
A la izquierda: microservicios. Hay un error. ¿Dónde está? Tienes que buscar en los logs de cada servicio.
Si son 10 servicios, son 10 lugares donde buscar. Y necesitas correlation IDs para unir las piezas.
A la derecha: monolito. UN stack trace te dice exactamente qué pasó, en qué módulo, con el contexto completo.
Cuando estén depurando a las 3am, van a agradecer no tener que navegar entre 10 sistemas de logs diferentes.

----
<!-- .slide: data-background="#191919" -->

## Resiliencia de Red

<div style="display: flex; justify-content: space-around; align-items: flex-start; margin-top: 20px;">

<!-- Microservicios -->
<div style="text-align: center; width: 45%;">
<h4>Microservicios</h4>
<p style="font-size: 0.5em; color: #e74c3c;">Red Inestable<br/>(Timeouts, Retries, Particiones)</p>
<svg width="350" height="250" viewBox="0 0 350 250" xmlns="http://www.w3.org/2000/svg">
  <!-- Service A -->
  <rect x="20" y="80" width="60" height="60" fill="#3498db" rx="2" />
  <text x="50" y="115" text-anchor="middle" fill="white" font-size="10">Svc A</text>

  <!-- Service B -->
  <rect x="270" y="80" width="60" height="60" fill="#3498db" rx="2" />
  <text x="300" y="115" text-anchor="middle" fill="white" font-size="10">Svc B</text>

  <!-- Network Cloud -->
  <path d="M 130 110 Q 130 90 150 90 Q 160 70 190 90 Q 210 90 210 110 Q 210 130 190 130 Q 170 150 150 130 Q 130 130 130 110" fill="#ecf0f1" stroke="none">
    <animate attributeName="fill" values="#ecf0f1;#ecf0f1;#95a5a6;#95a5a6;#ecf0f1" keyTimes="0;0.3;0.35;0.8;1" dur="6s" repeatCount="indefinite" />
  </path>
  <text x="170" y="115" text-anchor="middle" fill="#2c3e50" font-size="8">Network</text>

  <!-- Lightning Bolt (Failure) -->
  <path d="M 160 80 L 180 80 L 165 110 L 185 110 L 155 150 L 165 120 L 145 120 Z" fill="#f1c40f" stroke="#e67e22" stroke-width="1" opacity="0">
    <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.33;0.35;0.8;0.85;1" dur="6s" repeatCount="indefinite" />
  </path>

  <!-- Packet 1 (Success) -->
  <circle cx="80" cy="110" r="5" fill="#2ecc71" opacity="0">
    <animate attributeName="cx" values="80;270;270" keyTimes="0;0.25;1" dur="6s" repeatCount="indefinite" />
    <animate attributeName="opacity" values="1;1;0;0" keyTimes="0;0.24;0.25;1" dur="6s" repeatCount="indefinite" />
  </circle>

  <!-- Packet 2 (Fail) -->
  <circle cx="80" cy="110" r="5" fill="#2ecc71" opacity="0">
    <animate attributeName="cx" values="80;80;150;150" keyTimes="0;0.33;0.5;1" dur="6s" repeatCount="indefinite" />
    <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.33;0.34;0.49;0.5;1" dur="6s" repeatCount="indefinite" />
    <animate attributeName="fill" values="#2ecc71;#2ecc71;#e74c3c;#e74c3c" keyTimes="0;0.45;0.46;1" dur="6s" repeatCount="indefinite" />
  </circle>

  <!-- Packet 3 (Retry Fail) -->
  <circle cx="80" cy="110" r="5" fill="#2ecc71" opacity="0">
    <animate attributeName="cx" values="80;80;150;150" keyTimes="0;0.66;0.83;1" dur="6s" repeatCount="indefinite" />
    <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.66;0.67;0.82;0.83;1" dur="6s" repeatCount="indefinite" />
    <animate attributeName="fill" values="#2ecc71;#2ecc71;#e74c3c;#e74c3c" keyTimes="0;0.78;0.79;1" dur="6s" repeatCount="indefinite" />
  </circle>

  <!-- Timeout Alert -->
  <text x="50" y="160" text-anchor="middle" fill="#e74c3c" font-size="10" opacity="0">
    ⏱️ Timeout
    <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.5;0.55;0.9;1" dur="6s" repeatCount="indefinite" />
  </text>

</svg>
<p style="font-size: 0.5em;">Resiliencia: Baja 🔴</p>
</div>

<!-- Monolito Modular -->
<div style="text-align: center; width: 45%;">
<h4>Monolito Modular</h4>
<p style="font-size: 0.5em; color: #2ecc71;">Fiabilidad en Memoria<br/>(Sin Latencia de Red)</p>
<svg width="350" height="250" viewBox="0 0 350 250" xmlns="http://www.w3.org/2000/svg">
  <!-- Monolith Container -->
  <rect x="40" y="40" width="270" height="140" fill="none" stroke="#2ecc71" stroke-width="2" rx="5" />
  <text x="175" y="30" text-anchor="middle" fill="#2ecc71" font-size="10">Monolith Process</text>

  <!-- Mod A -->
  <rect x="60" y="80" width="60" height="60" fill="#27ae60" rx="2" opacity="0.8" />
  <text x="90" y="115" text-anchor="middle" fill="white" font-size="10">Mod A</text>

  <!-- Mod B -->
  <rect x="230" y="80" width="60" height="60" fill="#27ae60" rx="2" opacity="0.8" />
  <text x="260" y="115" text-anchor="middle" fill="white" font-size="10">Mod B</text>

  <!-- Direct Connection -->
  <line x1="120" y1="110" x2="230" y2="110" stroke="#ecf0f1" stroke-width="4" />
  <text x="175" y="100" text-anchor="middle" fill="#ecf0f1" font-size="8">In-Memory</text>

  <!-- Fast Packets -->
  <circle cx="120" cy="110" r="4" fill="#f1c40f">
    <animate attributeName="cx" values="120;230" dur="0.8s" repeatCount="indefinite" />
  </circle>
  
  <!-- Another packet offset -->
  <circle cx="120" cy="110" r="4" fill="#f1c40f">
    <animate attributeName="cx" values="120;230" dur="0.8s" begin="0.4s" repeatCount="indefinite" />
  </circle>

  <!-- Reliability Badge -->
  <text x="175" y="160" text-anchor="middle" fill="#2ecc71" font-size="10">
    ✅ 100% Success
  </text>

</svg>
<p style="font-size: 0.5em;">Resiliencia: Máxima 🟢</p>
</div>

</div>

Note:
La red es el enemigo numero uno de los sistemas distribuidos.
A la izquierda ven lo que pasa en microservicios: paquetes que se pierden, timeouts, retries...
Cada llamada entre servicios puede fallar. Y tienen que manejar esos fallos con circuit breakers, retries, etc.
A la derecha: en un monolito, las llamadas son en memoria. NO HAY RED entre módulos.
Es imposible que una llamada de función falle por "timeout de red". Simplemente funciona.
Menos código de manejo de errores = menos bugs = más tiempo para features.

----

## Mantenibilidad

<div style="display: flex; justify-content: space-around; align-items: center;">

<!-- Microservicios: Duplicación -->
<div style="text-align: center; width: 45%;">
<h4>Microservicios</h4>
<svg width="350" height="250" viewBox="0 0 350 250">
  <!-- Background -->
  <rect x="10" y="10" width="330" height="230" rx="10" fill="#2c3e50" opacity="0.5" />
  
  <!-- Service 1 -->
  <rect x="30" y="30" width="80" height="100" rx="5" fill="#e74c3c" opacity="0.8" />
  <text x="70" y="50" text-anchor="middle" fill="white" font-size="10">Svc A</text>
  <!-- Utils Copy 1 -->
  <rect x="40" y="70" width="60" height="40" rx="2" fill="#c0392b" stroke="white" stroke-width="1" />
  <text x="70" y="95" text-anchor="middle" fill="white" font-size="8">Auth Lib</text>

  <!-- Service 2 -->
  <rect x="135" y="30" width="80" height="100" rx="5" fill="#e74c3c" opacity="0.8" />
  <text x="175" y="50" text-anchor="middle" fill="white" font-size="10">Svc B</text>
  <!-- Utils Copy 2 -->
  <rect x="145" y="70" width="60" height="40" rx="2" fill="#c0392b" stroke="white" stroke-width="1" />
  <text x="175" y="95" text-anchor="middle" fill="white" font-size="8">Auth Lib</text>

  <!-- Service 3 -->
  <rect x="240" y="30" width="80" height="100" rx="5" fill="#e74c3c" opacity="0.8" />
  <text x="280" y="50" text-anchor="middle" fill="white" font-size="10">Svc C</text>
  <!-- Utils Copy 3 -->
  <rect x="250" y="70" width="60" height="40" rx="2" fill="#c0392b" stroke="white" stroke-width="1" />
  <text x="280" y="95" text-anchor="middle" fill="white" font-size="8">Auth Lib</text>

  <!-- Update Animation: A bug fix needs to be applied 3 times -->
  <circle cx="70" cy="90" r="5" fill="yellow" opacity="0">
    <animate attributeName="opacity" values="0;1;0" dur="3s" begin="0s" repeatCount="indefinite" />
  </circle>
  <circle cx="175" cy="90" r="5" fill="yellow" opacity="0">
    <animate attributeName="opacity" values="0;1;0" dur="3s" begin="1s" repeatCount="indefinite" />
  </circle>
  <circle cx="280" cy="90" r="5" fill="yellow" opacity="0">
    <animate attributeName="opacity" values="0;1;0" dur="3s" begin="2s" repeatCount="indefinite" />
  </circle>

  <text x="175" y="180" text-anchor="middle" fill="#e74c3c" font-size="14">
    ⚠️ Duplicación de Código
  </text>
  <text x="175" y="200" text-anchor="middle" fill="#bdc3c7" font-size="10">
    Actualizar una lib requiere 3 deploys
  </text>
</svg>
<p style="font-size: 0.5em;">Mantenibilidad: Baja 🔴</p>
</div>

<!-- Monolito: Reutilización -->
<div style="text-align: center; width: 45%;">
<h4>Monolito Modular</h4>
<svg width="350" height="250" viewBox="0 0 350 250">
  
  <rect x="10" y="10" width="330" height="230" rx="10" fill="#2c3e50" opacity="0.5" />

  <!-- Module 1 -->
  <rect x="30" y="30" width="80" height="80" rx="5" fill="#3498db" opacity="0.8" />
  <text x="70" y="50" text-anchor="middle" fill="white" font-size="10">Mod A</text>

  <!-- Module 2 -->
  <rect x="135" y="30" width="80" height="80" rx="5" fill="#3498db" opacity="0.8" />
  <text x="175" y="50" text-anchor="middle" fill="white" font-size="10">Mod B</text>

  <!-- Module 3 -->
  <rect x="240" y="30" width="80" height="80" rx="5" fill="#3498db" opacity="0.8" />
  <text x="280" y="50" text-anchor="middle" fill="white" font-size="10">Mod C</text>

  <!-- Shared Lib -->
  <rect x="100" y="140" width="150" height="50" rx="5" fill="#2ecc71" stroke="white" stroke-width="2" />
  <text x="175" y="170" text-anchor="middle" fill="#2c3e50" font-weight="bold" font-size="12">Shared Lib (Auth)</text>

  <!-- Connections -->
  <line x1="70" y1="110" x2="120" y2="140" stroke="#ecf0f1" stroke-width="2" stroke-dasharray="5,5" />
  <line x1="175" y1="110" x2="175" y2="140" stroke="#ecf0f1" stroke-width="2" stroke-dasharray="5,5" />
  <line x1="280" y1="110" x2="230" y2="140" stroke="#ecf0f1" stroke-width="2" stroke-dasharray="5,5" />

  <!-- Update Animation: One fix updates everyone -->
  <circle cx="175" cy="165" r="0" fill="white" opacity="0.8">
    <animate attributeName="r" values="0;100" dur="2s" repeatCount="indefinite" />
    <animate attributeName="opacity" values="0.8;0" dur="2s" repeatCount="indefinite" />
  </circle>

  <text x="175" y="210" text-anchor="middle" fill="#2ecc71" font-size="14">
    ✅ DRY (Don't Repeat Yourself)
  </text>
  <text x="175" y="230" text-anchor="middle" fill="#bdc3c7" font-size="10">
    1 Cambio = Actualización Global
  </text>
</svg>
<p style="font-size: 0.5em;">Mantenibilidad: Alta 🟢</p>
</div>

</div>

Note:
Último punto de comparación: mantenibilidad del código a largo plazo.
A la izquierda: en microservicios, si todos necesitan autenticación, cada servicio tiene su copia del código de auth.
Si encuentras un bug de seguridad, tienes que arreglarlo en CADA servicio. Son 3 PRs, 3 reviews, 3 deploys.
A la derecha: monorepo. UNA librería compartida. UN fix. TODOS los módulos lo tienen automáticamente.
Esto aplica a todo: validaciones, utilidades, tipos compartidos...
El principio DRY (Don't Repeat Yourself) es mucho más fácil de cumplir en un monorepo.

---
