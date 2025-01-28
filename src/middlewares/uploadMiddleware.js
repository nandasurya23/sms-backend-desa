const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../utils/cloudinary'); // Pastikan cloudinary.js sudah dikonfigurasi

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'bank_sampah', // Folder di Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png'], // Format gambar yang diizinkan
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 100 * 5000 * 5000 }, // Maksimal file 10MB
});

module.exports = upload;
