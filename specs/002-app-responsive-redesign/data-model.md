# Breakpoint & Token Model: Responsive Redesign

## Screen Breakpoints
- **Mobile (Base)**: < 768px
- **Tablet**: 768px - 1023px
- **Desktop**: >= 1024px

## Responsive Tokens (CSS Variables)
- `--font-size-hero`: `clamp(3rem, 15vw, 7rem)`
- `--font-size-section-title`: `clamp(2rem, 10vw, 4rem)`
- `--font-size-body`: `clamp(0.9rem, 1vw + 0.5rem, 1.2rem)`
- `--app-padding-x`: `clamp(1rem, 5vw, 3rem)`
- `--app-padding-y`: `clamp(2rem, 10vh, 8rem)`

## Component State Model
### Mobile Navigation (`MobileMenu.vue`)
- `isOpen` (boolean): Gère la visibilité du menu plein écran.
- `links` (array): Liste des objets de navigation (identique à `NavBar.vue`).

### Stepper Behavior
- `orientation` (string): 'horizontal' (Desktop/Tablet) | 'vertical' (Mobile).
