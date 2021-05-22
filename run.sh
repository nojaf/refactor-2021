#!/bin/bash
export SNOWPACK_PUBLIC_NODE_API="${GITPOD_WORKSPACE_URL/https:\/\//https://7000-}"
export SNOWPACK_PUBLIC_DOTNET_API="${GITPOD_WORKSPACE_URL/https:\/\//https://8000-}"
docker-compose up