import { interpolate, toConsole, printf, toText } from "./.fable/fable-library.3.1.5/String.js";
import { ofNullable } from "./.fable/fable-library.3.1.5/Option.js";

function fn(context, req) {
    let arg10;
    context.log.info((arg10 = (req.params["n"]), toText(printf("REQ: %A"))(arg10)));
    toConsole(printf("JavaScript HTTP trigger function processed a request."));
    const name = ofNullable(req.query["name"]);
    const responseMessage = (name == null) ? "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response." : toText(interpolate("Hello, %P(). This HTTP triggered function executed successfully.", [name]));
    const c = {};
    c.status = 200;
    c.body = responseMessage;
    context.res = c;
    context.done();
}

export default ((delegateArg0, delegateArg1) => {
    fn(delegateArg0, delegateArg1);
});

