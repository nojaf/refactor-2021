 mcr.microsoft.com/azure-functions/dotnet:3.0.3284-dotnet3-core-tools

 docker run -it --rm -v "$(pwd):/workspace" -p "7000:7000"  -w "/workspace" mcr.microsoft.com/azure-functions/node:3.0.3233-node12-core-tools bash

 func start --port 7000

 docker run -it --rm -v "$(pwd):/app" -w "/app" mcr.microsoft.com/dotnet/sdk:5.0 bash

 https://github.com/evanw/esbuild/issues/37
