// src/pages/OwnerDashboard.jsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaCat, FaCss3Alt, FaHtml5, FaJsSquare, FaLaravel, FaNodeJs, FaPython, FaReact } from 'react-icons/fa';
import { SiAdobephotoshop, SiAdobepremierepro, SiCplusplus, SiFrappe, SiMariadb, SiMysql, SiPhp, SiSass, SiSqlite, SiTypescript } from 'react-icons/si';
import { Link, useNavigate } from 'react-router-dom';

const ICONS = {
    Cat: FaCat,
    React: FaReact,
    Laravel: FaLaravel,
    Frappe: SiFrappe,
    'Node.js': FaNodeJs,
    Sass: SiSass,
    Python: FaPython,
    JavaScript: FaJsSquare,
    PHP: SiPhp,
    Typescript: SiTypescript,
    'C++': SiCplusplus,
    HTML: FaHtml5,
    CSS: FaCss3Alt,
    MariaDB: SiMariadb,
    MySQL: SiMysql,
    SQLite: SiSqlite,
    'Adobe Photoshop': SiAdobephotoshop,
    'Adobe Premier Pro': SiAdobepremierepro,
    // …add more mappings or allow a URL field
};

export default function OwnerDashboard() {
    const [details, setDetails] = useState(null);
    const [experiences, setExperiences] = useState([]);
    const [education, setEducation] = useState([]);
    const [skills, setSkills] = useState([]);
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

        //Skills
        axios.get('http://localhost:5000/api/skills', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => setSkills(res.data))
            .catch(() => setSkills([]));

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


            {/*  Skills  */}
            <div style={sectionHeader}>
                <h2 style={{ margin: 0 }}>Skills</h2>
                <Link to="/owner/skills" style={editBtn}>Edit</Link>
            </div>

            {skills.length > 0 ? (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill,minmax(100px,1fr))',
                    gap: '1.5rem',
                    textAlign: 'center'
                }}>
                    {skills.map(skill => (
                        <div key={skill.id} style={card}>
                            {(() => {
                                const Icon = ICONS[skill.name] || (() => <span>❔</span>);
                                return <Icon style={{ width: '2rem', height: '2rem', marginBottom: '.5rem', opacity: .75 }} />;
                            })()}
                            <p style={{ margin: 0, fontSize: '0.9rem', color: '#c9d1d9' }}>
                                {skill.name}
                            </p>
                        </div>
                    ))}
                </div>
            ) : (
                <p style={subtle}>
                    No skills yet. <Link to="/owner/skills" style={link}>Add some now</Link>
                </p>
            )}

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
