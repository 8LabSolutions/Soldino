#!/bin/bash
# truffle test used instead of npm run coverage because it's more precise
# REQUIRES GANACHE OPENED on port 9545

cd ../..
# open ganache-cli with 10 accounts, the seed phrase, at port 9545


echo "executing 'truffle test'. It takes about 1 min 15 seconds..."
truffle test  > script/truffle_test/truffle_test_ris.txt
echo "cleaning truffle_test_ris.txt ..."

cd script/truffle_test
python3 cleaner2.py
echo "truffle_test_ris.txt is clean."