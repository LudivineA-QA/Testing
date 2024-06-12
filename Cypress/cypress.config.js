const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    watchForFileChanges: false,
    defaultCommandTimeout : 12000,
    responseTimeout : 12000,
    requestTimeout : 12000,
    pageLoadTimeout : 12000,
    numTestsKeptInMemory : 1000,
    baseUrl: 'http://localhost:3000'
  },
});
