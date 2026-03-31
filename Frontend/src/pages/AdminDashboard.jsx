import React from 'react';
import { FaUsers, FaTractor, FaCalendarCheck, FaChartLine } from 'react-icons/fa';

const AdminDashboard = () => {
    return (
        <div className="bg-gray-50 min-h-screen py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

                {/* Analytics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                    {[
                        { title: 'Total Users', value: '1,240', icon: <FaUsers />, color: 'bg-blue-500' },
                        { title: 'Equipments Listed', value: '350', icon: <FaTractor />, color: 'bg-green-500' },
                        { title: 'Total Bookings', value: '850', icon: <FaCalendarCheck />, color: 'bg-orange-500' },
                        { title: 'Platform Revenue', value: '₹45,000', icon: <FaChartLine />, color: 'bg-purple-500' },
                    ].map((stat, idx) => (
                        <div key={idx} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-gray-500 text-sm font-medium uppercase">{stat.title}</p>
                                    <h3 className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</h3>
                                </div>
                                <div className={`p-3 rounded-lg text-white ${stat.color}`}>
                                    {stat.icon}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Recent Users Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-10">
                    <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                        <h3 className="font-bold text-gray-800">Recent Users</h3>
                        <button className="text-primary text-sm font-medium hover:underline">View All</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left text-sm">
                            <thead className="bg-gray-50 text-gray-500 font-medium">
                                <tr>
                                    <th className="px-6 py-3">Name</th>
                                    <th className="px-6 py-3">Role</th>
                                    <th className="px-6 py-3">Location</th>
                                    <th className="px-6 py-3">Joined Date</th>
                                    <th className="px-6 py-3">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {[
                                    { name: 'Raju Patel', role: 'Farmer', loc: 'Surat, GJ', date: '10 Jan 2026', status: 'Active' },
                                    { name: 'Amit Sharma', role: 'Owner', loc: 'Pune, MH', date: '09 Jan 2026', status: 'Active' },
                                    { name: 'Vijay Singh', role: 'Farmer', loc: 'Jaipur, RJ', date: '08 Jan 2026', status: 'Active' },
                                ].map((user, i) => (
                                    <tr key={i} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-gray-800">{user.name}</td>
                                        <td className="px-6 py-4">{user.role}</td>
                                        <td className="px-6 py-4">{user.loc}</td>
                                        <td className="px-6 py-4">{user.date}</td>
                                        <td className="px-6 py-4">
                                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-bold">{user.status}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
