# Implementation Plan: Fix Demo Page Errors

**Branch**: `003-fix-demo-page-errors` | **Date**: 2026-04-02 | **Spec**: [specs/003-fix-demo-page-errors/spec.md]
**Input**: Feature specification from `/specs/003-fix-demo-page-errors/spec.md`

## Summary

The goal is to resolve three main issues on the demo page: API failures (CORS/404), geolocation permission confusion, and console noise from autofill extensions. The technical approach involves configuring a Vite proxy for dev mode, adding explicit UI instructions for resetting geolocation permissions, and implementing more resilient error handling for API and form interactions.

## Technical Context

**Language/Version**: Vue 3 (Composition API), TypeScript 5.9
**Primary Dependencies**: Axios, VueUse, PrimeVue, Pinia
**Storage**: N/A (Transient state in Pinia store)
**Testing**: Vitest, @vue/test-utils
**Target Platform**: Web (Desktop/Mobile)
**Project Type**: web-service (frontend focus)
**Performance Goals**: API response handling within <100ms
**Constraints**: Must follow academic (TP) standards for clarity and comments
**Scale/Scope**: Single view (DemoView.vue)

## Constitution Check

- [x] **Principe I (Vue 3/Composition API)** : L'approche utilise-t-elle Vue 3 et `<script setup>` ?
- [x] **Principe II (Pédagogie/TP)** : La solution est-elle claire et suit-elle les consignes pédagogiques ?
- [x] **Principe III (Architecture SFC)** : La structure est-elle modulaire et conforme aux standards Vue ?

## Project Structure

### Documentation (this feature)

```text
specs/003-fix-demo-page-errors/
├── plan.md              # This file
├── research.md          # Research on CORS, Geolocation, and Autofill issues
├── data-model.md        # Alert and DeviceStore state definition
├── quickstart.md        # Instructions for verifying fixes
├── contracts/           
│   └── api-v1.md        # Specification for /alerts endpoint
└── checklists/          
    └── requirements.md  # Quality checklist
```

### Source Code (repository root)

```text
src/
├── services/
│   └── api.ts           # Axios base instance
├── stores/
│   └── device.ts        # Pinia store for alert state
├── views/
│   └── DemoView.vue     # View for fixes and geolocation UI
└── vite.config.ts       # Proxy configuration
```

**Structure Decision**: Single project layout, standard Vue architecture with SFC.

## Complexity Tracking

> No violations found.
