#!/bin/bash
echo "begin"

echo "doing sloc"
cd sloc
bash sloc.sh
cd ..

echo "doing ccr"
cd ccr
python3 ccr.py
cd ..

echo "doing coverage"
cd	coverage
bash launcher_coverage.sh
cd ..

echo "splitting coverage"
cd	coverage
bash launcher_splitter.sh
cd ..

echo "doing densità errori"
cd	densita-errori
bash launcher.sh
cd ..

echo "doing deployment cost"
cd	deployment-cost
python3 deployment-cost.py
cd ..

echo "end"