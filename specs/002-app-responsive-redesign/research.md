# Research: Responsive Tablet & Mobile Mode

## Decisions

### 1. Navigation Hamburger
- **Decision**: Implémenter un composant `MobileMenu.vue` dédié, piloté par un état simple (`ref`) dans `NavBar.vue`.
- **Rationale**: Séparer la logique du menu mobile de la barre de navigation desktop pour plus de clarté. Utilisation de `Teleport` vers `body` pour éviter les problèmes de z-index.
- **Alternatives considered**: Utiliser `Sidebar` de PrimeVue. Écarté pour garder un contrôle total sur l'esthétique "Void" personnalisée.

### 2. Typographie Fluide
- **Decision**: Utiliser des variables CSS avec `clamp()` dans `:root`.
- **Rationale**: Permet une mise à l'échelle automatique sans multiplier les media queries. 
- **Formule**: `clamp(min, preferred, max)`. Exemple : `clamp(2rem, 8vw, 7rem)` pour les titres Hero.

### 3. Structure des Grilles
- **Decision**: Utiliser CSS Grid avec `grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))`.
- **Rationale**: Permet un passage automatique de 3 à 2 puis 1 colonne sans media queries explicites dans certains cas, complété par des media queries pour les ajustements fins.

### 4. Composants PrimeVue
- **Decision**: Surcharger les styles PrimeVue via des sélecteurs `:deep()` ou des classes globales pour assurer la responsivité (notamment le Stepper qui doit passer en vertical).
- **Rationale**: Le Stepper de PrimeVue a des limitations natives en mode vertical/responsive qui nécessitent des ajustements CSS manuels.

## Best Practices

- **Mobile First**: Appliquer les styles de base pour mobile et utiliser `min-width` pour les écrans plus larges.
- **Touch Targets**: S'assurer que tous les boutons ont une hauteur minimale de 44px.
- **Performance**: Utiliser `backdrop-filter` avec parcimonie car il peut être gourmand en ressources sur certains mobiles anciens.
