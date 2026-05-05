# Agustin Muzi - Portfolio Web

Personal portfolio and CV site for Agustin Muzi, AI Automation Engineer. Single-page, scroll-based layout with a retro editorial aesthetic.

---

## Stack

- **HTML5** - semantic structure
- **CSS3** - custom properties, grid, no frameworks
- **JavaScript (vanilla)** - EN/ES language switch
- **Google Fonts** - Playfair Display + Space Mono

No build step. No dependencies. Open `index.html` and it works.

---

## Structure

```
portfolio_web/
├── index.html        — single page
├── css/
│   └── style.css     — all styles, CSS variables, dark mode
├── js/
│   └── main.js       — EN/ES language switch
└── assets/
    └── cv.pdf        — downloadable CV
```

---

## Sections

| # | Section | Notes |
|---|---|---|
| — | Navbar | Sticky. Logo, nav links, EN·ES switch, Hire me CTA |
| — | Hero | Two-column: headline + CTAs / bio card (orange bg) |
| — | Stats bar | 4+ services · 4 projects · ES/EN bilingual |
| 01 | Projects | Bento grid - 4 project cards with status tags |
| 03 | Education & Stack | Training entries, tech stack pills, soft skills |
| 04 | Contact | Headline + email / LinkedIn / GitHub links |
| — | Footer | Dark background, copyright, title |

---

## Design system

### Color palette

| Variable | Value | Use |
|---|---|---|
| `--bg` | `#F2EBD9` | Page background (cream) |
| `--ink` | `#1A1408` | Primary text and borders |
| `--orange` | `#E85D20` | Accent - CTAs, highlights |
| `--muted` | `#8A7A60` | Secondary text |
| `--light` | `#E0D8C4` | Soft internal borders |
| `--orange-soft` | `#FEF0E8` | Learning pill background |
| `--surface-dark` | `#1A1408` | Footer and dark bento card |

### Typography

- **Headlines:** Playfair Display 700, italic for accented words
- **UI / body:** Space Mono 400 / 700
- Minimum size: 10px

### Principles

- `2px solid` borders on all containers - no border-radius
- No shadows, no gradients, no complex animations
- Rigid grid with visible dividers - retro editorial / newspaper style

---

## Dark mode

Automatic via `prefers-color-scheme: dark`. No manual toggle.

| Token | Light | Dark |
|---|---|---|
| `--bg` | `#F2EBD9` | `#1A1408` |
| `--ink` | `#1A1408` | `#F2EBD9` |
| `--border-color` | `#1A1408` | `#3A3020` |
| `--surface-dark` | `#1A1408` | `#0E0A04` |

Elements on the orange column (hero-right) keep cream colors fixed and do not flip with the theme.

---

## Bilingual (EN / ES)

The switch sits in the navbar, left of the logo. Clicking it swaps all text on the page without a reload.

**How it works:**

- Every translatable element carries `data-en` and `data-es` attributes
- Elements with inner HTML (e.g. `<em>` tags) also carry `data-html="true"`
- `main.js` reads the active language and sets `textContent` or `innerHTML` accordingly

---

## Project cards

| Project | Status | Background |
|---|---|---|
| WhatsApp Lead Qualifier | In development | Orange |
| Property Listing Generator | Coming soon | Dark |
| Agenda Concierge | Coming soon | Cream |
| Club Management App | In development | Cream |

Cards use a 3-column bento grid. The featured card spans 2 columns.

---

## Responsive

Breakpoint at `768px`:

- Navbar: links hidden, EN·ES switch and Hire me CTA remain
- Hero: stacks to single column
- Bento grid: stacks to single column
- Education and Contact: stack to single column

---

## Local development

No build step required.

```bash
git clone https://github.com/AgusMuzi79/portfolio_web.git
cd portfolio_web

# Open with any static server
npx serve .
# or just open index.html directly
```

---

## Deploy

Hosted on Vercel. Push to `main` and the site updates automatically.

---

*Built by Agustin Muzi - 2026*
