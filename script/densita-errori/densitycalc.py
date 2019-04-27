import re
import datetime

INPUT_PATH = "../coverage/coverage.txt"
OUTPUT_PATH = "densitaerrori.csv"
def search_pattern_in_string(pat,str):
	ris = re.compile(pat).search(str)
	return ris.group()

#inputs a line, spits out the first number he finds in the line
def take_number_from_line(l):
	l = l.strip().strip('\n')
	ris = int(search_pattern_in_string('\d+',l))
	return ris

# SCRIPT
density = 0.0
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
		density = 100.00 # no passed
	elif failed == '' and passed != '':
		density = 0.00 # no failed
	else:
		p = take_number_from_line(passed) # tests passed
		np = take_number_from_line(failed) # tests not passed
		total = p + np # total number of tests
		
		density = round((float(np)/float(total)),2 )
		#print ('density = ' + str(density))


with open(OUTPUT_PATH,'a') as d:
	line = str(datetime.datetime.now().isoformat()[:10])+','+str(density)+'\n'
	d.write(line)

