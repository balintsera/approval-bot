'use strict';

const app = require('../../app.js');
const chai = require('chai');
const expect = chai.expect;
const event = require('../../../events/pr-webhook-event.json')

describe('app.ja', function () {
    it('pr webook event has a successful response', async () => {
        const result = await app.lambdaHandler(event, context)

        expect(result).to.be.an('object');
        expect(result.statusCode).to.equal(201);
        expect(result.body).to.be.an('string');

        let response = JSON.parse(result.body);
    });

});
