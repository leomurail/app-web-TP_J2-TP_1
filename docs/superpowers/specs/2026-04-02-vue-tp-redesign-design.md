# Design Specification: Vue TP Re-Design ("The Void")

**Goal**: Transform the existing functional Vue 3 TP application into a visually striking, distinctive, production-grade interface using a "Surgical Minimalism" aesthetic (The Void).

**Aesthetic Direction**: Surgical Minimalism / The Void
**Tone**: High-end technology, dark mode, precise, immersive, minimal noise.
**Constraint**: Must maintain existing functionality (NavBar, multi-step form, internal resources demo, API interaction) while completely overhauling the visual presentation.

## 1. Visual Identity

### Palette
*   **Background**: Absolute Black (`#000000`)
*   **Primary Text**: Pure White (`#FFFFFF`)
*   **Secondary Text/Borders**: Lunar Grey (`#333333` to `#A0A0A0`)
*   **Accent/Interactive**: Electric Cyan (`#00F0FF`) or Matrix Green (`#42B883` to honor Vue, leaning towards a neon/glowing variant).
*   **Error/Alert**: Neon Red/Orange (`#FF3366`)

### Typography
*   **Display/Headings**: A geometric sans-serif (e.g., `Inter`, `Geist`, or `Space Grotesk` if specifically styled for tech, but prefer a sleek, un-opinionated geometric face) with tight, negative letter-spacing for impact.
*   **Body**: Highly readable sans-serif, clean and airy line-height.
*   **Technical/Data (Counters, Coordinates)**: A monospaced font (e.g., `JetBrains Mono`, `Fira Code`, or `Geist Mono`).

## 2. Layout & Composition

*   **Spatial Composition**: Generous negative space. Elements are not boxed in cards; they float in the void.
*   **Grid**: Content is strictly aligned, but boundaries (borders/backgrounds) are invisible or reduced to 1px lines.
*   **Containers**: Remove all white backgrounds and drop shadows from the previous PrimeVue implementation. Replace with transparent backgrounds and subtle 1px borders (`border: 1px solid #222`) if grouping is absolutely necessary.

## 3. Component Details

### Navigation (NavBar)
*   **Structure**: Fixed at the top, ultra-thin. No solid background color (use `backdrop-filter: blur(10px)` if content scrolls underneath, or stay transparent).
*   **Links**: Plain text. Active state is indicated by a glowing text color and a subtle 1px glowing line below the item. Hover states trigger a slow brightness increase.

### Multi-Step Form
*   **Inputs**: Remove all standard input boxes. Use `border-bottom` only (1px solid `#333`). On focus, the border expands to 2px and glows with the accent color. Text input is large and elegant.
*   **Stepper Indicator**: A minimalist progression line or a series of tiny dots at the bottom or top of the form area. No bulky headers.
*   **Buttons**: Ghost buttons (transparent background). Primary action has a 1px accent border and a subtle text glow. Hovering creates a diffuse `box-shadow` glow.

### Internal Resources Demo (Cards/Dashboard)
*   **Cards**: Instead of traditional PrimeVue cards, use structural typography and thin dividing lines to separate sections (Geo, Notifications, Share).
*   **Touch Zone**: A minimalist dashed rectangle that reacts with a monochromatic ripple or glow effect upon touch/click.
*   **Badges/Counters**: Monospaced numbers, bright accent color, glowing against the black background.

## 4. Motion & Interaction

*   **Page Transitions**: Implement a `blur-up` and `fade` transition between router views. Elements should not snap into place but smoothly fade in from darkness (duration ~0.4s to 0.6s).
*   **Staggered Reveals**: When a page loads, elements should appear sequentially rather than all at once (using CSS `animation-delay`).
*   **Micro-interactions**: Hovering over interactive elements increases their opacity or introduces a diffuse glow (`filter: drop-shadow(...)`). 

## 5. Technical Implementation Strategy

*   **CSS**: Heavy use of custom CSS variables defined in `:root`. Override PrimeVue's default Aura theme heavily, possibly switching to unstyled mode (`unstyled: true` in PrimeVue config) or writing highly specific CSS overrides to strip away the default styling.
*   **Custom CSS**: Implement the glow effects, structural lines, and custom input styling manually to ensure the "Void" aesthetic is not compromised by generic UI library defaults.

## 6. Open Questions & Ambiguities

*   None. The design direction is strictly defined. If PrimeVue components resist styling, they will be replaced with custom HTML/CSS elements to preserve the aesthetic.
