#!/bin/bash
# spostati nella cartella da cui lanciare lo script;
# assegna la somma degli sloc alla variabile ris; stampa ris.
cd ../../contracts
sloc_sol=$(find . -type f -name '*.sol' -exec cat {} \; | sed '/^\s*$/d' | wc -l)


cd ../src
sloc_js=$(find . -type f -name '*.js' -exec cat {} \; | sed '/^\s*$/d' | wc -l)

cd ../src/flat-ui
sloc_to_remove=$(find . -type f -name '*.js' -exec cat {} \; | sed '/^\s*$/d' | wc -l)


ris=$(($sloc_sol + $sloc_js - $sloc_to_remove))
c=,
#data in formato iso yyyy-mm-dd
a=$(date -I)


#pwd
cd ../../script/sloc
echo "$a$c$ris" >> sloc.csv
#cat sloc.csv
