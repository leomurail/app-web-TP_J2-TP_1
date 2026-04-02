# Quickstart: Fix Docker CI/CD and Taskfile Integration

## Local Setup

1. **Install Prerequisites**: Ensure `docker`, `docker-compose`, and `task` are installed.
2. **Initialize Environment**:
   ```bash
   task install
   ```
   *This copies the `.env.local.template` to `.env` and builds the containers.*
3. **Run in Development Mode**:
   ```bash
   task watch
   ```
   *Uses Docker Watch for hot-reloading.*

## CI/CD Workflow

1. **Push to `develop`**: Triggers `dev-deploy.yml` which executes `task install` on the runner and syncs to the dev server.
2. **Push to `main`**: Triggers `prod-deploy.yml` which executes `task install` (with production overrides) and syncs to the production server.

## Troubleshooting

- **Task not found**: Ensure `go-task` is installed (`brew install go-task/tap/go-task` or similar).
- **Environment missing**: Check if `.env` exists in the root. If not, run `task install`.
