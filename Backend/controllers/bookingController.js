const asyncHandler = require('express-async-handler');
const Booking = require('../models/Booking');
const Equipment = require('../models/Equipment');

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
const createBooking = asyncHandler(async (req, res) => {
    const { equipmentId, startDate, endDate, totalPrice } = req.body;

    const equipment = await Equipment.findById(equipmentId);

    if (!equipment) {
        res.status(404);
        throw new Error('Equipment not found');
    }

    const booking = await Booking.create({
        equipment: equipmentId,
        renter: req.user.id,
        owner: equipment.owner,
        startDate,
        endDate,
        totalPrice,
    });

    res.status(201).json(booking);
});

// @desc    Get bookings (Role based)
// @route   GET /api/bookings
// @access  Private
const getBookings = asyncHandler(async (req, res) => {
    let bookings;

    // If admin, return all
    if (req.user.role === 'admin') {
        bookings = await Booking.find()
            .populate('equipment', 'name image price')
            .populate('renter', 'name email')
            .populate('owner', 'name email');
    } else {
        // Return bookings where user is renter or owner
        bookings = await Booking.find({
            $or: [{ renter: req.user.id }, { owner: req.user.id }],
        })
            .populate('equipment', 'name image price')
            .populate('renter', 'name email')
            .populate('owner', 'name email');
    }

    res.status(200).json(bookings);
});

// @desc    Update booking status (Approve/Reject)
// @route   PUT /api/bookings/:id/status
// @access  Private
const updateBookingStatus = asyncHandler(async (req, res) => {
    const { status } = req.body; // 'approved', 'rejected'

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
        res.status(404);
        throw new Error('Booking not found');
    }

    // Only owner (or admin) can approve/reject
    if (booking.owner.toString() !== req.user.id && req.user.role !== 'admin') {
        res.status(401);
        throw new Error('Not authorized to manage this booking');
    }

    booking.status = status;
    const updatedBooking = await booking.save();

    res.status(200).json(updatedBooking);
});

module.exports = {
    createBooking,
    getBookings,
    updateBookingStatus,
};
