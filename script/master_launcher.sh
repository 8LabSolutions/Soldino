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


echo "end"