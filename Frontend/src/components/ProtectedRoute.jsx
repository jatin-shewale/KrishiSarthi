import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, role }) => {
    const token = localStorage.getItem('krishisarthi_token') || localStorage.getItem('admin_token');
    const user = JSON.parse(localStorage.getItem('krishisarthi_user') || '{}');
    const location = useLocation();

    if (!token) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (role && user.role !== role && !localStorage.getItem('admin_token')) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
