const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Equipment = require('../models/Equipment');
const Booking = require('../models/Booking');
const Payment = require('../models/Payment');


const adminLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (
        email?.trim().toLowerCase() === (process.env.ADMIN_EMAIL || 'admin@gmail.com').toLowerCase() &&
        password === (process.env.ADMIN_PASSWORD || 'admin123')
    ) {
        res.json({
            token: jwt.sign({ id: 'admin_env' }, process.env.JWT_SECRET, { expiresIn: '30d' }),
            email: process.env.ADMIN_EMAIL || 'admin@gmail.com',
            name: 'KrishiSarthi Admin',
            role: 'admin'
        });
    } else {
        res.status(401);
        throw new Error('Invalid Admin Credentials');
    }
});

// @desc    Get Platform Stats
// @route   GET /api/admin/stats
// @access  Private/Admin
const getStats = asyncHandler(async (req, res) => {
    const totalUsers = await User.countDocuments();
    const totalEquipment = await Equipment.countDocuments();
    const totalBookings = await Booking.countDocuments();

    // Calculate Revenue
    const payments = await Payment.find();
    const totalRevenue = payments.reduce((acc, curr) => acc + curr.amount, 0);

    const recentUsers = await User.find().sort({ createdAt: -1 }).limit(5);
    const recentBookings = await Booking.find().populate('equipment renter').sort({ createdAt: -1 }).limit(5);

    res.json({
        totalUsers,
        totalEquipment,
        totalBookings,
        totalRevenue: totalRevenue.toFixed(2),
        recentUsers,
        recentBookings,
    });
});

// @desc    Get all users
// @route   GET /api/admin/users
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select('-password');
    res.json(users);
});

// @desc    Get all equipment
// @route   GET /api/admin/equipment
const getAllEquipment = asyncHandler(async (req, res) => {
    const equipment = await Equipment.find().populate('owner', 'name email');
    res.json(equipment);
});

// @desc    Approve/Reject equipment
// @route   PUT /api/admin/equipment/:id
const updateEquipmentStatus = asyncHandler(async (req, res) => {
    const { status } = req.body;
    const equipment = await Equipment.findById(req.params.id);
    if (equipment) {
        equipment.status = status;
        const updated = await equipment.save();
        res.json(updated);
    } else {
        res.status(404);
        throw new Error('Equipment not found');
    }
});

// @desc    Get all bookings
// @route   GET /api/admin/bookings
const getAllBookings = asyncHandler(async (req, res) => {
    const bookings = await Booking.find().populate('equipment renter owner', 'name email');
    res.json(bookings);
});

// @desc    Update booking status
// @route   PUT /api/admin/bookings/:id
const updateBookingStatus = asyncHandler(async (req, res) => {
    const { status } = req.body;
    const booking = await Booking.findById(req.params.id);
    if (booking) {
        booking.status = status;
        const updated = await booking.save();
        res.json(updated);
    } else {
        res.status(404);
        throw new Error('Booking not found');
    }
});

module.exports = {
    getStats,
    adminLogin,
    getAllUsers,
    getAllEquipment,
    updateEquipmentStatus,
    getAllBookings,
    updateBookingStatus,
};
