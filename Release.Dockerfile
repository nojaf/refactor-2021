# Compile F# to Js
FROM mcr.microsoft.com/dotnet/sdk:5.0-focal AS fable
COPY ./.config ./.config
COPY ./src/client ./src/client
COPY ./src/server/nodejs ./src/server/nodejs
COPY ./src/server/Shared.fs ./src/server/Shared.fs
RUN dotnet tool restore
RUN dotnet fable ./src/client/FableApp/FableApp.fsproj --outDir ./src/client/src/bin
RUN dotnet fable ./src/server/nodejs/Fibonacci/Fibonacci.fsproj -o ./src/server/nodejs/Fibonacci

# Bundle Node.Js function
FROM node:15.11 as node
COPY /src/server/nodejs/package.json /app/package.json
COPY /src/server/nodejs/package-lock.json /app/package-lock.json
COPY --from=fable /src/server/nodejs/Fibonacci/Index.js /app/Fibonacci/Index.js
COPY --from=fable /src/server/nodejs/Fibonacci/Fibonacci.js /app/Fibonacci/Fibonacci.js
COPY --from=fable /src/server/nodejs/Shared.js /app/Shared.js
COPY --from=fable /src/server/nodejs/Fibonacci/.fable /app/Fibonacci/.fable
WORKDIR /app
RUN npm i
RUN npm run build

# # Zip Node.Js function
FROM mcr.microsoft.com/powershell:alpine-3.12 AS zip
COPY ./src/server/nodejs/host.json /app/host.json
COPY ./src/server/nodejs/Fibonacci/function.json /app/Fibonacci/function.json
COPY --from=node /app/Fibonacci/index.js /app/Fibonacci/index.js
RUN pwsh -c "Compress-Archive -Path ./app/* -DestinationPath node.zip"

# # Zip .NET function
FROM mcr.microsoft.com/azure-functions/dotnet:3.0.3284-dotnet3-core-tools AS dotnet-func
COPY ./src/server ./app
WORKDIR ./app/dotnet
RUN dotnet build -c Release /p:DeployOnBuild=true /p:DeployTarget=Package;CreatePackageOnPublish=true
RUN pwsh -c "Compress-Archive -Path ./bin/Release/netcoreapp3.1/Publish/* -DestinationPath dotnet.zip"

# # Build Frontend
FROM node:14.16 AS snowpack
COPY --from=fable ./src/client ./app
WORKDIR /app
RUN npm i
RUN npm run build

# # Build Azure ARM template
FROM mcr.microsoft.com/dotnet/sdk:5.0-focal as farmer
COPY ./infrastructure/script.fsx ./script.fsx
RUN dotnet fsi ./script.fsx

# # Collect files for export
FROM scratch
COPY --from=snowpack ./app/build ./client
COPY --from=dotnet-func ./app/dotnet/dotnet.zip ./dotnet.zip
COPY --from=zip ./node.zip ./node.zip
COPY --from=farmer ./template.json ./template.json
COPY ./infrastructure/azure.sh ./azure.sh