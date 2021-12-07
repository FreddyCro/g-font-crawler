const { toJSON } = require('cssjson');
const trims = (string) =>
  string.replace(/(\r\n|\n|\r)/gm, ' ');

const parseFilename = ({ filename, weight, i, url }) => {
  const format = `${url.split('.')[url.split('.').length - 1]}`;

  return { name: `${filename}-w${weight}-${i}`, format };
};

const parseFontSrc = (string) => {
  const [url, format] = string
    .split(' ')
    .map((string) => string.replace(/[()]|url|format/g, ''));

  return { url, format };
};

const parseFontCssFile = (file) => {
  return trims(file)
    .split('@font-face')
    .map((f) => toJSON(`item ${f}`))
    .filter((f) => Object.keys(f.children).length > 0)
    .map((f) => f.children.item);
};

const parseApiUrl = (root, target, weight) => {
  const genWeight = (weight) => {
    if (weight && wight.length > 0) {
      return `:wght@${weight.join(';')}`;
    } else {
      return '';
    }
  };

  return `${root}${target}${genWeight()}&display=swap`;
};

module.exports = { parseFontCssFile, parseApiUrl, parseFontSrc, parseFilename, trims };
