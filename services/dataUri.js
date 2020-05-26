const DatauriParser = require('datauri/parser');
const path = require('path');
const dUri = new DatauriParser();

exports.dataUri = (file) =>
  dUri.format(path.extname(file.originalname).toString(), file.buffer);
