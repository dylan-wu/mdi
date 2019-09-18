
function body(params){ 
    if ('c' in params){
        console.log('k')
        if (!('color' in params)){
            params.color = params.c
        }
    }
    console.log(params)
    return `<?xml version="1.0" encoding="UTF-8"?>
        <svg width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid">
            <rect width="100%" height="100%" fill="${params.color}" />
        </svg>`
}

exports.handler = function(event, context, callback) {
    console.log(event)
    callback(null, {
        statusCode: 200,
        headers: {"Content-Type":"image/svg+xml"},
        body: body(event.queryStringParameters)
        });
}
