import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaRupeeSign, FaCheckCircle, FaStar, FaUser } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';

const EquipmentDetails = () => {
    const { id } = useParams();
    const [equipment, setEquipment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeImage, setActiveImage] = useState(0);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/equipment/${id}`);
                setEquipment(res.data);
            } catch (error) {
                toast.error("Failed to load equipment details");
            } finally {
                setLoading(false);
            }
        };
        fetchDetails();
    }, [id]);

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    if (!equipment) return <div className="min-h-screen flex items-center justify-center text-red-500 font-bold">Equipment not found</div>;

    // Use images if available, else placeholder
    const images = equipment.image ? [equipment.image] : [
        'https://source.unsplash.com/random/800x600/?tractor',
        'https://source.unsplash.com/random/800x600/?farm',
        'https://source.unsplash.com/random/800x600/?field'
    ];

    return (
        <div className="bg-gray-50 min-h-screen py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Breadcrumb */}
                <nav className="text-sm text-gray-500 mb-6">
                    <Link to="/" className="hover:text-primary">Home</Link> / 
                    <Link to="/marketplace" className="hover:text-primary ml-1">Marketplace</Link> / 
                    <span className="text-gray-800 ml-1 truncate">{equipment.name}</span>
                </nav>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        {/* Image Gallery */}
                        <div className="p-6 lg:p-10 border-b lg:border-b-0 lg:border-r border-gray-200">
                             <div className="rounded-xl overflow-hidden shadow-md mb-4 h-96">
                                 <img 
                                    src={images[activeImage]} 
                                    alt={equipment.name} 
                                    className="w-full h-full object-cover"
                                />
                             </div>
                             <div className="grid grid-cols-3 gap-2">
                                 {images.map((img, idx) => (
                                     <button 
                                        key={idx}
                                        onClick={() => setActiveImage(idx)}
                                        className={`rounded-lg overflow-hidden h-24 border-2 transition-all ${activeImage === idx ? 'border-primary ring-2 ring-primary ring-opacity-50' : 'border-transparent opacity-70 hover:opacity-100'}`}
                                     >
                                         <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                                     </button>
                                 ))}
                             </div>
                        </div>

                        {/* Details */}
                        <div className="p-6 lg:p-10 flex flex-col justify-between">
                            <div>
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                         <span className="inline-block bg-green-100 text-primary text-xs font-bold px-2 py-1 rounded-sm uppercase tracking-wide mb-2">
                                            {equipment.category}
                                         </span>
                                         <h1 className="text-3xl font-bold text-gray-900 mb-1">{equipment.name}</h1>
                                         <div className="flex items-center text-gray-500 text-sm">
                                             <FaMapMarkerAlt className="mr-1" /> {equipment.location}
                                         </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="flex items-center text-yellow-400 font-bold">
                                            <FaStar className="mr-1" /> {equipment.rating || 4.5}
                                        </div>
                                        <p className="text-xs text-gray-400">{equipment.reviews || 10} reviews</p>
                                    </div>
                                </div>

                                <div className="bg-gray-50 rounded-xl p-6 mb-8 border border-gray-100">
                                    <p className="text-gray-600 leading-relaxed mb-4">{equipment.description}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {(equipment.features || ['Well Maintained', 'Fuel Efficient', 'Driver Available']).map(feature => (
                                            <span key={feature} className="bg-white text-gray-700 text-xs px-3 py-1 rounded-full border border-gray-200 shadow-sm flex items-center">
                                                <FaCheckCircle className="text-secondary mr-1.5 text-xs" /> {feature}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex items-center mb-8">
                                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-xl overflow-hidden">
                                        <FaUser />
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm text-gray-500">Owner</p>
                                        <p className="font-bold text-gray-900">{equipment.owner?.name || 'Farmer'}</p>
                                    </div>
                                    <button className="ml-auto text-primary font-medium text-sm hover:underline">
                                        View Profile
                                    </button>
                                </div>
                            </div>

                            <div className="border-t border-gray-100 pt-6 mt-6">
                                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                                    <div>
                                        <p className="text-sm text-gray-500">Rent Price</p>
                                        <div className="flex items-center text-3xl font-bold text-primary">
                                            <FaRupeeSign className="text-xl mt-1" /> {equipment.price} <span className="text-base font-normal text-gray-500 ml-1">/ day</span>
                                        </div>
                                    </div>
                                    <Link 
                                        to={`/booking/${id}`}
                                        className="w-full sm:w-auto bg-secondary hover:bg-secondary-dark text-white font-bold py-4 px-10 rounded-xl shadow-lg hover:shadow-xl transition-all text-center"
                                    >
                                        Book Now
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EquipmentDetails;
