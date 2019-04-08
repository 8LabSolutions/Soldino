#!/bin/bash
# spostati nella cartella da cui lanciare lo script;
# assegna la somma degli sloc alla variabile ris; stampa ris.
cd ../../contracts
sloc_sol=$(find . -type f -name '*.sol' -exec cat {} \; | sed '/^\s*$/d' | wc -l)

cd ../src
sloc_js=$(find . -type f -name '*.js' -exec cat {} \; | sed '/^\s*$/d' | wc -l)


ris=$(($sloc_sol + $sloc_js))
c=,
#data in formato iso yyyy-mm-dd
a=$(date -I)


#pwd
cd ../script/sloc
echo "$a$c$ris" >> sloc.csv
#cat sloc.csv
