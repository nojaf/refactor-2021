module Fibonacci.Function

open Fable.Core.JsInterop
open AzureFunctions
open System
open Fibonacci.Shared

let private (|ValidInput|_|) (n : string) =
    match Int32.TryParse (n) with
    | true, n when (n > 0) -> Some n
    | _ -> None

let private fn (context : Context) (req : HttpRequest) : unit =
    let res = createEmpty<HttpResponse>
    let nParam = req.``params``.["n"]

    match nParam with
    | ValidInput n ->
        context.log.info ($"Calculating Fibonacci for {n}")
        res.status <- 200
        res.body <- string (fibonacci n)
    | _ ->
        context.log.warn ($"Invalid n: {nParam}")
        res.status <- 400
        res.body <- $"Value for n ('{nParam}') could not be parsed"

    context.res <- Some res
    context.``done`` ()

exportDefault (Action<_, _> (fn))
