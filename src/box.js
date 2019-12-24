function body(progress, scale, params){ 
    let width = 80
    let height = 40
    let fontSize = 12
    
    if ('c' in params){
        if (!('color' in params)){
            params.color = params.c
        }
    }
    
    if ('s' in params){
        width = 60
        height = 28
        fontSize = 9
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

    let text = ''
    if (progress || params.title){
        text =`<g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="${fontSize}">
            <text x="50%" y="52%" text-anchor="middle">
            ${(params.title?(params.title + ' '):'') + (progress?(Math.round(ratio * 100) + '%'):'')}
            </text>
        </g>`
    }

    return `<?xml version="1.0" encoding="UTF-8"?>
        <svg width="${width}" height="${height}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid">
            <rect width="${width}" height="${height}" fill="${params.color}" />
            ${text}
        </svg>`
}

exports.handler = function(event, context, callback) {
    const progress = parseInt(event.path.substring(event.path.lastIndexOf('/') + 1))
    callback(null, {
        statusCode: 200,
        headers: {"Content-Type":"image/svg+xml"},
        body: body(progress, 100, event.queryStringParameters)
        });
}
