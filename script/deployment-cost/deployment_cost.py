import re
import datetime

INPUT_PATH = '../coverage/coverage.txt'
OUTPUT_PATH = 'deployment_cost.csv'

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
	deployments = False
	# la maialata
	separator = '·····································'
	end = '·---------------------------------' 

	ris = []
	for line in lines:
		
		# considera solo le linee con i prezzi di deployment
		if 'Deployments'  in line: # prezzi di deployement
			deployments = True
			continue
		elif end in line:
			deployments = False

		if deployments and separator not in line:
			contract_name = re.compile('\w+').search(line)
			contract_deploy_price = re.compile('\d+\.\d+').search(line)

			ris.append([contract_name.group(),contract_deploy_price.group()])

			# ok, abbiamo nome e prezzo
			# non ci resta che salvare in un array nomi e prezzi. poi calcola la media

	with open (OUTPUT_PATH,'a') as dep:
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
		# valori di deployment	
		for i in range(len(ris)):
			#print (ris[i][1])
			values.append(ris[i][1])
				
		ave = calc_average(values[1:])
		values.append(str(ave))
		values = ','.join(values)

		#dep.write(names+'\n') # da stampare solo alla prima stampa
		dep.write(values+'\n')
