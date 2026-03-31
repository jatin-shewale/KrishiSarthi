const express = require('express');
const router = express.Router();
const {
    createCheckoutSession,
    paymentSuccess,
    stripeWebhook,
} = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');

router.post('/create-checkout-session', protect, createCheckoutSession);
router.post('/success', protect, paymentSuccess);
router.post('/webhook', stripeWebhook);

module.exports = router;
