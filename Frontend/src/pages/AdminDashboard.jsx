import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaTractor, FaCalendarAlt, FaMoneyBillWave, FaCheck, FaTimes, FaSignOutAlt, FaBars, FaChartLine, FaShieldAlt, FaMapMarkerAlt, FaEnvelope, FaArrowLeft, FaCreditCard } from 'react-icons/fa';
import { toast } from 'react-toastify';
import api from '../services/api';

const AdminDashboard = ({ setAuth }) => {
    const [stats, setStats] = useState(null);
    const [equipmentList, setEquipmentList] = useState([]);
    const [bookingList, setBookingList] = useState([]);
    const [userList, setUserList] = useState([]);
    const [paymentList, setPaymentList] = useState([]);
    const [activeView, setActiveView] = useState('dashboard');
    const [loading, setLoading] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const currentAdmin = JSON.parse(localStorage.getItem('krishisarthi_user') || '{}');
    const token = localStorage.getItem('admin_token');
    const config = { headers: { Authorization: `Bearer ${token}` } };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        setLoading(true);
        try {
            const statsRes = await api.get('/admin/stats', config);
            setStats(statsRes.data);
            
            const equipRes = await api.get('/admin/equipment', config);
            setEquipmentList(equipRes.data);

            const bookingRes = await api.get('/admin/bookings', config);
            setBookingList(bookingRes.data);

            const usersRes = await api.get('/admin/users', config);
            setUserList(usersRes.data);

            // Payments derived from paid bookings
            const paidBookings = bookingRes.data.filter(b => b.paymentStatus === 'paid');
            setPaymentList(paidBookings);
        } catch (error) {
            if (error.response?.status === 401) {
                toast.error('Session expired. Please log in again.');
                handleLogout();
            }
        } finally {
            setLoading(false);
        }
    };

    const handleEquipmentApproval = async (id, status) => {
        try {
            await api.put(`/admin/equipment/${id}`, { status }, config);
            toast.success(`Equipment ${status} successfully`);
            fetchDashboardData(); // refresh list
        } catch (error) {
            toast.error('Failed to update status');
        }
    };

    const handleBookingStatus = async (id, status) => {
        try {
            await api.put(`/admin/bookings/${id}`, { status }, config);
            toast.success(`Booking ${status} successfully`);
            fetchDashboardData(); 
        } catch (error) {
            toast.error('Failed to update booking status');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('admin_token');
        localStorage.removeItem('krishisarthi_token');
        localStorage.removeItem('krishisarthi_user');
        setAuth(false);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-earth-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm transition-opacity"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <div className={`
                fixed inset-y-0 left-0 z-50 w-72 bg-primary-deep text-white flex flex-col transition-transform duration-300 transform 
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
                md:relative md:translate-x-0 shadow-2xl
            `}>
                <div className="p-8 border-b border-white/10">
                    <div className="flex items-center gap-3">
                        <div className="bg-primary-light p-2 rounded-lg shadow-lg">
                            <FaShieldAlt className="text-primary-deep text-xl" />
                        </div>
                        <h2 className="text-2xl font-bold tracking-tight font-display">Krishi<span className="text-primary-light">Admin</span></h2>
                    </div>
                </div>
                
                <nav className="flex-1 px-4 py-8 space-y-3">
                    {[
                        { key: 'dashboard', icon: <FaChartLine />, label: 'Dashboard' },
                        { key: 'users', icon: <FaUsers />, label: 'All Users' },
                        { key: 'equipment', icon: <FaTractor />, label: 'Manage Equipment' },
                        { key: 'bookings', icon: <FaCalendarAlt />, label: 'Manage Bookings' },
                        { key: 'payments', icon: <FaCreditCard />, label: 'Payments & Revenue' },
                    ].map(item => (
                        <button 
                            key={item.key}
                            onClick={() => { setActiveView(item.key); setIsSidebarOpen(false); }}
                            className={`w-full flex items-center px-6 py-4 rounded-xl transition-all font-semibold ${activeView === item.key ? 'bg-white/10 text-primary-light border border-white/10 shadow-lg' : 'text-gray-300 hover:bg-white/5 hover:text-white'}`}
                        >
                            <span className="mr-4 text-lg">{item.icon}</span> {item.label}
                        </button>
                    ))}
                </nav>

                <div className="p-6 border-t border-white/10">
                    <button 
                        onClick={handleLogout} 
                        className="w-full flex items-center justify-center px-6 py-4 text-red-300 bg-red-900/20 hover:bg-red-500 hover:text-white rounded-xl transition-all font-bold shadow-sm"
                    >
                        <FaSignOutAlt className="mr-3" /> Logout
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col h-full overflow-hidden">
                {/* Header */}
                <header className="bg-white border-b border-gray-200 h-20 flex items-center justify-between px-8 z-30">
                    <button 
                        onClick={() => setIsSidebarOpen(true)}
                        className="md:hidden p-3 bg-gray-50 rounded-xl text-gray-600 hover:bg-gray-100"
                    >
                        <FaBars />
                    </button>
                    <div className="hidden md:block">
                        <span className="text-gray-500 font-medium">Welcome back,</span>
                        <span className="ml-2 font-bold text-gray-900">{currentAdmin.email || 'admin@gmail.com'}</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center text-primary-deep font-bold border-2 border-primary-light outline outline-2 outline-primary/20">
                            A
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto bg-gray-50/50 p-6 md:p-10">
                    {activeView === 'dashboard' && stats && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                            <div className="mb-10">
                                <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight font-display mb-2">Platform Overview</h1>
                                <p className="text-gray-500 font-medium">Real-time statistics across the KrishiSarthi ecosystem.</p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                                {[
                                    { title: 'Total Active Users', val: stats.totalUsers, icon: <FaUsers />, color: 'bg-emerald-500', shadow: 'shadow-emerald-200', view: 'users' },
                                    { title: 'Equipment Listed', val: stats.totalEquipment, icon: <FaTractor />, color: 'bg-blue-500', shadow: 'shadow-blue-200', view: 'equipment' },
                                    { title: 'Recent Bookings', val: stats.totalBookings, icon: <FaCalendarAlt />, color: 'bg-amber-500', shadow: 'shadow-amber-200', view: 'bookings' },
                                    { title: 'Platform Revenue', val: `₹${stats.totalRevenue}`, icon: <FaMoneyBillWave />, color: 'bg-purple-500', shadow: 'shadow-purple-200', view: 'payments' }
                                ].map((s, i) => (
                                    <motion.div 
                                        key={i} 
                                        whileHover={{ y: -5, scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => setActiveView(s.view)}
                                        className="bg-white rounded-3xl shadow-xl shadow-gray-200 border border-white p-8 group transition-all cursor-pointer hover:border-gray-200"
                                    >
                                        <div className={`${s.color} text-white w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-2xl shadow-lg ${s.shadow} group-hover:scale-110 transition-transform`}>
                                            {s.icon}
                                        </div>
                                        <p className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-1">{s.title}</p>
                                        <p className="text-3xl font-extrabold text-gray-900">{s.val}</p>
                                        <p className="text-xs text-primary font-semibold mt-3 opacity-0 group-hover:opacity-100 transition-opacity">Click to view details →</p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {activeView === 'equipment' && (
                        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}>
                            <div className="mb-10">
                                <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight font-display mb-2">Equipment Approvals</h1>
                                <p className="text-gray-500 font-medium">Review and verify agricultural machinery before they go live.</p>
                            </div>

                            <div className="bg-white shadow-2xl shadow-gray-200 rounded-3xl border border-white overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-gray-50/50 border-b border-gray-100 text-gray-400 text-xs font-bold uppercase tracking-widest">
                                                <th className="px-8 py-6">Machine Details</th>
                                                <th className="px-8 py-6">Owner Information</th>
                                                <th className="px-8 py-6">Price Point</th>
                                                <th className="px-8 py-6">Live Status</th>
                                                <th className="px-8 py-6 text-right">Moderation</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-50">
                                            {equipmentList.map(eq => (
                                                <tr key={eq._id} className="hover:bg-gray-50/50 transition-colors group">
                                                    <td className="px-8 py-6">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-16 h-12 bg-gray-100 rounded-xl overflow-hidden shadow-inner border border-gray-200">
                                                                <img 
                                                                    src={eq.image || 'https://images.unsplash.com/photo-1595113316349-9fa4ee24f884?auto=format&fit=crop&q=80&w=100'} 
                                                                    alt="" 
                                                                    className="w-full h-full object-cover"
                                                                />
                                                            </div>
                                                            <div>
                                                                <p className="font-bold text-gray-900 group-hover:text-primary transition-colors">{eq.name}</p>
                                                                <p className="text-xs text-gray-400 font-medium">{eq.location}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-6">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-8 h-8 rounded-full bg-earth-100 text-primary flex items-center justify-center font-bold text-xs">
                                                                {eq.owner?.name?.charAt(0) || '?'}
                                                            </div>
                                                            <p className="text-sm font-semibold text-gray-700">{eq.owner?.name || 'Anonymous'}</p>
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-6">
                                                        <p className="text-sm font-bold text-gray-900 font-display">₹{eq.price}<span className="text-gray-400 text-[10px] ml-1 uppercase">/ Day</span></p>
                                                    </td>
                                                    <td className="px-8 py-6">
                                                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                                                            eq.status === 'approved' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                                            eq.status === 'rejected' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                                                        }`}>
                                                            {eq.status || 'Pending'}
                                                        </span>
                                                    </td>
                                                    <td className="px-8 py-6 text-right">
                                                        <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            {eq.status !== 'approved' && (
                                                                <button 
                                                                    onClick={() => handleEquipmentApproval(eq._id, 'approved')}
                                                                    className="bg-emerald-500 hover:bg-emerald-600 text-white p-2.5 rounded-xl shadow-lg shadow-emerald-200 transition-all"
                                                                    title="Approve"
                                                                >
                                                                    <FaCheck className="text-sm" />
                                                                </button>
                                                            )}
                                                            {eq.status !== 'rejected' && (
                                                                <button 
                                                                    onClick={() => handleEquipmentApproval(eq._id, 'rejected')}
                                                                    className="bg-red-500 hover:bg-red-600 text-white p-2.5 rounded-xl shadow-lg shadow-red-200 transition-all"
                                                                    title="Reject"
                                                                >
                                                                    <FaTimes className="text-sm" />
                                                                </button>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeView === 'bookings' && (
                        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}>
                            <div className="mb-10">
                                <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight font-display mb-2">Platform Bookings</h1>
                                <p className="text-gray-500 font-medium">Verify rental requests before they reach the payment stage.</p>
                            </div>

                            <div className="bg-white shadow-2xl shadow-gray-200 rounded-3xl border border-white overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-gray-50/50 border-b border-gray-100 text-gray-400 text-xs font-bold uppercase tracking-widest">
                                                <th className="px-8 py-6">User (Renter)</th>
                                                <th className="px-8 py-6">Machine & Date</th>
                                                <th className="px-8 py-6">Total Value</th>
                                                <th className="px-8 py-6">Booking Status</th>
                                                <th className="px-8 py-6">Payment</th>
                                                <th className="px-8 py-6 text-right">Moderation</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-50">
                                            {bookingList.map(bk => (
                                                <tr key={bk._id} className="hover:bg-gray-50/50 transition-colors group">
                                                    <td className="px-8 py-6">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-10 h-10 rounded-full bg-primary-light text-primary-deep flex items-center justify-center font-bold text-sm">
                                                                {bk.renter?.name?.charAt(0) || 'U'}
                                                            </div>
                                                            <div>
                                                                <p className="font-bold text-gray-900">{bk.renter?.name || 'User'}</p>
                                                                <p className="text-[10px] text-gray-400 font-medium">{bk.renter?.email}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-6">
                                                        <div>
                                                            <p className="font-bold text-primary group-hover:text-primary-dark transition-colors">{bk.equipment?.name || 'Unknown'}</p>
                                                            <p className="text-xs text-gray-400 font-medium">
                                                                {new Date(bk.startDate).toLocaleDateString()} - {new Date(bk.endDate).toLocaleDateString()}
                                                            </p>
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-6">
                                                        <p className="text-sm font-bold text-gray-900 font-display">₹{bk.totalPrice}</p>
                                                    </td>
                                                    <td className="px-8 py-6">
                                                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                                                            bk.status === 'paid' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                                                            bk.status === 'approved' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                                            bk.status === 'rejected' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                                                        }`}>
                                                            {bk.status || 'Pending'}
                                                        </span>
                                                    </td>
                                                    <td className="px-8 py-6">
                                                        <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                                                            bk.paymentStatus === 'paid' 
                                                                ? 'bg-green-50 text-green-600 border-green-100' 
                                                                : 'bg-orange-50 text-orange-600 border-orange-100'
                                                        }`}>
                                                            <span className={`w-1.5 h-1.5 rounded-full ${
                                                                bk.paymentStatus === 'paid' ? 'bg-green-500' : 'bg-orange-500'
                                                            }`}></span>
                                                            {bk.paymentStatus === 'paid' ? 'Completed' : 'Pending'}
                                                        </span>
                                                    </td>
                                                    <td className="px-8 py-6 text-right">
                                                        <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            {bk.status === 'pending' && (
                                                                <>
                                                                    <button 
                                                                        onClick={() => handleBookingStatus(bk._id, 'approved')}
                                                                        className="bg-emerald-500 hover:bg-emerald-600 text-white p-2.5 rounded-xl shadow-lg shadow-emerald-200 transition-all"
                                                                        title="Approve"
                                                                    >
                                                                        <FaCheck className="text-sm" />
                                                                    </button>
                                                                    <button 
                                                                        onClick={() => handleBookingStatus(bk._id, 'rejected')}
                                                                        className="bg-red-500 hover:bg-red-600 text-white p-2.5 rounded-xl shadow-lg shadow-red-200 transition-all"
                                                                        title="Reject"
                                                                    >
                                                                        <FaTimes className="text-sm" />
                                                                    </button>
                                                                </>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                            {bookingList.length === 0 && (
                                                <tr>
                                                    <td colSpan="6" className="px-8 py-16 text-center">
                                                        <div className="flex flex-col items-center gap-2">
                                                            <FaCalendarAlt className="text-4xl text-gray-200" />
                                                            <p className="text-gray-400 font-bold">No booking requests found.</p>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeView === 'users' && (
                        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}>
                            <div className="mb-10">
                                <button onClick={() => setActiveView('dashboard')} className="flex items-center gap-2 text-primary hover:text-primary-dark font-semibold mb-4 transition-colors">
                                    <FaArrowLeft className="text-sm" /> Back to Dashboard
                                </button>
                                <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight font-display mb-2">All Platform Users</h1>
                                <p className="text-gray-500 font-medium">Complete details of all registered farmers on KrishiSarthi.</p>
                            </div>

                            <div className="bg-white shadow-2xl shadow-gray-200 rounded-3xl border border-white overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-gray-50/50 border-b border-gray-100 text-gray-400 text-xs font-bold uppercase tracking-widest">
                                                <th className="px-8 py-6">#</th>
                                                <th className="px-8 py-6">User Details</th>
                                                <th className="px-8 py-6">Email</th>
                                                <th className="px-8 py-6">Location</th>
                                                <th className="px-8 py-6">Role</th>
                                                <th className="px-8 py-6">Joined On</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-50">
                                            {userList.map((user, idx) => (
                                                <tr key={user._id} className="hover:bg-gray-50/50 transition-colors group">
                                                    <td className="px-8 py-6">
                                                        <span className="text-sm font-bold text-gray-400">{idx + 1}</span>
                                                    </td>
                                                    <td className="px-8 py-6">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-white flex items-center justify-center font-bold text-lg shadow-lg shadow-emerald-200">
                                                                {user.name?.charAt(0)?.toUpperCase() || 'U'}
                                                            </div>
                                                            <div>
                                                                <p className="font-bold text-gray-900 group-hover:text-primary transition-colors">{user.name}</p>
                                                                <p className="text-[10px] text-gray-400 font-mono">ID: {user._id?.slice(-8)}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-6">
                                                        <div className="flex items-center gap-2 text-sm text-gray-700">
                                                            <FaEnvelope className="text-gray-400 text-xs" />
                                                            {user.email}
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-6">
                                                        <div className="flex items-center gap-2 text-sm text-gray-700">
                                                            <FaMapMarkerAlt className="text-red-400 text-xs" />
                                                            {user.location || 'Not specified'}
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-6">
                                                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                                                            user.role === 'admin' ? 'bg-purple-50 text-purple-600 border-purple-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                                                        }`}>
                                                            {user.role}
                                                        </span>
                                                    </td>
                                                    <td className="px-8 py-6">
                                                        <p className="text-sm text-gray-600 font-medium">{new Date(user.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                                                        <p className="text-[10px] text-gray-400">{new Date(user.createdAt).toLocaleTimeString()}</p>
                                                    </td>
                                                </tr>
                                            ))}
                                            {userList.length === 0 && (
                                                <tr>
                                                    <td colSpan="6" className="px-8 py-16 text-center">
                                                        <div className="flex flex-col items-center gap-2">
                                                            <FaUsers className="text-4xl text-gray-200" />
                                                            <p className="text-gray-400 font-bold">No users found.</p>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeView === 'payments' && (
                        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}>
                            <div className="mb-10">
                                <button onClick={() => setActiveView('dashboard')} className="flex items-center gap-2 text-primary hover:text-primary-dark font-semibold mb-4 transition-colors">
                                    <FaArrowLeft className="text-sm" /> Back to Dashboard
                                </button>
                                <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight font-display mb-2">Payments & Revenue</h1>
                                <p className="text-gray-500 font-medium">Complete transaction history and revenue tracking.</p>
                            </div>

                            {/* Revenue Summary Cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                                <div className="bg-gradient-to-br from-purple-500 to-purple-700 text-white p-8 rounded-3xl shadow-xl shadow-purple-200">
                                    <p className="text-purple-200 text-sm font-bold uppercase tracking-wider mb-2">Total Revenue</p>
                                    <p className="text-4xl font-extrabold">₹{stats?.totalRevenue || '0.00'}</p>
                                </div>
                                <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-8 rounded-3xl shadow-xl shadow-green-200">
                                    <p className="text-green-200 text-sm font-bold uppercase tracking-wider mb-2">Completed Payments</p>
                                    <p className="text-4xl font-extrabold">{paymentList.length}</p>
                                </div>
                                <div className="bg-gradient-to-br from-orange-400 to-amber-500 text-white p-8 rounded-3xl shadow-xl shadow-amber-200">
                                    <p className="text-orange-100 text-sm font-bold uppercase tracking-wider mb-2">Pending Payments</p>
                                    <p className="text-4xl font-extrabold">{bookingList.filter(b => b.status === 'approved' && b.paymentStatus !== 'paid').length}</p>
                                </div>
                            </div>

                            <div className="bg-white shadow-2xl shadow-gray-200 rounded-3xl border border-white overflow-hidden">
                                <div className="px-8 py-6 border-b border-gray-100">
                                    <h2 className="text-xl font-bold text-gray-900">Transaction History</h2>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-gray-50/50 border-b border-gray-100 text-gray-400 text-xs font-bold uppercase tracking-widest">
                                                <th className="px-8 py-5">#</th>
                                                <th className="px-8 py-5">Farmer (Renter)</th>
                                                <th className="px-8 py-5">Equipment</th>
                                                <th className="px-8 py-5">Rental Period</th>
                                                <th className="px-8 py-5">Amount</th>
                                                <th className="px-8 py-5">Payment Status</th>
                                                <th className="px-8 py-5">Date</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-50">
                                            {bookingList.map((bk, idx) => (
                                                <tr key={bk._id} className={`hover:bg-gray-50/50 transition-colors ${bk.paymentStatus === 'paid' ? '' : 'bg-orange-50/30'}`}>
                                                    <td className="px-8 py-5">
                                                        <span className="text-sm font-bold text-gray-400">{idx + 1}</span>
                                                    </td>
                                                    <td className="px-8 py-5">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-10 h-10 rounded-full bg-primary-light text-primary-deep flex items-center justify-center font-bold text-sm">
                                                                {bk.renter?.name?.charAt(0) || 'U'}
                                                            </div>
                                                            <div>
                                                                <p className="font-bold text-gray-900 text-sm">{bk.renter?.name || 'User'}</p>
                                                                <p className="text-[10px] text-gray-400">{bk.renter?.email}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-5">
                                                        <p className="font-bold text-primary text-sm">{bk.equipment?.name || 'Unknown'}</p>
                                                    </td>
                                                    <td className="px-8 py-5">
                                                        <p className="text-xs text-gray-600 font-medium">
                                                            {new Date(bk.startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} → {new Date(bk.endDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                                        </p>
                                                    </td>
                                                    <td className="px-8 py-5">
                                                        <p className="text-sm font-bold text-gray-900 font-display">₹{bk.totalPrice}</p>
                                                    </td>
                                                    <td className="px-8 py-5">
                                                        <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                                                            bk.paymentStatus === 'paid' 
                                                                ? 'bg-green-50 text-green-600 border-green-100' 
                                                                : 'bg-orange-50 text-orange-600 border-orange-100'
                                                        }`}>
                                                            <span className={`w-1.5 h-1.5 rounded-full ${
                                                                bk.paymentStatus === 'paid' ? 'bg-green-500' : 'bg-orange-500 animate-pulse'
                                                            }`}></span>
                                                            {bk.paymentStatus === 'paid' ? 'Completed' : 'Pending'}
                                                        </span>
                                                    </td>
                                                    <td className="px-8 py-5">
                                                        <p className="text-xs text-gray-500 font-medium">{new Date(bk.updatedAt || bk.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                                                    </td>
                                                </tr>
                                            ))}
                                            {bookingList.length === 0 && (
                                                <tr>
                                                    <td colSpan="7" className="px-8 py-16 text-center">
                                                        <div className="flex flex-col items-center gap-2">
                                                            <FaMoneyBillWave className="text-4xl text-gray-200" />
                                                            <p className="text-gray-400 font-bold">No transactions found.</p>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;

