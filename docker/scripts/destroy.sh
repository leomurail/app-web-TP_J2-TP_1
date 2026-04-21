#!/bin/bash
set -euo pipefail

# Import common utilities
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/common.sh"

# --- FONCTIONS ---

confirm_destruction() {
  log_msg "WARN" "ATTENTION : Vous allez supprimer l'environnement local (containers, volumes, .env, node_modules)."
  read -p "Confirmer la destruction totale ? (y/n) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    log_msg "INFO" "Opération annulée."
    exit 0
  fi
}

cleanup() {
  log_msg "INFO" "Arrêt et suppression des conteneurs/volumes..."
  docker compose -f docker-compose.yml -f docker/docker-compose.local.yaml down -v --rmi local
  
  log_msg "INFO" "Suppression des dossiers et fichiers temporaires..."
  rm -rf node_modules
  rm -f .env
  
  log_msg "SUCCESS" "Environnement détruit."
}

main() {
  confirm_destruction
  cleanup
}

# --- EXECUTION ---
main
