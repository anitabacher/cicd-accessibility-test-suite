// @ts-nocheck
const { QualWeb } = require('@qualweb/core');
const { ACTRules } = require('@qualweb/act-rules');
const { WCAGTechniques } = require('@qualweb/wcag-techniques');
const fs = require('fs');

const urls = process.env.TARGET_URLS
    ? process.env.TARGET_URLS.split(',')
    : [process.env.TARGET_URL || 'http://127.0.0.1:1338/perceivable.html'];

(async () => {
    const qualweb = new QualWeb();
    const act = new ACTRules();
    const wcag = new WCAGTechniques();

    await qualweb.start({
        maxConcurrency: 1,
        monitor: false,
        timeout: 300000, // 5 minutes
        puppeteerOptions: {
            headless: true,
            slowMo: 100,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        }
    });

    try {
        for (const url of urls) {
            console.log(`\n Scanning: ${url}`);

            const report = await qualweb.evaluate({
                url,
                modules: [act, wcag],
                waitUntil: 'networkidle2',
                bypassCSP: true,
                timeout: 300000
            });

            console.log('Report:');
            console.log(JSON.stringify(report, null, 2));

            const viewName = url.split('/').pop() || 'home';
            const file = `qualweb-results/qualweb-${viewName}.json`;

            if (!fs.existsSync('qualweb-results')) fs.mkdirSync('qualweb-results');
            fs.writeFileSync(file, JSON.stringify(report, null, 2));
            console.log(`Report saved: ${file}`);
        }
    } catch (err) {
        console.error('QualWeb Error:', err);
        process.exit(1);
    }

    await qualweb.stop();
    console.log('QualWeb Scan finished.');
})();
