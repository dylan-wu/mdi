
function body(progress, scale, params){
    let color = "#d9534f"
    if (progress / scale > 0.3){
        if (progress <= 0.7) {
            color =  "#f0ad4e"
        } else {
            color = "#5cb85c"
        }
    }

    return `<?xml version="1.0" encoding="UTF-8"?>
        <svg width="124" height="20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid">
            <linearGradient id="a" x2="0" y2="100%">
                <stop offset="0" stop-color="#bbb" stop-opacity=".1"/>
                <stop offset="1" stop-opacity=".1"/>
            </linearGradient>

            <rect rx="4" x="0" width="124" height="20" fill="#428bca"/>
            <rect rx="4" x="64" width="60" height="20" fill="#555" />
            <rect rx="4" x="64" width="${progress / scale * 60}" height="20" fill="${color}" />
                <path fill="${color}" d="M64 0h4v20h-4z" />
            
            <rect rx="4" width="124" height="20" fill="url(#a)" />
                <g fill="#fff" text-anchor="left" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="11">
                <text x="4" y="15" fill="#010101" fill-opacity=".3">
                    ${params.title}
                </text>
                <text x="4" y="14">
                    ${params.title}
                </text>
                </g>
            
            <g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="11">
                <text x="94.0" y="15" fill="#010101" fill-opacity=".3">
                ${progress / scale * 100}%
                </text>
                <text x="94.0" y="14">
                ${progress / scale * 100}%
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
