# genesis-contracts

#### Setup genesis

Setup genesis whenever contracts get changed
### 1. Install dependencies and submodules
```bash
$ npm install
$ git submodule init
$ git submodule update
```

### 2. Compile Dojima contracts
```bash
$ cd dojima-contracts
$ npm install
$ node scripts/process-templates.js --dojima-chain-id 1001
$ npm run truffle:compile
$ cd ..
```

### 3. Generate Dojima validator set sol file

Following command will generate `DojimaValidatorSet.sol` file from `DojimaValidatorSet.template` file.



```bash
# Generate dojima validator set using stake and balance
# Modify validators.json before as per your need
$ node generate-dojimavalidatorset.js --dojima-chain-id 1001 --hermes-chain-id hermeschain

$ git submodule foreach git merge origin master
```

### 4. Compile contracts
```bash
#installation of npm v12.0.0 is required
$ npm run truffle:compile
```

### 5. Generate genesis file

Following command will generate `genesis.json` file from `genesis-template.json` file.

```bash
# Generate genesis file
$ node generate-genesis.js --dojima-chain-id 1001 --hermes-chain-id hermeschain
```

### 6. Run Tests
```bash
$ npm run testrpc
$ npm test
```

