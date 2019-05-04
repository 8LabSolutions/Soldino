#!/bin/bash

cd ../..
echo "executing 'npm run coverage'. It takes about 2m 30s..."
npm run coverage  > script/coverage/coverage.txt
echo "cleaning coverage.txt..."
cd script/coverage
python3 cleaner.py
echo "coverage.txt is clean and ready for use!"