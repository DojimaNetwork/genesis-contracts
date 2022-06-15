const program = require("commander")
const fs = require("fs")
const nunjucks = require("nunjucks")
const web3 = require("web3")
const validators = require("./validators")

program.version("0.0.1")
program.option("--dojima-chain-id <dojima-chain-id>", "Dojima chain id", "1001")
program.option(
  "--hermes-chain-id <hermes-chain-id>",
  "Hermes chain id",
  "hermes-1001"
)
program.option(
  "--first-end-block <first-end-block>",
  "End block for first span",
  "255"
)
program.option(
  "-o, --output <output-file>",
  "DojimaValidatorSet.sol",
  "./contracts/DojimaValidatorSet.sol"
)
program.option(
  "-t, --template <template>",
  "DojimaValidatorSet template file",
  "./contracts/DojimaValidatorSet.template"
)
program.parse(process.argv)

// process validators
validators.forEach(v => {
  v.address = web3.utils.toChecksumAddress(v.address)
})

const data = {
  dojimaChainId: program.dojimaChainId,
  hermesChainId: program.hermesChainId,
  firstEndBlock: program.firstEndBlock,
  validators: validators
}
const templateString = fs.readFileSync(program.template).toString()
const resultString = nunjucks.renderString(templateString, data)
fs.writeFileSync(program.output, resultString)
console.log("Dojima validator set file updated.")
