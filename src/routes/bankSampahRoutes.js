const express = require('express');
const { addBankSampah } = require('../controllers/bankSampahControllers');
const authenticateToken = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware'); // Middleware upload

const router = express.Router();

// Endpoint untuk menambahkan bank sampah
router.post('/add-bank-sampah', authenticateToken, upload.array('images[]', 5), addBankSampah); // Maksimal 5 gambar

module.exports = router;
