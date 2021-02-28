module Fibonacci.Shared

let fibonacci n =
    [ 1 .. n ]
    |> List.fold
        (fun acc n ->
            match n with
            | 1
            | 2 -> 1 :: acc
            | _ ->
                match acc with
                | a :: b :: _ -> (a + b) :: acc
                | _ -> acc)
        []
    |> List.head
