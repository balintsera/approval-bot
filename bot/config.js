module.exports = {
    AWS_REGION: process.env.REGION || 'eu-west-1',
    TABLE: process.env.TABLE || 'ApprovalBotReviews',
    AWS_DYNAMO_ENDPOINT: process.env.AWS_DYNAMO_ENDPOINT || throw "AWS_DYNAMO_ENDPOINT is mandatory"
  };