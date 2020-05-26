const multer = require('multer');

// disk storage - tofolder, saving
// memory storage -in memory, in buffer (for uploading)

const ALLOWED_FORMAT = ['image/jpeg', 'image/png', 'image/jpg'];
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  fileFilter: function (req, file, callback) {
    if (ALLOWED_FORMAT.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new Error('Not supported file format'), false);
    }
  },
});

module.exports = upload;
