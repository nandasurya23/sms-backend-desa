const express = require('express');
const { updateProfile } = require('../controllers/profileControllers');

const router = express.Router();

router.put('/profile', updateProfile);


module.exports = router;
