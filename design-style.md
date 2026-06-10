# Project Rebuild — Design Style Guide

> Read this before writing any frontend code for this product. Every UI decision should be consistent with the design language established in `index.html`.

---

## Concept & Aesthetic Direction

**Identity:** Military field notebook meets performance tracker. Dark, earthy, precise. Feels like something a serious athlete would use — not a wellness app, not a SaaS dashboard.

**Tone:** Focused. Utilitarian with personality. Information-dense but never cluttered. The UI should feel like it was built with discipline, the same discipline it asks of the user.

**The one thing someone remembers:** Electric lime on deep olive-black. That contrast is the entire visual identity.

---

## Typography

Two fonts only. Never add a third.

### Display — Bricolage Grotesque
```
font-family: "Bricolage Grotesque", sans-serif;
```
- Used for: headings, body text, exercise names, descriptions, all prose
- Weights: 400 (body), 600 (sub-headings), 800 (display/hero)
- Tracking: tight on large headings (-1.2px at 34px), default or slight positive on body
- Google Fonts import: `family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,800`

### Mono — JetBrains Mono
```
font-family: "JetBrains Mono", monospace;
```
- Used for: ALL UI chrome — labels, badges, numbers, tags, tabs, progress text, counters, dates, stats
- Weights: 500 (labels), 700 (bold labels, counts)
- Always uppercase when used as a label. Letter-spacing: 1–2px.
- Google Fonts import: `family=JetBrains+Mono:wght@500;700`

### Type Scale
| Role | Size | Weight | Font | Notes |
|---|---|---|---|---|
| Page hero | 34px | 800 | Bricolage | -1.2px tracking, line-height 1.02 |
| Section hero (card h3) | 30px | 800 | Bricolage | -0.8px tracking |
| Exercise name | 17px | 800 | Bricolage | -0.3px tracking |
| Body / cues | 13–13.5px | 400 | Bricolage | line-height 1.5–1.55 |
| Section label (h2) | 13px | 800 | Mono | uppercase, 2px letter-spacing |
| Badge / tag | 10–11px | 700 | Mono | uppercase, 1.5–3px letter-spacing |
| Progress / stats | 11px | 600 | Mono | uppercase, 0.5px letter-spacing |
| Nav tabs | 10px | 600 | Mono | uppercase, 1px letter-spacing |

---

## Color Palette

CSS variables — use these exclusively, never hardcode hex values in components.

```css
:root {
  /* Backgrounds — all warm olive-black, not neutral grey */
  --bg:    #0e0f0c;  /* Page background */
  --panel: #16180f;  /* Panel layer */
  --card:  #181a14;  /* Card surface */
  --card2: #1f2218;  /* Recessed card area, input bg */
  --line:  #2a2e20;  /* Borders and dividers */

  /* Text */
  --ink: #edf0e4;   /* Primary text — warm off-white, not pure white */
  --mut: #9aa18a;   /* Secondary/muted text */
  --dim: #5c6350;   /* Tertiary/disabled text */

  /* Accent — the hero color */
  --lime:     #c8f04b;              /* Electric lime — CTAs, active states, key numbers */
  --lime-dim: rgba(200,240,75,.14); /* Lime tint for badge backgrounds */

  /* Semantic colors */
  --amber:  #f0a84b;  /* Warnings, "wrong if" cues */
  --rose:   #f06a6a;  /* Errors, dangerous state */
  --sky:    #6ac8f0;  /* Breathing cues, informational */
  --violet: #b59af0;  /* Athlete/rest day, secondary accent */
}
```

### Color Rules
- **Lime is sacred.** Use it for: active states, progress fills, exercise numbers, CTA buttons, active tab indicator, hero tags. Never dilute it with competing accents.
- **One accent per context.** Don't mix lime and sky in the same component. Semantic colors (amber, sky) are for specific cue types only.
- **Backgrounds stack.** `--bg` → `--panel` → `--card` → `--card2` is the layering order. Never skip layers.
- **Never use pure black or pure white.** Always use the palette variables.

---

## Background & Atmosphere

The page background is never a flat solid. It always has two layers:

```css
background-color: var(--bg);
background-image:
  radial-gradient(ellipse 80% 40% at 50% -5%, rgba(200,240,75,.07), transparent),
  repeating-linear-gradient(
    0deg, transparent, transparent 3px,
    rgba(255,255,255,.006) 3px, rgba(255,255,255,.006) 4px
  );
```

- The lime radial at top creates a subtle atmospheric glow
- The repeating gradient adds a faint scanline texture — barely visible but adds depth
- Hero cards get an additional radial lime glow in the top-right corner

---

## Iconography

**No external icon libraries.** Icons are an inline SVG sprite at the top of the HTML body:

```html
<svg style="display:none" xmlns="http://www.w3.org/2000/svg">
  <symbol id="i-name" viewBox="0 0 24 24">...</symbol>
</svg>
```

Used with:
```html
<svg class="ic"><use href="#i-name"/></svg>
```

The `.ic` utility class:
```css
.ic {
  width: 1em; height: 1em;
  flex-shrink: 0;
  display: inline-block;
  vertical-align: -.12em;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  overflow: hidden;
}
```

Icons inherit color from `currentColor`. Change icon color by changing the parent's `color` property — never set fill/stroke directly on icon elements.

---

## Component Patterns

### Cards
```css
.card {
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 18px; /* --r */
  overflow: hidden;
}
```
- Corner radius: **18px** consistently
- Border: always 1px `var(--line)` — never thicker, never 0
- Hover/active: use `opacity` or subtle `transform` — never color fills

### Exercise Card Number Badge
```css
.num {
  position: absolute; left: 12px; top: 12px;
  background: rgba(14,15,12,.8);
  backdrop-filter: blur(6px);
  font: 700 11px var(--mono);
  color: var(--lime);
  padding: 4px 9px;
  border-radius: 8px;
  letter-spacing: 1px;
}
```
Numbers are zero-padded: `01`, `02`, etc.

### Dose / Metric Badge
```css
.cdose {
  font: 700 11px var(--mono);
  color: var(--lime);
  background: var(--lime-dim);
  padding: 5px 9px;
  border-radius: 8px;
  letter-spacing: .3px;
}
```

### Cue Rows (inside exercise cards)
Three types — each with a semantic icon color:
- **Breath cue** → `--sky` icon
- **Wrong-if cue** → `--amber` icon
- No background fill on cue rows — just flex with gap

### Numbered List Rows (morning flow, rules)
```css
.row { display: flex; gap: 13px; background: var(--card); border: 1px solid var(--line); border-radius: 14px; padding: 14px; }
.row .n { min-width: 28px; height: 28px; border-radius: 9px; background: var(--card2); color: var(--lime); font: 700 11px var(--mono); }
```
Numbers are zero-padded mono: `01`, `02`, etc.

### Day Chips (selector)
```css
.daychip { border-radius: 12px; background: var(--card); border: 1px solid var(--line); }
.daychip.sel { background: var(--lime); border-color: var(--lime); transform: translateY(-2px); }
.daychip.sel .dl { color: #1a1d10; } /* Dark text on lime */
.daychip.istoday:not(.sel) { border-color: var(--lime); } /* Outlined = today, not selected */
```
Selected chips lift 2px — the only motion on the day bar.

### Progress Bar
```css
.progress { height: 7px; background: #10120c; border-radius: 99px; overflow: hidden; }
.progress div { background: var(--lime); border-radius: 99px; transition: width .4s ease; }
```
Solid lime fill, no gradient. Progress track is slightly darker than `--bg`.

### Done State
Cards and buttons in done state use `opacity: .5` — fading rather than a color swap. Done button: lime-dim background.

### Warning / Note Callout
```css
.note {
  background: rgba(240,168,75,.07);
  border: 1px solid rgba(240,168,75,.22);
  border-radius: 13px;
  padding: 13px 14px;
  color: #dcc096;
}
```
Icon: `--amber`. Use for tips, deload reminders, science rationale — not errors.

### Bottom Navigation
```css
nav {
  background: rgba(14,15,12,.94);
  backdrop-filter: blur(16px);
  border-top: 1px solid var(--line);
}
.tab { font: 600 10px var(--mono); letter-spacing: 1px; text-transform: uppercase; color: var(--dim); }
.tab.active { color: var(--lime); }
```
No background pill or underline indicator — just color change to lime.

### Hero Card
```css
.hero {
  border-radius: 18px;
  padding: 20px;
  background: linear-gradient(140deg, var(--card2), var(--card));
  border: 1px solid var(--line);
  position: relative;
  overflow: hidden;
}
.hero::after {
  content: "";
  position: absolute; right: -30px; top: -30px;
  width: 140px; height: 140px; border-radius: 99px;
  background: radial-gradient(circle, var(--lime-dim), transparent 70%);
}
```

---

## Layout

- Max content width: **520px**, centered, 16px horizontal padding
- Page sections separated by `margin-top: 24px` on `h2` labels
- Component spacing: `margin-bottom: 9–14px` between card-type items
- Bottom padding on body: `88px` (nav height + safe area)
- Nav height: ~60–72px depending on safe area

---

## Motion

Minimal and purposeful:

| Interaction | Effect |
|---|---|
| Page / tab switch | `opacity: 0 → 1` + `translateY(10px → 0)`, 300ms `cubic-bezier(.2,.8,.3,1)` |
| Progress bar fill | `width` transition, 400ms `ease` |
| Day chip select | `translateY(-2px)`, 150ms |
| Card done state | `opacity: .5`, 200ms |

No other animations. No hover transforms on cards. No bounces or springs. Motion should feel like a field instrument, not a consumer app.

---

## Image Handling

Exercise images are loaded from `free-exercise-db` (public domain) via raw GitHub URLs:
```js
const IMG = n => `https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/${n}/0.jpg`;
```

Images:
- `object-fit: cover`, `object-position: center 25%`
- `filter: saturate(.85) contrast(1.02)` — desaturated slightly to stay in palette
- `height: 150px` on card image box
- Fallback on `onerror`: replace with the inline `#i-bell` dumbbell icon in `.ph` wrapper

---

## Writing Style (in-app copy)

- Direct. Never corporate. Speak like a knowledgeable training partner.
- Bold key phrases inline: `<b>exhale as you press up</b>`
- "Wrong if" framing for form cues — not "make sure to", not "remember to"
- Numbers spelled as digits with units: `4 x 8-15`, `3s down`, `45 sec/side`
- Progress text in monospace uppercase: `SESSION COMPLETE — EAT, SLEEP, GROW`

---

## What to Never Do

- Never use Inter, Roboto, system-ui, or any generic sans-serif
- Never use pure blue, purple gradients, or teal as primary accent
- Never use white or near-white backgrounds
- Never use emoji
- Never load Lucide, FontAwesome, or any icon CDN — inline SVG sprite only
- Never use more than two fonts
- Never add drop shadows on cards (border + dark bg is enough)
- Never use rounded pill buttons for primary actions — rectangular with radius 11px
- Never show tooltips or popovers — all information is inline
