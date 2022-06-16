#!/usr/bin/env sh

# Usage: 
# generate.sh 1001 heimdall-1001

set -x #echo on

if [ -z "$1" ]
  then
    echo "Bor chain id is required first argument"
  exit 1
fi

if [ -z "$2" ]
  then
    echo "Heimdall chain id is required as second argument"
  exit 1
fi

npm install
npm run truffle:compile
git submodule init
git submodule update
cd dojima-contracts
npm install
node scripts/process-templates.js --dojima-chain-id $1
npm run truffle:compile
cd ..
node generate-borvalidatorset.js --dojima-chain-id $1 --hermes-chain-id $2
npm run truffle:compile
node generate-genesis.js --dojima-chain-id $1 --hermes-chain-id $2
