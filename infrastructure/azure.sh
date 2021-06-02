az login

# create components in Azure
az deployment group create --resource-group refactor2021 --template-file ./template.json

# deploy functions
az functionapp deployment source config-zip -g refactor2021 -n refactor-dotnet --src ./dotnet.zip &
az functionapp deployment source config-zip -g refactor2021 -n refactor-node --src ./node.zip &
wait

# Add function url to frontend config
SNOWPACK_PUBLIC_NODE_API=$(az functionapp show --name refactor-node --resource-group refactor2021 --query "defaultHostName" --output tsv)
SNOWPACK_PUBLIC_DOTNET_API=$(az functionapp show --name refactor-dotnet --resource-group refactor2021 --query "defaultHostName" --output tsv)

echo "
export const SNOWPACK_PUBLIC_NODE_API = 'https://$SNOWPACK_PUBLIC_NODE_API';
export const SNOWPACK_PUBLIC_DOTNET_API = 'https://$SNOWPACK_PUBLIC_DOTNET_API';
" \
>> ./client/_snowpack/env.js

# Deploy frontend to storage account
az storage blob service-properties update --account-name refactorstorage --static-website --index-document index.html
az storage blob sync -c '$web' -s ./client/ --account-name refactorstorage

# get static website url
URL=$(az storage account show -g refactor2021 -n refactorstorage --query "primaryEndpoints.web" --output tsv)
echo "Visit the deployed application at $URL"