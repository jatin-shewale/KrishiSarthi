import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaTractor, FaBars, FaTimes, FaUserCircle, FaSignOutAlt, FaLeaf, FaRobot, FaPlusCircle, FaThLarge, FaCloudSun } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem('krishisarthi_token');
  const user = JSON.parse(localStorage.getItem('krishisarthi_user') || '{}');

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    localStorage.removeItem('krishisarthi_token');
    localStorage.removeItem('krishisarthi_user');
    toast.success('Logged out successfully');
    navigate('/login');
    setIsOpen(false);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Marketplace', path: '/marketplace' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  // Additional links for authenticated users
  const authLinks = [
    { name: 'Add Equipment', path: '/add-equipment', icon: <FaPlusCircle /> },
    { name: 'Dashboard', path: '/dashboard/farmer', icon: <FaThLarge /> },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <FaTractor className="text-primary text-3xl" />
              <span className="text-xl font-bold text-gray-800 tracking-tight">KrishiSarthi</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive(link.path)
                    ? 'text-primary font-bold'
                    : 'text-gray-600 hover:text-primary'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            {token && authLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium flex items-center gap-1.5 transition-colors duration-200 ${
                  isActive(link.path)
                    ? 'text-primary font-bold'
                    : 'text-gray-600 hover:text-primary'
                }`}
              >
                <span className="text-xs opacity-70">{link.icon}</span>
                {link.name}
              </Link>
            ))}

            <div className="flex items-center space-x-4 border-l border-gray-200 pl-6 ml-2">
              {!token ? (
                <>
                  <Link to="/login" className="text-gray-600 hover:text-primary font-medium text-sm">
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-primary hover:bg-primary-dark text-white px-5 py-2 rounded-full text-sm font-bold transition-all shadow-md shadow-primary/20 hover:shadow-lg"
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-primary border border-green-200">
                      <FaUserCircle className="text-xl" />
                    </div>
                    <span className="text-xs font-bold text-gray-700 max-w-[80px] truncate">{user.name?.split(' ')[0]}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="text-gray-400 hover:text-red-500 transition-colors p-1"
                    title="Logout"
                  >
                    <FaSignOutAlt className="text-lg" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-primary focus:outline-none"
            >
              {isOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.concat(token ? authLinks : []).map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-3 py-3 rounded-xl text-base font-medium transition-all ${
                    isActive(link.path)
                      ? 'text-primary bg-primary/5'
                      : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                  }`}
                >
                  {link.icon && <span className="text-lg opacity-70">{link.icon}</span>}
                  {link.name}
                </Link>
              ))}
              <div className="mt-4 border-t border-gray-100 pt-4 flex flex-col space-y-3 px-3">
                {!token ? (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setIsOpen(false)}
                      className="block text-center text-gray-600 hover:text-primary font-bold py-3 border-2 border-gray-100 rounded-xl transition-all"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setIsOpen(false)}
                      className="block text-center bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-xl shadow-lg shadow-primary/20 transition-all"
                    >
                      Sign Up
                    </Link>
                  </>
                ) : (
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 font-bold py-3 rounded-xl hover:bg-red-100 transition-all"
                  >
                    <FaSignOutAlt /> Logout
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
