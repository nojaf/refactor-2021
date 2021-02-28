module Fibonacci.Shared

let fibonacci n =
    let rec fib n (continuation: int -> int) : int =
        match n with
        | 1
        | 2 -> continuation 1
        | n -> fib (n - 1) (fun n1 -> fib (n - 2) (fun n2 -> n1 + n2 |> continuation))

    fib n id
