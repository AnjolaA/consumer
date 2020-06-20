if (process.env.CI !== "true") {
    console.log("skipping Pact publish as not on CI...")
    process.exit(0)
  }
  
  const { Publisher } = require("@pact-foundation/pact")
  const path = require("path")
  
  const exec = command =>
    childProcess
      .execSync(command)
      .toString()
      .trim()
  
  //Usually, you would just use the CI env vars, but to allow these examples to run from
  //local development machines, we'll fall back to the git command when the env vars aren't set.
  const gitSha = process.env.TRAVIS_COMMIT || exec("git rev-parse HEAD")
  const branch =
    process.env.TRAVIS_BRANCH || exec("git rev-parse --abbrev-ref HEAD")
  
  const opts = {
    pactFilesOrDirs: [path.resolve(process.cwd(), "pact")],
    pactBroker: "https://anjola.pact.dius.com.au",
    pactBrokerUsername: "21bf0b65-8aa2-48d5-a422-986040604182	",
    pactBrokerPassword: "9DP8sH7nntZn9qcDfLo73w",
    consumerVersion: gitSha,
    tags: [branch],
  }
  
  new Publisher(opts)
    .publishPacts()
    .then(() => {
      console.log("Pact contract publishing complete!")
      console.log("")
      console.log("Head over to https://anjola.pact.dius.com.au/ and login with")
      console.log("=> Username: 21bf0b65-8aa2-48d5-a422-986040604182	")
      console.log("=> Password: O5AIZWxelWbLvqMd8PkAVycBJh2Psyg1")
      console.log("to see your published contracts.")
    })
    .catch(e => {
      console.log("Pact contract publishing failed: ", e)
    })