const express = require('express');
const router = express.Router();
const { updateProfile, getProfile } = require('../controllers/profileController');

// Route to update profile
router.put('/profile/:user_id', updateProfile);

// Route to get profile
router.get('/profile/:user_id', getProfile);

module.exports = router;
