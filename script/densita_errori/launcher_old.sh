# requires ganache opened OR
# requires that you have ganache-cli installed on your system
# ganache-cli -a 10 -m "maze pass company priority vacuum brain valley fade image winner entry lock"  -p 9545


cd ../..

# apre in un'altro terminale un'istanza di ganache-cli, necessaria per eseguire 'truffle test'
xterm -e ganache-cli -a 10 -m "maze pass company priority vacuum brain valley fade image winner entry lock"  -p 9545 &
sleep 3
echo "truffle test executing now. It takes about 1 minute..."
truffle test > script/densita-errori/test_results.txt
cd script/densita-errori
grep "passing" test_results.txt > ratio.txt # writes on new file
grep "failing" test_results.txt >> ratio.txt # appends on same file
python3 densitycalc.py
