const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const FILE_TYPES = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg',
};

const storageFile = (path) => {
  return multer.diskStorage({
    destination: function (req, file, cb) {
      const validFileType = FILE_TYPES[file.mimetype];
      let uploadPath = `./src/public/${path}`;
      if (!validFileType) {
        const error = new Error('Invalid file format type.');
        return cb(error, u);
      }
      cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
      const extension = FILE_TYPES[file.mimetype];

      const uniqueFileImage = `${file.fieldname}${Date.now()}.${extension}`;

      cb(null, uniqueFileImage);
    },
  });
};

const uploadOptionsProfile = multer({ storage: storageFile('profile') });
const uploadOptionsIdCard = multer({ storage: storageFile('id_card') });
const uploadOptionsProperty = multer({ storage: storageFile('property') });

module.exports = {
  uploadOptionsProfile,
  uploadOptionsIdCard,
  uploadOptionsProperty,
};
