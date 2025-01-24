const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verifikasi token dengan JWT_SECRET
        console.log('Decoded Token:', decoded); // Debug log untuk memeriksa isi token

        // Pastikan userId tersedia
        if (!decoded.userId) {
            return res.status(400).json({ error: 'User ID is missing from the token' });
        }

        req.user = { id: decoded.userId, username: decoded.username }; // Attach userId dan username ke req.user
        next(); // Lanjut ke middleware/handler berikutnya
    } catch (error) {
        console.error('Token verification failed:', error.message); // Debug log error
        return res.status(400).json({ error: 'Invalid token' });
    }
};

module.exports = authenticateToken;
