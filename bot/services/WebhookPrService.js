const PrPayload = require('../model/PrPayload')
const ReviewItemConvertStrategy = require('../services/ReviewItemConvertStrategy')
const ReviewGW = require('../table_data_gw/ReviewGW')

class WebhookPrService {
    constructor(body) {
        this._body = body
    }

    async convertToReviewItemAndPutIntoDB() {
        const items = (new PrPayload(ReviewItemConvertStrategy, this._body)).converted
        console.log(items)
        // store items
        for(let item of items) {
            try {
                await ReviewGW.Insert(item)
            } catch(e) {
                console.log("putitem of a pr failed", item)
            }
        }
    }
}

module.exports = WebhookPrService