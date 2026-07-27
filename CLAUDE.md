# CLAUDE.md — Portfolio Web Agustin Muzi

## Objetivo del proyecto

Portfolio web de una sola pagina (single-page, scroll continuo) que funciona simultaneamente como portfolio de proyectos y CV profesional. Objetivo principal: conseguir empleo como AI Automation Engineer. Audiencia secundaria: clientes freelance.

Deploy: Vercel — rama `main` (auto-deploy en cada push)

---

## Stack tecnico

- HTML5 semantico
- CSS3 puro — variables CSS, grid, sin frameworks
- JavaScript vanilla — switch de idioma EN/ES, modal de detalle de proyecto, terminal interactiva de contacto
- Google Fonts: DM Serif Display + Space Grotesk + Space Mono
- Sin build step, sin dependencias, sin bundler

---

## Origen del diseño

El diseño visual fue importado desde un proyecto de Claude Design (`Portfolio.dc.html`, design system "NoisyDev" — paleta EVA-01 violeta/verde) y reimplementado a mano en HTML/CSS/JS vanilla, sin el runtime `x-dc`/React del prototipo. El wordmark de marca ("NoisyDev") fue reemplazado por el logo del sitio (`agus`+`mu`+`zi`+cursor). Los tokens de color, tipografia, espaciado y efectos, junto con los componentes (terminal, badge, tag, button, card, hazard bar), se tradujeron 1:1 a CSS plano.

---

## Estructura de archivos

```
portfolio_web/
├── index.html        — pagina unica, toda la estructura HTML
├── css/
│   └── style.css     — tokens, componentes, layout de secciones, dark/light
├── js/
│   └── main.js       — switch EN/ES, modal de proyecto, terminal de contacto
├── assets/
│   ├── cv.pdf        — CV descargable (pendiente agregar)
│   └── favicon.svg   — favicon "am_" (mismo estilo que el logo del nav/footer)
├── CLAUDE.md         — este archivo
└── README.md         — documentacion publica del repo
```

---

## Paleta de colores (variables CSS)

Definidas en `:root` en `css/style.css`. Dark es el tema por defecto (no hay toggle manual — sigue `prefers-color-scheme` del SO, igual que antes).

| Variable | Dark (default) | Light (`prefers-color-scheme: light`) | Uso |
|---|---|---|---|
| `--bg` | `#16131D` (ink-950) | `#F3EFE6` (paper-100) | Fondo general |
| `--surface` | `#221D2E` (ink-850) | `#FFFFFF` | Cards, paneles |
| `--text` | `#F1EFF6` (ink-50) | `#1E1A26` (paper-ink) | Texto principal |
| `--text-muted` | `#A59CC0` (ink-300) | `#5A536E` | Texto secundario |
| `--text-subtle` | `#8B83A6` (ink-400) | `#837C95` | Labels, metadata |
| `--primary` | `#9B7CF0` (violet-400) | `#6E54B5` (violet-600) | Acento — CTAs, links, headlines |
| `--accent` | `#9FE870` (green-400) | `#5FA83C` (green-600) | Estados positivos, disponibilidad |
| `--warning` | `#F5D020` (hazard-400) | `#C2871B` (mustard-500) | Badge "coming soon", hazard bar |
| `--danger` | `#E5604A` (coral-400) | `#CE4A35` (coral-500) | Estados de error (sin uso actual) |
| `--border` / `--border-strong` | `rgba(236,233,242,.12/.22)` | `rgba(30,26,38,.14/.26)` | Bordes de cards, inputs, nav |

La terminal (`.terminal`) es SIEMPRE dark chrome (ink-950/ink-850) en ambos temas — es la "voz" de marca y no debe invertirse.

---

## Tipografia

| Fuente | Uso | Pesos |
|---|---|---|
| DM Serif Display | Headlines (h1/h2), numeros de stats | 400, 400 italic |
| Space Grotesk | Body, botones, UI general | 400, 500, 600, 700 |
| Space Mono | Kickers, labels, tags, terminal, nav links | 400, 700 |

Reglas:
- Palabras clave en headlines van en `<em>` — italic + color `--primary`
- El punto final de titulares clave usa `<span class="accent-dot">` — color `--accent`

---

## Sistema de diseño — componentes (`css/style.css`)

- `.logo` — wordmark del sitio, con `.logo__accent` (italic, primary) y `.logo__cursor` (blink, accent)
- `.badge` / `.badge--green` / `.badge--hazard` — pill de estado (dot opcional)
- `.tag` / `.tag--plain` — chip mono, `::before` agrega `#` salvo `--plain`
- `.btn` / `.btn--primary` / `.btn--secondary` / `.btn--sm` — botones
- `.icon-link` — link con icono (nav github, footer)
- `.card` / `.card--interactive` / `.card--accent-{violet,green,hazard}` — superficie con accent bar superior
- `.terminal` — chrome de terminal (dots, title bar, body, caret parpadeante), siempre dark
- `.hazard-bar` / `.hazard-bar--violet` — separador con rayas diagonales (`--hazard-stripes`)

Radios, sombras y glows SI se usan (a diferencia del diseño anterior retro-editorial): `--radius-md/lg`, `--shadow-md/lg`, `--glow-violet/green` en hover de botones y cards.

---

## Sistema bilingue (EN / ES)

El switch esta en el navbar, a la derecha (antes del icono de GitHub). Clase `.nav-lang-btn` con `data-lang="en"` / `data-lang="es"`.

### Implementacion en HTML

Texto plano — usar `data-en` y `data-es`:
```html
<span data-en="Projects" data-es="Proyectos">Projects</span>
```

Con HTML interno (`<em>`, `<span class="accent-dot">`) — agregar `data-html="true"` y HTML-escapar comillas dentro del atributo (`&quot;`):
```html
<h1 data-html="true"
    data-en="Build the AI layer between your tools and your <em>goals</em>."
    data-es="Construyo la capa de IA entre tus herramientas y tus <em>objetivos</em>.">
  contenido inicial en EN
</h1>
```

### Implementacion en JS (`js/main.js`)

- Elementos sin `data-html`: usa `textContent`
- Elementos con `data-html`: usa `innerHTML`
- Variable global `currentLang` — la usan tambien el modal de proyecto y la terminal de contacto para renderizar contenido dinamico
- Al cambiar de idioma se llama `window.__reRenderModal()` si el modal de proyecto esta abierto, para que su contenido siga al switch

### Contenido dinamico bilingue (no usa data-en/data-es directo)

- **Project cards** (`.project-card`): `data-name-en/es`, `data-long-en/es`, `data-bullets-en/es` (separadas por `|`), `data-stack` (separadas por `,`), `data-status` (`live`/`dev`/`soon`), `data-url` opcional (si el proyecto tiene demo publica, el modal muestra un boton "Visit site") — leidos por JS al abrir el modal
- **Terminal de contacto**: respuestas de los comandos (`whoami`, `contact --email/--linkedin/--github`, `open cv`) estan hardcodeadas en el objeto `RESPONSES` de `main.js`, no en el HTML

---

## Estado actual de cada seccion

### Nav — completo
`.logo` | `.nav-links` (Projects/Education/Contact) | badge de disponibilidad | lang switch | icon-link GitHub | botón "Hire me" → `#contact`

### Hero — completo
2 columnas: headline + CTAs + tags (izquierda) / terminal `whoami` (derecha). Blobs decorativos absolutos. Hazard bar amarilla al pie de seccion.

### About (`#about`) — completo
Bio + pill de disponibilidad (izquierda) / grid 2x2 de stats: ubicacion, proyectos, idiomas, estado (derecha).

### Projects (`01 // projects`) — completo
Grid de 2 columnas, 2 cards interactivas — solo proyectos reales, sin placeholders ficticios:
- **Uncas Tenis Tour** — plataforma de inscripcion y pago para un torneo de tenis, en produccion (Next.js + Vercel). Repo privado; el card linkea al sitio en vivo (`data-url`), el modal muestra boton "Visit site".
- **UNCAS Club App** — app de gestion interna para un club de rugby (60+ staff, 1000+ socios, 17 equipos): credencial QR rotativa, asistencia y lesiones (offline), cobro de cuotas con MercadoPago. React Native + Next.js + Supabase. Repo privado del club, sin link publico — solo case study en el modal.

Click o Enter/Espacio (con foco) abre el modal de detalle (`#project-modal`) con icono, badge, descripcion larga, bullets, stack tags y (si aplica) boton "Visit site".

### Education & Stack (`02 // education & stack`) — completo
Columna izquierda: lista de formacion (UNICEN, UTN, BIG School, Udemy x2) + boton descargar CV. Columna derecha: panel de tech stack con barras de progreso, panel de idiomas + soft skills tags.

### Contact (`03 // contact`) — completo
Headline + CTA "Get in touch" (izquierda) / terminal interactiva (derecha): botones `whoami`, `contact --email/--linkedin/--github`, `open cv` que imprimen respuestas en el log de la terminal.

### Footer — completo
Logo + copyright (izquierda) / icon-links email, linkedin, github (derecha). Precedido por hazard bar violeta.

---

## Convenciones de codigo

- Radios y sombras SI se usan (a diferencia del diseño anterior) — seguir los tokens `--radius-*` / `--shadow-*` / `--glow-*`, no hardcodear valores
- Un solo breakpoint responsive: `max-width: 768px`
- Commits en ingles con prefijo convencional: `feat:`, `fix:`, `docs:`, `style:`
- No agregar comentarios al HTML/CSS/JS salvo que el WHY sea no obvio
- Iconos: SVG inline en el HTML (paths tomados 1:1 del prototipo de Claude Design), no icon fonts ni librerias

---

## Lo que NO existe (por diseno)

- Blog o seccion de articulos
- Foto de perfil
- Seccion de servicios (pendiente para cuando esten definidos)
- Toggle manual de dark mode (es automatico por sistema operativo)
- Frameworks CSS o JS de ningun tipo
