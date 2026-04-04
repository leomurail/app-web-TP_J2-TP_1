# Implementation Plan: Notification System (PrimeVue Toast)

**Branch**: `005-notification-system` | **Date**: 2026-04-04 | **Spec**: [specs/005-notification-system/spec.md]

## Summary

The goal is to provide visual feedback to the user when clicking the "Broadcast" button. We are integrating PrimeVue's Toast service to handle in-app notifications while maintaining the existing browser-level notification API as a secondary system.

## Technical Context

**Language/Version**: Vue 3 (Composition API), TypeScript 5.9
**Primary Dependencies**: PrimeVue, ToastService
**Architecture**: Global Toast component in App.vue, triggered via useToast hook in view.

## Constitution Check

- [x] **Principe I (Vue 3/Composition API)** : useToast hook correctly used in script setup.
- [x] **Principe II (Pédagogie/TP)** : Code and documentation follow standard TP practices.

## Project Structure

### Documentation

```text
specs/005-notification-system/
├── plan.md              # This file
└── spec.md              # Specification
```

### Source Code

```text
src/
├── main.ts              # Registered ToastService
├── App.vue              # Added <Toast /> component
└── views/
    └── DemoView.vue     # Triggered notifications in sendNotification()
```

## Complexity Tracking

> No violations found.
