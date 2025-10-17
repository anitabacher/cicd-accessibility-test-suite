To Do:
- test suite setup
- create criteria

Phase 1: Setup & Planning (Weeks 1-2)
1. Cloning and understanding the Repository
2. Set Up Local Environment
3. Understand the Code & Pipeline

Phase 2: Implementing New Criteria (Weeks 3-6)
1. Implementing the First Criterion:
- Adding a new section for the criterion.
- Copying the HTML structure (the boxes for "Correct" and "Wrong") from an existing example.
- Implementation of "incorrect" and "correct" code.

2. Extending Iteratively: Repeating the process for the remaining nine criteria, adding the test cases to the corresponding perceivable.html, operable.html, or understandable.html pages.

3. Testing Locally: After each implementation, checking in browser to ensure everything displays correctly.

4. Commiting Regularly: Saving progress frequently with Git.

Phase 3: Integrating New Tools (Weeks 7-8)
1. Research: Finding out how to use Ta11y and Accessibility Insights via the command line (CLI). 
Looking for npm packages and the commands to scan a webpage.

2. Editing the Pipeline File: through .github/workflows/testing_tools_audits.yml file.

3. Adding New Jobs: Copying an existing "job" (e.g., the one for axe-core) as a template to "ta11y-audit".
- In the new job, change the npm install command to install the new tool.
- Adjusting the run command to execute the new tool against the test pages.
- Ensuring the results are saved to a file that is then uploaded as an "artifact."

4. Test & Debug: Pushing changes to GitHub to trigger the pipeline. 
It likely won't work on the first try. 
Carefully review the error messages in the "Actions" tab on GitHub and adjust your .yml file until the job runs successfully.

Phase 4: Data Collection (Week 9) 

1. Running the Final Pipeline: after implementation of all tools and criteria to get the final results.
2. Downloading Artifacts: Downloading all result files (the artifacts) from GitHub Actions.
3. Preparing the Data: result files (often in JSON format). 
- Creating a master spreadsheet (e.g., in Excel or Google Sheets) and transfering the key information: 
- Which tool found which error on which page with what description and at what position?.

Phase 5: Analysis & Writing (Week 10+) 


1. Applying Metrics: through prepared data table. 
- Comparing each reported error with implemented violations. 
- Counting how many hits each tool has.


2. Calculating Results: Calculate the percentage scores for the three metrics for each tool, just as it was done in the previous studies.
- Criteria Identification 
- Description
- Position Accuracy 

3. Writing the Thesis: Write the chapters of your bachelor's thesis.
- Introduction and Problem Description - Proposal
- Method chapter - describing exactly the steps in this guide.
- Results chapter - presenting calculated tables and scores.
- Discussion - interpreting the results and answer of the 2 research questions.

17.10.
Phase 1:

Cloned repository
installed serve http://localhost:3000. 

Problem: browser remembers the last website it saw at http://localhost:3000. React application on that address. 
Now, it's trying to load files that belong to that old React app (like bundle.js, manifest.json, and a service-worker.js), which don't exist in the new static project. 
Therefore now we have 404 Not Found errors and a blank or broken page.

Fix: Performing a "Hard Refresh" - tells the browser to ignore its cache and download everything fresh from the server. 
Cmd + Shift + R.

