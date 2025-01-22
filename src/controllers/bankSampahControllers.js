const supabase = require('../models/db');

// Fungsi untuk menambah sampah dan update total transaksi
const addSampah = async (req, res) => {
    try {
        // Dapatkan user_id dari request body dan pastikan ada
        const { userId, totalTransactionValue } = req.body;

        if (!userId || !totalTransactionValue) {
            return res.status(400).json({ error: 'User ID and total transaction value are required' });
        }

        // Ambil data user untuk memastikan user ada di database
        const { data: userData, error: userError } = await supabase
            .from('users')
            .select('total_transactions')
            .eq('id', userId)
            .single();

        if (userError || !userData) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Menghitung total transaksi baru
        const newTotalTransaction = userData.total_transactions + totalTransactionValue;

        // Update total_transactions dan ambil data yang telah diupdate
        const { data, error } = await supabase
            .from('users')
            .update({ total_transactions: newTotalTransaction })
            .eq('id', userId)
            .select(); // Pastikan data yang diupdate dikembalikan

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        // Berikan respons data yang diupdate
        res.status(200).json({ message: 'Transaction updated successfully', data });
    } catch (err) {
        console.error('Error adding sampah:', err.message); // Log error untuk debugging
        return res.status(500).json({ error: 'Server error' });
    }
};

module.exports = { addSampah };
