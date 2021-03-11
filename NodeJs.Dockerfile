FROM mcr.microsoft.com/dotnet/sdk:5.0-focal as dotnet-container
WORKDIR /app
COPY src/server/nodejs /app/nodejs
COPY src/server/Shared.fs /app/Shared.fs
COPY .config/dotnet-tools.json /app/.config/dotnet-tools.json
RUN dotnet tool restore
RUN dotnet fable ./nodejs/Fibonacci/Fibonacci.fsproj -o ./nodejs/Fibonacci

FROM node:15.11 as node-container
WORKDIR /app
COPY --from=dotnet-container /app/nodejs /app
RUN npm i
RUN npm run build

FROM mcr.microsoft.com/azure-functions/node:3.0.3233-node12-core-tools as function-container
WORKDIR /app
EXPOSE 7000
COPY --from=node-container /app/host.json /app
RUN mkdir ./Fibonacci
COPY --from=node-container /app/Fibonacci/index.js /app/Fibonacci/index.js
COPY --from=node-container /app/Fibonacci/function.json /app/Fibonacci/function.json
ENTRYPOINT func host start --javascript --port 7000 --cors *