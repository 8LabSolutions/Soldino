# ABBREVIATIONS
# ptcp = passed test cases percentage
# ftcp = failed tets cases percentage

import re
import datetime

INPUT_PATH = "../coverage/coverage.txt"
OUTPUT_PATH_PASSED = "passed.csv"
OUTPUT_PATH_FAILED = "failed.csv"

def search_pattern_in_string(pat,str):
	ris = re.compile(pat).search(str)
	return ris.group()

#inputs a line, spits out the first number he finds in the line
def take_number_from_line(l):
	l = l.strip().strip('\n')
	ris = int(search_pattern_in_string('\d+',l))
	return ris

# SCRIPT
ftcp = 0.00
ptcp = 0.00

with open (INPUT_PATH,'r') as ra:
	
	lines = ra.readlines()
	passed = ''
	failed = ''

	for line in lines:
		if 'passing' in line:
			passed = line
		if 'failing' in line:
			failed = line

	if passed == '' and failed != '':
		ftcp = 100.00 # no passed
		ptcp = 0.00
	elif failed == '' and passed != '':
		ftcp = 0.00 # no failed
		ptcp = 100.00
	else:
		p = take_number_from_line(passed) # tests passed
		np = take_number_from_line(failed) # tests not passed
		total = p + np # total number of tests
		
		ftcp = round((float(np)/float(total)),2 )
		ptcp = 100 - ftcp
	
	


with open(OUTPUT_PATH_PASSED,'a') as d:
	line = str(datetime.datetime.now().isoformat()[:10])+','+str(ptcp)+'\n'
	d.write(line)

with open(OUTPUT_PATH_FAILED,'a') as d:
	line = str(datetime.datetime.now().isoformat()[:10])+','+str(ftcp)+'\n'
	d.write(line)
