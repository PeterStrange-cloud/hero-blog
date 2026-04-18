# Design Brief: HERO BLOG

## Tone
Editorial, refined, purposeful. Premium digital magazine aesthetic — sophisticated typography hierarchy, generous whitespace, minimal ornamentation.

## Differentiation
Strong cover images as primary visual language. Bold warm gold accent (0.64 L, 45° hue) for HERO payment CTAs. Minimal border-radius (6px) conveys restraint and intentionality.

## Color Palette (Dark Mode — Primary)

| Token | OKLCH | Purpose |
|-------|-------|---------|
| `--background` | `0.12 0 0` | Deep charcoal, near-black page background |
| `--foreground` | `0.96 0 0` | Near-white primary text, AAA contrast |
| `--card` | `0.16 0 0` | Elevated surface for cards, headers, modals |
| `--primary` / `--accent` | `0.64 0.18 45` | Warm gold, HERO token CTAs, active states |
| `--muted` | `0.24 0 0` | Neutral gray for dates, metadata, secondary text |
| `--destructive` | `0.55 0.22 25` | Warm red for delete/destructive actions |
| `--border` | `0.22 0 0` | Subtle divider between surfaces |
| `--input` | `0.22 0 0` | Form input background |

## Typography

| Tier | Font | Scale | Usage |
|------|------|-------|-------|
| Display | Fraunces (serif) | 4xl, bold | Article titles, hero headlines |
| Subheading | Fraunces (serif) | 2xl, bold | Section headers, card titles |
| Body | SpaceGrotesk (sans-serif) | base/sm | Article copy, card text, UI labels |
| Mono | GeistMono | xs/sm | Code blocks, preformatted content |

## Elevation & Depth

- **Flat**: Background, main content areas
- **Raised**: Cards (bg-card, border, shadow-md on hover)
- **Floating**: Modals, popovers, dropdowns (bg-popover, shadow-elevated)
- **Overlay**: Login modals, payment flows (semi-transparent backdrop)

## Structural Zones

| Zone | Background | Border | Purpose |
|------|-----------|--------|---------|
| Header | card | bottom | Logo, nav, login button |
| Hero | background | none | Featured article, full-width image + title overlay |
| Article Grid | background | none | Cards in 1-2 col responsive grid |
| Article Card | card | subtle | Cover, title, excerpt, meta, CTAs |
| Footer | card | top | Nav links, copyright, social |

## Responsive Breakpoints
- **Mobile**: sm (320px) — single-column, large touch targets
- **Tablet**: md (768px) — 2-column grid, increased padding
- **Desktop**: lg (1024px) — 3-column grid, max-width containers

## Component Patterns

| Component | States | Color |
|-----------|--------|-------|
| Primary CTA | default, hover, active | primary (gold) |
| Secondary CTA | default, hover | secondary (light gray) |
| Delete/Unlock | destructive | destructive (red) |
| Article Badge | free/premium | muted (gray) / primary (gold) |
| Category Label | hover on card | foreground with border |
| Link | default, hover, visited | foreground with underline on hover |

## Motion & Animation
- **Transition smooth**: `all 0.3s cubic-bezier(0.4, 0, 0.2, 1)` — applied to interactive elements
- **Card hover**: Slight shadow elevation (shadow-md) + soft scale (102%)
- **Button states**: Shadow + opacity shifts, no bouncing
- **Page transitions**: Fade in on load, smooth scroll behavior

## Signature Detail
Warm gold accent (0.64, 45°) for HERO payment CTAs creates visual urgency and brand recognition. Used sparingly — only on unlock/subscribe buttons and active states. Reinforces ICP ecosystem integration.

## Constraints
- No full-page gradients or animated backgrounds
- No emoji, no decorative icons without purpose
- Minimal shadows — depth through color lightness shifts
- Dark mode only (no light theme in v1)
- Max content width: 1200px on desktop, full bleed on mobile
