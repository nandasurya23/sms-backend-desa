const express = require('express');
const { addTransactionHistory, getTransactionHistory } = require('../controllers/transactionHistoryControllers');
const authenticateToken = require('../middlewares/authMiddleware'); // Use regular import for middleware

const router = express.Router();

// Add a new transaction
router.post('/transaction', addTransactionHistory);

// Get all transactions for a user
router.get('/transaction/:user_id', getTransactionHistory);

module.exports = router;
