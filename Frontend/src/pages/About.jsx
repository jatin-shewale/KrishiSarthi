import React from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaLeaf, FaHandshake, FaGlobeAsia } from 'react-icons/fa';

const stats = [
    { label: 'Happy Farmers', value: '10K+' },
    { label: 'Equipment Listed', value: '500+' },
    { label: 'Villages Covered', value: '150+' },
    { label: 'Years of Trust', value: '3+' },
];

const About = () => {
    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section with Parallax feel */}
            <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img 
                        src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
                        alt="Background" 
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-deep/90 to-primary/80 mix-blend-multiply"></div>
                </div>
                
                <div className="relative z-10 text-center px-4 max-w-4xl">
                    <motion.span 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-secondary-light font-bold tracking-widest uppercase mb-4 block"
                    >
                        Our Mission
                    </motion.span>
                    <motion.h1 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-display font-extrabold text-white mb-8 leading-tight"
                    >
                        Empowering <br/> Indian Agriculture
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-xl text-gray-100 max-w-2xl mx-auto leading-relaxed"
                    >
                        We are building the digital infrastructure to make modern farming accessible, affordable, and sustainable for everyone.
                    </motion.p>
                </div>
            </div>

            {/* Our Story Grid */}
            <section className="py-24 bg-surface">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div 
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-primary font-bold uppercase tracking-wide mb-2 text-sm">Who We Are</h2>
                            <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-display">
                                Technology meets <span className="text-primary">Tradition</span>
                            </h3>
                            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                                KrishiSarthi was born from a simple observation: while technology advances rapidly, small-scale farmers often struggle to access the tools they need to thrive.
                            </p>
                            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                                We created a shared economy platform that connects equipment owners with farmers who need them. This maximizes the utilization of machinery and minimizes the cost of farming, creating a win-win ecosystem.
                            </p>
                            
                            <div className="grid grid-cols-2 gap-6">
                                <div className="flex items-start">
                                    <div className="bg-green-100 p-3 rounded-lg text-primary mr-4">
                                        <FaLeaf size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">Sustainable</h4>
                                        <p className="text-sm text-gray-500">Optimizing resource use</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="bg-blue-100 p-3 rounded-lg text-blue-600 mr-4">
                                        <FaGlobeAsia size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">Accessible</h4>
                                        <p className="text-sm text-gray-500">For every village</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <div className="relative">
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="relative z-10 rounded-3xl overflow-hidden shadow-2xl"
                            >
                                <img 
                                    src="https://images.unsplash.com/photo-1592982537447-6f2a6a0c7c18?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                                    alt="Farmer in field" 
                                    className="w-full h-full object-cover"
                                />
                            </motion.div>
                            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-secondary rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob"></div>
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-2000"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="bg-primary-deep py-20 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pattern-grid-lg"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {stats.map((stat, idx) => (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                            >
                                <div className="text-4xl md:text-6xl font-extrabold text-secondary mb-2 font-display">{stat.value}</div>
                                <div className="text-gray-300 font-medium tracking-wide uppercase text-sm">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-24 bg-surface relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -z-10"></div>
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl font-bold text-gray-900 mb-4 font-display">What People Say</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto mb-16">Stories from farmers and equipment owners who have transformed their lives with KrishiSarthi.</p>
                    </motion.div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                name: "Rajesh Kumar",
                                role: "Farmer, Punjab",
                                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                                quote: "Renting a modern tractor through KrishiSarthi increased my crop yield by 20%. It was affordable and the process was so simple.",
                            },
                            {
                                name: "Priya Singh",
                                role: "Equipment Owner, Haryana",
                                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                                quote: "My tractor used to sit idle for months. Now, I earn steady extra income by renting it out when I don't need it. Great platform!",
                            },
                            {
                                name: "Amit Patel",
                                role: "Farmer, Gujarat",
                                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                                quote: "I couldn't afford a harvester, but KrishiSarthi made it possible to rent one for harvest week. Saved me so much time and labor costs.",
                            }
                        ].map((review, idx) => (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.2 }}
                                whileHover={{ y: -5 }}
                                className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center text-center group"
                            >
                                <div className="w-20 h-20 rounded-full overflow-hidden mb-6 border-4 border-earth-100 group-hover:border-primary transition-colors duration-300">
                                    <img 
                                        src={review.image} 
                                        alt={review.name} 
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="text-secondary text-2xl mb-4 font-display">★★★★★</div>
                                <p className="text-gray-600 italic mb-6 leading-relaxed">"{review.quote}"</p>
                                <div>
                                    <h4 className="font-bold text-gray-900 text-lg">{review.name}</h4>
                                    <p className="text-primary text-sm font-medium">{review.role}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
