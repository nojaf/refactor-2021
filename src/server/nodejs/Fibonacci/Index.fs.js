import { tryParse } from "./.fable/fable-library.3.1.5/Int32.js";
import { FSharpRef } from "./.fable/fable-library.3.1.5/Types.js";
import { int32ToString } from "./.fable/fable-library.3.1.5/Util.js";
import { fibonacci } from "../../Shared.fs.js";
import { interpolate, toText } from "./.fable/fable-library.3.1.5/String.js";

function $007CValidInput$007C_$007C(n) {
    let matchValue;
    let outArg = 0;
    matchValue = [tryParse(n, 511, false, 32, new FSharpRef(() => outArg, (v) => {
        outArg = v;
    })), outArg];
    let pattern_matching_result;
    if (matchValue[0]) {
        if (matchValue[1] > 0) {
            pattern_matching_result = 0;
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
            return matchValue[1];
        }
        case 1: {
            return void 0;
        }
    }
}

function fn(context, req) {
    const res = {};
    const nParam = req.params["n"];
    const activePatternResult111 = $007CValidInput$007C_$007C(nParam);
    if (activePatternResult111 != null) {
        const n = activePatternResult111 | 0;
        context.log.info("Calculating Fibonacci for {n}");
        res.status = 200;
        res.body = int32ToString(fibonacci(n));
    }
    else {
        context.log.warn(toText(interpolate("Invalid n: %P()", [nParam])));
        res.status = 400;
        res.body = toText(interpolate("Value for n (\u0027%P()\u0027) could not be parsed", [nParam]));
    }
    context.res = res;
    context.done();
}

export default ((delegateArg0, delegateArg1) => {
    fn(delegateArg0, delegateArg1);
});

