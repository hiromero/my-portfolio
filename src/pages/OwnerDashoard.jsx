// src/pages/OwnerDashboard.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function OwnerDashboard() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <div style={{ padding: '2rem', color: '#c9d1d9', background: '#0d1117', minHeight: '100vh' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Owner Dashboard</h1>
            <p>Welcome back, owner! From here you can manage all sections of your portfolio.</p>

            <nav style={{ margin: '2rem 0' }}>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    <li><Link to="/owner/details" style={{ color: '#58a6ff' }}>My Details</Link></li>
                    <li><Link to="/owner/contacts" style={{ color: '#58a6ff' }}>Contact Addresses</Link></li>
                    <li><Link to="/owner/experience" style={{ color: '#58a6ff' }}>Work Experiences</Link></li>
                    <li><Link to="/owner/education" style={{ color: '#58a6ff' }}>Educational Level</Link></li>
                    <li><Link to="/owner/skills" style={{ color: '#58a6ff' }}>Skills</Link></li>
                    <li><Link to="/owner/achievements" style={{ color: '#58a6ff' }}>Achievements</Link></li>
                    <li><Link to="/owner/certifications" style={{ color: '#58a6ff' }}>Certifications</Link></li>
                </ul>
            </nav>

            <button
                onClick={handleLogout}
                style={{
                    background: '#78191f',
                    color: '#ffdddd',
                    border: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '6px',
                    cursor: 'pointer'
                }}
            >
                Logout
            </button>
        </div>
    );
}
