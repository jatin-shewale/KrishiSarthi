const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema(
    {
        booking: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Booking',
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        amount: {
            type: Number,
            required: true,
        },
        stripeSessionId: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            default: 'completed',
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Payment', paymentSchema);
