
function fn(context, req) {
    throw (new Error("meh"));
}

export default ((tupledArg) => fn(tupledArg[0], tupledArg[1]));

