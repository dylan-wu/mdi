
function body(progress, scale, params){
    const ratio = progress/scale

    let color = "#d9534f"
    if (ratio > 0.3){
        if (ratio > 0.7) {
            color =  "#5cb85c"
        } else {
            color = "#f0ad4e"
        }
    }

    title = ''
    progressX = 0

    if (programs.title){
        progressX = 94.0
        title = `<rect rx="4" width="124" height="20" fill="url(#a)" />
        <g fill="#fff" text-anchor="left" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="11">
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
            <linearGradient id="a" x2="0" y2="100%">
                <stop offset="0" stop-color="#bbb" stop-opacity=".1"/>
                <stop offset="1" stop-opacity=".1"/>
            </linearGradient>

            <rect rx="4" x="0" width="124" height="20" fill="#428bca"/>
            <rect rx="4" x="64" width="60" height="20" fill="#555" />
            <rect rx="4" x="64" width="${ratio * 60}" height="20" fill="${color}" />
                <path fill="${color}" d="M64 0h4v20h-4z" />
            
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
    const progress = parseInt(event.path.substring(event.path.lastIndexOf('/')+1))
    callback(null, {
        statusCode: 200,
        headers: {"Content-Type":"image/svg+xml"},
        body: body(progress, 100, event.queryStringParameters)
        });
}
