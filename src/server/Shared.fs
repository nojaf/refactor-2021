module Fibonacci.Shared

open System.Numerics

let fibonacci (n : int) : BigInteger =
    [ 1 .. n ]
    |> List.fold
        (fun acc n ->
            match n with
            | 1
            | 2 -> (bigint 1) :: acc
            | _ ->
                match acc with
                | a :: b :: _ -> (a + b) :: acc
                | _ -> acc
        )
        []
    |> List.head
