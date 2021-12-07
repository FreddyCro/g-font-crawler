const fsExtra = require('fs-extra');

const clearOutputDist = () => {
  fsExtra.emptyDirSync('output/css');
  fsExtra.emptyDirSync('output/fonts');
}

module.exports = clearOutputDist;
