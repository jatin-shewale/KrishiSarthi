const asyncHandler = require('express-async-handler');
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const Booking = require('../models/Booking');
const Payment = require('../models/Payment');

// @desc    Create Stripe Checkout Session
// @route   POST /api/payments/create-checkout-session
// @access  Private
const createCheckoutSession = asyncHandler(async (req, res) => {
    const { bookingId } = req.body;

    const booking = await Booking.findById(bookingId).populate('equipment');

    if (!booking) {
        res.status(404);
        throw new Error('Booking not found');
    }

    if (booking.renter.toString() !== req.user.id) {
        res.status(401);
        throw new Error('Not authorized');
    }

    if (booking.status !== 'approved') {
        res.status(400);
        throw new Error('Booking must be approved before payment');
    }

    if (booking.paymentStatus === 'paid') {
        res.status(400);
        throw new Error('This booking has already been paid');
    }

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: booking.equipment.name,
                        images: [booking.equipment.image],
                    },
                    unit_amount: booking.totalPrice * 100, // Amount in paise
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: `${process.env.FRONTEND_URL}/payment?success=true&bookingId=${booking._id}&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.FRONTEND_URL}/payment?canceled=true`,
        metadata: {
            bookingId: booking._id.toString(),
            userId: req.user.id,
        },
    });

    res.json({ id: session.id, url: session.url });
});

// @desc    Verify Payment and Update Booking
// @route   POST /api/payments/success
// @access  Private
const paymentSuccess = asyncHandler(async (req, res) => {
    const { sessionId, bookingId } = req.body;

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === 'paid') {
        // Update Booking
        const booking = await Booking.findById(bookingId);
        if (booking) {
            booking.paymentStatus = 'paid';
            booking.status = 'paid'; // Or 'completed'
            await booking.save();
        }

        // Record Transaction
        const paymentExists = await Payment.findOne({ stripeSessionId: sessionId });

        if (!paymentExists) {
            await Payment.create({
                booking: bookingId,
                user: req.user.id,
                amount: session.amount_total / 100,
                stripeSessionId: sessionId,
                status: 'completed',
            });
        }

        res.status(200).json({ success: true });
    } else {
        res.status(400);
        throw new Error('Payment verification failed');
    }
});

// @desc    Stripe Webhook Endpoint
// @route   POST /api/payments/webhook
// @access  Public
const stripeWebhook = asyncHandler(async (req, res) => {
    const payload = req.body;
    const sig = req.headers['stripe-signature'];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;

    try {
        event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (err) {
        console.error('Webhook Error:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;

        const bookingId = session.metadata.bookingId;
        const userId = session.metadata.userId;

        // Update Booking
        const booking = await Booking.findById(bookingId);
        if (booking) {
            booking.paymentStatus = 'paid';
            booking.status = 'paid';
            booking.stripeSessionId = session.id;
            await booking.save();
        }

        // Record Transaction
        const paymentExists = await Payment.findOne({ stripeSessionId: session.id });
        if (!paymentExists) {
            await Payment.create({
                booking: bookingId,
                user: userId,
                amount: session.amount_total / 100,
                stripeSessionId: session.id,
                status: 'completed',
            });
        }
    }

    res.status(200).json({ received: true });
});

module.exports = {
    createCheckoutSession,
    paymentSuccess,
    stripeWebhook,
};
