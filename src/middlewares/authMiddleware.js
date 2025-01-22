const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');  // Getting the token from the header

    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        // Verify the token and get the user data
        const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Replace `JWT_SECRET` with your secret key

        // Assuming the decoded token contains user information, like the user ID
        req.user = decoded;  // Attach user data to the request object (if you're using a token that contains user data)

        next();  // Proceed to the next middleware or route handler
    } catch (error) {
        return res.status(400).json({ error: 'Invalid token' });
    }
};

module.exports = authenticateToken;
