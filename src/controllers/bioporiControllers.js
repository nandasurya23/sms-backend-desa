const supabase = require('../models/db');

// Add Biopori
const addBiopori = async (req, res) => {
  try {
    // Log data yang diterima
    console.log('Request Body:', req.body);
    
    // Mengambil user_id dari request yang sudah diverifikasi oleh middleware
    const { image_url, name, date, time, endDate, endTime } = req.body;
    const user_id = req.user.id; // Pastikan user_id ada di token

    if (!user_id) {
      return res.status(400).json({ error: 'User ID is missing from the token' });
    }

    // Menghitung end_date (60 hari setelah date)
    const startDate = new Date(date);
    startDate.setDate(startDate.getDate() + 60);

    // Insert data ke tabel 'biopori'
    const { data, error } = await supabase
      .from('biopori')
      .insert([
        {
          user_id, // Gunakan user_id yang sudah ada di token
          image_url: image_url || null, // Handle image_url jika opsional
          name,
          date,
          time,
          end_date: endDate,
          end_time: endTime,
        },
      ])
      .select(); // Pastikan data yang baru ditambahkan dikembalikan

    // Periksa jika ada error
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Berikan respons data yang ditambahkan
    res.status(201).json({ message: 'Biopori added successfully', data });
  } catch (err) {
    console.error('Error adding biopori:', err.message); // Log error untuk debugging
    return res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { addBiopori };
