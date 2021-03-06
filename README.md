 mcr.microsoft.com/azure-functions/dotnet:3.0.3284-dotnet3-core-tools

 docker run -it --rm -v "$(pwd):/workspace" -p "7000:7000"  -w "/workspace" mcr.microsoft.com/azure-functions/node:3.0.3233-node12-core-tools bash

 func start --javascript --port 7000 --verbose

 docker run -it --rm -v "$(pwd):/workspace" -w "/workspace" -p "8000:8000"  mcr.microsoft.com/azure-functions/dotnet:3.0.3284-dotnet3-core-tools bash

func start --csharp --port 8000 --verbose

 https://github.com/evanw/esbuild/issues/37

 docker build --rm -t node-function -f NodeJs.Dockerfile .
 docker run -it -p "7000:7000" --rm node-function:latest