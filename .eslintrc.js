const path = require('path');

module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    "import/no-extraneous-dependencies": ["error", { "devDependencies": [path.join(__dirname, "GenPDFPlugin.js")] }]
  },
};
