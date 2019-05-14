
import subprocess

def getFileList(extensions):
	folders = []
	for ext in extensions:
		folders += [i.decode('utf-8') for i in subprocess.check_output("find ../../contracts -type f -name \"*." +ext+"\"", shell=True).split()]
		folders += [i.decode('utf-8') for i in subprocess.check_output("find ../../src -type f -name \"*." +ext+"\"", shell=True).split()]
	return folders

#print (getFileList(['sol', 'js']))
'''
from os import listdir
from os.path import isfile, join
onlyfiles = [f for f in listdir() if isfile(join(mypath, f))]
'''