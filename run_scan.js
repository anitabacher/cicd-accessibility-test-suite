const { QualWeb } = require('@qualweb/core');
const fs = require('fs');

(async () => {
    const qualweb = new QualWeb();
    const url = process.env.TARGET_URL;

    console.log(`🔍 Scanning: ${url}`);

    await qualweb.start({
        maxConcurrency: 1,
        puppeteer: {
            headless: true,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage'
            ]
        }
    });

    try {
        const report = await qualweb.evaluate({
            urls: [url],
            execute: {
                act: true,
                wcag: true
            },
            waitUntil: 'load'
        });

        const viewName = url.split('/').pop() || 'home';
        const file = `qualweb-results/qualweb-${viewName}.json`;

        fs.writeFileSync(file, JSON.stringify(report, null, 2));
        console.log(`✅ Report saved: ${file}`);
    } catch (err) {
        console.error('❌ QualWeb failed:', err);
        process.exit(1);
    }

    await qualweb.stop();
})();
