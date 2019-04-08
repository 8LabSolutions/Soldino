#!/bin/bash

# DISCLAIMER. IT TAKES A WHILE. If problems, execute 'npm install' before launching

echo "coverage launcher begins"
echo "WARNING: executing 'npm run coverage'. It may take a while..."
npm run coverage | grep "All files" > coverage_metrics.txt
python3 splitter.py
echo "coverage launcher ends"