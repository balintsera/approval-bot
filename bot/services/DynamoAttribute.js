const MISSING_NUM = '0'

class DynamoAttribute {
    static number(anyType, log = false) {
        if (log) {
            console.log("anytype", anyType)
        }
        if (anyType === null) {
            return MISSING_NUM
        }
        if (typeof anyType === 'undefined') {
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


module.exports = DynamoAttribute

