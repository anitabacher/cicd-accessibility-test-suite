const { QualWeb } = require('@qualweb/core');
const fs = require('fs');

// 1. Get Url
const targetUrl = process.argv[2] || 'http://localhost:1338/';

(async () => {
    try {
        const qualweb = new QualWeb({});

        // 2. Start Browser
        // using 'puppeteerOptions', due to problems with Chrome
        await qualweb.start({
            maxConcurrency: 1,
            puppeteerOptions: {
                headless: 'new', // using headless mode in chrome
                args: [
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                    '--disable-dev-shm-usage', // important for CI
                    '--disable-gpu'
                ]
            }
        });

        console.log(`🚀 Scanning: ${targetUrl}`);

        // Configuration for scan
        const options = {
            url: targetUrl,
            execute: {
                act: true,    // ACT Rules
                wcag: true,   // WCAG Rules
                bp: false     // Best Practices
            }
        };

        const report = await qualweb.evaluate(options);

        // 3. Save Results
        fs.writeFileSync('report.json', JSON.stringify(report, null, 2));

        await qualweb.stop();

    } catch (error) {
        console.error("QUALWEB ERROR:", error);
        process.exit(1);
    }
})();