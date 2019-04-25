truffle test > test_results.txt
grep "passing" > ratio.txt # writes on new file
grep "failing" >> ratio.txt # appends on same file