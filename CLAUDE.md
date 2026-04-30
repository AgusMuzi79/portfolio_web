# CLAUDE.md — Portfolio Web Agustin Muzi

## Objetivo del proyecto

Portfolio web de una sola pagina (single-page, scroll continuo) que funciona simultaneamente como portfolio de proyectos y CV profesional. Objetivo principal: conseguir empleo como AI Automation Engineer. Audiencia secundaria: clientes freelance.

Deploy: GitHub Pages desde la rama `main` — https://agusmazi79.github.io/portfolio_web

---

## Stack tecnico

- HTML5 semantico
- CSS3 puro — variables CSS, grid, sin frameworks
- JavaScript vanilla — switch de idioma EN/ES unicamente
- Google Fonts: Playfair Display + Space Mono
- Sin build step, sin dependencias, sin bundler

---

## Estructura de archivos

```
portfolio_web/
├── index.html        — pagina unica, toda la estructura HTML
├── css/
│   └── style.css     — todos los estilos (variables, reset, componentes, dark mode)
├── js/
│   └── main.js       — switch EN/ES unicamente
├── assets/
│   └── cv.pdf        — CV descargable (pendiente agregar)
├── CLAUDE.md         — este archivo
└── README.md         — documentacion publica del repo
```

---

## Paleta de colores (variables CSS)

Definidas en `:root` en `css/style.css`:

| Variable | Valor | Uso |
|---|---|---|
| `--bg` | `#F2EBD9` | Fondo general (crema) |
| `--ink` | `#1A1408` | Texto principal |
| `--orange` | `#E85D20` | Acento — CTAs, highlights, numeros |
| `--muted` | `#8A7A60` | Texto secundario, labels |
| `--light` | `#E0D8C4` | Bordes internos suaves |
| `--orange-soft` | `#FEF0E8` | Fondo pills de aprendizaje |
| `--border-color` | `#1A1408` | Color del borde (variable para dark mode) |
| `--border` | `2px solid var(--border-color)` | Borde estandar — SIEMPRE usar esta variable |
| `--text-sec` | `#5A4E38` | Texto secundario sobre superficies claras |
| `--subtle` | `#C8BC9E` | Labels muy discretos — fechas, plataformas |
| `--surface-dark` | `#1A1408` | Superficies siempre oscuras (footer, bento-dark) |

### Dark mode (prefers-color-scheme: dark) — sobreescrituras

| Variable | Valor dark |
|---|---|
| `--bg` | `#1A1408` |
| `--ink` | `#F2EBD9` |
| `--muted` | `#A89880` |
| `--light` | `#3A3020` |
| `--orange-soft` | `#2A1208` |
| `--border-color` | `#3A3020` |
| `--text-sec` | `#A89880` |
| `--subtle` | `#6A5E48` |
| `--surface-dark` | `#0E0A04` |

**Regla critica:** elementos dentro de `.hero-right` (columna naranja) tienen colores hardcodeados en cream (`#F2EBD9`) porque no deben flipear con el tema. Actualmente: `.hero-r-name`, `.avail-badge`. Si se agregan mas elementos a esa columna, aplicar la misma logica.

---

## Tipografia

| Fuente | Uso | Pesos |
|---|---|---|
| Playfair Display | Headlines, numeros destacados, footer-right | 700, 700 italic |
| Space Mono | Todo el resto: body, UI, labels, buttons, pills | 400, 700 |

Reglas:
- Tamano minimo: 10px
- Palabras clave en headlines van en `<em>` — italic + color naranja
- En la columna naranja del hero, el `<em>` va en cream (no naranja) para contraste

---

## Principios de diseno

- Bordes: siempre `var(--border)` = `2px solid` — NO border-radius en ningun lugar
- Sin sombras, sin gradientes, sin transiciones complejas
- Grid rigido con lineas divisorias entre celdas — estilo periodico/retro editorial
- Espaciado: padding estandar de secciones = `1.5rem`, contenido interno = `1.25rem`
- Flechas decorativas: caracter unicode `->` en naranja

---

## Sistema bilingue (EN / ES)

El switch esta en el navbar, a la izquierda del logo. Clase `.nav-lang-btn` con `data-lang="en"` y `data-lang="es"`.

### Implementacion en HTML

Texto plano — usar `data-en` y `data-es`:
```html
<span data-en="Projects" data-es="Proyectos">Projects</span>
```

Con HTML interno (etiquetas `<em>`) — agregar `data-html="true"`:
```html
<h1 data-html="true"
    data-en="Build the AI layer between your tools and your <em>goals.</em>"
    data-es="Construyo la capa de IA entre tus herramientas y tus <em>objetivos.</em>">
  contenido inicial en EN
</h1>
```

### Implementacion en JS (`js/main.js`)

- Elementos sin `data-html`: usa `textContent`
- Elementos con `data-html="true"`: usa `innerHTML`
- El switch activa/desactiva clase `active` y actualiza `aria-pressed` en los botones `.nav-lang-btn`

---

## Estado actual de cada seccion

### Navbar — completo

Estructura: `.nav-left` (lang switch + logo) | `.nav-links` | `.nav-cta`

- Sticky con z-index 100
- Mobile: `.nav-links` se oculta, switch y CTA permanecen visibles
- Lang switch: discreto, 10px Space Mono, color `--muted`, activo en bold `--ink`

### Hero — completo

Layout: 2 columnas (`grid-template-columns: 1fr 1fr`)

- Izquierda `.hero-left`: eyebrow, h1 con `<em>` italic naranja, descripcion, botones "See projects" + "Download CV"
- Derecha `.hero-right`: fondo naranja, nombre en Playfair, titulo, bio, badge de disponibilidad con dot verde
- Headline usa `data-html="true"` para preservar el `<em>` en ambos idiomas
- En mobile: apila a una columna, `.hero-left` con `border-bottom` en lugar de `border-right`

### Stats bar — completo

3 columnas separadas por bordes: `4+ Services` | `4 Projects` | `ES/EN Bilingual`

Numeros en Playfair Display 28px naranja, labels en Space Mono 10px uppercase muted.

### Proyectos (01 // Projects) — completo

Bento grid 3 columnas, borde `var(--border)` en el contenedor, sin gap.

| Card | Columnas | Fondo | Estado |
|---|---|---|---|
| WhatsApp Lead Qualifier | span 2 (`.bento-wide`) | naranja | In development |
| Property Listing Generator | 1 col | `--surface-dark` | Coming soon |
| Agenda Concierge | 1 col | crema | Coming soon |
| Club Management App | 1 col | crema | In development |

- El borde derecho de Card 2 se elimina con `.bento-no-right` (no usar `nth-child` para esto)
- Cards 3 y 4 ocupan 2 de 3 columnas en la fila 2 — espacio vacio intencional a la derecha
- Todos los titulos tienen `data-en`/`data-es`; Card 1 tiene `data-html="true"` para el `<em>`

### Education & Stack (03 // Education & stack) — completo

Layout: 2 columnas con borde divisor.

**Columna izquierda (Training):**
- UNICEN — Tecnicatura en Desarrollo de Aplicaciones Informaticas (2023-present)
- UTN — Diplomado Python para IA (In progress)
- BIG School — Desarrollo con IA (Certified, March 2026)
- Udemy — Python Mega Course (In progress)
- Udemy — QA Testing (In progress)
- Boton "Download full CV (PDF)" con borde naranja

**Columna derecha (Tech stack):**

Tres variantes de pills:
- **Neutral** (borde `--light`): Python, Folium
- **Learning** (borde naranja, fondo `--orange-soft`): Claude API, OpenAI API, n8n, LangChain
- **Idiomas** (borde `--light`): Spanish native, English professional
- **Soft skills** (borde `--muted`): Fast learner, Problem solving, Team collaboration, Adaptability, Clear communication

La seccion se numera 03, no 02 (el 02 esta reservado para una futura seccion de Servicios).

### Contact (04 // Contact) — completo

Layout: 2 columnas con borde divisor.

- Izquierda: headline Playfair con `<em>` naranja, texto body, boton "Get in touch"
- Derecha: 3 links con plataforma (label subtle) + valor + flecha naranja
  - Email: agusmuzi79@gmail.com (email real del usuario)
  - LinkedIn: /in/agustinmuzi (placeholder — verificar URL antes de deploy)
  - GitHub: /AgusMuzi79 (handle real del usuario)

### Footer — completo

- Fondo: `var(--surface-dark)` — siempre oscuro, no flipea en dark mode
- Izquierda: "© 2026 Agustin Muzi" en `--text-sec`
- Derecha: "AI Automation Engineer" en Playfair italic `--muted`

---

## Convenciones de codigo

- Usar siempre `var(--border)` para bordes — nunca el valor hardcodeado
- Colores hardcodeados (`#F2EBD9`) solo para elementos sobre fondo naranja (`.hero-right`)
- Responsive: un solo breakpoint en `max-width: 768px`
- Commits en ingles con prefijo convencional: `feat:`, `fix:`, `docs:`, `style:`
- No agregar comentarios al HTML/CSS salvo que el WHY sea no obvio

---

## Lo que NO existe (por diseno)

- Blog o seccion de articulos
- Foto de perfil
- Seccion de servicios (pendiente para cuando esten definidos)
- Animaciones complejas o efectos de scroll
- Toggle manual de dark mode (es automatico por sistema operativo)
- Frameworks CSS o JS de ningun tipo
