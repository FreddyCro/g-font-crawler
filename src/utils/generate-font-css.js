const fs = require('fs');
const { toCSS, toJSON } = require('cssjson');
const {
  parseFontCssFile,
  parseFontSrc,
  parseFilename,
  trims,
} = require('./parse');

const generateFontCss = ({ data, filename, fontDist }) => {
  const file = data
    .map((font, i) => {
      const weight = font.attributes['font-weight'];
      const { url, format } = parseFontSrc(font.attributes.src);
      const fullFilename = parseFilename({
        filename,
        weight,
        i,
        url,
      });

      font.attributes.src = `url(${fontDist}/${fullFilename.name}.${fullFilename.format}) format(${format})`;

      return font;
    })
    .map((font) => `@font-face {${toCSS(font)}}`)
    .map((font) => font.replace(/ /g, ''))
    .map((font) => trims(font))
    .join(' ');

  fs.writeFile(`output/css/${filename}.css`, file, (err) => {
    if (err) console.log(err);
    else console.log(`${filename}.css has been generated.`);
  });
};

module.exports = generateFontCss;
