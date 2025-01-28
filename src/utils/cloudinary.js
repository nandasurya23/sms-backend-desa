const cloudinary = require('cloudinary').v2;

// Konfigurasi Cloudinary menggunakan kredensial API
cloudinary.config({
  cloud_name: 'df82hir2r', // Ganti dengan cloud name Anda
  api_key: '281451181515552', // Ganti dengan API key Anda
  api_secret: 'ppaX2GmGJBqTsrx0XwzMip_vcGA' // Ganti dengan API secret Anda
});

module.exports = cloudinary;
