// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
    const token = localStorage.getItem('authToken');
    return token
        ? children
        : <Navigate to="/login" replace />;
}
