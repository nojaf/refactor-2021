env DOCKER_BUILDKIT=1 docker build -f Release.Dockerfile --output type=local,dest=./artifacts .
docker run -it --rm -v "$(pwd)/artifacts:/app" -w "/app" mcr.microsoft.com/azure-cli bash azure.sh