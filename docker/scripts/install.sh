#!/bin/bash
set -e
ENV=${1:-local}

echo "Installing environment: $ENV"

# .env creation if missing
if [ ! -f .env ]; then
  cp docker/env/.env.$ENV.template .env
  echo ".env created from $ENV template"
fi

# Delegate the Docker launch to Task to reuse the COMPOSE_CMD logic
if [ "$ENV" == "local" ]; then
  task build
  task up
  # NPM install only for local development
  npm install
else
  task deploy
fi

