const AWS = require("aws-sdk");
const DynamoAttribute = require('../services/DynamoAttribute')

class ReviewItem {

    static get STATUS_UNAPPROVED() {
        return 0
    }

    static get STATUS_APPROVED() {
        return 1
    }

    static build(prID, reviewerId, hash, pr, status) {
        return new ReviewItem(prID, reviewerId, hash, pr, status)
    }
    constructor(prID, reviewerId, hash, pr, status = ReviewItem.STATUS_UNAPPROVED) {
        this._prID = prID
        this._reviewerId = reviewerId
        this._hash = hash
        this._status = status
        this._pr = pr
    }

    get asItem() {
        return {
            "prID": { S: this._prID },
            "reviewrId": { S: this._reviewerId },
            "hash": { S: this._hash },
            "status": { N: DynamoAttribute.number(this._status) },
            "pr": AWS.DynamoDB.Converter.marshall(this._pr)
        }
    }
}

module.exports = ReviewItem