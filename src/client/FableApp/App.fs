module FableApp.App

open Fable.Core.JsInterop
open Fable.React
open Fable.React.Props
open Feliz
open Fable.Core
open FableApp.Fibonacci
open FableApp.Utils

[<ReactComponent>]
let private Header () =
    nav [ ClassName "bg-light" ] [
        div [ ClassName "container" ] [
            div [ ClassName "py-5" ] [
                h1 [] [
                    span [ ClassName "text-primary" ] [
                        str "Re:"
                    ]
                    str "factor 2021 ~"
                    blockquote [ ClassName "blockquote pt-2" ] [
                        str "Gitpod and the liberation of tooling installation"
                    ]
                ]
            ]
        ]
    ]

type private Limit =
    | Draft of string
    | Set of int
    | Invalid of string

[<Emit("import.meta.env.SNOWPACK_PUBLIC_NODE_API")>]
let private nodeAPI : string = jsNative

[<Emit("import.meta.env.SNOWPACK_PUBLIC_DOTNET_API")>]
let private dotnetAPI : string = jsNative

[<ReactComponent>]
let private App () =
    let (limit, setLimit) = React.useState<Limit> (Draft "")

    let results =
        match limit with
        | Draft _
        | Invalid _ -> null
        | Set limit ->
            div [ ClassName "row" ] [
                div [ ClassName "col" ] [
                    Fibonacci
                        {|
                            limit = limit
                            baseUrl = nodeAPI
                            title = "Node.Js"
                        |}
                ]
                div [ ClassName "col" ] [
                    Fibonacci
                        {|
                            limit = limit
                            baseUrl = dotnetAPI
                            title = ".NET"
                        |}
                ]
            ]

    let v =
        match limit with
        | Draft v
        | Invalid v -> v
        | Set i -> string i

    let onSubmit (ev : Browser.Types.Event) =
        ev.preventDefault ()

        match limit with
        | Draft (PositiveInteger (d)) -> Set d
        | _ -> limit
        |> setLimit

    let input =
        form [
                 ClassName "row row-cols col-auto g-1 align-items-center mb-4"
                 OnSubmit onSubmit
             ] [
            div [ ClassName "col-10" ] [
                input [ ClassName "form-control border-none rounded-0"
                        Placeholder "Enter a number"
                        Type "number"
                        Value v
                        OnChange (fun ev -> ev.Value |> Draft |> setLimit) ]
            ]
            div [ ClassName "col-2" ] [
                button [
                           ClassName "btn btn-primary text-white rounded-0 w-100"
                       ] [
                    str "Start!"
                ]
            ]
        ]

    fragment [] [
        Header ()
        main [ ClassName "container py-4" ] [
            input
            results
        ]
    ]

exportDefault App
