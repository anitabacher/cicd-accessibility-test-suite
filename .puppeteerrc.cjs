/**
 * @type {import("puppeteer").Configuration}
 */
module.exports = {
    launch: {
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-dev-shm-usage'
        ],
    },
};