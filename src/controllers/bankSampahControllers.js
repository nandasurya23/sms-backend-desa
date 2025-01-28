const cloudinary = require('../utils/cloudinary');
const supabase = require('../models/db');

// Fungsi untuk menambah data ke tabel bank_sampah
const addBankSampah = async (req, res) => {
  try {
    const { userId, address, weight, category} = req.body;

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

    // Pastikan file gambar ada
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'At least one image is required' });
    }

    // Menyimpan gambar di Cloudinary
    const images = await Promise.all(
      req.files.map(async (file) => {
        const uploadResponse = await cloudinary.uploader.upload(file.path);
        return uploadResponse.secure_url; // Mendapatkan URL gambar yang di-upload
      })
    );

    // Menambahkan data ke tabel bank_sampah
    const { data, error } = await supabase
      .from('bank_sampah')
      .insert([
        {
          user_id: userId,
          address,
          weight,
          category,
          images: images, // Menyimpan URL gambar dari Cloudinary
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
