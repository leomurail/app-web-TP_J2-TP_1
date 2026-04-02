# Data Model: Fix Docker CI/CD and Taskfile Integration

## Entities

### DeploymentEnvironment
Represents a target deployment context.
- **Attributes**: `name` (local, dev, prod), `COMPOSE_FILES` (list of paths), `ENV_FILE` (path), `DOCKER_CONTEXT` (path).
- **Constraints**: Environment name must be one of the pre-defined options.
- **Relationships**: Associated with specific `EnvironmentTemplates` and `TaskDefinitions`.

### TaskDefinition
Represents an orchestration command defined in `Taskfile.yml`.
- **Attributes**: `command_name` (install, watch, clean, etc.), `description`, `cmds` (list of shell commands).
- **Behavior**: Selected automatically based on `APP_ENV`.

### EnvironmentTemplate
A template file used to initialize the `.env` for a `DeploymentEnvironment`.
- **Attributes**: `template_path` (e.g., `docker/env/.env.local.template`), `target_path` (`.env`).
- **Behavior**: Copied to the target path by `task install`.

## Validation Rules
- `task install` MUST fail if the target `.env` template is missing.
- Production environment MUST fail if the `traefik-net` network is not defined as external.
