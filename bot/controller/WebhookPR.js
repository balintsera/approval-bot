const Response = require('../model/Response')

class WebhookPR {
    constructor(body) {
        this._response = new Response(201, "Created")
        try {
            console.log("body", body)
            this._body = JSON.parse(body)
        } catch {
            // wrong body
            this._response = new Response(400, { message: "Json parse error" })
        }

        // make a db resource of this payload
        // where primary key is a composite of PrID:ReviewerID, secondary global indexes are pr:status, pr:hash

        console.log("parsed body", this._body)
    }

    get Response() {
        return this._response.Formatted
    }
}

module.exports = WebhookPR