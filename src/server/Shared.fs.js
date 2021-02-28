
export function fibonacci(n) {
    const fib = (n_1_mut, continuation_mut) => {
        fib:
        while (true) {
            const n_1 = n_1_mut, continuation = continuation_mut;
            switch (n_1) {
                case 1:
                case 2: {
                    return continuation(1) | 0;
                }
                default: {
                    const n_2 = n_1 | 0;
                    n_1_mut = (n_2 - 1);
                    continuation_mut = ((n1) => fib(n_2 - 2, (n2) => continuation(n1 + n2)));
                    continue fib;
                }
            }
            break;
        }
    };
    return fib(n, (x) => x) | 0;
}

