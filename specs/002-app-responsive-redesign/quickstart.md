# Quickstart: Responsive Implementation

## Local Testing
1. Ouvrir l'application dans le navigateur (`npm run dev`).
2. Utiliser les DevTools (F12) -> Mode responsive (Ctrl+Shift+M).
3. Tester les résolutions suivantes :
   - 375px (iPhone SE)
   - 768px (iPad Mini)
   - 1024px (iPad Pro / Desktop small)
   - 1440px (Desktop standard)

## Styling Conventions
- Utiliser les variables CSS définies dans `:root` pour la typographie.
- Préférer `flex` et `grid` pour la structure.
- Éviter les unités fixes (`px`) pour les hauteurs de conteneurs, préférer `min-height` ou `vh`.

## Key Commands
- `npm run lint`: Vérifier la propreté du code CSS/TS.
- `npm run dev`: Serveur de développement avec HMR.
