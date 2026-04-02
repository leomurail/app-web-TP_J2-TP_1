# Tasks: Responsive Tablet & Mobile Mode

**Input**: Design documents from `/specs/002-app-responsive-redesign/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Peut être exécuté en parallèle (fichiers différents, pas de dépendances).
- **[Story]**: Récit utilisateur correspondant (US1, US2, US3).

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Initialisation des jetons (tokens) CSS fluides.

- [x] T001 [P] Définir les variables CSS fluides (`clamp`) pour la typographie dans `src/style.css`.
- [x] T002 [P] Définir les variables d'espacement (`padding`, `gap`) fluides dans `src/style.css`.
- [x] T003 Configurer les breakpoints standards comme variables CSS ou utilitaires dans `src/style.css`.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Infrastructure de base indispensable avant toute modification de vue.

- [x] T004 Adapter le conteneur principal `.app-container` et `.main-content` dans `src/App.vue` pour utiliser les nouveaux paddings fluides.
- [x] T005 [P] Ajouter un utilitaire CSS pour le verrouillage du scroll (`.scroll-lock`) dans `src/style.css`.

---

## Phase 3: User Story 1 - Navigation Mobile Intuitive (Priority: P1) 🎯 MVP

**Goal**: Mise en place du menu Hamburger et du menu mobile plein écran.

**Independent Test**: Ouvrir l'application en mode mobile, cliquer sur le bouton menu, vérifier l'affichage des liens et le flou d'arrière-plan.

### Implementation for User Story 1

- [x] T006 [P] [US1] Créer le composant `src/components/MobileMenu.vue` avec `Teleport` et animation de transition.
- [x] T007 [US1] Ajouter la logique d'ouverture/fermeture et le bouton Hamburger dans `src/components/NavBar.vue`.
- [x] T008 [US1] Masquer la navigation desktop et afficher le Hamburger via media queries dans `src/components/NavBar.vue`.
- [x] T009 [US1] Intégrer le verrouillage du scroll du body lors de l'ouverture du menu dans `src/components/MobileMenu.vue`.

---

## Phase 4: User Story 2 - Lisibilité du Contenu "Void" (Priority: P1)

**Goal**: Adaptation des titres monumentaux et des grilles de contenu.

**Independent Test**: Vérifier que `HomeView.vue` ne présente aucun scroll horizontal et que les grilles passent en 1 ou 2 colonnes sur tablette/mobile.

### Implementation for User Story 2

- [x] T010 [P] [US2] Appliquer les variables de typographie fluide aux titres `h1` à `h3` dans `src/style.css`.
- [x] T011 [US2] Rendre les grilles de fonctionnalités adaptatives via `grid-template-columns: repeat(auto-fit, ...)` dans `src/views/HomeView.vue`.
- [x] T012 [US2] Ajuster les marges et paddings des sections `hero`, `noise` et `manifesto` dans `src/views/HomeView.vue` via media queries.
- [x] T013 [US2] Adapter la taille des boutons `void-btn` pour une meilleure zone tactile sur mobile dans `src/views/HomeView.vue`.

---

## Phase 5: User Story 3 - Saisie de Formulaire Ergonomique (Priority: P2)

**Goal**: Adaptation du formulaire multi-étapes et des composants PrimeVue.

**Independent Test**: Parcourir le formulaire complet sur mobile et vérifier que le stepper et les champs sont utilisables.

### Implementation for User Story 3

- [x] T014 [US3] Surcharger le style du composant Stepper pour qu'il soit lisible sur mobile dans `src/views/FormView.vue`.
- [x] T015 [US3] Adapter la largeur des champs `InputText` et la disposition de la `checkbox-grid` dans `src/views/FormView.vue`.
- [x] T016 [US3] Ajuster le header du formulaire (`.form-header`) pour les petits écrans dans `src/views/FormView.vue`.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Finitions et validation globale.

- [ ] T017 [P] Vérifier l'accessibilité (contraste, focus) sur les nouveaux éléments mobiles.
- [ ] T018 Tester la navigation sur les navigateurs mobiles réels (Safari iOS, Chrome Android).
- [ ] T019 Nettoyage des media queries redondantes et optimisation des performances du `backdrop-filter`.
- [ ] T020 Valider tous les scénarios de `quickstart.md`.

---

## Dependencies & Execution Order

### Phase Dependencies
1. **Phase 1 & 2** sont prioritaires et bloquantes.
2. **Phase 3 & 4 (US1 & US2)** peuvent être réalisées en parallèle après la Phase 2.
3. **Phase 5 (US3)** dépend de la Phase 1 pour les jetons de formulaire.

### Parallel Opportunities
- T001 et T002 peuvent être faits en même temps.
- T006 (Création de MobileMenu) peut commencer en même temps que T010 (Typographie fluide).

---

## Implementation Strategy

### MVP First (User Story 1 & 2)
1. Fondations CSS (Phase 1 & 2).
2. Navigation fonctionnelle (US1).
3. Affichage correct de la Home (US2).

### Incremental Delivery
- Livraison 1 : Application stable visuellement sur mobile (US1 + US2).
- Livraison 2 : Formulaire optimisé (US3).
- Livraison 3 : Polissage final.
