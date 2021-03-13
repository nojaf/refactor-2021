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

FROM scratch
COPY --from=snowpack ./app/client.zip ./client.zip