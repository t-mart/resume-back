/* eslint-disable no-console */
const path = require('path');

const puppeteer = require('puppeteer');

class GenPDFPlugin {
  constructor(options) {
    this.name = 'PDFGenPlugin';

    const defaultOptions = {
      enabled: true,
      filename: 'index.pdf',
      source: path.resolve(__dirname, 'dist', 'index.html'),
    };

    this.options = Object.assign(defaultOptions, options);
  }

  apply(compiler) {
    if (!this.options.enabled) {
      return;
    }
    const pdfPath = path.resolve(compiler.options.output.path, this.options.filename);
    const sourceFileUrl = `file:///${this.options.source.replace(/\\/gi, '/')}`;

    compiler.hooks.afterEmit.tapPromise(this.name, async () => {
      console.log('Generating PDF...');
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(sourceFileUrl, { waitUntil: 'load' });
      await page.pdf({
        path: pdfPath,
        format: 'Letter',
        margin: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        },
      });
      await browser.close();
      console.log(`Generated PDF at ${pdfPath}`);
    });
  }
}

module.exports = GenPDFPlugin;
