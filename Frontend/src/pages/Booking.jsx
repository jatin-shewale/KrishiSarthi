import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaCheckCircle, FaTimesCircle, FaClock } from 'react-icons/fa';
import { toast } from 'react-toastify';
import api from '../services/api';

const Booking = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [equipment, setEquipment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [bookingStatus, setBookingStatus] = useState('new'); // new, pending, approved, rejected, paid
    const [bookingId, setBookingId] = useState(null);

    useEffect(() => {
        const fetchEquipment = async () => {
            try {
                const res = await api.get(`/equipment/${id}`);
                setEquipment(res.data);
            } catch (err) {
                toast.error("Failed to load equipment");
            } finally {
                setLoading(false);
            }
        };
        fetchEquipment();
    }, [id]);

    const handleRequestBooking = async (e) => {
        e.preventDefault();
        if (!startDate || !endDate) return;

        if (new Date(endDate) <= new Date(startDate)) {
            toast.error("End date must be after start date");
            return;
        }

        try {
            const token = localStorage.getItem('krishisarthi_token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            
            const days = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)) || 1;
            const totalPrice = days * equipment.price;

            const res = await api.post('/bookings', {
                equipmentId: id,
                startDate,
                endDate,
                totalPrice
            }, config);

            setBookingId(res.data._id);
            setBookingStatus('pending');
            toast.success("Booking Request Sent!");
        } catch (error) {
            toast.error(error.response?.data?.message || "Booking failed");
        }
    };

    const handleProceedToPayment = async () => {
        try {
            const token = localStorage.getItem('krishisarthi_token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const res = await api.post('/payments/create-checkout-session', {
                bookingId
            }, config);

            // Redirect to Stripe Checkout
            if (res.data.url) {
                window.location.href = res.data.url;
            } else if (res.data.id) {
                // Handling session ID if URL not provided (legacy)
                toast.error("Stripe URL missing. Check backend controller.");
            }
        } catch (error) {
            toast.error("Payment initialization failed");
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    if (!equipment) return <div className="min-h-screen flex items-center justify-center text-red-500">Equipment not found</div>;

    if (bookingStatus === 'pending') {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
                <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
                    <div className="w-16 h-16 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FaClock className="text-3xl" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Requested!</h2>
                    <p className="text-gray-600 mb-6">Your request has been sent for review. Our platform administrator will approve the request shortly.</p>
                    
                    <p className="text-sm text-gray-500 mb-4 italic">Verification expected within 24 hours.</p>
                    
                    <Link to="/marketplace" className="mt-6 inline-block text-primary font-medium hover:underline">
                        Back to Marketplace
                    </Link>
                </div>
            </div>
        );
    }

    if (bookingStatus === 'approved') {
        return (
             <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
                 <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FaCheckCircle className="text-3xl" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Approved!</h2>
                    <p className="text-gray-600 mb-6">The administrator has approved your request. Please proceed to payment to confirm.</p>
                    <button 
                        onClick={handleProceedToPayment}
                        className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-lg shadow-md transition-colors"
                    >
                        Proceed to Payment
                    </button>
                 </div>
             </div>
        );
    }

    if (bookingStatus === 'rejected') {
        return (
             <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
                 <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
                    <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FaTimesCircle className="text-3xl" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Rejected</h2>
                    <p className="text-gray-600 mb-6">Sorry, the owner has rejected your request for the selected dates.</p>
                    <Link to="/marketplace" className="w-full inline-block bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-lg transition-colors">
                        Find Other Equipment
                    </Link>
                 </div>
             </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen py-10">
            <div className="max-w-xl mx-auto px-4">
                <div className="bg-white rounded-xl shadow-md overflow-hidden p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Request Booking</h2>
                    
                    <div className="flex items-center mb-6 p-4 bg-gray-50 rounded-lg">
                        <div className="w-16 h-16 bg-gray-300 rounded-md overflow-hidden flex-shrink-0">
                           <img src={equipment.image || 'https://source.unsplash.com/random/100x100/?tractor'} alt="Equipment" className="w-full h-full object-cover" />
                        </div>
                        <div className="ml-4">
                            <h3 className="font-bold text-gray-900">{equipment.name}</h3>
                            <p className="text-primary font-bold">₹{equipment.price} / day</p>
                        </div>
                    </div>

                    <form onSubmit={handleRequestBooking} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                            <div className="relative">
                                <FaCalendarAlt className="absolute top-3 left-3 text-gray-400" />
                                <input 
                                    type="date" 
                                    required
                                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                            <div className="relative">
                                <FaCalendarAlt className="absolute top-3 left-3 text-gray-400" />
                                <input 
                                    type="date" 
                                    required
                                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="pt-4">
                             <div className="bg-blue-50 p-3 rounded-md mb-4 text-sm text-blue-700">
                                Total Estimate: <span className="font-bold">₹{((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24) || 1) * equipment.price}</span>
                             </div>
                            
                            <button
                                type="submit"
                                className="w-full bg-secondary hover:bg-secondary-dark text-white font-bold py-3 rounded-lg shadow-md transition-colors"
                            >
                                Send Request
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Booking;
