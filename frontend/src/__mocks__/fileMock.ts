import path from 'path';

module.exports = {
  process(_: string, filename: string) {
    return `module.exports = ${JSON.stringify(path.basename(filename))};`;
  },
};
