const supabase = require('../models/db');

// Add Biopori
const addBiopori = async (req, res) => {
  try {
    // Mengambil user_id dari request body yang sudah diverifikasi oleh middleware
    const { image_url, name, date, time } = req.body;
    const user_id = req.user.id; // Pastikan user_id adalah integer

    // Validasi jika ada data yang kosong
    if (!user_id || !name || !date || !time) {
      return res.status(400).json({ error: 'User ID, name, date, and time are required' });
    }

    // Log data yang diterima untuk debugging
    console.log('Received data:', req.body);

    // Menghitung end_date (60 hari setelah date)
    const startDate = new Date(date);
    startDate.setDate(startDate.getDate() + 60);
    const endDate = startDate.toISOString().split('T')[0]; // Format: YYYY-MM-DD

    // Menggunakan start time sebagai end_time (atau dapat disesuaikan dengan logika lain)
    const endTime = time;

    // Insert data ke tabel 'biopori'
    const { data, error } = await supabase
      .from('biopori')
      .insert([
        {
          user_id, // Pastikan ini adalah integer
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
