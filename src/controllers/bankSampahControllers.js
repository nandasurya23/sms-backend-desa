const supabase = require('../models/db');

// Fungsi untuk menambah data ke tabel bank_sampah
const addBankSampah = async (req, res) => {
  try {
    const { userId, address, weight, category } = req.body;

    // Pastikan semua field yang diperlukan ada
    if (!userId || !address || !weight || !category) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Mendapatkan data user dari database untuk memastikan user valid
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('id')
      .eq('id', userId)
      .single();

    if (userError || !userData) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Menambahkan data ke tabel bank_sampah tanpa gambar
    const { data, error } = await supabase
      .from('bank_sampah')
      .insert([
        {
          user_id: userId,
          address,
          weight,
          category,
        },
      ])
      .select();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json({ message: 'Bank sampah entry added successfully', data });
  } catch (err) {
    console.error('Error adding bank sampah:', err.message);
    return res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { addBankSampah };
