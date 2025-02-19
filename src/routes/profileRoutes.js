const express = require('express');
const { getProfile, updateProfile } = require('../controllers/profileControllers');
const authenticateToken = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/profile', authenticateToken, getProfile);
router.put('/profile',authenticateToken, updateProfile);


module.exports = router;
