# this script takes gas price and converts into ETH and EUR price. Prices are updated to 2019-05-15 and may vary over time.

INPUT_PATH = "dep_cost_simple.csv"
OUTPUT_PATH = "dep_cost_ropsten_main.csv"

with open(INPUT_PATH, 'r') as f:
	lines = f.readlines()
	gasstring = lines[1]
	gas = gasstring.split(',')
	#print(gas)
	
	ropsten_eth = []
	ropsten_eur = []
	main_eth = []
	main_eur = []

	for i in range(len(gas)):

		# prices ropsten network
		# price in ETH
		t = (float(gas[i]))*0.000000001
		t2 = '{0:.9f}'.format(t)
		ropsten_eth.append(str(t2))

		# price in EUR
		e = 207.19*t
		e2 = round(e,5)
			
		ropsten_eur.append(str(e2))

		# prices main network
		# price in ETH
		t = t*12
		t2 = '{0:.8f}'.format(t)
		main_eth.append(str(t2))

		# price in EUR
		e = e*12
		e2 = e2 = round(e,4)
		main_eur.append(str(e2))

	#print(ropsten_eth)

	ropsten_eth_line = ','.join(ropsten_eth)
	ropsten_eur_line = ','.join(ropsten_eur)
	main_eth_line = ','.join(main_eth)
	main_eur_line = ','.join(main_eur)

	with open (OUTPUT_PATH, 'w') as o:
		#print(ropsten_eth_line)
		#print(ropsten_eur_line)
		o.write('contracts\n')
		o.write(lines[0])
		o.write('gas price\n')
		o.write(lines[1])
		o.write('ropsten price in ETH\n')
		o.write(ropsten_eth_line + '\n')
		o.write('ropsten price in EUR\n')
		o.write(ropsten_eur_line + '\n')
		
		
		#print(main_eth_line)
		#print(main_eur_line)
		o.write('mainnet price in ETH\n')
		o.write(main_eth_line + '\n')
		o.write('mainnet price in EUR\n')
		o.write(main_eur_line + '\n')
		