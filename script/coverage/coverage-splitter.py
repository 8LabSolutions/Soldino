'''
Il file fa le seguenti cose. 
Prende in input il file coverage_metrics.txt
	il quale estrapola una riga dalle metriche ottenute con 'npm run coverage' eseguito da Travis.
Queste 4 metriche le riscrive in 4 file .csv, pronti per essere presi e fatti a grafico.

'''

import datetime

with open("../files/coverage_metrics.txt") as cm:
	l = cm.readline()
	arr = l.split()
	
	statement_coverage = arr[3]
	branch_coverage = arr[5]
	function_coverage = arr[7]
	line_coverage = arr[9]
	
	coverage_arr = [statement_coverage, branch_coverage, function_coverage, line_coverage]
	#print (coverage_arr)

	iso_time_and_date = datetime.datetime.now().isoformat()
	iso_date = iso_time_and_date[:10]

	with open("../files/statement_coverage.csv", 'a' ) as sc:
		sc.write(iso_date+ ","+ statement_coverage +'\n')

	with open("../files/branch_coverage.csv", 'a' ) as bc:
		bc.write(iso_date+ ","+ branch_coverage +'\n')

	with open("../files/function_coverage.csv", 'a' ) as fc:
		fc.write(iso_date+ ","+ function_coverage +'\n')

	with open("../files/line_coverage.csv", 'a' ) as lc:
		lc.write(iso_date+ ","+ line_coverage +'\n')