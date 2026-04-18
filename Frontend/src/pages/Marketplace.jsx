import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaFilter, FaMapMarkerAlt, FaRupeeSign } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import api from '../services/api';

const Marketplace = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [priceRange, setPriceRange] = useState(10000);
  const [equipmentList, setEquipmentList] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = ['All', 'Tractor', 'Harvester', 'Tiller', 'Seeder', 'Sprayer', 'Other'];

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const response = await api.get('/equipment');
        // Only show approved equipment in marketplace
        const approved = response.data.filter(eq => eq.status === 'approved');
        setEquipmentList(approved);
      } catch (error) {
        toast.error('Failed to fetch equipment');
      } finally {
        setLoading(false);
      }
    };
    fetchEquipment();
  }, []);

  const filteredEquipment = equipmentList.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === 'All' || item.category === filterCategory;
      const matchesPrice = item.price <= priceRange;
      return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Search */}
        <div className="mb-10 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Equipment Marketplace</h1>
            <div className="flex justify-center max-w-3xl mx-auto">
                <div className="w-full relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaSearch className="text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search by name, category, or location..."
                        className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="lg:w-1/4">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 sticky top-24">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold text-gray-800 flex items-center">
                            <FaFilter className="mr-2 text-primary" /> Filters
                        </h2>
                        <button 
                            className="text-sm text-primary hover:text-primary-dark font-medium"
                            onClick={() => {setFilterCategory('All'); setPriceRange(10000); setSearchTerm('');}}
                        >
                            Reset
                        </button>
                    </div>

                    <div className="mb-6">
                        <h3 className="font-semibold text-gray-700 mb-2">Category</h3>
                        <div className="space-y-2">
                            {categories.map(cat => (
                                <label key={cat} className="flex items-center">
                                    <input 
                                        type="radio" 
                                        name="category" 
                                        checked={filterCategory === cat}
                                        onChange={() => setFilterCategory(cat)}
                                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                    />
                                    <span className="ml-2 text-gray-600">{cat}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="mb-6">
                        <h3 className="font-semibold text-gray-700 mb-2">Max Price (Per Day)</h3>
                        <input 
                            type="range" 
                            min="0" 
                            max="10000" 
                            value={priceRange}
                            onChange={(e) => setPriceRange(parseInt(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                         <div className="flex justify-between text-sm text-gray-600 mt-2">
                             <span>₹0</span>
                             <span className="font-bold text-primary">₹{priceRange}</span>
                         </div>
                    </div>
                </div>
            </div>

            {/* Equipment Grid */}
            <div className="lg:w-3/4">
                {loading ? (
                    <div className="text-center py-20">Loading...</div>
                ) : filteredEquipment.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 bg-white rounded-lg shadow-sm">
                        <FaSearch className="text-4xl text-gray-300 mb-4" />
                        <p className="text-gray-500 text-lg">No equipment found matching your criteria.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <AnimatePresence>
                        {filteredEquipment.map(item => (
                            <motion.div 
                                key={item._id}
                                layout
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-100 group"
                            >
                                <div className="relative h-48 overflow-hidden">
                                    <img 
                                        src={item.image || 'https://source.unsplash.com/random/800x600/?tractor'} 
                                        alt={item.name} 
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-gray-800 shadow-sm uppercase tracking-wide">
                                        {item.category}
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-extrabold text-xl text-gray-900 leading-tight group-hover:text-primary transition-colors">{item.name}</h3>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-500 mb-4 font-medium">
                                        <FaMapMarkerAlt className="mr-1.5 text-secondary" /> {item.location}
                                    </div>
                                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                                        <div className="text-primary font-bold text-lg flex items-center">
                                            <FaRupeeSign className="text-sm" />{item.price}<span className="text-xs text-gray-500 font-normal ml-1">/ day</span>
                                        </div>
                                        <Link 
                                            to={`/equipment/${item._id}`} 
                                            className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-colors shadow-sm"
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
