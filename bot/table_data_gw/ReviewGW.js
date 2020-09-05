const AWS = require("aws-sdk");
const { AWS_REGION, AWS_DYNAMO_ENDPOINT, TABLE } = require('../config')

const awsConfigUpdate = {
  region: AWS_REGION,
}

if (AWS_DYNAMO_ENDPOINT) {
  awsConfigUpdate.endpoint = AWS_DYNAMO_ENDPOINT
}

AWS.config.update(awsConfigUpdate);
//console.log("dynamo config", awsConfigUpdate)

const db = new AWS.DynamoDB({apiVersion: '2012-08-10'});

const TABLE_NAME = TABLE

class ReviewGW {
    static Insert(reviewItem) {
        return new Promise((resolve, reject) => {
            const params = {
                ReturnConsumedCapacity: "TOTAL",
                TableName: TABLE_NAME,
                Item: reviewItem.asItem
            }
            db.puItem(params, (err, data) => {
              if (err) {
                console.log("dynamodb.putItem %j %j", err, params)
                reject(err)
              }
              resolve(data)
            })
        })
    }
}


module.exports = ReviewGW