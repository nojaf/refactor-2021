az login
az deployment group create --resource-group refactor2021 --template-file ./template.json
az storage blob service-properties update --account-name refactorstorage --static-website --index-document index.html
az storage blob sync -c '$web' -s ./client/ --account-name refactorstorage
az functionapp deployment source config-zip -g refactor2021 -n refactor-dotnet --src ./dotnet.zip