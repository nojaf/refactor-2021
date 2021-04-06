module FableApp.Utils

let (|PositiveInteger|_|) (str : string) =
    match System.Int32.TryParse str with
    | true, i when (i > 0) -> Some i
    | _ -> None


let (|PositiveBigInteger|_|) (str : string) =
    match System.Numerics.BigInteger.TryParse str with
    | true, i when (i > (bigint 0)) -> Some i
    | _ -> None
