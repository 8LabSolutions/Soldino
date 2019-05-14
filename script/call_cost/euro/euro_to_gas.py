INPUT_PATH = 'call_cost.csv'
OUTPUT_PATH = 'tmp.txt'

with open (INPUT_PATH, 'r') as inp:
	with open (OUTPUT_PATH, 'w') as out:
		# ignore first line
		first_line= inp.readline()
		out.write(first_line)
		del first_line
		

		lines = inp.readlines()
		#print (lines)
		for line in lines:
			items = line.split(',')
			#print (items)
			
			# conversion to gas
			for i in range (1, len(items)):
				items[i] = str(int(float(items[i])*327500))
				
				i +=1
			
			stringified_line = ','.join(items)
			out.write(stringified_line+'\n')
			