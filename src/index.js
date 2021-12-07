const fs = require('fs');
const request = require('request');
const clearOutputDist = require('./utils/clear-output');
const downloadFontFiles = require('./utils/download-font');
const generateFontCss = require('./utils/generate-font-css');
const { parseFontCssFile, parseApiUrl } = require('./utils/parse');

const config = require('../config.json');
const DATA_TYPE = process.argv.slice(2)[0];

const generator = ({ res, filename, fontDist }) => {
  const data = parseFontCssFile(res.toString());
  downloadFontFiles(data, filename);
  generateFontCss({ data, filename, fontDist });
};

const main = async function () {
  if (!config) return console.log('config is error.');

  const { api, static } = config;

  clearOutputDist();

  if (DATA_TYPE === 'api') {
    for (let i = 0; i < api.fonts.length; i++) {
      const { root } = api;
      const { target, weight, filename, fontDist } = api.fonts[i];
      const url = parseApiUrl(root, target, weight);

      await request.get(url, (error, res, body) => {
        const { statusCode } = res;

        if (statusCode !== 200) `${target} is error`;
        else generator({ res: body, filename, fontDist });
      });
    }
  }

  if (DATA_TYPE === 'static') {
    for (let i = 0; i < static.length; i++) {
      const { target, filename, fontDist } = static[i];
      const path = `src/static/${target}`;

      await fs.readFile(path, 'utf8', (err, res) => {
        if (err) console.log('static data is error: ', err);
        else generator({ res, filename, fontDist });
      });
    }
  }

  await console.log('done.');
};

main();
