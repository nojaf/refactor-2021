module FableApp.App

open Feliz
open Fable.Core.JsInterop
open Fable.React

[<ReactComponent>]
let private App () =
    div [] [
        str "App"
    ]

exportDefault App
