const { Verifier } = require('@pact-foundation/pact');
const path = require('path');

    test("validates the expectations of ProductService", () => {
        let opts = {
            logLevel: "INFO",
            providerBaseUrl: "https://5b71e6c7586eb5001463a7a0.mockapi.io",
            provider: "MyProvider",
            providerVersion: "1.0.0",
            pactBroker: 'https://anjola.pact.dius.com.au',
            pactBrokerToken: '9DP8sH7nntZn9qcDfLo73w',
            consumerVersion: "3c2c1f236032da90b04bf543aa30650c5e988786",
            publishVerificationResult: true,
            pactUrls: [
                path.resolve(__dirname, '../../pact/pacts/myconsumer-myprovider.json')
            ]
        };

        return new Verifier(opts).verifyProvider().finally(() => {
            console.log("Pact Verification Complete!")
        });
    });