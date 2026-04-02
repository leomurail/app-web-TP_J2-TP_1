# Feature Specification: Fix Docker CI/CD and Taskfile Integration

**Feature Branch**: `004-fix-docker-cicd`  
**Created**: 2026-04-02  
**Status**: Draft  
**Input**: User description: "Rapport d'Analyse : Infrastructure Docker & CI/CD - app-web"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Automated Deployment (Priority: P1)

As a DevOps engineer, I want the application to be deployed automatically to the target environments (dev/prod) upon pushing code to the corresponding branches, ensuring a rapid and reliable release process.

**Why this priority**: Continuous deployment is essential for maintaining a high delivery pace and ensuring that the latest changes are always available to stakeholders.

**Independent Test**: Can be fully tested by pushing a change to the `develop` branch and verifying that the GitHub Action triggers, completes without error, and syncs files to the development server.

**Acceptance Scenarios**:

1. **Given** a code change is pushed to the `develop` branch, **When** the GitHub Action workflow starts, **Then** it should successfully execute `task install` and `rsync` the build artifacts to the development server.
2. **Given** a code change is pushed to the `main` branch, **When** the GitHub Action workflow starts, **Then** it should successfully execute `task install` and `rsync` the build artifacts to the production server.

---

### User Story 2 - Unified Command Execution (Priority: P1)

As a developer, I want to use `task` commands consistently in both local and CI/CD environments to avoid "works on my machine" issues and streamline environment setup.

**Why this priority**: Consistency between local and CI/CD environments reduces configuration drift and simplifies troubleshooting of deployment failures.

**Independent Test**: Verify that running `task install` locally and in the CI/CD environment yields the same result (containers up, dependencies installed).

**Acceptance Scenarios**:

1. **Given** the `Taskfile` is present, **When** `task install` is called in the CI/CD runner, **Then** it should initialize the environment (copy .env, build containers) just as it does locally.

---

### User Story 3 - Secure External Access (Priority: P2)

As a security administrator, I want the production application to be exposed through a reverse proxy (Traefik) on a dedicated network to ensure secure and isolated routing of external traffic.

**Why this priority**: Isolating the application within a specific network and using a managed reverse proxy enhances security and simplifies SSL/TLS management.

**Independent Test**: Verify that the production container is only accessible through Traefik and is connected to the `traefik-net` network.

**Acceptance Scenarios**:

Given the production environment is deployed, **When** accessing the application via its defined Host rule (e.g., `app-web.fr`), **Then** Traefik should correctly route the traffic to the internal port 3060.


---

### Edge Cases

- **Taskfile/Dependencies Missing**: How does the system handle a situation where the `task` binary or necessary Docker dependencies are not present on the runner?
- **SSH Connectivity Failure**: What happens if the `rsync` command fails due to expired SSH keys or network timeouts?
- **Traefik Network Missing**: How does the deployment handle a failure if the `traefik-net` network is not pre-created on the target server?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST replace all occurrences of `make init` with `task install` in GitHub Action workflows.
- **FR-002**: GitHub Action workflows (`dev-deploy.yml` and `prod-deploy.yml`) MUST be activated by removing comment symbols from the `on:` and `name:` headers.
- **FR-003**: System MUST utilize `rsync` over SSH for the secure transfer of build artifacts to the remote servers.
- **FR-004**: Production configuration MUST include Traefik labels for dynamic routing based on `${APP_DOMAIN}` and `${APP_PORT}`.
- **FR-005**: The application service in production MUST be attached to the external `traefik-net` network.
- **FR-006**: Environment configuration MUST be initialized from `.env.[env].template` files before starting services.

### Key Entities

- **Deployment Workflow**: Represents the automated sequence of steps triggered by Git events.
- **Environment Template**: Defines the base configuration required for each deployment context (local, dev, prod).
- **Orchestration Task**: Represents a standardized automation command (e.g., `install`, `clean`, `watch`) defined in the `Taskfile`.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of pushes to `develop` and `main` branches trigger the corresponding deployment workflow.
- **SC-002**: Deployment process (from trigger to sync completion) finishes in under 5 minutes for the development environment.
- **SC-003**: The application is reachable via HTTPS on its defined domain name after a successful production deployment.
- **SC-004**: No manual intervention is required on the target server to restart services after an automated deployment.

## Assumptions

- The `task` binary is pre-installed or will be installed as part of the CI/CD runner setup.
- GitHub Secrets (`SSH_PATH`, etc.) are correctly configured in the repository settings.
- Traefik is already running on the target server and manages the `traefik-net` external network.
- The project follows a consistent directory structure for `.env` templates as described in the report.
