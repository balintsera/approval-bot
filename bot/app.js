const NotFound = require('./controller/NotFound')
const WebhookPR = require('./controller/WebhookPR')

let response;

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */
exports.lambdaHandler = async (event, context) => {
    try {
        let controller = new NotFound();
        switch(event.path) {
            case '/webhook/pr':
                controller = new WebhookPR(event.body)

                console.log("webhook pr resource")
            break;
        }

        await controller.control();
        response = controller.Response;
    } catch (err) {
        console.log(err);
        return err;
    }

    return response
};
