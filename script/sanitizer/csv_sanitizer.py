'''
Per lanciare: 
	python3 csv_sanitizer.py <path del file da sanificare>

Uso: csv_sanitizer
	prende un file .csv
	ritorna un .csv fixato, cioè
		senza doppie date
		senza righe vuote
		ordinato per data

'''

import collections
import sys

path= sys.argv[1]
with open(path, 'r') as f:
	register = collections.OrderedDict()

	for line in f:
		# skips empty lines
		if line != '\n': 
			line = line.strip('\n').split(',')
			register[line[0]] = line[1]

	keys = list(register.keys())
	#print(keys)
	keys.sort()
	
	# ris contiene stringhe fatte di <data>,<valore>, ordinate e senza duplicati
	ris = []
	for k in keys:
		#print (str(k))
		value = register[str(k)]	
		s = str(k)+','+str(value)
		ris.append(s)
	
	# scrive in output
	with open(path, 'w') as f:
		for line in ris:
			f.write(line+'\n')
