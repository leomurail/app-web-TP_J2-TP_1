#!/bin/bash
set -euo pipefail

# Import common utilities
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/common.sh"

# --- FONCTIONS ---

deploy_stack() {
  # On s'attend à ce que APP_NAME soit chargé via Task (dotenv)
  if [ -z "${APP_NAME:-}" ]; then
    log_msg "ERROR" "La variable APP_NAME n'est pas définie. Vérifiez votre .env."
    exit 1
  fi

  log_msg "INFO" "Déploiement de la stack Swarm : $APP_NAME"
  docker stack deploy \
    -c docker-compose.yml \
    -c docker/docker-compose.prod.yaml \
    "$APP_NAME"
  
  log_msg "SUCCESS" "Déploiement initié avec succès."
}

main() {
  deploy_stack
}

# --- EXECUTION ---
main
