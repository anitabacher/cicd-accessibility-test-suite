const { QualWeb } = require('@qualweb/core');
const fs = require('fs');

// 1. Get Url
const targetUrl = process.argv[2] || 'http://localhost:1338/';

(async () => {
    try {
        // 2. Start Browser without Sandbox - important for CI Integration
        const qualweb = new QualWeb({
            launchOptions: { args: ['--no-sandbox', '--disable-setuid-sandbox'] }
        });

        await qualweb.start();

        console.log(`🚀 Scanning: ${targetUrl}`);

        // 2. Deine Konfiguration anwenden
        const options = {
            url: targetUrl,
            execute: {
                act: true,    // ACT Rules
                wcag: true,  // WCAG Rules
                bp: false    // Best Practices ( often False Positives)
            }
        };

        const report = await qualweb.evaluate(options);
        // 3. Save Results
        fs.writeFileSync('report.json', JSON.stringify(report, null, 2));

        await qualweb.stop();

    } catch (error) {
        console.error(error);
        process.exit(1); // Error Message to Pipeline
    }
})();