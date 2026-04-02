#!/bin/bash
echo "Destroying environment..."
set -e

task clean

rm -rf node_modules

rm .env