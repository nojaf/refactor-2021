module Fibonacci.Function

open Microsoft.Azure.WebJobs
open Microsoft.Azure.WebJobs.Extensions.Http
open Microsoft.AspNetCore.Http
open Microsoft.Extensions.Logging
open System.Net
open System.Net.Http
open Fibonacci.Shared

let private sendText text =
    new HttpResponseMessage (
        HttpStatusCode.OK,
        Content = new StringContent (text, System.Text.Encoding.UTF8, "text/plain")
    )

let private sendBadRequest error =
    new HttpResponseMessage (
        HttpStatusCode.BadRequest,
        Content = new StringContent (error, System.Text.Encoding.UTF8, "text/plain")
    )

[<FunctionName("Fibonacci")>]
let run
    ([<HttpTrigger(AuthorizationLevel.Function, "get", Route = "fibonacci/{n:int}")>] req : HttpRequest)
    (log : ILogger)
    (n : int)
    =
    async {
        log.LogInformation ("F# HTTP trigger function processed a request.")

        if n > 0 then
            log.LogInformation (sprintf "Calculating Fibonacci for %i" n)
            return sendText (string (fibonacci n))
        else
            log.LogWarning(sprintf "Invalid n: %i" n)
            return sendBadRequest (sprintf "Value for n should be positive, instead got %i" n)
    }
    |> Async.StartAsTask
