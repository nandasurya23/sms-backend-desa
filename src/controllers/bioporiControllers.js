const supabase = require('../models/db');

// ADD BIOPORI
const addBiopori = async (req, res) => {
  try {
    console.log('Request Body:', req.body);
    
    const { image_url, name, date, time, endDate, endTime } = req.body;
    const user_id = req.user.id; // Ambil user_id dari req.user yang sudah disiapkan di middleware

    if (!user_id) {
      return res.status(400).json({ error: 'User ID is missing from the token' });
    }

    // Parsing tanggal dan waktu untuk memastikan mereka dalam format ISO
    const parsedDate = new Date(date);
    const parsedTime = new Date(`1970-01-01T${time}`);  // Menganggap waktu dalam format 'HH:mm'
    const parsedEndDate = new Date(endDate);
    const parsedEndTime = new Date(`1970-01-01T${endTime}`);

    // Format tanggal dan waktu ke dalam format ISO 8601
    const formattedDate = parsedDate.toISOString().split('T')[0];  // 'YYYY-MM-DD'
    const formattedTime = parsedTime.toISOString().split('T')[1].slice(0, 8);  // 'HH:mm:ss'
    const formattedEndDate = parsedEndDate.toISOString().split('T')[0];  // 'YYYY-MM-DD'
    const formattedEndTime = parsedEndTime.toISOString().split('T')[1].slice(0, 8);  // 'HH:mm:ss'

    const { data, error } = await supabase
      .from('biopori')
      .insert([
        {
          user_id, // Gunakan user_id dari token
          image_url: image_url || null,
          name,
          date: formattedDate,
          time: formattedTime,
          end_date: formattedEndDate,
          end_time: formattedEndTime,
          isfull: false, // Default nilai isFull
          ispanen: false // Default nilai isPanen
        },
      ])
      .select();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json({ message: 'Biopori added successfully', data });
  } catch (err) {
    console.error('Error adding biopori:', err.message);
    return res.status(500).json({ error: 'Server error' });
  }
};



// Get Biopori Data
const getBiopori = async (req, res) => {
  try {
    const user_id = req.user.id; // Pastikan user_id ada di token

    if (!user_id) {
      return res.status(400).json({ error: 'User ID is missing from the token' });
    }

    // Ambil data biopori berdasarkan user_id
    const { data, error } = await supabase
      .from('biopori')
      .select('*')
      .eq('user_id', user_id);

    // Periksa jika ada error
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Jika tidak ada data, kembalikan respons kosong
    if (!data || data.length === 0) {
      return res.status(200).json({ message: 'No biopori data found', data: [] });
    }

    // Berikan respons data biopori
    res.status(200).json({ message: 'Biopori data retrieved successfully', data });
  } catch (err) {
    console.error('Error retrieving biopori data:', err.message); // Log error untuk debugging
    return res.status(500).json({ error: 'Server error' });
  }
};

// UPDATE BIOPORI
const updateBiopori = async (req, res) => {
  try {
    const { id } = req.params;  // Ambil ID dari URL parameter
    const { name, date, time, image_url } = req.body;
    const user_id = req.user.id;  // Ambil user_id dari token

    // Validasi ID
    if (!id || isNaN(id)) {
      return res.status(400).json({ error: 'Invalid or missing ID' });
    }

    // Validasi user_id
    if (!user_id) {
      return res.status(400).json({ error: 'User ID is missing from the token' });
    }

    // Ambil data biopori berdasarkan ID dan user_id
    const { data, error } = await supabase
      .from('biopori')
      .select('*')
      .eq('id', id)
      .eq('user_id', user_id)
      .single();  // Pastikan hanya satu data yang diambil

    if (error || !data) {
      return res.status(404).json({ error: 'Biopori not found' });
    }

    // Update data biopori
    const { data: updatedData, error: updateError } = await supabase
      .from('biopori')
      .update({
        name: name || data.name,
        date: date || data.date,
        time: time || data.time,
        image_url: image_url || data.image_url
      })
      .eq('id', id)
      .eq('user_id', user_id)
      .select();  // Ambil data yang telah diperbarui

    if (updateError) {
      return res.status(400).json({ error: updateError.message });
    }

    // Kirimkan response dengan data yang sudah diperbarui
    res.status(200).json({ message: 'Biopori updated successfully', data: updatedData });
  } catch (err) {
    console.error('Error updating biopori:', err.message);
    return res.status(500).json({ error: 'Server error' });
  }
};


module.exports = { addBiopori, getBiopori, updateBiopori };
