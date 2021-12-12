const program = require("commander")
const fs = require("fs")
const nunjucks = require("nunjucks")
const web3 = require("web3")
const validators = require("./validators")

program.version("0.0.1")
program.option("--bulldog-chain-id <bulldog-chain-id>", "Bulldog chain id", "1001")
program.option(
  "--watchman-chain-id <watchman-chain-id>",
  "Watchman chain id",
  "watchman-1001"
)
program.option(
  "--first-end-block <first-end-block>",
  "End block for first span",
  "255"
)
program.option(
  "-o, --output <output-file>",
  "BulldogValidatorSet.sol",
  "./contracts/BulldogValidatorSet.sol"
)
program.option(
  "-t, --template <template>",
  "BulldogValidatorSet template file",
  "./contracts/BulldogValidatorSet.template"
)
program.parse(process.argv)

// process validators
validators.forEach(v => {
  v.address = web3.utils.toChecksumAddress(v.address)
})

const data = {
  bulldogChainId: program.bulldogChainId,
  watchmanChainId: program.watchmanChainId,
  firstEndBlock: program.firstEndBlock,
  validators: validators
}
const templateString = fs.readFileSync(program.template).toString()
const resultString = nunjucks.renderString(templateString, data)
fs.writeFileSync(program.output, resultString)
console.log("Bor validator set file updated.")
