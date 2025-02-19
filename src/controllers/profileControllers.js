const bcrypt = require('bcryptjs');
const supabase = require('../models/db');

// Get Profile
const getProfile = async (req, res) => {
  const { user_id } = req.params; // Ambil user_id dari parameter URL

  if (!user_id) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    const { data, error } = await supabase
      .from('users')
      .select('id, username, email, phone_number, banjar, profile_picture') // Sesuaikan dengan kolom yang ada
      .eq('id', user_id)
      .single(); // Karena hanya satu pengguna

    if (error || !data) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'Profile retrieved successfully', data });
  } catch (err) {
    console.error('Server Error:', err);
    res.status(500).json({ error: 'Server error, please try again later' });
  }
};

// Update Profile
const updateProfile = async (req, res) => {
  const { user_id, username, phone_number, email, password, banjar, profile_picture } = req.body;

  if (!user_id) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  let hashedPassword = null;
  if (password) {
    hashedPassword = bcrypt.hashSync(password, 10);
  }

  try {
    const { data, error } = await supabase
      .from('users')
      .update({
        username,
        phone_number,
        email,
        ...(hashedPassword && { password_hash: hashedPassword }), // Update hanya jika password baru diberikan
        banjar,
        profile_picture,
      })
      .eq('id', user_id)
      .select(); // Mengambil data terbaru

    if (error) {
      console.error('Database error:', error);
      return res.status(400).json({ error: error.message });
    }

    console.log('Updated data:', data);
    res.status(200).json({ message: 'Profile updated successfully', data });
  } catch (err) {
    console.error('Server Error:', err);
    res.status(500).json({ error: 'Server error, please try again later' });
  }
};

module.exports = { getProfile, updateProfile };
