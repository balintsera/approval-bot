const ReviewItem = require('../table_data_gw/ReviewItem')

class ReviewItemConvertStrategy {
    convert(prPayload) {
        if (!prPayload || !prPayload.pullrequest || !prPayload.pullrequest.reviewers) {
            throw new Error('Null argument is not allowed with ReviewItemConvertStrategy')
        }
        const root = prPayload.pullrequest;
        return root.reviewers.map(reviewer => {
            return ReviewItem.build(
                root.id,
                reviewer.emailAddress,
                root.source.commit.hash,
                root,
                // it can't be approved if it is a pr webhook payload
            );
        })
    }
}

module.exports = ReviewItemConvertStrategy