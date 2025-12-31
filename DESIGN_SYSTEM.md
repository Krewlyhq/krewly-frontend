# Krewly Design System

A comprehensive guide to Krewly's brand identity, styling conventions, and component patterns.

---

## Brand Identity

### Logo
- **Primary Logo:** `/public/Group.svg` - SVG format for scalability
- **Fallback:** `/public/krewly-logo.png` - PNG for legacy support
- **Usage:**
  - Light backgrounds: Use as-is (dark logo)
  - Dark backgrounds: Apply `filter: brightness(0) invert(1)` for white

### Typography
- **Primary Font:** Urbanist (Google Fonts)
- **Font Variable:** `--font-urbanist`
- **Weights Used:** 400 (regular), 500 (medium), 700 (bold), 900 (black)

```css
font-family: var(--font-urbanist), "Inter", sans-serif;
```

---

## Color Palette

### Primary Colors
| Name | Variable | Hex | Usage |
|------|----------|-----|-------|
| Primary | `--primary` | `#0fb0f0` | Buttons, links, accents |
| Primary Foreground | `--primary-foreground` | `#ffffff` | Text on primary |

### Frozen Lake (Brand Blue)
```css
--frozen-lake-50: #e7f7fd;   /* Hero backgrounds */
--frozen-lake-100: #cfeffc;  /* Section backgrounds */
--frozen-lake-200: #9fdff9;
--frozen-lake-300: #6fd0f6;
--frozen-lake-400: #3fc0f3;
--frozen-lake-500: #0fb0f0;  /* Primary */
--frozen-lake-600: #0c8dc0;
--frozen-lake-700: #096a90;
--frozen-lake-800: #064660;
--frozen-lake-900: #032330;
--frozen-lake-950: #021922;
```

### Grey (Neutrals)
```css
--grey-50: #f2f2f3;   /* Muted backgrounds */
--grey-100: #e4e5e7;  /* Secondary backgrounds */
--grey-200: #cacbce;  /* Borders */
--grey-500: #7a7c85;  /* Muted text */
--grey-900: #18191b;  /* Primary text */
--grey-950: #111113;  /* Footer background */
```

### Yellow Green (Accent)
```css
--yellow-green-400: #c9ff33;
--yellow-green-500: #bbff00;  /* Accent highlights */
```

### Semantic Colors
| Name | Variable | Hex |
|------|----------|-----|
| Background | `--background` | `#ffffff` |
| Foreground | `--foreground` | `#18191b` |
| Destructive | `--destructive` | `#ef4444` |
| Border | `--border` | `#cacbce` |
| Ring (Focus) | `--ring` | `#3fc0f3` |

---

## Component Patterns

### Buttons
- **Shape:** Pill-shaped (`rounded-full`)
- **Primary:** `bg-primary text-white hover:bg-primary/90`
- **Outline:** `border border-gray-200 bg-white hover:bg-gray-50`

```jsx
<Button className="rounded-full bg-primary px-6 py-2">
  Button Text
</Button>
```

### Cards
- **Border:** `border border-gray-100`
- **Shadow:** `shadow-sm`
- **Hover:** `hover:scale-[1.02]` with `transition-transform`
- **Image Aspect:** `aspect-[4/3]` with `object-cover overflow-hidden`

```jsx
<div className="overflow-hidden rounded-lg border border-gray-100 shadow-sm transition-transform hover:scale-[1.02]">
  <div className="aspect-[4/3] overflow-hidden">
    <img className="h-full w-full object-cover" />
  </div>
  <div className="p-3">Content</div>
</div>
```

### Search Bar
- **Container:** `rounded-full bg-white shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-gray-100`
- **Inputs:** Transparent with icon prefix
- **Button:** Primary color, rounded

### Badges/Tags
- **Style:** `rounded-full px-2 py-0.5 text-xs font-medium`
- **Primary:** `bg-primary text-white`
- **Neutral:** `bg-white/80 border border-gray-200 text-gray-600`

---

## Layout Patterns

### Container
```jsx
<div className="container mx-auto px-4 md:px-8">
```

### Section Spacing
- **Standard:** `py-12`
- **Large:** `py-16`
- **Hero:** `py-10 md:py-16 lg:py-20`

### Grid Systems
- **Categories/Locations:** `grid-cols-3 md:grid-cols-4 lg:grid-cols-6`
- **Featured Vendors:** `grid-cols-2 md:grid-cols-4`

---

## Animation & Interactions

### Transitions
```css
transition-transform duration-300
transition-all duration-500 ease-in-out
transition-colors
```

### Hover States
- Cards: `hover:scale-[1.02]`
- Links: `hover:text-black` or `hover:underline`
- Buttons: `hover:bg-primary/90`

### Typing Animation (Hero)
- Words cycle: "event", "party", "occasion"
- Speed: 100ms typing, 50ms deleting, 1500ms pause

---

## Navbar

### Behavior
- **Sticky:** `sticky top-0 z-50`
- **Height:** `h-16 md:h-20`
- **Scroll Hide:** Hides after 300px scroll with smooth transition

### Logo Display
```jsx
<img src="/Group.svg" className="h-8 w-8 md:h-10 md:w-10" />
<span className="text-xl md:text-2xl font-black uppercase">Krewly</span>
```

---

## Footer

### Background
- Color: `bg-[#111113]` (Grey 950)
- Logo: White (inverted SVG)

---

## File Structure

```
public/
├── Group.svg              # Main logo
├── krewly-logo.png        # PNG fallback
└── Krewly web photos/     # Vendor images
    ├── IMG_2397.JPG
    ├── IMG_2398.JPG
    └── ...

components/
├── navbar.tsx             # Main navigation
├── hero.tsx               # Hero section with typing animation
├── service-grid.tsx       # Browse by category
├── pros-near-you.tsx      # Featured vendors
├── locations-section.tsx  # Browse by location
├── business-cta.tsx       # Vendor signup CTA
├── testimonials.tsx       # User reviews
└── footer.tsx             # Site footer

app/
├── globals.css            # Color variables & base styles
├── layout.tsx             # Root layout with fonts
└── page.tsx               # Home page composition
```

---

## Quick Reference

| Element | Class Pattern |
|---------|--------------|
| Primary Button | `rounded-full bg-primary text-white` |
| Card | `rounded-lg border border-gray-100 shadow-sm` |
| Section | `py-12 bg-white` or `py-12 bg-[var(--frozen-lake-100)]` |
| Heading | `text-xl md:text-2xl font-bold` |
| Body Text | `text-sm text-gray-600` |
| Star Rating | `fill-amber-400 text-amber-400` |
