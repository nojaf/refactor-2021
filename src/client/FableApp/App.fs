module FableApp.App

open Fable.Core.JsInterop
open Fable.React
open Feliz
open Fable.Core.JS

[<ReactComponent>]
let private App () =
    Hooks.useEffect(
        fun () ->    printfn "todo fetch"  
        ,
        [||])

    div [] [
        str "App"
    ]

exportDefault App
