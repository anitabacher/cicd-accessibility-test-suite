module.exports = {
  ci: {
    collect: {
      url: [
        'http://localhost:1338/', // index.html
        'http://localhost:1338/perceivable.html',
        'http://localhost:1338/operable.html',
        'http://localhost:1338/understandable.html',
        'http://localhost:1338/robust.html', // added robust.html
      ],
      startServerCommand: 'npm run start',
      startServerReadyPattern: 'listening on port 1338', // cohesive with app.js now
      numberOfRuns: 1,  // this will be 1 for each url.
      settings: {
        preset: "desktop", // if we take this away it will evaluate the website as mobile view, so we could also do multiple tests for some particular criteria.
        chromeFlags: ['--no-sandbox'], // bypass the sandbox error, but this doesnt seem recommended.
      },
    },
    upload: {
      target: 'filesystem', // instead of making a server
    },
    report: {
      outputPath: './results/Lighthouse',
      // is this why it wasnt working in yml before?
    },
  },
};