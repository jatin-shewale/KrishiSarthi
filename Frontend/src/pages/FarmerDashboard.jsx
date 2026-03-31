import React, { useState, useEffect } from 'react';
import { FaTractor, FaClipboardList, FaRupeeSign, FaPlus, FaCheck, FaTimes, FaCameraRetro } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-toastify';

const FarmerDashboard = () => {
    const [activeTab, setActiveTab] = useState('listings');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    
    const [listings, setListings] = useState([]);
    const [requests, setRequests] = useState([]);
    const [rentals, setRentals] = useState([]);
    
    // Derived Stats
    const totalEarnings = rentals.reduce((acc, curr) => acc + (curr.totalPrice || 0), 0);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('krishisarthi_token');
            const userStr = localStorage.getItem('krishisarthi_user');
            
            if (!token || !userStr) {
                navigate('/login');
                return;
            }
            const user = JSON.parse(userStr);
            const config = { headers: { Authorization: `Bearer ${token}` } };

            // Fetch My Equipments
            const equipRes = await axios.get(`http://localhost:5000/api/equipment?owner=${user._id}`, config);
            setListings(equipRes.data);

            // Fetch My Bookings (Both as Renter and Owner)
            const bookingRes = await axios.get(`http://localhost:5000/api/bookings`, config);
            
            const myRequests = bookingRes.data.filter(b => b.owner?._id === user._id || b.owner === user._id);
            const myRentals = bookingRes.data.filter(b => b.renter?._id === user._id || b.renter === user._id);

            setRequests(myRequests);
            setRentals(myRentals);

        } catch (error) {
            toast.error("Failed to fetch dashboard data");
            if (error.response?.status === 401) navigate('/login');
        } finally {
            setLoading(false);
        }
    };

    const handleBookingStatus = async (id, status) => {
        try {
            const token = localStorage.getItem('krishisarthi_token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            await axios.put(`http://localhost:5000/api/bookings/${id}/status`, { status }, config);
            toast.success(`Booking ${status} successfully`);
            fetchDashboardData();
        } catch (error) {
            toast.error("Failed to update booking status");
        }
    };

    return (
        <div className="bg-gradient-to-br from-earth-50 via-white to-earth-100 min-h-[calc(100vh-64px)] py-10 relative overflow-hidden">
            {/* Background Blobs */}
            <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-primary-light rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div 
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4"
                >
                    <h1 className="text-4xl font-extrabold text-gray-900 drop-shadow-sm font-display">Hello, Farmer! 👋</h1>
                    <Link to="/add-equipment" className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-xl flex items-center shadow-lg shadow-primary/30 transition-all hover:scale-105">
                        <FaPlus className="mr-2" /> List New Equipment
                    </Link>
                </motion.div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    {[
                        { title: 'My Listings', val: listings.length.toString(), icon: <FaTractor />, color: 'text-blue-600', bg: 'bg-blue-100' },
                        { title: 'Pending Activity', val: requests.filter(r => r.status === 'pending').length.toString(), icon: <FaClipboardList />, color: 'text-yellow-600', bg: 'bg-yellow-100' },
                        { title: 'Total Earnings', val: `₹${totalEarnings}`, icon: <FaRupeeSign />, color: 'text-green-600', bg: 'bg-green-100' }
                    ].map((stat, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-xl shadow-gray-200/50 border border-white flex items-center hover:-translate-y-1 transition-transform cursor-pointer"
                        >
                            <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center text-2xl mr-5 shadow-sm`}>
                                {stat.icon}
                            </div>
                            <div>
                                <p className="text-gray-500 text-sm font-medium">{stat.title}</p>
                                <p className="text-3xl font-extrabold text-gray-800 font-display">{stat.val}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Tabs */}
                <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl shadow-gray-200/50 overflow-hidden min-h-[400px] border border-white">
                    <div className="flex border-b border-gray-100">
                        {['listings', 'requests', 'rentals'].map(tab => (
                            <button 
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`flex-1 py-5 text-center font-bold tracking-wide transition-all relative ${
                                    activeTab === tab 
                                    ? 'text-primary bg-primary/5' 
                                    : 'text-gray-500 hover:text-primary hover:bg-gray-50'
                                }`}
                            >
                                {tab === 'listings' ? 'My Listings' : tab === 'requests' ? 'Booking Requests' : 'My Rentals'}
                                {activeTab === tab && (
                                    <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t-full" />
                                )}
                            </button>
                        ))}
                    </div>

                    <div className="p-8">
                        <AnimatePresence mode="wait">
                            {loading ? (
                                <motion.div 
                                    key="skeleton"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="animate-pulse space-y-6"
                                >
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="flex flex-col sm:flex-row items-center justify-between border-b border-gray-100 pb-6 last:border-0">
                                            <div className="flex items-center w-full sm:w-auto">
                                                <div className="w-20 h-20 bg-gray-200 rounded-xl mr-6"></div>
                                                <div className="space-y-3">
                                                    <div className="h-5 bg-gray-200 rounded w-40"></div>
                                                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                                                </div>
                                            </div>
                                            <div className="h-8 bg-gray-200 rounded-full w-24 mt-4 sm:mt-0"></div>
                                        </div>
                                    ))}
                                </motion.div>
                            ) : (
                                <motion.div 
                                    key="content"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {activeTab === 'listings' && (
                                        <div className="space-y-6">
                                            {listings.length === 0 ? ( <div className="text-gray-500 py-8 text-center border-2 border-dashed rounded-xl">No equipment listed yet.</div>) : listings.map(item => (
                                                <div key={item._id} className="flex items-center justify-between border-b border-gray-100 pb-6 last:border-0 last:pb-0 hover:bg-gray-50 p-2 rounded-xl transition-colors">
                                                    <div className="flex items-center">
                                                        <div className="relative w-20 h-20 mr-6">
                                                            <img src={item.image || 'https://source.unsplash.com/random/800x600/?tractor'} alt={item.name} className="w-full h-full rounded-xl object-cover shadow-sm" />
                                                            <div className="absolute inset-0 bg-black/10 rounded-xl"></div>
                                                        </div>
                                                        <div>
                                                            <h3 className="font-extrabold text-lg text-gray-800">{item.name}</h3>
                                                            <p className="text-primary font-bold">₹{item.price} <span className="text-gray-500 font-normal text-sm">/ day</span></p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        <span className={`text-xs px-3 py-1.5 rounded-full font-bold shadow-sm backdrop-blur-sm ${item.status === 'approved' ? 'bg-green-100/80 text-green-800' : item.status === 'rejected' ? 'bg-red-100/80 text-red-800' : 'bg-yellow-100/80 text-yellow-800'}`}>
                                                            {item.status.toUpperCase()}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {activeTab === 'requests' && (
                                        <div className="space-y-4">
                                            {requests.length === 0 ? ( <div className="text-gray-500 py-8 text-center border-2 border-dashed rounded-xl">No incoming requests.</div>) : requests.map(req => (
                                                <div key={req._id} className="flex flex-col sm:flex-row sm:items-center justify-between border border-gray-100 p-5 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow">
                                                    <div className="mb-4 sm:mb-0">
                                                        <h3 className="font-extrabold text-gray-800 text-lg">{req.equipment?.name || 'Unknown Equipment'}</h3>
                                                        <p className="text-sm text-gray-600 mt-1">Requested by <span className="font-bold text-gray-900">{req.renter?.name || 'Unknown User'}</span></p>
                                                        <p className="text-xs font-medium text-primary mt-1 bg-primary/10 inline-block px-2 py-1 rounded-md">{new Date(req.startDate).toLocaleDateString()} - {new Date(req.endDate).toLocaleDateString()}</p>
                                                    </div>
                                                    <div className="flex items-center space-x-3">
                                                        {req.status === 'pending' ? (
                                                            <>
                                                                <button onClick={() => handleBookingStatus(req._id, 'approved')} className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-xl shadow-md transition-transform hover:scale-105" title="Approve"><FaCheck /></button>
                                                                <button onClick={() => handleBookingStatus(req._id, 'rejected')} className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-xl shadow-md transition-transform hover:scale-105" title="Reject"><FaTimes /></button>
                                                            </>
                                                        ) : (
                                                            <span className={`px-4 py-1.5 rounded-full text-xs font-bold shadow-sm ${req.status === 'approved' ? 'bg-green-100/80 text-green-800' : req.status === 'rejected' ? 'bg-red-100/80 text-red-800' : 'bg-gray-100 text-gray-800'}`}>
                                                                {req.status.toUpperCase()}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {activeTab === 'rentals' && (
                                        <div className="space-y-4">
                                            {rentals.length > 0 ? (
                                                rentals.map(rental => (
                                                    <div key={rental._id} className="flex items-center justify-between border-b border-gray-100 pb-5 pt-3">
                                                        <div>
                                                            <h3 className="font-extrabold text-gray-800 text-lg">{rental.equipment?.name || 'Unknown'}</h3>
                                                            <p className="text-sm text-gray-600 mt-1">Owner: <span className="font-medium">{rental.owner?.name || 'Unknown'}</span></p>
                                                            <p className="text-xs text-gray-500 mt-1">Amount Paid/Pending: ₹{rental.totalPrice}</p>
                                                        </div>
                                                        <div>
                                                            <span className={`text-xs px-3 py-1.5 rounded-full font-bold shadow-sm ${rental.paymentStatus === 'paid' ? 'bg-blue-100/80 text-blue-800' : 'bg-yellow-100/80 text-yellow-800'}`}>
                                                                Payment: {rental.paymentStatus.toUpperCase()}
                                                            </span>
                                                            <span className={`ml-2 text-xs px-3 py-1.5 rounded-full font-bold shadow-sm ${rental.status === 'approved' ? 'bg-green-100/80 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                                                {rental.status.toUpperCase()}
                                                            </span>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="flex flex-col flex-center items-center py-12 text-gray-400">
                                                    <FaCameraRetro className="w-16 h-16 mb-4 text-gray-300" />
                                                    <p className="text-center font-medium">No rentals found.</p>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FarmerDashboard;
