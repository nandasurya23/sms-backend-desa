const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded Token:', decoded);

        if (!decoded.userId) {
            return res.status(400).json({ error: 'User ID is missing from the token' });
        }

        req.user = { id: decoded.userId, username: decoded.username };
        next(); 
    } catch (error) {
        console.error('Token verification failed:', error.message); 
        return res.status(400).json({ error: 'Invalid token' });
    }
};

module.exports = authenticateToken;
