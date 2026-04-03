const asyncHandler = require('express-async-handler');
const Equipment = require('../models/Equipment');


const getEquipment = asyncHandler(async (req, res) => {
    const { category, minPrice, maxPrice, location, search, owner } = req.query;

    let query = {};

    // Search by name logic
    if (search) {
        query.name = { $regex: search, $options: 'i' };
    }

    if (owner) {
        query.owner = owner;
    }

    // Filter by Category
    if (category && category !== 'All') {
        query.category = category;
    }

    // Filter by Location
    if (location) {
        query.location = { $regex: location, $options: 'i' };
    }

    // Filter by Price Range
    if (minPrice || maxPrice) {
        query.price = {};
        if (minPrice) query.price.$gte = Number(minPrice);
        if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const equipment = await Equipment.find(query).populate('owner', 'name email location');
    res.status(200).json(equipment);
});

// @desc    Get single equipment
// @route   GET /api/equipment/:id
// @access  Public
const getEquipmentById = asyncHandler(async (req, res) => {
    const equipment = await Equipment.findById(req.params.id).populate('owner', 'name email location');

    if (!equipment) {
        res.status(404);
        throw new Error('Equipment not found');
    }

    res.status(200).json(equipment);
});

// @desc    Create equipment
// @route   POST /api/equipment
// @access  Private
const createEquipment = asyncHandler(async (req, res) => {
    if (!req.body.name || !req.body.price) {
        res.status(400);
        throw new Error('Please add required fields');
    }

    const equipmentData = {
        ...req.body,
        owner: req.user.id,
    };

    // If file was uploaded, set the image field to the file path
    if (req.file) {
        equipmentData.image = `http://localhost:5000/${req.file.path.replace(/\\/g, '/')}`;
    }

    const equipment = await Equipment.create(equipmentData);

    res.status(200).json(equipment);
});

// @desc    Update equipment
// @route   PUT /api/equipment/:id
// @access  Private
const updateEquipment = asyncHandler(async (req, res) => {
    const equipment = await Equipment.findById(req.params.id);

    if (!equipment) {
        res.status(404);
        throw new Error('Equipment not found');
    }

    // Check for user
    if (!req.user) {
        res.status(401);
        throw new Error('User not found');
    }

    // Make sure the logged in user matches the equipment owner
    if (equipment.owner.toString() !== req.user.id && req.user.role !== 'admin') {
        res.status(401);
        throw new Error('User not authorized');
    }

    const updatedEquipment = await Equipment.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.status(200).json(updatedEquipment);
});

// @desc    Delete equipment
// @route   DELETE /api/equipment/:id
// @access  Private
const deleteEquipment = asyncHandler(async (req, res) => {
    const equipment = await Equipment.findById(req.params.id);

    if (!equipment) {
        res.status(404);
        throw new Error('Equipment not found');
    }

    // Check for user
    if (!req.user) {
        res.status(401);
        throw new Error('User not found');
    }

    // Make sure the logged in user matches the equipment owner
    if (equipment.owner.toString() !== req.user.id && req.user.role !== 'admin') {
        res.status(401);
        throw new Error('User not authorized');
    }

    await equipment.deleteOne();

    res.status(200).json({ id: req.params.id });
});

module.exports = {
    getEquipment,
    getEquipmentById,
    createEquipment,
    updateEquipment,
    deleteEquipment,
};
