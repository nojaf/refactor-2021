module FableApp.Fibonacci

open Fable.Core
open Fable.React
open Fable.React.Props
open Feliz
open Feliz.UseElmish
open Elmish
open Fetch
open FableApp.Utils
open System

type TimeSpan with

    member this.AsString () =
        this.ToString ("g", Globalization.CultureInfo.InvariantCulture)

type private Msg =
    | Request of int
    | Response of int * int
    | Finish
    | Error of exn

type private Model =
    {
        BaseUrl : string
        Values : Map<int, int>
        Limit : int
        Error : exn option
    }

let private init baseUrl limit =
    {
        BaseUrl = baseUrl
        Values = Map.empty
        Limit = limit
        Error = None
    },
    Cmd.ofMsg (Request 1)

let private requestNumber baseUrl n (dispatch : Dispatch<Msg>) =
    let url = $"{baseUrl}/fibonacci/{n}"

    fetch url []
    |> Promise.bind (fun res -> res.text ())
    |> Promise.map
        (function
        | PositiveInteger i -> Response (n, i) |> dispatch
        | _ -> failwithf "%s did not return a positive integer" url)
    |> Promise.catchEnd (Error >> dispatch)

let private update msg model =
    match msg with
    | Request i -> model, Cmd.ofSub (requestNumber model.BaseUrl i)
    | Response (k, v) ->
        let cmd =
            if k <= model.Limit then
                Cmd.ofMsg (Request (k + 1))
            else
                Cmd.ofMsg Finish

        { model with
            Values = Map.add k v model.Values
        },
        cmd
    | Error err -> { model with Error = Some err }, Cmd.none
    | Finish -> model, Cmd.none

[<ReactComponent>]
let Fibonacci
    (props : {| limit : int
                baseUrl : string
                title : string |})
    =
    let model, dispatch =
        React.useElmish (init props.baseUrl props.limit, update, [| box props.limit |])

    let result =
        match model.Error with
        | Some error ->
            JS.console.warn error

            div [ ClassName "alert alert-danger" ] [
                str "Something went wrong 😅"
            ]
        | None ->
            match Map.tryFind model.Limit model.Values with
            | Some a ->
                div [ ClassName "text-center" ] [
                    strong [] [ ofInt a ]
                ]
            | None ->
                let percentage =
                    if Map.isEmpty model.Values then
                        null
                    else
                        Map.toList model.Values
                        |> List.maxBy fst
                        |> fst
                        |> fun current ->
                            let fc = (float) current
                            let fl = (float) model.Limit

                            (fc / fl) * 100.0 |> sprintf "%.2f%%"

                div [ ClassName "progress" ] [
                    div [
                            ClassName "progress-bar progress-bar-animated"
                            Style [ Width percentage ]
                        ] [
                        str percentage
                    ]
                ]

    div [] [
        h1 [ ClassName "text-center" ] [
            str props.title
        ]
        hr []
        result
    ]
