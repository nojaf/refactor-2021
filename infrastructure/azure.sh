az login

# create components in Azure
az deployment group create --resource-group refactor2021 --template-file ./template.json

# deploy functions
az functionapp deployment source config-zip -g refactor2021 -n refactor-dotnet --src ./dotnet.zip

# Add function url to frontend config
echo "
export const SNOWPACK_PUBLIC_DOTNET_API = 'https://$(az functionapp show --name refactor-dotnet --resource-group refactor2021 --query "defaultHostName" --output tsv)';" \
>> ./client/_snowpack/env.js

# Deploy frontend to storage account
az storage blob service-properties update --account-name refactorstorage --static-website --index-document index.html
az storage blob sync -c '$web' -s ./client/ --account-name refactorstorage