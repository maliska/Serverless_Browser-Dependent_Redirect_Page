// tutorial: http://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/lambda-examples.html#lambda-examples-http-redirect
// event structure: http://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/lambda-event-structure.html

'use strict';
exports.handler = (event, context, callback) => {
    const request = event.Records[0].cf.request;
    const headers = request.headers;
    const agent = headers["user-agent"][0].value;
    var   target = "https://chrome.google.com/webstore/detail/nasa-acronyms/anpbkdhjbebjjkgdbglbcfaenjldbinf";
    
    if(agent.toLowerCase().indexOf("firefox") > -1) {
        target = "https://addons.mozilla.org/en-US/firefox/addon/nasa-acronyms/"
    }
    
    const response = {
        status: '302',
        statusDescription: 'Found',
        headers: {
            location: [{
                key: 'Location',
                value: target,
            }],
        },
    };
    callback(null, response);
};
