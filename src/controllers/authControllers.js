const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const supabase = require('../models/db');
require('dotenv').config(); 

const registerUser = async (req, res) => {
    const { username, phone_number, email, password } = req.body;

    if (!username || !phone_number || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    try {
        console.log("Received data:", req.body);

        const { data, error } = await supabase
            .from('users')
            .insert([{ username, phone_number, email, password_hash: hashedPassword }])
            .select(); 

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        res.status(201).json({ message: 'User registered successfully', data });
    } catch (error) {
        console.error(error); 
        res.status(500).json({ error: 'Server error, please try again later' });
    }
};

const loginUser = async (req, res) => {
    const { username, password } = req.body;

    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('username', username)
        .single();

    if (error || !data) {
        return res.status(400).json({ error: 'User not found' });
    }

    const isPasswordValid = bcrypt.compareSync(password, data.password_hash);

    if (!isPasswordValid) {
        return res.status(400).json({ error: 'Invalid password' });
    }

    const token = jwt.sign({ userId: data.id, username: data.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: 'Login successful', token });
};

const getUserData = async (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Token is required' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const { data: userData, error: userError } = await supabase
            .from('users')
            .select('id, username, email, phone_number') 
            .eq('id', decoded.userId)
            .single();

        if (userError || !userData) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ 
            id: userData.id, 
            username: userData.username, 
            email: userData.email, 
            phone_number: userData.phone_number 
        });
    } catch (error) {
        console.error(error);
        res.status(403).json({ error: 'Invalid or expired token' });
    }
};


module.exports = { registerUser, loginUser, getUserData };
