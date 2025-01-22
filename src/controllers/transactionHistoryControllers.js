const supabase = require('../models/db'); // Ensure this is the correct path to your supabase instance

// Add a new transaction to the transaction_history table
const addTransactionHistory = async (req, res) => {
  const { user_id, transaction_id, transaction_value, transaction_date } = req.body;

  if (!user_id || !transaction_id || !transaction_value) {
    return res.status(400).json({ error: "All fields (user_id, transaction_id, transaction_value) are required." });
  }

  const { data, error } = await supabase
    .from('transaction_history')
    .insert([
      { 
        user_id, 
        transaction_id, 
        transaction_value, 
        transaction_date: transaction_date || new Date()
      }
    ])
    .select(); // To return the inserted data

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.status(201).json({ message: "Transaction added successfully", data });
};

// Get all transactions for a user
const getTransactionHistory = async (req, res) => {
  const { user_id } = req.params;

  const { data, error } = await supabase
    .from('transaction_history')
    .select('*')
    .eq('user_id', user_id);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.status(200).json({ data });
};

module.exports = { addTransactionHistory, getTransactionHistory };
