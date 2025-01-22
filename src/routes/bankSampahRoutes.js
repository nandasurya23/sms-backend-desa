const express = require('express');
const { addSampah } = require('../controllers/bankSampahControllers');
const authenticateToken = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/bank-sampah', authenticateToken, addSampah);

module.exports = router;
