 mcr.microsoft.com/azure-functions/dotnet:3.0.3284-dotnet3-core-tools

 docker run -it --rm -v "$(pwd):/workspace" -p "7000:7000"  -w "/workspace" mcr.microsoft.com/azure-functions/node:3.0.3233-node12-core-tools bash

 func start --javascript --port 7000 --verbose

 docker run -it --rm -v "$(pwd):/workspace" -w "/workspace" -p "8000:8000"  mcr.microsoft.com/azure-functions/dotnet:3.0.3284-dotnet3-core-tools bash

func start --csharp --port 8000 --verbose

 https://github.com/evanw/esbuild/issues/37

 docker build --rm -t node-function -f NodeJs.Dockerfile .
 docker run -it -p "7000:7000" --rm node-function:latest

 docker-compose up --build

 docker exec -it fable-client dotnet fantomas src/client -r

docker run -it --rm -v "$(pwd):/app" -w "/app"  mcr.microsoft.com/dotnet/sdk:5.0-focal dotnet fsi ./script.fsx

docker run -it --rm -v "$(pwd):/app" -w "/app" mcr.microsoft.com/azure-cli bash

docker run -it --rm -v "$(pwd):/app" -w "/app" node:14.16 bash

az login

docker run -it --rm -v "$(pwd):/app" -w "/app"  mcr.microsoft.com/dotnet/sdk:5.0-focal dotnet tool restore && dotnet fantomas . -r

docker run -it --rm -v "$(pwd):/app" -w "/app"  mcr.microsoft.com/dotnet/sdk:5.0-focal bash

export DOCKER_BUILDKIT=1

docker build -f Release.Dockerfile --output type=local,dest=./artifacts .