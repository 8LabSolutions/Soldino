Usage:
	from linux shell
		cd <root folder>/script
		bash master_launcher.sh

This will calculate metrics for src files found in 'contracts' and 'src' folder (flat-ui files excluded) and put them into csv files.
Each folder in script contains: one or more scripts to calculate the metric, and one or more .csv files to save the results.
Plotting csvs on charts is not included at the moment.