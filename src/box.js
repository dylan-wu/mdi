function body(progress, scale, params){ 
    if ('c' in params){
        if (!('color' in params)){
            params.color = params.c
        }
    }
    
    const ratio = progress/scale

    if (!('color' in params) && progress){
        params.color = "#d9534f"
        if (ratio > 0.3){
            if (ratio > 0.7) {
                params.color =  "#5cb85c"
            } else {
                params.color = "#f0ad4e"
            }
        }
    }
    console.log(params)
    let text = ''
    if (progress){
        text =`<g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="14">
            <text x="50%" y="50%" text-anchor="middle">
            ${params.title?(params.title + ' '):'' + ratio * 100}%
            </text>
        </g>`
    }

    return `<?xml version="1.0" encoding="UTF-8"?>
        <svg width="120" height="60" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid">
            <rect width="120" height="60" fill="${params.color}" />
            ${text}
        </svg>`
}

exports.handler = function(event, context, callback) {
    const progress = parseInt(event.path.substring(event.path.lastIndexOf('/') + 1))
    console.log(progress)
    callback(null, {
        statusCode: 200,
        headers: {"Content-Type":"image/svg+xml"},
        body: body(progress, 100, event.queryStringParameters)
        });
}
