import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaPaperPlane, FaRobot, FaUser } from 'react-icons/fa';
import { toast } from 'react-toastify';

const AIAssistant = () => {
    const [messages, setMessages] = useState([
        { role: 'assistant', text: 'Hello! I am your smartest farming assistant. Ask me anything about crop diseases, fertilizers, or agriculture best practices.' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = input.trim();
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setInput('');
        setLoading(true);

        try {
            const res = await axios.post('http://localhost:5000/api/ai/chat', { prompt: userMsg });
            setMessages(prev => [...prev, { role: 'assistant', text: res.data.reply }]);
        } catch (error) {
            toast.error('AI is currently unavailable.');
            setMessages(prev => [...prev, { role: 'assistant', text: 'Sorry, I ran into an error connecting to my brain! Please try again later.' }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-earth-50 to-white pt-10 pb-12 px-4 sm:px-6 lg:px-8 flex flex-col">
            <div className="max-w-4xl mx-auto w-full flex-grow flex flex-col shadow-2xl rounded-3xl overflow-hidden bg-white border border-gray-100">
                
                {/* Header */}
                <div className="bg-primary px-6 py-4 flex items-center gap-4 text-white">
                    <div className="bg-white/20 p-3 rounded-full backdrop-blur-md text-white">
                        <FaRobot className="w-8 h-8" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold font-display drop-shadow-sm">KrishiAI Assistant</h2>
                        <p className="text-primary-light text-sm">Powered by Claude/GPT</p>
                    </div>
                </div>

                {/* Chat Area */}
                <div className="flex-1 p-6 overflow-y-auto bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-opacity-10 min-h-[400px]">
                    <div className="space-y-6">
                        {messages.map((message, index) => (
                            <motion.div 
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className={`flex items-start max-w-[80%] gap-3 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${message.role === 'user' ? 'bg-secondary text-white shadow-md' : 'bg-primary-light text-white shadow-md'}`}>
                                        {message.role === 'user' ? <FaUser /> : <FaRobot />}
                                    </div>
                                    <div className={`p-4 rounded-2xl shadow-sm border text-sm md:text-base ${
                                        message.role === 'user' 
                                            ? 'bg-secondary text-white border-secondary-dark rounded-tr-none' 
                                            : 'bg-white text-gray-800 border-gray-200 rounded-tl-none'
                                    }`}>
                                        {message.text}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                        {loading && (
                            <div className="flex justify-start">
                                <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 flex items-center gap-2">
                                     <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                                     <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                     <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </div>

                {/* Input Area */}
                <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                    <form onSubmit={handleSend} className="flex gap-4">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="flex-1 bg-white border border-gray-300 rounded-xl py-3 px-6 text-gray-700 shadow-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                            placeholder="Type your question about farming here..."
                            disabled={loading}
                        />
                        <button
                            type="submit"
                            disabled={loading || !input.trim()}
                            className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl shadow-md transition-all font-bold disabled:opacity-50 flex items-center gap-2"
                        >
                            <span>Send</span>
                            <FaPaperPlane />
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default AIAssistant;
