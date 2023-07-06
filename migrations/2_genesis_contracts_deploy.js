const bluebird = require('bluebird')

const DojimaValidatorSet = artifacts.require('DojimaValidatorSet')
const TestDojimaValidatorSet = artifacts.require('TestDojimaValidatorSet')
const BytesLib = artifacts.require('BytesLib')
const ECVerify = artifacts.require('ECVerify')
const IterableMapping = artifacts.require('IterableMapping')
const RLPReader = artifacts.require('RLPReader')
const SafeMath = artifacts.require('SafeMath')
const StateReciever = artifacts.require('StateReceiver')
const TestStateReceiver = artifacts.require('TestStateReceiver')
const TestCommitState = artifacts.require('TestCommitState')
const System = artifacts.require('System')
const ValidatorVerifier = artifacts.require('ValidatorVerifier')

const libDeps = [
    {
        lib: BytesLib,
        contracts: [DojimaValidatorSet, TestDojimaValidatorSet]
    },
    {
        lib: ECVerify,
        contracts: [DojimaValidatorSet, TestDojimaValidatorSet]
    },
    {
        lib: IterableMapping,
        contracts: [StateReciever, TestStateReceiver]
    },
    {
        lib: RLPReader,
        contracts: [DojimaValidatorSet, TestDojimaValidatorSet, StateReciever, TestStateReceiver]
    },
    {
        lib: SafeMath,
        contracts: [DojimaValidatorSet, TestDojimaValidatorSet, StateReciever, TestStateReceiver]
    }
]

module.exports = async function (deployer, network) {
    deployer.then(async () => {
        console.log('linking libs...')
        await bluebird.map(libDeps, async e => {
            await deployer.deploy(e.lib)
            deployer.link(e.lib, e.contracts)
        })

        console.log("Deploying contracts...")
        await Promise.all([
            deployer.deploy(DojimaValidatorSet),
            deployer.deploy(TestDojimaValidatorSet),
            deployer.deploy(StateReciever),
            deployer.deploy(TestStateReceiver),
            deployer.deploy(System),
            deployer.deploy(ValidatorVerifier),
            deployer.deploy(TestCommitState)
        ])
    })
}
