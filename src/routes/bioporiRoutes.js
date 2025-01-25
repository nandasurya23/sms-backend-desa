const express = require('express');
const {
    addBiopori,
    getBiopori,
    updateBiopori,
    markBioporiAsFull,
    markBioporiAsHarvested
} = require('../controllers/bioporiControllers');
const authenticateToken = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/biopori', authenticateToken, addBiopori); 
router.get('/biopori', authenticateToken, getBiopori); 
router.put('/biopori/:id', authenticateToken, updateBiopori); 
router.put('/biopori/:id/full', authenticateToken, markBioporiAsFull); 
router.put('/biopori/:id/harvested', authenticateToken, markBioporiAsHarvested); 

module.exports = router;
