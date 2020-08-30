const AWS = require("aws-sdk");
const { AWS_REGION, AWS_DYNAMO_ENDPOINT, TABLE } = require('../../config')

const awsConfigUpdate = {
  region: AWS_REGION,
}

if (AWS_DYNAMO_ENDPOINT) {
  awsConfigUpdate.endpoint = AWS_DYNAMO_ENDPOINT
}

AWS.config.update(awsConfigUpdate);
//console.log("dynamo config", awsConfigUpdate)

const dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

const TABLE_NAME = TABLE
const MISSING_NUM = '0'
class ReviewGW {
    static Insert(review) {
        const params = {
            ReturnConsumedCapacity: "TOTAL", 
            TableName: TABLE_NAME,
            Item: {
                "ID": { S: realEstate.id },
                "Address": { S: realEstate.address || missing },
                "ForeignId":  { S: realEstate.foreignID || missing },
                "Price": { N: RealEstateGateway.numberForDynamo(realEstate.price) },
                "RoomNum": { N: RealEstateGateway.numberForDynamo(realEstate.roomCountNum) },
                "Size": { N: RealEstateGateway.numberForDynamo(realEstate.sizeNum) },
                "BaseURL": { S: realEstate.baseURL || missing },
                "AbsoluteURL": { S: realEstate.absoluteURL || missing },
                "ImageURL": { S: realEstate.imageURL || missing }
              }
        }
        
        const prom = new Promise((resolve, reject) => {
            dynamodb.puItem(params, (err, data) => {
              if (err) {
                console.log("dynamodb.putItem %j %j", err, params)
                reject(err)
              }
              resolve(data)
            })
        })
    }

  static numberForDynamo(anyType, log = false) {
    if (log) {
      console.log("anytype", anyType)
    }
    if (anyType === null) {
      return MISSING_NUM
    }
    if (typeof anyType  === 'undefined') {
      return MISSING_NUM
    }

    if (isNaN(anyType)) {
      return MISSING_NUM
    }

    if (typeof anyType === 'number') {
      return anyType.toString()
    }

    if (typeof anyType === 'string') {
      // this will handle the case when the result is an empty string
      return this.numberForDynamo(anyType.replace(/[^0-9.,], ''/).replace(/,/, '.'))
    }

    console.log("Strange number format: %j", anyType)

    return MISSING_NUM
  }

}

module.exports = RealEstateGateway