function body(params){
    return `| progress | 1 | 2 | 3 | 4 | 5 |
|----------|---|---|---|---|---|
| 1 | | | | | |
| 2 | | | | | |
| 3 | | | | | |
| 4 | | | | | |
| 5 | | | | | |`
}

exports.handler = function(event, context, callback) {
    const progress = parseInt(event.path.substring(event.path.lastIndexOf('/') + 1))
    callback(null, {
        statusCode: 200,
        body: body(event.queryStringParameters)
        });
}
