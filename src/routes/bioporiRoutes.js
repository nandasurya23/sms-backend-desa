const express = require('express');
const { addBiopori } = require('../controllers/bioporiControllers');
const authenticateToken = require('../middlewares/authMiddleware'); // Import middleware

const router = express.Router();

// Tambahkan middleware authenticateToken untuk melindungi route ini
router.post('/biopori', authenticateToken, addBiopori);

module.exports = router;
