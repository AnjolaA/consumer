const { Publisher } = require("@pact-foundation/pact")

if (process.env.CI !== "true") {
    console.log("skipping Pact publish as not on CI...")
    process.exit(0)
  }
const gitSha = process.env.CIRCLE_SHA1 
const branch = process.env.CIRCLE_BRANCH

const opts = {
  pactBroker: 'https://anjola.pact.dius.com.au',
  pactBrokerToken: '9DP8sH7nntZn9qcDfLo73w',
  consumerVersion: gitSha,
  pactFilesOrDirs: ['./pact/pacts'],
  tags: [branch],
};

new Publisher(opts).publishPacts()
.then(() => {
  console.log("Pact contract publishing complete!")
  console.log("")
  console.log("Head over to https://anjola.pact.dius.com.au/ and login with")
  console.log("to see your published contracts.")
})
.catch(e => {
  console.log("Pact contract publishing failed: ", e)
})