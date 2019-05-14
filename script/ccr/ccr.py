# -*- coding: utf-8 -*-

import os
import datetime
import matplotlib.pyplot as plt
plt.rcParams.update({'figure.autolayout': True})
import pandas as pd
from getFileList import getFileList 

def createFolder(directory):
	try:
		if not os.path.exists(directory):
			os.makedirs(directory)
	except OSError:
		print ('Error: Creating directory '+ directory)

def ccr(filename):
	comments = 0
	code = 0

	with open(filename, "r") as inp:
		flag = False
		for line in inp:
			l = line.strip()
			if l != '': # linea non vuota
				if flag == False: # non è un commento multiriga
					if l[:2] == "//": #commento inline
						comments += 1
					elif l[:2] == "/*" and l[-2:]=="*/": #commento multiriga inline
						comments += 1		
					elif l[:2] == "/*": # entra in un commento multiriga
						flag = True
					else:
						code += 1
				else: # flag== True: sei in un commento multiriga
					if l[-2:] == "*/":
						flag = False
					else: # not */
						comments += 1

	#print comments
	#print code
	#ratio = float(comments)/float(code)
	#ratio = round(ratio,2)
	#print ratio
	return (comments, code)

# main
totalComments = 0 
totalCode = 0

with open ('measurements.csv', "wt") as measurements:
	files = getFileList(["sol","js"])
	
	#rimuovo file scomodi
	if "../../src/flat-ui/scripts/flat-ui.min.js" in files:
		files.remove("../../src/flat-ui/scripts/flat-ui.min.js")
	if "../../src/flat-ui/scripts/flat-ui.js" in files:
		files.remove("../../src/flat-ui/scripts/flat-ui.js")
	if "../../src/flat-ui/scripts/application.js" in files:
		files.remove("../../src/flat-ui/scripts/application.js")

	
	for file in files:
		comment, code = ccr(file) # QUESTA CAMBIA
		totalCode += code
		totalComments += comment
		'''
		print(file)
		print (comment)
		print (code)
		'''
		#print(file)
		newLine = file.split('/')[-1]+','+str(comment)+','+ str(code)+ '\n'
		measurements.write(str(newLine))
	
	if (os.path.isfile('./ccrStatistics.csv')):
		#vuol dire che il file non esiste
		
		with open ('ccrStatistics.csv', 'at') as ccr:
			val = (float(totalComments)/float(totalCode)) * 100
			line = str(datetime.datetime.now().isoformat()[:10])+','+str(round(val, 2))+'\n'
			ccr.write(line)
	else:
		#il file esiste già, appendo alla fine
		print('OCIO, creo il nuovo file ccrStatistics.csv')
		with open ('ccrStatistics.csv', 'wt') as ccr:
			header = 'data,valore\n'
			val = (float(totalComments)/float(totalCode)) * 100
			line = str(datetime.datetime.now().isoformat()[:10])+','+str(round(val, 2))+'\n'
			ccr.write(header)
			ccr.write(line)

'''
# COSE SUI GRAFICI
df = pd.read_csv('ccrStatistics.csv')

ccr_valori = df['valore'].tolist()
ccr_date = df['data'].tolist()

plt.plot(ccr_date, ccr_valori, label="CCR\nnel tempo")

gap = int(len(ccr_valori)/5)
#print(len(ccr_date))

counter = 0
for label in plt.gca().get_xaxis().get_ticklabels():
	print(gap)
	print(counter%gap)
	if counter % gap != 0:

		label.set_visible(False)
		
	counter += 1
	

plt.legend(bbox_to_anchor=(1.04,1), loc="upper left")
plt.subplots_adjust(right=0.8)
#plt.grid(False)
ax = plt.gca()
ax.grid(which='major', axis='y', linestyle='-.')
plt.xlabel('Data')
plt.ylabel('CCR')
plt.hlines(0.10, 0, max(ccr_date)+1, colors = 'y', linestyle ='solid', label = 'accettabile')
plt.hlines(0.20, 0, max(ccr_date)+1, colors = 'g', linestyle ='solid', label = 'preferibile')
#plt.suptitle('prova')
plt.xticks(rotation=45)
plt.tight_layout()
cartella='plot_ccr'
    
createFolder(cartella)


plt.savefig(cartella+'/graph.pdf')
'''