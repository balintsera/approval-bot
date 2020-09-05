'use strict';

const chai = require('chai');
const expect = chai.expect;
var event, context;

const ReviewItem = require('../../../table_data_gw/ReviewItem')

describe('ReviewItem', function () {
    it('asItem returns a properly formatted item', async () => {
        const review = {
            prId: 1,
            reviewerId: 'balint.sera@logmein.com',
            hash: "ce5965ddd289",
            pr: {
                merge_commit : {  hash :  "764413d85e29" },
            },
            status: ReviewItem.STATUS_UNAPPROVED
        }

        const reviewItem = ReviewItem.build(review.prId, review.reviewerId, review.hash, review.pr, review.status).asItem

        expect(reviewItem).to.be.an('object');
        expect(Object.keys(reviewItem.prID)[0]).to.equal('S');
        expect(reviewItem.prID.S).to.equal(review.prId);

        expect(Object.keys(reviewItem.reviewrId)[0]).to.equal('S');
        expect(reviewItem.reviewrId.S).to.equal(review.reviewerId);

        expect(Object.keys(reviewItem.hash)[0]).to.equal('S');
        expect(reviewItem.hash.S).to.equal(review.hash);

        expect(Object.keys(reviewItem.status)[0]).to.equal('N');
        expect(reviewItem.status.N).to.equal(review.status.toString(10));
    });

});
