import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserPlus, FaEnvelope, FaLock, FaShieldAlt, FaArrowLeft } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        inviteCode: ''
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        // Admin registration is typically moderated
        setTimeout(() => {
            toast.info('Admin registration request sent to Super Admin for approval.');
            setLoading(false);
            navigate('/login');
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-primary-deep flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background Blobs */}
            <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-primary-dark rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-secondary-dark rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="sm:mx-auto sm:w-full sm:max-w-md z-10"
            >
                <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-primary/20 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-primary/30 shadow-2xl shadow-primary/20">
                        <FaUserPlus className="text-4xl text-primary-light" />
                    </div>
                </div>
                <h2 className="text-center text-4xl font-extrabold text-white tracking-tight font-display">
                    Create <span className="text-primary-light">Admin</span>
                </h2>
                <p className="mt-2 text-center text-sm text-gray-400 font-medium">
                    Register a new administrative account
                </p>
            </motion.div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="bg-white/5 backdrop-blur-2xl py-10 px-6 shadow-2xl sm:rounded-3xl sm:px-10 border border-white/10"
                >
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm font-semibold text-gray-300 mb-1">Desired Username</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none group-focus-within:text-primary-light transition-colors">
                                    <FaShieldAlt className="text-gray-500" />
                                </div>
                                <input 
                                    type="text" 
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 pl-11 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary-light transition-all placeholder-gray-600 outline-none"
                                    placeholder="e.g. admin_pune"
                                    required
                                    value={formData.username}
                                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-300 mb-1">Official Email</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none group-focus-within:text-primary-light transition-colors">
                                    <FaEnvelope className="text-gray-500" />
                                </div>
                                <input 
                                    type="email" 
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 pl-11 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary-light transition-all placeholder-gray-600 outline-none"
                                    placeholder="admin@krishisarthi.com"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-300 mb-1">Password</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none group-focus-within:text-primary-light transition-colors">
                                    <FaLock className="text-gray-500" />
                                </div>
                                <input 
                                    type="password" 
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 pl-11 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary-light transition-all placeholder-gray-600 outline-none"
                                    placeholder="••••••••"
                                    required
                                    value={formData.password}
                                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-300 mb-1">Admin Invite Code</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none group-focus-within:text-primary-light transition-colors">
                                    <FaShieldAlt className="text-gray-500" />
                                </div>
                                <input 
                                    type="text" 
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 pl-11 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary-light transition-all placeholder-gray-600 outline-none"
                                    placeholder="Contact super-admin for code"
                                    required
                                    value={formData.inviteCode}
                                    onChange={(e) => setFormData({...formData, inviteCode: e.target.value})}
                                />
                            </div>
                        </div>

                        <div className="pt-2">
                            <motion.button 
                                whileHover={{ scale: 1.02, backgroundColor: 'rgba(16, 185, 129, 0.9)' }}
                                whileTap={{ scale: 0.98 }}
                                type="submit" 
                                disabled={loading}
                                className="w-full bg-primary text-white font-bold py-4 px-4 rounded-xl shadow-lg shadow-primary/20 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {loading ? 'Processing...' : 'Request Access'}
                            </motion.button>
                        </div>
                    </form>

                    <div className="mt-8 text-center border-t border-white/10 pt-6">
                        <Link 
                            to="/login" 
                            className="text-sm font-medium text-gray-400 hover:text-primary-light transition-colors flex items-center justify-center gap-2"
                        >
                            <FaArrowLeft className="text-xs" /> Back to Login
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Signup;
