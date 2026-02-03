const { QualWeb } = require('@qualweb/core');
const fs = require('fs');

const targetUrl = process.argv[2] || 'http://localhost:1338/';

(async () => {
    try {
        const qualweb = new QualWeb({});

        await qualweb.start({
            maxConcurrency: 1,
            headless: true
        });

        console.log(`Scanning: ${targetUrl}`);

        const options = {
            url: targetUrl,
            execute: {
                act: true,
                wcag: true,
                bp: false
            }
        };

        const report = await qualweb.evaluate(options);
        fs.writeFileSync('report.json', JSON.stringify(report, null, 2));

        await qualweb.stop();

    } catch (error) {
        console.error("QUALWEB CRASH:", error);
        process.exit(1);
    }
})();