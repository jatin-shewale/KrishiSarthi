const mongoose = require('mongoose');

const equipmentSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add equipment name'],
        },
        category: {
            type: String,
            required: [true, 'Please add a category'],
            enum: ['Tractor', 'Harvester', 'Tiller', 'Seeder', 'Sprayer', 'Other'],
        },
        price: {
            type: Number,
            required: [true, 'Please add price per day'],
        },
        location: {
            type: String, // You might want GeoJSON here for advanced maps later
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            default: 'https://via.placeholder.com/150',
        },
        availability: {
            type: Boolean,
            default: true,
        },
        status: {
            type: String,
            enum: ['pending', 'approved', 'rejected'],
            default: 'pending'
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        unavailableDates: [{ type: Date }],
        ratings: [
            {
                user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
                rating: { type: Number, required: true, min: 1, max: 5 },
                comment: { type: String }
            }
        ],
        averageRating: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Equipment', equipmentSchema);
