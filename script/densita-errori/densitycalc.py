import re
import datetime

def search_pattern_in_string(pat,str):
	ris = re.compile(pat).search(str)
	return ris.group()

#inputs a line, spits out the first number he finds in the line
def take_number_from_line(l):
	l = l.strip().strip('\n')
	ris = int(search_pattern_in_string('\d+',l))
	return ris


density = 0.0
with open ("ratio.txt",'r') as ra:
	lines = ra.readlines()
	
	if len(lines) == 0:
		print("Errore inatteso: nessuna riga in ratio.txt")
	elif len(lines) == 1:
		l0 = lines[0]
		l0 = l0.strip()
		found = str(search_pattern_in_string("[a-z]+",l0))
		if found == "passing":
			density = 0.0 # no errors
		else: # found == "failing"
			density = 100.0 # only errors

	else: # len(lines) == 2
		l0 = lines[0]
		l1 = lines[1]
		
		p = take_number_from_line(l0) # tests passed
		np = take_number_from_line(l1) # tests not passed
		total = p + np # total number of tests
		
		density = round((float(np)/float(total)),2 )
		

with open("densitaerrori.csv",'a') as d:
	line = str(datetime.datetime.now().isoformat()[:10])+','+str(density)+'\n'
	d.write(line)

