FROM mcr.microsoft.com/dotnet/sdk:5.0-focal AS fable
COPY ./.config ./.config
COPY ./src/client ./src/client
RUN dotnet tool restore
RUN dotnet fable ./src/client/FableApp/FableApp.fsproj --outDir ./src/client/src/bin

FROM node:14.16 AS snowpack
COPY --from=fable ./src/client ./app
WORKDIR /app
RUN npm i
RUN npm run build

FROM mcr.microsoft.com/azure-functions/dotnet:3.0.3284-dotnet3-core-tools AS dotnet-func
COPY ./src/server ./app
WORKDIR ./app/dotnet
RUN dotnet build -c Release /p:DeployOnBuild=true /p:DeployTarget=Package;CreatePackageOnPublish=true
RUN pwsh -c "Compress-Archive -Path ./bin/Release/netcoreapp3.1/Publish/* -DestinationPath dotnet.zip"

FROM mcr.microsoft.com/dotnet/sdk:5.0-focal as farmer
COPY ./infrastructure/script.fsx ./script.fsx
RUN dotnet fsi ./script.fsx

FROM scratch
COPY --from=snowpack ./app/build ./client
COPY --from=dotnet-func ./app/dotnet/dotnet.zip ./dotnet.zip
COPY --from=farmer ./template.json ./template.json
COPY ./infrastructure/azure.sh ./azure.sh