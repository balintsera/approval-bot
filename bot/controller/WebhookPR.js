const Response = require('../model/Response')

class WebhookPR {
    constructor(body) {
        this._body = body
    }

    get Response() {
        return new Response(201, "Created").Formatted
    }
}

module.exports = WebhookPR