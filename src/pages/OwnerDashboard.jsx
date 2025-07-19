// src/pages/OwnerDashboard.jsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function OwnerDashboard() {
    const [details, setDetails] = useState(null);
    const [experiences, setExperiences] = useState([]);
    const [education, setEducation] = useState([]);
    const token = localStorage.getItem('authToken');
    const navigate = useNavigate();

    useEffect(() => {
        // Details
        axios.get('http://localhost:5000/api/details')
            .then(res => {
                if (Object.keys(res.data).length) setDetails(res.data);
            });

        // Experiences
        axios.get('http://localhost:5000/api/experience', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => setExperiences(res.data));

        // Education
        axios.get('http://localhost:5000/api/education', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => setEducation(res.data));
    }, [token]);

    const handleLogout = () => {
        localStorage.clear();
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
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.5rem'
            }}>
                <h2 style={{ margin: 0 }}>My Details</h2>
                <Link to="/owner/details" style={editBtn}>Edit</Link>
            </div>
            {details ? (
                <section style={card}>
                    <ul style={listStyle}>
                        {Object.entries(details).map(([k, v]) => (
                            <li key={k}>
                                <strong>{capitalize(k)}:</strong> {v || <em style={subtle}>—</em>}
                            </li>
                        ))}
                    </ul>
                </section>
            ) : (
                <p style={subtle}>
                    No details yet. <Link to="/owner/details" style={link}>Add now</Link>
                </p>
            )}

            {/* Work Experiences */}
            <div style={sectionHeader}>
                <h2 style={{ margin: 0 }}>Work Experiences</h2>
                <Link to="/owner/experience" style={editBtn}>Edit</Link>
            </div>
            {experiences.length ? (
                experiences.map(exp => (
                    <section key={exp.id} style={card}>
                        <strong style={{ fontSize: '1.1rem' }}>
                            {exp.role} @ {exp.company}
                        </strong>
                        <p style={italic}>
                            {exp.startMonth} {exp.startYear} — {exp.current ? 'Present' : `${exp.endMonth} ${exp.endYear}`}
                        </p>
                        {exp.location && <p><em>{exp.location}</em></p>}
                        {exp.description && <p>{exp.description}</p>}
                        {exp.achievements && (
                            <ul style={{ paddingLeft: '1.25rem', marginTop: '.5rem' }}>
                                {exp.achievements
                                    .split('\n')
                                    .map((l, i) => l.trim())
                                    .filter(l => l)
                                    .map((l, i) => <li key={i} style={{ marginBottom: '.25rem' }}>{l}</li>)
                                }
                            </ul>
                        )}
                    </section>
                ))
            ) : (
                <p style={subtle}>
                    No experiences yet. <Link to="/owner/experience" style={link}>Add one now</Link>
                </p>
            )}

            {/* Education */}
            <div style={sectionHeader}>
                <h2 style={{ margin: 0 }}>Education</h2>
                <Link to="/owner/education" style={editBtn}>Edit</Link>
            </div>
            {education.length ? (
                education.map(ed => (
                    <section key={ed.id} style={card}>
                        <strong style={{ fontSize: '1.1rem' }}>
                            {ed.level} in {ed.description} @ {ed.school}
                        </strong>
                        <p style={italic}>
                            {ed.startMonth} {ed.startYear} — {ed.graduationMonth} {ed.graduationYear}
                        </p>
                        {ed.location && <p><em>{ed.location}</em></p>}
                        {ed.gpa && <p>GPA: {ed.gpa}{ed.maxGpa ? ` / ${ed.maxGpa}` : ''}</p>}
                        {ed.activities && (
                            <ul style={{ paddingLeft: '1.25rem', marginTop: '.5rem' }}>
                                {ed.activities
                                    .split('\n')
                                    .map((l, i) => l.trim())
                                    .filter(l => l)
                                    .map((l, i) => <li key={i} style={{ marginBottom: '.25rem' }}>{l}</li>)
                                }
                            </ul>
                        )}
                    </section>
                ))
            ) : (
                <p style={subtle}>
                    No education entries yet. <Link to="/owner/education" style={link}>Add one now</Link>
                </p>
            )}
            <Link to="/owner/skills" style={editBtn}>Edit</Link>

            {/* Logout */}
            <button onClick={handleLogout} style={logoutBtn}>
                Logout
            </button>
        </div>
    );
}

// ——— Styles & Helpers ——————————————————————————————————————————————————
const card = {
    background: '#161b22',
    border: '1px solid #30363d',
    borderRadius: '6px',
    padding: '1.5rem',
    marginBottom: '1rem'
};

const sectionHeader = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '2rem 0 0.5rem'
};

const editBtn = {
    background: '#238636',
    color: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    textDecoration: 'none'
};

const logoutBtn = {
    marginTop: '2rem',
    background: '#78191f',
    color: '#ffdddd',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    cursor: 'pointer'
};

const italic = { fontStyle: 'italic', margin: '.5rem 0' };
const subtle = { color: '#8b949e' };
const link = { color: '#58a6ff' };
const listStyle = { listStyle: 'none', padding: 0, lineHeight: 1.6, margin: 0 };

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
