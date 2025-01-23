const bcrypt = require('bcryptjs');
const supabase = require('../models/db');

// Update Profile
const updateProfile = async (req, res) => {
  const { user_id, username, phone_number, email, password, banjar, profile_picture } = req.body;

  const hashedPassword = password ? bcrypt.hashSync(password, 10) : null;

  console.log("Received data:", req.body);  // Log the incoming request data

  const { data, error } = await supabase
    .from('users')
    .update({
      username,
      phone_number,
      email,
      password_hash: hashedPassword || undefined,
      banjar,
      profile_picture,
    })
    .eq('id', user_id)
    .select();  // Make sure to return updated data

  if (error) {
    console.log("Database error:", error);  // Log any error returned by Supabase
    return res.status(400).json({ error: error.message });
  }

  console.log("Updated data:", data);  // Log the data returned from the database

  res.status(200).json({ message: 'Profile updated successfully', data });
};

module.exports = { updateProfile };
