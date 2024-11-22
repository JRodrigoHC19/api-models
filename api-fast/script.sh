#!/bin/bash

WORKDIR="project"
REPO_URL="https://github.com/JRodrigoHC19/api-models.git"

git clone $REPO_URL $WORKDIR

cd $WORKDIR

docker compose up -d

echo "La aplicación está corriendo en puerto 5000"
