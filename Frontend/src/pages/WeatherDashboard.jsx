import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaCloudSun, FaTint, FaMapMarkerAlt, FaSearch } from 'react-icons/fa';
import { toast } from 'react-toastify';

const WeatherDashboard = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [coords, setCoords] = useState({ lat: 18.5204, lon: 73.8567 }); // Default: Pune
    const [searchCity, setSearchCity] = useState('');

    const fetchWeather = async (lat, lon) => {
        setLoading(true);
        try {
            const res = await axios.get(`http://localhost:5000/api/weather?lat=${lat}&lon=${lon}`);
            setWeatherData(res.data.weather);
            setSuggestions(res.data.suggestions);
        } catch (error) {
            toast.error('Failed to fetch weather data.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Try getting user's location, else fallback to default
        if (navigator.geolocation && !weatherData) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    fetchWeather(position.coords.latitude, position.coords.longitude);
                },
                (error) => {
                    fetchWeather(coords.lat, coords.lon);
                }
            );
        } else if (!weatherData) {
            fetchWeather(coords.lat, coords.lon);
        }
    }, [coords, weatherData]);

    const handleSearch = async (e) => {
        e.preventDefault();
        // Since OpenWeatherMap backend route only accepts lat/lon currently,
        // we would ideally call a geocoder API here. For simplicity, we just notify.
        toast.info("City search not fully implemented yet in this demo!");
    };

    return (
        <div className="min-h-screen bg-earth-50 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-8">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center"
                >
                    <h1 className="text-4xl font-extrabold text-gray-900 drop-shadow-sm flex items-center justify-center gap-3">
                        <FaCloudSun className="text-primary" /> Smart Weather & Yield
                    </h1>
                    <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
                        Real-time agricultural weather reporting and smart farming suggestions based on immediate local conditions.
                    </p>
                </motion.div>

                {/* Search Bar - Demo Purpose */}
                <form onSubmit={handleSearch} className="flex justify-center mt-6">
                    <div className="relative w-full max-w-md">
                        <input
                            type="text"
                            placeholder="Enter your village or city..."
                            className="w-full bg-white border border-gray-300 rounded-full py-3 px-6 pl-12 text-gray-700 shadow-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                            value={searchCity}
                            onChange={(e) => setSearchCity(e.target.value)}
                        />
                        <button type="submit" className="absolute left-4 top-3.5 text-gray-400 hover:text-primary">
                             <FaSearch />
                        </button>
                    </div>
                </form>

                {loading ? (
                    <div className="flex justify-center items-center h-40">
                         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                    </div>
                ) : weatherData ? (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-3xl shadow-xl shadow-earth-200 overflow-hidden"
                    >
                        <div className="md:flex">
                            {/* Weather Highlight */}
                            <div className="md:w-1/2 p-10 bg-gradient-to-br from-primary via-primary-dark to-earth-900 text-white flex flex-col items-center justify-center">
                                <h2 className="text-3xl font-display font-bold flex items-center gap-2">
                                    <FaMapMarkerAlt /> {weatherData.city}
                                </h2>
                                <img 
                                    src={`http://openweathermap.org/img/wn/${weatherData.icon}@4x.png`} 
                                    alt="Weather Icon" 
                                    className="w-40 h-40 drop-shadow-xl"
                                />
                                <div className="text-6xl font-bold font-display drop-shadow-lg">
                                    {Math.round(weatherData.temp)}°C
                                </div>
                                <p className="text-xl capitalize mt-2 drop-shadow-md">{weatherData.description}</p>
                                <div className="mt-8 flex items-center gap-2 text-primary-light">
                                    <FaTint /> Humidity: {weatherData.humidity}%
                                </div>
                            </div>
                            
                            {/* Suggestions */}
                            <div className="md:w-1/2 p-10 flex flex-col justify-center bg-gray-50">
                                <h3 className="text-2xl font-bold text-gray-800 mb-6 drop-shadow-sm flex items-center gap-2">
                                    🌱 Farming Insights
                                </h3>
                                {suggestions.length > 0 ? (
                                    <ul className="space-y-4">
                                        {suggestions.map((sug, idx) => (
                                            <motion.li
                                                key={idx}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.2 + (idx * 0.1) }}
                                                className="bg-white rounded-xl p-4 shadow-sm border border-earth-100 border-l-4 border-l-primary flex items-start gap-3"
                                            >
                                                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                                                <p className="text-gray-700 font-medium">{sug}</p>
                                            </motion.li>
                                        ))}
                                    </ul>
                                ) : (
                                    <div className="text-gray-500 italic bg-white p-4 rounded-xl border border-dashed border-gray-300">
                                        Conditions look stable. Continue normal farming operations.
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <div className="text-center text-red-500">Could not retrieve weather data at this time.</div>
                )}
            </div>
        </div>
    );
};

export default WeatherDashboard;
