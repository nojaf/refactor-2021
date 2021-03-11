module rec AzureFunctions

open System
open Fable.Core
open Fable.Core.JS

type Error = System.Exception


/// <summary>
/// Interface for your Azure Function code. This function must be exported (via module.exports or exports)
/// and will execute when triggered. It is recommended that you declare this function as async, which
/// implicitly returns a Promise.
/// </summary>
/// <param name="context">Context object passed to your function from the Azure Functions runtime.</param>
/// <param name="args">
/// Optional array of input and trigger binding data. These binding data are passed to the
/// function in the same order that they are defined in function.json. Valid input types are string, HttpRequest,
/// and Buffer.
/// </param>
/// <returns>
/// Output bindings (optional). If you are returning a result from a Promise (or an async function), this
/// result will be passed to JSON.stringify unless it is a string, Buffer, ArrayBufferView, or number.
/// </returns>
[<AllowNullLiteral>]
type AzureFunction =
    /// <summary>
    /// Interface for your Azure Function code. This function must be exported (via module.exports or exports)
    /// and will execute when triggered. It is recommended that you declare this function as async, which
    /// implicitly returns a Promise.
    /// </summary>
    /// <param name="context">Context object passed to your function from the Azure Functions runtime.</param>
    /// <param name="args">
    /// Optional array of input and trigger binding data. These binding data are passed to the
    /// function in the same order that they are defined in function.json. Valid input types are string, HttpRequest,
    /// and Buffer.
    /// </param>
    /// <returns>
    /// Output bindings (optional). If you are returning a result from a Promise (or an async function), this
    /// result will be passed to JSON.stringify unless it is a string, Buffer, ArrayBufferView, or number.
    /// </returns>
    [<Emit "$0($1...)">]
    abstract Invoke : context : Context * [<ParamArray>] args : obj option [] -> U2<Promise<obj option>, unit>

/// The context object can be used for writing logs, reading data from bindings, setting outputs and using
/// the context.done callback when your exported function is synchronous. A context object is passed
/// to your function from the Azure Functions runtime on function invocation.
[<AllowNullLiteral>]
type Context =
    /// A unique GUID per function invocation.
    abstract invocationId : string with get, set
    /// Function execution metadata.
    abstract executionContext : ExecutionContext with get, set
    /// Input and trigger binding data, as defined in function.json. Properties on this object are dynamically
    /// generated and named based off of the "name" property in function.json.
    abstract bindings : HttpResponse with get, set
    /// Trigger metadata and function invocation data.
    abstract bindingData : HttpResponse with get, set
    /// TraceContext information to enable distributed tracing scenarios.
    abstract traceContext : TraceContext with get, set
    /// Bindings your function uses, as defined in function.json.
    abstract bindingDefinitions : ResizeArray<BindingDefinition> with get, set
    /// Allows you to write streaming function logs. Calling directly allows you to write streaming function logs
    /// at the default trace level.
    abstract log : Logger with get, set
    /// <summary>
    /// A callback function that signals to the runtime that your code has completed. If your function is synchronous,
    /// you must call context.done at the end of execution. If your function is asynchronous, you should not use this
    /// callback.
    /// </summary>
    /// <param name="err">A user-defined error to pass back to the runtime. If present, your function execution will fail.</param>
    /// <param name="result">
    /// An object containing output binding data. <c>result</c> will be passed to JSON.stringify unless it is
    /// a string, Buffer, ArrayBufferView, or number.
    /// </param>
    abstract ``done`` : ?err : U2<Error, string> * ?result : obj -> unit
    /// HTTP request object. Provided to your function when using HTTP Bindings.
    abstract req : HttpRequest option with get, set
    /// HTTP response object. Provided to your function when using HTTP Bindings.
    abstract res : HttpResponse option with get, set

/// HTTP request object. Provided to your function when using HTTP Bindings.
[<AllowNullLiteral>]
type HttpRequest =
    /// HTTP request method used to invoke this function.
    abstract method : HttpMethod option with get, set
    /// Request URL.
    abstract url : string with get, set
    /// HTTP request headers.
    abstract headers : HttpHeaders with get, set
    /// Query string parameter keys and values from the URL.
    abstract query : HttpHeaders with get, set
    /// Route parameter keys and values.
    abstract ``params`` : HttpHeaders with get, set
    /// The HTTP request body.
    abstract body : obj option with get, set
    /// The HTTP request body as a UTF-8 string.
    abstract rawBody : obj option with get, set

/// Possible values for an HTTP request method.
[<StringEnum>]
[<RequireQualifiedAccess>]
type HttpMethod =
    | [<CompiledName "GET">] GET
    | [<CompiledName "POST">] POST
    | [<CompiledName "DELETE">] DELETE
    | [<CompiledName "HEAD">] HEAD
    | [<CompiledName "PATCH">] PATCH
    | [<CompiledName "PUT">] PUT
    | [<CompiledName "OPTIONS">] OPTIONS
    | [<CompiledName "TRACE">] TRACE
    | [<CompiledName "CONNECT">] CONNECT

/// Http response cookie object to "Set-Cookie"
[<AllowNullLiteral>]
type Cookie =
    /// Cookie name
    abstract name : string with get, set
    /// Cookie value
    abstract value : string with get, set
    /// Specifies allowed hosts to receive the cookie
    abstract domain : string option with get, set
    /// Specifies URL path that must exist in the requested URL
    abstract path : string option with get, set
    /// NOTE: It is generally recommended that you use maxAge over expires.
    /// Sets the cookie to expire at a specific date instead of when the client closes.
    /// This can be a Javascript Date or Unix time in milliseconds.
    abstract expires : U2<DateTime, float> option with get, set
    /// Sets the cookie to only be sent with an encrypted request
    abstract secure : bool option with get, set
    /// Sets the cookie to be inaccessible to JavaScript's Document.cookie API
    abstract httpOnly : bool option with get, set
    /// Can restrict the cookie to not be sent with cross-site requests
    abstract sameSite : CookieSameSite option with get, set
    /// Number of seconds until the cookie expires. A zero or negative number will expire the cookie immediately.
    abstract maxAge : float option with get, set

[<AllowNullLiteral>]
type ExecutionContext =
    /// A unique GUID per function invocation.
    abstract invocationId : string with get, set
    /// The name of the function that is being invoked. The name of your function is always the same as the
    /// name of the corresponding function.json's parent directory.
    abstract functionName : string with get, set
    /// The directory your function is in (this is the parent directory of this function's function.json).
    abstract functionDirectory : string with get, set

/// TraceContext information to enable distributed tracing scenarios.
[<AllowNullLiteral>]
type TraceContext =
    /// Describes the position of the incoming request in its trace graph in a portable, fixed-length format.
    abstract traceparent : string option with get, set
    /// Extends traceparent with vendor-specific data.
    abstract tracestate : string option with get, set
    /// Holds additional properties being sent as part of request telemetry.
    abstract attributes : TraceContextAttributes option with get, set

[<AllowNullLiteral>]
type BindingDefinition =
    /// The name of your binding, as defined in function.json.
    abstract name : string with get, set
    /// The type of your binding, as defined in function.json.
    abstract ``type`` : string with get, set
    /// The direction of your binding, as defined in function.json.
    abstract direction : BindingDefinitionDirection with get, set

/// Allows you to write streaming function logs.
[<AllowNullLiteral>]
type Logger =
    /// Writes streaming function logs at the default trace level.
    [<Emit "$0($1...)">]
    abstract Invoke : [<ParamArray>] args : obj [] -> unit
    /// Writes to error level logging or lower.
    abstract error : [<ParamArray>] args : obj [] -> unit
    /// Writes to warning level logging or lower.
    abstract warn : [<ParamArray>] args : obj [] -> unit
    /// Writes to info level logging or lower.
    abstract info : [<ParamArray>] args : obj [] -> unit
    /// Writes to verbose level logging.
    abstract verbose : [<ParamArray>] args : obj [] -> unit

[<AllowNullLiteral>]
type HttpResponse =
    abstract status : int with get, set
    abstract body : string with get, set
    abstract headers : HttpHeaders with get, set

[<AllowNullLiteral>]
type HttpHeaders =
    [<EmitIndexer>]
    abstract Item : key : string -> string with get, set

[<StringEnum>]
[<RequireQualifiedAccess>]
type CookieSameSite =
    | [<CompiledName "Strict">] Strict
    | [<CompiledName "Lax">] Lax
    | [<CompiledName "None">] None

[<AllowNullLiteral>]
type TraceContextAttributes =
    [<EmitIndexer>]
    abstract Item : k : string -> string with get, set

[<StringEnum>]
[<RequireQualifiedAccess>]
type BindingDefinitionDirection =
    | In
    | Out
    | Inout
