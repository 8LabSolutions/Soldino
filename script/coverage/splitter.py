'''
Il file fa le seguenti cose. 
Prende in input il file coverage_metrics.txt
	il quale estrapola una riga dalle metriche ottenute con 'npm run coverage' eseguito da Travis.
Queste 4 metriche le riscrive in 4 file .csv, pronti per essere presi e fatti a grafico.

'''

import datetime

INPUT_PATH = "coverage.txt"


with open(INPUT_PATH, 'r') as c:

	coverage_line = ''
	lines = c.readlines()
	for line in lines:
		if "All files" in line:
			coverage_line = line
			break # trovata la riga interessante, esci.

	arr = coverage_line.split()
	
	statement_coverage = arr[3]
	branch_coverage = arr[5]
	function_coverage = arr[7]
	line_coverage = arr[9]
	
	coverage_arr = [statement_coverage, branch_coverage, function_coverage, line_coverage]

	iso_time_and_date = datetime.datetime.now().isoformat()
	iso_date = iso_time_and_date[:10]


	with open("statement_coverage.csv", 'a' ) as sc:
		sc.write(iso_date+ ","+ statement_coverage +'\n')

	with open("branch_coverage.csv", 'a' ) as bc:
		bc.write(iso_date+ ","+ branch_coverage +'\n')

	with open("function_coverage.csv", 'a' ) as fc:
		fc.write(iso_date+ ","+ function_coverage +'\n')

	with open("line_coverage.csv", 'a' ) as lc:
		lc.write(iso_date+ ","+ line_coverage +'\n')
