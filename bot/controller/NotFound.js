const Response = require('../model/Response')

class NotFound {
    constructor(message = 'Resource not found') {
        this.response = new Response(404, { message })
    }

    get Response (){
        return this.response.Formatted
    }  
}

module.exports = NotFound