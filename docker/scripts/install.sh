#!/bin/bash
set -e
ENV=${1:-local}
echo "Installing environment: $ENV"
if [ ! -f .env ]; then
  cp docker/env/.env.$ENV.template .env
  echo ".env created from $ENV template"
fi
docker-compose up -d --build
npm install
