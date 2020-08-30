class Response {
    constructor(code = 200, body = {}) {
        this._code = code
        this._body = body
    }

    get Formatted() {
        return {
            'statusCode': parseInt(this._code),
            'body': JSON.stringify(this._body)
        }
    }
}

module.exports = Response