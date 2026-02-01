const { QualWeb } = require('@qualweb/core');
const fs = require('fs');

const targetUrl = process.argv[2] || 'http://localhost:1338/';

(async () => {
    try {
        const qualweb = new QualWeb({});

        // all arguments to force Chrome to start without sandbox
        const browserArgs = [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu'
        ];

        // Trying the arguments in different places
        const startOptions = {
            headless: true,
            args: browserArgs, // Try 1: in Root
            puppeteer: {
                headless: true,
                args: browserArgs // Try 2: In 'puppeteer' Object
            },
            puppeteerOptions: {
                headless: true,
                args: browserArgs // Try 3: In 'puppeteerOptions' Objects
            },
            launchOptions: {
                args: browserArgs // Try 4: I 'launchOptions' Object
            }
        };

        await qualweb.start(startOptions);

        console.log(`🚀 Scanning: ${targetUrl}`);

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