import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaTimes, FaPaperPlane } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const FloatingAI = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className="mb-4 w-72 md:w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
                    >
                        <div className="bg-primary p-4 text-white flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <FaRobot className="text-xl" />
                                <span className="font-bold">Krishi AI Assistant</span>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-full transition-colors">
                                <FaTimes />
                            </button>
                        </div>
                        <div className="p-4 h-64 overflow-y-auto bg-gray-50 flex flex-col items-center justify-center text-center">
                            <FaRobot className="text-4xl text-primary/20 mb-3" />
                            <p className="text-gray-600 text-sm">
                                Hello! I'm your AI farming expert. How can I help you today?
                            </p>
                            <button 
                                onClick={() => { navigate('/ai'); setIsOpen(false); }}
                                className="mt-4 text-xs font-bold text-primary hover:underline"
                            >
                                Open Full Chat Interface
                            </button>
                        </div>
                        <div className="p-3 border-t border-gray-100 flex gap-2">
                            <input 
                                type="text" 
                                placeholder="Ask about crops..." 
                                className="flex-1 text-sm bg-gray-50 border-none rounded-lg px-3 py-2 focus:ring-1 focus:ring-primary outline-none"
                                onKeyPress={(e) => e.key === 'Enter' && navigate('/ai')}
                            />
                            <button 
                                onClick={() => navigate('/ai')}
                                className="bg-primary text-white p-2 rounded-lg hover:bg-primary-dark transition-colors"
                            >
                                <FaPaperPlane />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-colors ${isOpen ? 'bg-gray-800 text-white' : 'bg-primary text-white'}`}
            >
                {isOpen ? <FaTimes className="text-xl" /> : <FaRobot className="text-2xl" />}
                {!isOpen && (
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary"></span>
                    </span>
                )}
            </motion.button>
        </div>
    );
};

export default FloatingAI;
