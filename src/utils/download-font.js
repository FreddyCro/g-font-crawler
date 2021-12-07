const fs = require('fs');
const request = require('request');
const { parseFontSrc, parseFilename } = require('./parse');

const downloadFontFiles = (data, filename) => {
  for (let i = 0; i < data.length; i++) {
    const font = data[i].attributes;
    const { url, format } = parseFontSrc(font.src);

    const fullFilename = parseFilename({
      filename,
      weight: font['font-weight'],
      i,
      url,
    });

    const file = fs.createWriteStream(
      `output/fonts/${fullFilename.name}.${fullFilename.format}`
    );

    setTimeout(() => {
      request
        .get(url)
        .on('response', function (res) {
          const { statusCode } = res;
          if (statusCode !== 200) {
            console.log(
              `${fullFilename.name}.${fullFilename.format} is error.`
            );
          }
        })
        .on('error', () => console.error(err))
        .pipe(file)
        .on('finish', () => {
          console.log(
            `${fullFilename.name}.${fullFilename.format} has downloaded.`
          );
        });
    }, 100 * i);
  }
};

module.exports = downloadFontFiles;
