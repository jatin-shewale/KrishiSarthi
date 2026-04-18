import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import api from '../services/api';

const Login = ({ setAuth }) => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await api.post('/admin/login', credentials);
            localStorage.setItem('admin_token', res.data.token);
            setAuth(true);
            toast.success('Admin access granted');
            navigate('/');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Invalid admin credentials');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-primary-deep flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Animated Background Blobs */}
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary-dark rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-secondary-dark rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="sm:mx-auto sm:w-full sm:max-w-md z-10"
            >
                <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-primary/20 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-primary/30 shadow-2xl shadow-primary/20">
                        <FaUser className="text-4xl text-primary-light" />
                    </div>
                </div>
                <h2 className="text-center text-4xl font-extrabold text-white tracking-tight drop-shadow-md font-display">
                    KrishiSarthi <span className="text-primary-light">Admin</span>
                </h2>
                <p className="mt-2 text-center text-sm text-gray-400 font-medium">
                    Secure Administrative Console
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
                            <label className="block text-sm font-semibold text-gray-300 mb-1">Username</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none group-focus-within:text-primary-light transition-colors">
                                    <FaUser className="text-gray-500" />
                                </div>
                                <input 
                                    type="text" 
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 pl-11 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary-light transition-all placeholder-gray-600 outline-none"
                                    placeholder="Enter admin username"
                                    value={credentials.username}
                                    onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                                    required
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
                                    type={showPassword ? 'text' : 'password'}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 pl-11 pr-11 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary-light transition-all placeholder-gray-600 outline-none"
                                    placeholder="••••••••"
                                    value={credentials.password}
                                    onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                                    required
                                />
                                <div 
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer text-gray-500 hover:text-white transition-colors"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </div>
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
                                {loading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        Authenticating...
                                    </>
                                ) : 'Enter Admin Console'}
                            </motion.button>
                        </div>
                    </form>

                    <div className="mt-8 text-center border-t border-white/10 pt-6">
                        <Link 
                            to="/signup" 
                            className="text-sm font-medium text-gray-400 hover:text-primary-light transition-colors"
                        >
                            Need to create an admin account? <span className="text-primary-light underline underline-offset-4">Register here</span>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Login;
