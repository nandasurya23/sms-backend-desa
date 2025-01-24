const express = require('express');
const { addBiopori, getBiopori, updateBiopori } = require('../controllers/bioporiControllers');
const authenticateToken = require('../middlewares/authMiddleware'); // Import middleware

const router = express.Router();

// Tambahkan middleware authenticateToken untuk melindungi semua route
router.post('/biopori', authenticateToken, addBiopori); // Route untuk menambahkan biopori
router.get('/biopori', authenticateToken, getBiopori); 
router.put('/biopori/:id', authenticateToken, updateBiopori);

module.exports = router;
