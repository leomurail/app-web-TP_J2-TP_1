# Research: Fix Docker CI/CD and Taskfile Integration

## Decisions & Rationale

### Decision 1: Taskfile Implementation
- **Choice**: Create a `Taskfile.yml` in the root directory.
- **Rationale**: The analysis report explicitly mentions using `Taskfile` for orchestration (`task install`, `task watch`, `task clean`). It replaces a `Makefile` and provides a cross-platform way to manage complex commands.
- **Alternatives considered**: `Makefile` (rejected per report), `npm scripts` (rejected for orchestration complexity).

### Decision 2: Docker Environment Separation
- **Choice**: Implement a `docker/` directory structure with environment-specific overrides.
- **Rationale**: The report details a separation between `docker-compose.yaml` (base), `docker/docker-compose.local.yaml`, and `docker/docker-compose.prod.yaml`. This ensures a clean separation of concerns and facilitates the use of Traefik in production.
- **Alternatives considered**: Single monolithic `docker-compose.yml` (rejected for lack of flexibility between environments).

### Decision 3: GitHub Actions Update
- **Choice**: Update `.github/workflows/deploy.yml` (and potentially split into `dev-deploy.yml`/`prod-deploy.yml` as mentioned in the report) to use `task install` and handle multi-environment deployment.
- **Rationale**: The current `deploy.yml` is simple and uses `npm build`. To align with the report, it needs to be integrated with the `Taskfile` and use the defined orchestration steps.
- **Alternatives considered**: Keeping current manual steps (rejected as it doesn't solve the "make init" vs "task install" conflict mentioned in the report).

### Decision 4: Traefik Integration
- **Choice**: Add Traefik labels and external network configuration to the production Docker Compose.
- **Rationale**: Essential for secure and managed routing as per the analysis report recommendations.

## Unknowns Resolved

- **Missing Taskfile**: I will create the `Taskfile.yml` from scratch based on the "Commandes Clés" mentioned in the report.
- **Missing Docker Scripts**: I will create `docker/scripts/install.sh` and `docker/scripts/destroy.sh` to automate environment setup.
- **Env Templates**: I will create `.env.local.template`, `.env.dev.template`, and `.env.prod.template` in `docker/env/`.
