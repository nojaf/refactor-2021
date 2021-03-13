#r "nuget: Farmer, 1.4.0"

open Farmer
open Farmer.Builders

(*
docker run -it --rm -v "$(pwd):/app" -w "/app" mcr.microsoft.com/azure-cli bash

Create resource group:
 az group create --location WestEurope --name refactor2021
Deploy arm:
  az deployment group create --resource-group refactor2021 --template-file ./template.json
Remove resource group:
  az group delete --name refactor2021
*)

let storage =
    storageAccount {
        name "refactorstorage"
        sku Storage.Sku.Standard_LRS
    }

let plan = servicePlan { name "refactor" }

let ai = appInsights { name "aiRefactor" }

let nodeFunctions =
    functions {
        name "refactor-node"
        use_runtime FunctionsRuntime.Node
        link_to_app_insights ai
        link_to_service_plan plan
        link_to_storage_account storage.Name.ResourceName
    }

let dotnetFunctions =
    functions {
        name "refactor-dotnet"
        use_runtime FunctionsRuntime.DotNet
        link_to_app_insights ai
        link_to_service_plan plan
        link_to_storage_account storage.Name.ResourceName
    }

let deployment =
    arm {
        location Location.WestEurope
        add_resource ai
        add_resource storage
        add_resource plan
        add_resource nodeFunctions
        add_resource dotnetFunctions
    }

deployment |> Writer.quickWrite "template"
