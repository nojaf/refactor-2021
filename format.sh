#!/bin/bash
docker run -it --rm -v "$(pwd):/app" -w "/app"  mcr.microsoft.com/dotnet/sdk:5.0-focal bash -c "dotnet tool restore && dotnet fantomas src -r"