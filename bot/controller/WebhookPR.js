const Response = require('../model/Response')
const ReviewItem = require('../table_data_gw/ReviewItem')
const WebhookPrService = require('../services/WebhookPrService')

class WebhookPR {
    constructor(body) {
        this._response = new Response(201, "Created")
        try {
            this._body = JSON.parse(body)
        } catch {
            // wrong body
            this._response = new Response(400, { message: "Json parse error" })
        }
    }

    async control(){
        await (new WebhookPrService(this._body)).convertToReviewItemAndPutIntoDB()
    }

    get Response() {
        return this._response.Formatted
    }
}

module.exports = WebhookPR