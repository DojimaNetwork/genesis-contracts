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
$ cd watchman-contracts
$ npm install
$ node scripts/process-templates.js --dojima-chain-id <dojima-chain-id>
$ npm run truffle:compile
$ cd ..
```

### 3. Generate Bulldog validator set sol file

Following command will generate `DojimaValidatorSet.sol` file from `DojimaValidatorSet.template` file.

```bash
# Generate dojima validator set using stake and balance
# Modify validators.json before as per your need
$ git submodule foreach git merge origin master
```

### 4. Compile contracts
```bash
$ npm run truffle:compile
```

### 5. Generate genesis file

Following command will generate `genesis.json` file from `genesis-template.json` file.

```bash
# Generate genesis file
$ node generate-genesis.js --dojima-chain-id <dojima-chain-id> --hermes-chain-id <hermes-chain-id>
```

### 6. Run Tests
```bash
$ npm run testrpc
$ npm test
```
