import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaCreditCard, FaLock, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-toastify';

const Payment = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState('verifying'); // verifying, success, error

    useEffect(() => {
        const verifyPayment = async () => {
            const params = new URLSearchParams(location.search);
            const successParam = params.get('success');
            const sessionId = params.get('session_id');
            const bookingId = params.get('bookingId');

            if (successParam === 'true' && sessionId && bookingId) {
                try {
                    const token = localStorage.getItem('krishisarthi_token');
                    const config = { headers: { Authorization: `Bearer ${token}` } };
                    
                    await axios.post('http://localhost:5000/api/payments/success', {
                        sessionId,
                        bookingId
                    }, config);

                    setStatus('success');
                    toast.success("Payment Verified!");
                    setTimeout(() => navigate('/dashboard/farmer'), 3000);
                } catch (error) {
                    setStatus('error');
                    toast.error("Payment verification failed.");
                } finally {
                    setLoading(false);
                }
            } else if (params.get('canceled') === 'true') {
                setStatus('error');
                setLoading(false);
                toast.warning("Payment canceled.");
            } else {
                // Manual entry to payment page without stripe params - not allowed
                navigate('/');
            }
        };

        verifyPayment();
    }, [location, navigate]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-gray-600 font-medium">Verifying your payment...</p>
                </div>
            </div>
        );
    }

    if (status === 'success') {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-white p-10 rounded-2xl shadow-xl text-center max-w-sm"
                >
                    <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-4" />
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Success!</h2>
                    <p className="text-gray-600">Your equipment rental is confirmed. {process.env.NODE_ENV === 'development' ? 'Check Dashboard.' : ''}</p>
                    <p className="mt-4 text-sm text-gray-400">Redirecting to dashboard...</p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen flex items-center justify-center">
            <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white p-10 rounded-2xl shadow-xl text-center max-w-sm border-t-4 border-red-500"
            >
                <FaTimesCircle className="text-6xl text-red-500 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Payment Failed</h2>
                <p className="text-gray-600">Something went wrong or the payment was canceled.</p>
                <button 
                    onClick={() => navigate('/marketplace')}
                    className="mt-6 w-full bg-gray-800 text-white font-bold py-3 rounded-xl"
                >
                    Back to Marketplace
                </button>
            </motion.div>
        </div>
    );
};

export default Payment;
