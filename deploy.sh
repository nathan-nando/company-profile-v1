#!/bin/bash

set -e

# Load variables from .env
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
else
  echo ".env file not found!"
  exit 1
fi

# Check required variables
if [ -z "$REGISTRY_USERNAME" ] || [ -z "$REGISTRY_TOKEN" ]; then
  echo "REGISTRY_USERNAME and REGISTRY_TOKEN must be set in .env"
  exit 1
fi

# Login to GitHub Container Registry
echo "$REGISTRY_TOKEN" | docker login ghcr.io -u "$REGISTRY_USERNAME" --password-stdin

# Pull the latest image
docker pull ghcr.io/andreejait/company-profile:development

# Start using docker-compose
docker compose up -d