import re
import datetime

INPUT_PATH = 'truffle_test_ris.txt'
OUTPUT_PATH = INPUT_PATH

def searcher(pattern, string): #search pattern in string
	ris = re.compile(pattern).search(string)
	if not ris:
		return False
	else:
		return True

# l'output su terminale di coverage ha dei codici fastidiosi per i colori, che rimuovo con questa funzione
def remove_colors(lines):
	i = 0
	for line in lines:
		if (searcher('',line)):
			line = re.sub('','',line)
		if (searcher('\[\d+m',line)):
			line = re.sub('\[\d+m','',line)
		lines[i] = line
		i += 1
	return lines

# SCRIPT: prendo i prezzi di deploy dei contratti. 

lines = []
with open (INPUT_PATH,'r') as cv:
	lines = cv.readlines()
	lines = remove_colors(lines)

with open (OUTPUT_PATH,'w') as out:
	for line in lines:
		out.write(line)