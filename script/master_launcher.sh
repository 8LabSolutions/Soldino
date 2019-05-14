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

# npm run coverage used from here
echo "doing coverage"
cd	coverage
bash launcher_coverage.sh
echo "splitting coverage"
bash launcher_splitter.sh
cd ..

echo "doing passed and failed test case percentage"
cd	passed_and_failed_test_case_percentage
bash launcher.sh
cd ..

# truffle test used from here
echo "doing truffle test"
cd truffle_test
bash launcher.sh
cd ..

echo "doing deployment cost"
cd	deployment_cost
python3 deployment_cost.py
cd ..

echo "doing call cost"
cd	call_cost
python3 call_cost.py
cd ..

echo "end"