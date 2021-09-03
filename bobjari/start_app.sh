#!/bin/bash
export NVM_DIR=$HOME/.nvm
source $NVM_DIR/nvm.sh

nvm use 16.7.0
npm install package.json
node app.js
pm2 start app.js
