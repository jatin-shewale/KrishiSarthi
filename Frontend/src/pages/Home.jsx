import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaSearch, FaCalendarCheck, FaTractor, FaLeaf, FaMoneyBillWave, FaShieldAlt, FaRupeeSign, FaMapMarkerAlt, FaCloudSun, FaTint, FaThermometerHalf, FaLightbulb } from 'react-icons/fa';
import axios from 'axios';

const Home = () => {
  const [latestEquipment, setLatestEquipment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(true);

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/equipment');
        // Filter approved and sort by date (descending), take first 3
        const approved = response.data
          .filter(item => item.status === 'approved')
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 3);
        setLatestEquipment(approved);
      } catch (error) {
        console.error('Failed to fetch latest equipment:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchLatest();

    // Fetch Weather based on location
    const fetchWeather = async (lat, lon) => {
        try {
            const res = await axios.get(`http://localhost:5000/api/weather?lat=${lat}&lon=${lon}`);
            setWeather(res.data);
        } catch (err) {
            console.error("Home Weather Error:", err);
        } finally {
            setWeatherLoading(false);
        }
    };

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (pos) => fetchWeather(pos.coords.latitude, pos.coords.longitude),
            () => {
                // Fallback to Nashik coords if blocked
                fetchWeather(20.0, 73.8);
            }
        );
    } else {
        fetchWeather(20.0, 73.8);
    }
  }, []);

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-primary-deep text-white overflow-hidden h-screen flex items-center">
        {/* Lighter overlay for better fresh feel */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent z-10"></div>
        <div className="absolute inset-0 z-0">
             <img 
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
                alt="Agriculture background" 
                className="w-full h-full object-cover"
            />
        </div>
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <motion.div
             initial={{ opacity: 0, scale: 0.8 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.5 }}
             className="mb-4"
          >
              <span className="bg-white/20 backdrop-blur-md text-white px-4 py-1 rounded-full text-sm font-semibold uppercase tracking-wider border border-white/30">
                  India's #1 Rental Platform
              </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight"
          >
            Smart Agricultural Equipment <br />
            <span className="text-accent">Rental Platform</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-200 mb-10 max-w-3xl"
          >
            Empowering farmers with affordable access to modern machinery. Rent tractors, harvesters, and more directly from equipment owners.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
          >
            <Link
              to="/marketplace"
              className="bg-accent hover:bg-yellow-300 text-gray-900 font-bold py-3 px-8 rounded-full transition-transform transform hover:-translate-y-1 shadow-lg"
            >
              Browse Equipment
            </Link>
            <Link
              to="/signup"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary font-bold py-3 px-8 rounded-full transition-all"
            >
              List Your Machinery
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Smart Weather Hub Section */}
      <section className="py-20 bg-gradient-to-br from-primary-deep to-primary overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full filter blur-3xl animate-pulse"></div>
              <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent rounded-full filter blur-3xl animate-pulse delay-700"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                  >
                      <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">Smart Farming <br/><span className="text-accent underline decoration-wavy">Weather Hub</span></h2>
                      <p className="text-green-50 mb-8 text-lg">Real-time localized weather data combined with AI-driven farming suggestions to help you make better decisions for your crops.</p>
                      
                      <div className="space-y-4">
                          {weather?.suggestions?.map((s, i) => (
                              <motion.div 
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.2 }}
                                className="flex items-start gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20"
                              >
                                  <div className="bg-accent text-gray-900 p-2 rounded-lg mt-1">
                                      <FaLightbulb />
                                  </div>
                                  <p className="text-white font-medium text-sm md:text-base">{s}</p>
                              </motion.div>
                          ))}
                      </div>
                  </motion.div>

                  <motion.div
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className="bg-white rounded-[3rem] shadow-2xl p-8 md:p-12 relative overflow-hidden"
                  >
                      {weatherLoading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
                        </div>
                      ) : weather ? (
                        <>
                            <div className="flex justify-between items-start mb-10">
                                <div>
                                    <p className="text-gray-400 font-bold uppercase tracking-widest text-sm mb-1">{weather.weather.city}</p>
                                    <h3 className="text-5xl font-black text-gray-900 font-display">{Math.round(weather.weather.temp)}°C</h3>
                                    <p className="text-primary font-bold mt-2 flex items-center capitalize"><FaCloudSun className="mr-2" /> {weather.weather.description}</p>
                                </div>
                                <div className="bg-earth-100 p-4 rounded-3xl">
                                    <img src={`https://openweathermap.org/img/wn/${weather.weather.icon}@4x.png`} alt="weather icon" className="w-20 h-20" />
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-gray-50 p-6 rounded-3xl flex items-center gap-4">
                                    <div className="bg-blue-100 text-blue-600 p-3 rounded-2xl">
                                        <FaTint />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 font-bold uppercase">Humidity</p>
                                        <p className="text-xl font-black text-gray-800">{weather.weather.humidity}%</p>
                                    </div>
                                </div>
                                <div className="bg-gray-50 p-6 rounded-3xl flex items-center gap-4">
                                    <div className="bg-orange-100 text-orange-600 p-3 rounded-2xl">
                                        <FaThermometerHalf />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 font-bold uppercase">Condition</p>
                                        <p className="text-xl font-black text-gray-800">{weather.weather.description.split(' ')[0]}</p>
                                    </div>
                                </div>
                            </div>
                        </>
                      ) : (
                        <div className="text-center py-10">
                            <p className="text-gray-500 italic">Weather data unavailable</p>
                        </div>
                      )}
                  </motion.div>
              </div>
          </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">How KrishiSarthi Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Rent equipment in 3 simple steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { 
                icon: <FaSearch className="text-4xl text-white" />, 
                title: 'Find Equipment', 
                desc: 'Search for tractors, tillers, and more near your location.',
                color: 'bg-green-500'
              },
              { 
                icon: <FaCalendarCheck className="text-4xl text-white" />, 
                title: 'Book Online', 
                desc: 'Select your dates and send a rental request to the owner.',
                color: 'bg-orange-500'
              },
              { 
                icon: <FaTractor className="text-4xl text-white" />, 
                title: 'Start Farming', 
                desc: 'Get the equipment delivered and start your agricultural tasks.',
                color: 'bg-blue-500'
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                className="flex flex-col items-center text-center p-8 bg-gray-50 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className={`w-20 h-20 ${step.color} rounded-full flex items-center justify-center mb-6 shadow-lg`}>
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Equipment Preview */}
      <section className="py-20 bg-earth-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-12">
                <div>
                   <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 font-display uppercase tracking-tight">Latest Arrivals</h2>
                   <p className="text-gray-600">Recently listed machinery available for rent</p>
                </div>
                <Link to="/marketplace" className="hidden md:block text-primary font-bold hover:text-primary-dark hover:underline">View All &rarr;</Link>
            </div>
            
            {loading ? (
                <div className="flex justify-center py-10">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
            ) : latestEquipment.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {latestEquipment.map((item) => (
                        <motion.div 
                            key={item._id}
                            whileHover={{ y: -8 }}
                            className="bg-white rounded-2xl shadow-xl shadow-earth-200 overflow-hidden group border border-white"
                        >
                            <div className="h-56 relative overflow-hidden">
                                 <img 
                                    src={item.image || 'https://source.unsplash.com/random/800x600/?tractor'} 
                                    alt={item.name} 
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-bold text-primary shadow-lg border border-white/50">
                                    <span className="flex items-center"><FaRupeeSign className="text-xs" />{item.price} / day</span>
                                </div>
                                <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-widest shadow-md">
                                    {item.category}
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors leading-tight">{item.name}</h3>
                                <div className="flex items-center text-gray-500 text-sm mb-6 font-medium">
                                    <FaMapMarkerAlt className="mr-1.5 text-secondary" /> {item.location}
                                </div>
                                <Link to={`/equipment/${item._id}`} className="block w-full text-center bg-gray-50 hover:bg-primary hover:text-white text-gray-800 font-bold py-3.5 rounded-xl transition-all border border-gray-100 group-hover:border-primary group-hover:shadow-lg group-hover:shadow-primary/20">
                                    View Details
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-10 text-gray-500 italic bg-white rounded-2xl border border-dashed border-gray-300">
                    No equipment available at the moment. Please check back later.
                </div>
            )}
            
             <div className="mt-12 text-center md:hidden">
                <Link to="/marketplace" className="inline-block bg-primary text-white font-bold py-3 px-8 rounded-full shadow-lg">View All Equipment &rarr;</Link>
             </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
               <div>
                   <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 leading-tight">Why Choose KrishiSarthi?</h2>
                   <div className="space-y-6">
                       {[
                           { icon: <FaMoneyBillWave />, title: "Cost Effective", desc: "Save money by renting instead of buying expensive machinery." },
                           { icon: <FaShieldAlt />, title: "Verified Listings", desc: "All equipment and owners are verified for your safety." },
                           { icon: <FaLeaf />, title: "Sustainable Farming", desc: "Access the right tools to implement modern farming practices." }
                       ].map((benefit, idx) => (
                           <div key={idx} className="flex">
                               <div className="flex-shrink-0 mr-4">
                                   <div className="w-12 h-12 bg-green-100 text-primary rounded-full flex items-center justify-center text-xl">
                                       {benefit.icon}
                                   </div>
                               </div>
                               <div>
                                   <h4 className="text-lg font-bold text-gray-800 mb-1">{benefit.title}</h4>
                                   <p className="text-gray-600">{benefit.desc}</p>
                               </div>
                           </div>
                       ))}
                   </div>
               </div>
               <div className="relative">
                   <div className="absolute -inset-4 bg-secondary rounded-2xl transform rotate-3 opacity-20"></div>
                   <img 
                        src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                        alt="Farmer using tablet" 
                        className="relative rounded-2xl shadow-xl w-full"
                    />
               </div>
           </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white text-center">
          <div className="max-w-4xl mx-auto px-4">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Modernize Your Farm?</h2>
              <p className="text-xl text-green-100 mb-10">Join thousands of farmers using KrishiSarthi to grow their business.</p>
              <Link to="/signup" className="inline-block bg-white text-primary font-bold text-lg px-10 py-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all">
                  Get Started Now
              </Link>
          </div>
      </section>
    </div>
  );
};

export default Home;
