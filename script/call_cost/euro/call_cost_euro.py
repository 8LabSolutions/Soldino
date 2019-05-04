import re
import datetime

INPUT_PATH = '../truffle_test/truffle_test_ris.txt'
OUTPUT_PATH = 'call_cost.csv'

def calc_average(list):
	sum = 0
	for i in range(len(list)):
		sum += float(list[i])
	ave = sum/(len(list))
	ave = (round(ave,2)) 
	return ave


# SCRIPT: prendo i prezzi di deploy dei contratti. 
with open (INPUT_PATH,'r') as cv:
	lines = cv.readlines()
	
	
	# flag
	methods = False
	# la maialata
	begin = 'Methods'
	end = 'Deployments' 
	separator = '·················'
	to_skip = 'Contract'
	

	ris = []
	for line in lines:
		
		# considera solo le linee con i le chiamate
		if begin in line: # costo delle chiamate
			methods = True
			continue
		elif end in line:
			methods = False

		if methods and separator not in line and to_skip not in line:
			function_name = re.compile('·\s+(\w+)').search(line)
			call_cost = re.compile('\d+\.\d+').search(line)
			#print (line)
			ris.append([function_name.group(1),call_cost.group()])
			
			# ok, abbiamo nome e prezzo
			# non ci resta che salvare in un array nomi e prezzi. poi calcola la media

	with open (OUTPUT_PATH,'a') as out:
		# data ISO
		iso_time_and_date = datetime.datetime.now().isoformat()
		iso_date = iso_time_and_date[:10]

		# nomi dei contratti
		names = []
		names.append('data')
		for i in range(len(ris)):
			#print (ris[i][0])
			names.append(ris[i][0])
		names.append('average')	
		names =','.join(names) # da lista a stringa

		values = []
		values.append(iso_date)
		# costi delle chiamate	
		for i in range(len(ris)):
			#print (ris[i][1])
			values.append(ris[i][1])
				
		ave = calc_average(values[1:])
		values.append(str(ave))
		values = ','.join(values)

		#out.write(names+'\n') # da stampare solo alla prima stampa
		out.write(values+'\n')
	