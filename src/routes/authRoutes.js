const express = require('express');
const { registerUser, loginUser, getUserData } = require('../controllers/authControllers');
const authenticateJWT = require('../middlewares/authMiddleware'); // Menambahkan middleware autentikasi JWT

const router = express.Router();

// Endpoint untuk register user
router.post('/register', registerUser);

// Endpoint untuk login user
router.post('/login', loginUser);

// Endpoint untuk mengambil data user (memerlukan autentikasi)
router.get('/user-data', authenticateJWT, getUserData); // Menggunakan middleware authenticateJWT

module.exports = router;
