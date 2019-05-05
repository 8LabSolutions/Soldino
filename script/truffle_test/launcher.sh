#!/bin/bash
# truffle test used instead of npm run coverage because it's more precise
# requires ganache opened

cd ../..
echo "executing 'truffle test'. It takes about 1 min 15 seconds..."
truffle test  > script/truffle_test/truffle_test_ris.txt
echo "cleaning truffle_test_ris.txt ..."

cd script/truffle_test
python3 cleaner2.py
echo "truffle_test_ris.txt is clean."