// @ts-nocheck
// to include testing based on ACTRules uncommend const ACTRules and include act into modules
// Importing evaluation modules
const { QualWeb } = require('@qualweb/core');
const { ACTRules } = require('@qualweb/act-rules');
const { WCAGTechniques } = require('@qualweb/wcag-techniques');
const fs = require('fs');

// Determining the target URLs
// localhost is provided for local testing
const urls = process.env.TARGET_URLS
    ? process.env.TARGET_URLS.split(',')
    : [process.env.TARGET_URL || 'http://127.0.0.1:1338/perceivable.html'];

(async () => {
    // Instantiating Qualweb Core Engine and specific rule sets
    const qualweb = new QualWeb();
    const act = new ACTRules();
    const wcag = new WCAGTechniques();

    // Starting the browser engine (Puppeteer)
    // Configuration to run stable within the CI/CD container.
    await qualweb.start({
        maxConcurrency: 1, // run only one scan at a time
        monitor: false, // for local testing set to true to monitor in terminal
        timeout: 300000, // 5 minutes
        puppeteerOptions: {
            headless: true, // headless mode is required for CI
            slowMo: 100, //delay for the scripts to execute correctly
            // --no-sandbox: Required to run Chrome as root inside the container
            // --disable-setuid-sandbox: Prevents permission issues
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        }
    });

    try {
        for (const url of urls) {
            console.log(`\n Scanning: ${url}`);

            // Executing the evaluation against the rendered DOM
            const report = await qualweb.evaluate({
                url,
                modules: [wcag, act], //WCAG only, to check for ACTRules inklude 'act'
                waitUntil: 'networkidle2', // Wait until network is idle (page is loaded)
                bypassCSP: true, // Bypass Content Security Policy to allow script injection
                timeout: 300000
            });

            console.log('Report:');
            // log for debugging
            console.log(JSON.stringify(report, null, 2));

            // Generating filename based on the URL
            const viewName = url.split('/').pop() || 'home';
            const file = `qualweb-results/qualweb-${viewName}.json`;

            // Checking if directory exists and save the JSON artifact
            if (!fs.existsSync('qualweb-results')) fs.mkdirSync('qualweb-results');
            fs.writeFileSync(file, JSON.stringify(report, null, 2));
            console.log(`Report saved: ${file}`);
        }
    } catch (err) {
        // Error handling
        console.error('QualWeb Error:', err);
        process.exit(1);
    }
    // Stopping Puppeteer and freeing memory
    await qualweb.stop();
    console.log('QualWeb Scan finished.');
})();
