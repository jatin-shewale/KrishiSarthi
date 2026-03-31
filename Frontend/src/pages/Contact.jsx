import React, { useState } from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Contact = () => {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div className="bg-gray-50 min-h-screen py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">Get in Touch</h1>
                    <p className="text-gray-600">Have questions? We are here to help you.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div className="bg-white p-8 rounded-xl shadow-sm border-l-4 border-primary">
                            <div className="flex items-center mb-4">
                                <div className="w-10 h-10 bg-green-100 text-primary rounded-full flex items-center justify-center mr-4">
                                    <FaPhoneAlt />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800">Call Us</h3>
                            </div>
                            <p className="text-gray-600 pl-14">+91 98765 43210</p>
                            <p className="text-gray-600 pl-14">Mon - Fri, 9am - 6pm</p>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-sm border-l-4 border-secondary">
                            <div className="flex items-center mb-4">
                                <div className="w-10 h-10 bg-orange-100 text-secondary rounded-full flex items-center justify-center mr-4">
                                    <FaEnvelope />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800">Email Us</h3>
                            </div>
                            <p className="text-gray-600 pl-14">support@krishisarthi.com</p>
                            <p className="text-gray-600 pl-14">info@krishisarthi.com</p>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-sm border-l-4 border-blue-500">
                            <div className="flex items-center mb-4">
                                <div className="w-10 h-10 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center mr-4">
                                    <FaMapMarkerAlt />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800">Visit Us</h3>
                            </div>
                            <p className="text-gray-600 pl-14">KrishiSarthi HQ, Tech Park,</p>
                            <p className="text-gray-600 pl-14">Pune, Maharashtra - 411045</p>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="bg-white p-8 rounded-xl shadow-md">
                        {submitted ? (
                            <div className="h-full flex flex-col items-center justify-center text-center">
                                <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-4 text-2xl">
                                    ✓
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-2">Message Sent!</h3>
                                <p className="text-gray-600">We will get back to you shortly.</p>
                                <button onClick={() => setSubmitted(false)} className="mt-6 text-primary hover:underline">Send another message</button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                                    <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email / Phone</label>
                                    <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                    <textarea rows="4" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" required></textarea>
                                </div>
                                <button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-lg shadow-md transition-colors">
                                    Send Message
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
