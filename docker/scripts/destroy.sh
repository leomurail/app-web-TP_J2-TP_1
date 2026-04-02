#!/bin/bash
echo "Destroying environment..."
docker-compose down -v --remove-orphans
