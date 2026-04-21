#!/bin/bash
set -euo pipefail

# Import common utilities
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/common.sh"

# --- CONFIGURATION ---
ENV_TARGET=${1:-local}
TEMPLATE_DIR="docker/env"

# --- FONCTIONS ---

check_prerequisites() {
  log_msg "INFO" "Vérification des prérequis pour l'environnement: $ENV_TARGET"
  command -v docker >/dev/null 2>&1 || { log_msg "ERROR" "Docker n'est pas installé."; exit 1; }
  command -v task >/dev/null 2>&1 || { log_msg "ERROR" "Task n'est pas installé."; exit 1; }
}

configure_env() {
  local TEMPLATE="$TEMPLATE_DIR/.env.$ENV_TARGET.template"
  
  if [ ! -f .env ]; then
    if [ -f "$TEMPLATE" ]; then
      log_msg "INFO" "Création du fichier .env à partir du template $ENV_TARGET..."
      cp "$TEMPLATE" .env
      log_msg "SUCCESS" "Fichier .env créé."
    else
      log_msg "ERROR" "Template $TEMPLATE introuvable."
      exit 1
    fi
  else
    log_msg "INFO" "Le fichier .env existe déjà. On le conserve."
  fi
}

install_dependencies() {
  if [ "$ENV_TARGET" == "local" ]; then
    log_msg "INFO" "Installation des dépendances npm (local uniquement)..."
    npm install --silent
    log_msg "SUCCESS" "Dépendances installées."
  fi
}

main() {
  check_prerequisites
  configure_env
  install_dependencies
  log_msg "SUCCESS" "Installation terminée avec succès pour l'environnement: $ENV_TARGET"
}

# --- EXECUTION ---
main
