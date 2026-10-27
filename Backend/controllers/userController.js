const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');


const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, role, location, inviteCode } = req.body;

    if (role && !['farmer', 'admin'].includes(role)) {
        res.status(400);
        throw new Error('Invalid account role');
    }

    if (role === 'admin' && (!process.env.ADMIN_SIGNUP_CODE || inviteCode !== process.env.ADMIN_SIGNUP_CODE)) {
        res.status(403);
        throw new Error('A valid administrator invite code is required');
    }

    if (!name || !email || !password || !location) {
        res.status(400);
        throw new Error('Please add all fields');
    }

    if (role === 'admin' && email.trim().toLowerCase() !== (process.env.ADMIN_EMAIL || 'admin@gmail.com').toLowerCase()) {
        res.status(400);
        throw new Error(`Administrator accounts must use ${process.env.ADMIN_EMAIL || 'admin@gmail.com'}`);
    }

    // Check if user exists
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    // Hash password (handled in model pre-save)
    const user = await User.create({
        name,
        email,
        password,
        role: role || 'farmer',
        location,
    });

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Check for user email
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error('Invalid credentials');
    }
});

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
    res.status(200).json(req.user);
});

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

module.exports = {
    registerUser,
    loginUser,
    getMe,
};
