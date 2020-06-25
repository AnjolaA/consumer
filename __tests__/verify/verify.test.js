const { Verifier } = require('@pact-foundation/pact');
const path = require('path');

const gitSha = process.env.CIRCLE_SHA1 
    test("validates the expectations of ProductService", () => {
        let opts = {
            logLevel: "INFO",
            providerBaseUrl: "https://5b71e6c7586eb5001463a7a0.mockapi.io",
            provider: "MyProvider",
            providerVersion: "1.0.0",
            pactBrokerUrl: "https://anjola.pact.dius.com.au/",
            pactBrokerToken: '9DP8sH7nntZn9qcDfLo73w',
            consumerVersion: gitSha,
            // pactUrls: [
            //     path.resolve(__dirname, '../../pact/pacts/myconsumer-myprovider.json')
            // ]
        };
        if (process.env.CI !== "true") {
            console.log("On CI Pubishing results")
            Object.assign(opts, {
                publishVerificationResult: true,
              });
          }


        return new Verifier(opts).verifyProvider().finally(() => {
            console.log("Pact Verification Complete!")
        });
    });