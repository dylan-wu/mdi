
function body(progress, scale, params={}){
    progress = parseInt(progress)
    if (!progress || isNaN(progress)){
        progress = 0
    }
    if (!scale || isNaN(scale)){
        scale = 100
    }    
    let color = "#d9534f"
    const ratio = progress / scale
    if (ratio > 0.3){
        if (ratio <= 0.7) {
            color =  "#f0ad4e"
        } else {
            color = "#5cb85c"
        }
    }

    title = ''
    titleBg = ''
    progressX = 58

    if ('title' in params && params.title){
        progressX = 94.0
        title = `<g fill="#fff" text-anchor="left" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="11">
        <text x="4" y="15" fill="#010101" fill-opacity=".3">
            ${params.title}
        </text>
        <text x="4" y="14">
            ${params.title}
        </text>
        </g>`
    }

    return `<?xml version="1.0" encoding="UTF-8"?>
        <svg width="124" height="20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid">
            <rect rx="4" x="0" width="124" height="20" fill="#000" />
            <rect rx="4" x="0" width="${ratio * 124}" height="20" fill="${color}" />
                <path fill="${color}"  />
            ${title}                
            <g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="11">
                <text x="${progressX}" y="15" fill="#010101" fill-opacity=".3">
                ${Math.round(progress / scale * 100)}%
                </text>
                <text x="${progressX}" y="14">
                ${Math.round(progress / scale * 100)}%
                </text>
            </g>
        </svg>`
}

exports.handler = function(event, context, callback) {
    const progress = event.path.substring(event.path.lastIndexOf('/')+1)
    callback(null, {
        statusCode: 200,
        headers: {"Content-Type":"image/svg+xml"},
        body: body(progress, 100, event.queryStringParameters)
        });
}