# Implementation Plan: Fix Docker CI/CD and Taskfile Integration

**Branch**: `004-fix-docker-cicd` | **Date**: 2026-04-02 | **Spec**: [specs/004-fix-docker-cicd/spec.md](spec.md)
**Input**: Feature specification from `/specs/004-fix-docker-cicd/spec.md`

## Summary
Implement a standardized orchestration layer using `Taskfile` and restructure Docker configuration for multi-environment support. This involves activating and updating GitHub Action workflows to use `task install` instead of `make init`, ensuring secure deployment via Traefik in production.

## Technical Context

**Language/Version**: Vue 3, TypeScript, Node.js 20+
**Primary Dependencies**: Docker, Docker Compose, Go-Task
**Storage**: N/A
**Testing**: Vitest (existing)
**Target Platform**: Linux Server (VPS), GitHub Actions
**Project Type**: Web application (Vue 3)
**Performance Goals**: CI/CD deployment under 5 minutes
**Constraints**: Traefik reverse proxy integration, non-root user in production Docker

## Constitution Check

- [x] **Principe I (Vue 3/Composition API)** : L'approche ne modifie pas le code Vue existant, elle se concentre sur l'infrastructure.
- [x] **Principe II (Pédagogie/TP)** : La solution utilise des outils standards (Docker, Taskfile) et documente clairement les étapes de déploiement.
- [x] **Principe III (Architecture SFC)** : Respecté, pas de changement structurel au code source.

## Project Structure

### Documentation (this feature)

```text
specs/004-fix-docker-cicd/
├── plan.md              # This file
├── research.md          # Decisions on Taskfile and Docker structure
├── data-model.md        # Entities: DeploymentEnvironment, TaskDefinition
├── quickstart.md        # Commands for local and CI/CD setup
└── checklists/
    └── requirements.md  # Specification Quality Checklist
```

### Source Code (repository root)

```text
.github/
└── workflows/
    ├── dev-deploy.yml   # Updated/Activated
    └── prod-deploy.yml  # Updated/Activated

docker/
├── env/
│   ├── .env.local.template
│   ├── .env.dev.template
│   └── .env.prod.template
├── scripts/
│   ├── install.sh
│   └── destroy.sh
├── docker-compose.local.yaml
└── docker-compose.prod.yaml

docker-compose.yaml      # Base config
Taskfile.yml             # Orchestration entry point
```

**Structure Decision**: Single project with infrastructure files in `docker/` and root.

## Complexity Tracking

*No violations to report.*
