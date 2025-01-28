const express = require('express');
const { addBankSampah } = require('../controllers/bankSampahControllers');
const authenticateToken = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware'); // Import middleware Multer

const router = express.Router();

// Route untuk menambah data ke tabel bank_sampah, menggunakan upload.array untuk multiple files
router.post('/add-bank-sampah', authenticateToken, upload.array('images[]', 5), addBankSampah); // Maksimal 5 gambar per request

module.exports = router;
