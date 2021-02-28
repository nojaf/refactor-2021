module Prime

open Fable.Core
open Fable.Core.JsInterop
open Fable.Core.JS
open AzureFunctions

let private fn (context: Context) (req: HttpRequest) : unit =
    printfn "JavaScript HTTP trigger function processed a request."
    let name = 
        req.query.["name"] 
        |> Option.ofObj

    let responseMessage =
        match name with
        | Some n -> $"Hello, {n}. This HTTP triggered function executed successfully."
        | None -> "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response."

    let c = createEmpty<ContextBindings>
    c.status <- 200
    c.body <- responseMessage
    context.res <- Some c

    context.``done``()

exportDefault (System.Action<_,_>(fn))

(*
module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const name = (req.query.name || (req.body && req.body.name));
    const responseMessage = name
        ? "Hello, " + name + ". This HTTP triggered function executed successfully."
        : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}
*)