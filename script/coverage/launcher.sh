#!/bin/bash

# DISCLAIMER. IT TAKES A WHILE. If problems, execute 'npm install' before launching

echo "coverage launcher begins"
echo "executing 'npm run coverage'. It takes about 1m 40s..."
npm run coverage | grep "All files" > coverage_metrics.txt
python3 splitter.py
echo "coverage launcher ends"