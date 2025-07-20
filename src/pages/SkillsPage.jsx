import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaCat, FaCss3Alt, FaHtml5, FaJsSquare, FaLaravel, FaNodeJs, FaPython, FaReact } from 'react-icons/fa';
import { SiAdobephotoshop, SiAdobepremierepro, SiCplusplus, SiFrappe, SiMariadb, SiMysql, SiPhp, SiSass, SiSqlite, SiTypescript } from 'react-icons/si';
import '../styles/SkillsPage.scss';

// map known names to icon components
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

export default function SkillsPage() {
    const [list, setList] = useState([]);
    const [form, setForm] = useState({ name: '' });
    const [editing, setEditing] = useState(null);
    const token = localStorage.getItem('authToken');

    useEffect(() => {
        axios.get('http://localhost:5000/api/skills', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => setList(res.data))
            .catch(console.error);
    }, [token]);

    const handleChange = e =>
        setForm(f => ({ ...f, [e.target.name]: e.target.value }));

    const handleSubmit = async e => {
        e.preventDefault();
        const url = editing
            ? `http://localhost:5000/api/skills/${editing.id}`
            : 'http://localhost:5000/api/skills';
        const method = editing ? 'put' : 'post';
        try {
            const res = await axios[method](url, form, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (editing) {
                setList(l => l.map(x => x.id === editing.id ? res.data : x));
            } else {
                setList(l => [...l, res.data]);
            }
            setEditing(null);
            setForm({ name: '' });
        } catch {
            alert('Error saving skill');
        }
    };

    const handleEdit = item => {
        setEditing(item);
        setForm({ name: item.name });
    };

    const handleDelete = async id => {
        if (!window.confirm('Delete this skill?')) return;
        await axios.delete(`http://localhost:5000/api/skills/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        setList(l => l.filter(x => x.id !== id));
    };

    return (
        <div className="skills-page">
            <div className="skills-page__container">
                <h2 className="skills-page__heading">
                    {editing ? 'Edit Skill' : 'Add Skill'}
                </h2>
                <form className="skills-page__form" onSubmit={handleSubmit}>
                    <div className="skills-page__form-field">
                        <label>Name</label>
                        <input
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="e.g. Python"
                        />
                    </div>
                    <button type="submit">
                        {editing ? 'Update' : 'Add'}
                    </button>
                </form>

                <div className="skills-page__grid">
                    {list.map(item => {
                        const Icon = ICONS[item.name] || (() => <span>❔</span>);
                        return (
                            <div key={item.id} className="skills-page__card">
                                <Icon />
                                <p>{item.name}</p>
                                <button
                                    className="skills-page__btn skills-page__btn--edit"
                                    onClick={() => handleEdit(item)}
                                >
                                    ✎
                                </button>
                                <button
                                    className="skills-page__btn skills-page__btn--delete"
                                    onClick={() => handleDelete(item.id)}
                                >
                                    🗑
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
