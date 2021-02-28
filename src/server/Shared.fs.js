import { ofSeq, empty, cons, fold, head } from "./nodejs/Fibonacci/.fable/fable-library.3.1.5/List.js";
import { rangeNumber } from "./nodejs/Fibonacci/.fable/fable-library.3.1.5/Seq.js";

export function fibonacci(n) {
    return head(fold((acc, n_1) => {
        switch (n_1) {
            case 1:
            case 2: {
                return cons(1, acc);
            }
            default: {
                let pattern_matching_result, a, b;
                if (acc.tail != null) {
                    if (acc.tail.tail != null) {
                        pattern_matching_result = 0;
                        a = acc.head;
                        b = acc.tail.head;
                    }
                    else {
                        pattern_matching_result = 1;
                    }
                }
                else {
                    pattern_matching_result = 1;
                }
                switch (pattern_matching_result) {
                    case 0: {
                        return cons(a + b, acc);
                    }
                    case 1: {
                        return acc;
                    }
                }
            }
        }
    }, empty(), ofSeq(rangeNumber(1, 1, n))));
}

