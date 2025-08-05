#!/bin/bash

docker compose --env-file .env.$1 down -v --remove-orphans
