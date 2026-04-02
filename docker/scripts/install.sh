#!/bin/bash
set -e
ENV=${1:-local}
echo "Installing environment: $ENV"
if [ ! -f .env ]; then
  cp docker/env/.env.$ENV.template .env
  echo ".env created from $ENV template"
fi

task up

# NPM install only for local development
if [ "$ENV" == "local" ]; then
  npm install
fi
