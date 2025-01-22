const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const bioporiRoutes = require('./routes/bioporiRoutes');
const bankSampahRoutes = require('./routes/bankSampahRoutes');
const profileRoutes = require('./routes/profileRoutes');
const transactionHistoryRoutes = require('./routes/transactionHistoryRoutes'); // Add this line to import transaction history routes

const app = express();
app.use(cors());
app.use(express.json());

// Use the routes
app.use('/api', authRoutes);
app.use('/api', bioporiRoutes);
app.use('/api', bankSampahRoutes);
app.use('/api', profileRoutes);
app.use('/api', transactionHistoryRoutes); // Add this line to use the transaction history routes

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
