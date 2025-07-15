// src/pages/OwnerDashboard.jsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function OwnerDashboard() {
    const [details, setDetails] = useState(null);
    const [experiences, setExperiences] = useState([]);
    const token = localStorage.getItem('authToken');
    const navigate = useNavigate();

    useEffect(() => {
        // Details
        axios.get('http://localhost:5000/api/details')
            .then(res => {
                if (Object.keys(res.data).length > 0) {
                    setDetails(res.data);
                }
            })
            .catch(() => { });

        // Work Experiences
        axios.get('http://localhost:5000/api/experience', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => setExperiences(res.data))
            .catch(() => setExperiences([]));
    }, [token]);

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <div style={{
            padding: '2rem',
            background: '#0d1117',
            color: '#c9d1d9',
            minHeight: '100vh'
        }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
                Owner Dashboard
            </h1>

            {/* My Details */}
            {details ? (
                <div style={{
                    background: '#161b22',
                    border: '1px solid #30363d',
                    borderRadius: '6px',
                    padding: '1.5rem',
                    marginBottom: '2rem'
                }}>
                    <h2 style={{ marginBottom: '.5rem' }}>My Details</h2>
                    <ul style={{ listStyle: 'none', padding: 0, lineHeight: 1.6 }}>
                        {Object.entries(details).map(([key, val]) => (
                            <li key={key}>
                                <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>{' '}
                                {val || <em style={{ color: '#8b949e' }}>—</em>}
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p style={{ color: '#8b949e' }}>
                    You haven’t added your details yet.&nbsp;
                    <Link to="/owner/details" style={{ color: '#58a6ff' }}>Add now</Link>
                </p>
            )}

            {/* Work Experiences */}
            <h2 style={{ margin: '2rem 0 1rem' }}>Work Experiences</h2>
            {experiences.length > 0 ? (
                experiences.map(exp => (
                    <div
                        key={exp.id}
                        style={{
                            background: '#161b22',
                            border: '1px solid #30363d',
                            borderRadius: '6px',
                            padding: '1.5rem',
                            marginBottom: '1rem'
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <strong style={{ fontSize: '1.1rem' }}>
                                {exp.role} @ {exp.company}
                            </strong>
                            <span>
                                <Link to="/owner/experience" style={{ color: '#58a6ff', marginRight: '1rem' }}>Edit</Link>
                                <Link to="/owner/experience" style={{ color: '#f85149' }}>Delete</Link>
                            </span>
                        </div>

                        <p style={{ fontStyle: 'italic', margin: '.5rem 0' }}>
                            {exp.startMonth} {exp.startYear} — {exp.current ? 'Present' : `${exp.endMonth} ${exp.endYear}`}
                        </p>

                        {exp.location && <p><em>{exp.location}</em></p>}
                        {exp.description && <p>{exp.description}</p>}

                        {exp.achievements && (
                            <ul style={{ paddingLeft: '1.25rem', marginTop: '.5rem' }}>
                                {exp.achievements
                                    .split('\n')
                                    .map((line, i) => line.trim())
                                    .filter(line => line)
                                    .map((line, i) => (
                                        <li key={i} style={{ marginBottom: '.25rem' }}>
                                            {line}
                                        </li>
                                    ))}
                            </ul>
                        )}
                    </div>
                ))
            ) : (
                <p style={{ color: '#8b949e' }}>
                    No work experiences yet.&nbsp;
                    <Link to="/owner/experience" style={{ color: '#58a6ff' }}>Add one now</Link>
                </p>
            )}

            {/* Logout */}
            <button
                onClick={handleLogout}
                style={{
                    marginTop: '2rem',
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
