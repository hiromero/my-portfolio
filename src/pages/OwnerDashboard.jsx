// src/pages/OwnerDashboard.jsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function OwnerDashboard() {
    const [details, setDetails] = useState(null);
    const token = localStorage.getItem('authToken');
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get('http://localhost:5000/api/details')
            .then(res => {
                // If empty object, leave details null
                if (Object.keys(res.data).length > 0) {
                    setDetails(res.data);
                }
            })
            .catch(() => { });
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <div style={{
            padding: '2rem',
            color: '#c9d1d9',
            background: '#0d1117',
            minHeight: '100vh'
        }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
                Owner Dashboard
            </h1>

            {details ? (
                <div style={{
                    background: '#161b22',
                    padding: '1.5rem',
                    borderRadius: '6px',
                    border: '1px solid #30363d',
                    marginBottom: '2rem'
                }}>
                    <h2 style={{ marginBottom: '.5rem' }}>My Details</h2>
                    <ul style={{ listStyle: 'none', padding: 0, lineHeight: 1.6 }}>
                        {Object.entries(details).map(([key, val]) => (
                            <li key={key}>
                                <strong>
                                    {key.charAt(0).toUpperCase() + key.slice(1)}:
                                </strong> {val || <em style={{ color: '#8b949e' }}>—</em>}
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p style={{ color: '#8b949e' }}>
                    You haven’t added your details yet.{' '}
                    <Link to="/owner/details" style={{ color: '#58a6ff' }}>
                        Add now
                    </Link>
                </p>
            )}

            <nav style={{ margin: '2rem 0' }}>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    <li><Link to="/owner/details" style={{ color: '#58a6ff' }}>Edit My Details</Link></li>
                    {/* other links… */}
                    <li><Link to="/owner/contacts" style={{ color: '#58a6ff' }}>Contact Addresses</Link></li>
                    <li>
                        <Link to="/owner/experience" style={{ color: '#58a6ff' }}>
                            Work Experiences
                        </Link>
                    </li>
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
