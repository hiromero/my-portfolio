import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../styles/ExperiencePage.scss';

const MONTHS = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

export default function ExperiencePage() {
    const [list, setList] = useState([]);
    const [editing, setEditing] = useState(null); // null = create; otherwise the exp object
    const [form, setForm] = useState({
        company: '',
        role: '',
        location: '',
        description: '',
        achievements: '',
        startMonth: 'Jan',
        startYear: new Date().getFullYear().toString(),
        endMonth: 'Dec',
        endYear: new Date().getFullYear().toString(),
        current: false
    });
    const token = localStorage.getItem('authToken');

    // Load experiences
    useEffect(() => {
        axios
            .get('http://localhost:5000/api/experience', {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(res => setList(res.data))
            .catch(console.error);
    }, []);

    const resetForm = () => {
        setEditing(null);
        setForm({
            company: '',
            role: '',
            location: '',
            description: '',
            achievements: '',
            startMonth: 'Jan',
            startYear: new Date().getFullYear().toString(),
            endMonth: 'Dec',
            endYear: new Date().getFullYear().toString(),
            current: false
        });
    };

    const handleChange = e => {
        const { name, value, type, checked } = e.target;
        setForm(f => ({
            ...f,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        const url = editing
            ? `http://localhost:5000/api/experience/${editing.id}`
            : 'http://localhost:5000/api/experience';
        const method = editing ? 'put' : 'post';

        try {
            const res = await axios[method](
                url,
                form,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            // update list locally
            if (editing) {
                setList(l => l.map(x => x.id === editing.id ? res.data : x));
            } else {
                setList(l => [res.data, ...l]);
            }
            resetForm();
        } catch (err) {
            console.error(err);
            alert('Error saving experience');
        }
    };

    const handleEdit = exp => {
        setEditing(exp);
        setForm({ ...exp, current: !!exp.current });
    };

    const handleDelete = async id => {
        if (!window.confirm('Delete this experience?')) return;
        await axios.delete(`http://localhost:5000/api/experience/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        setList(l => l.filter(x => x.id !== id));
    };

    return (
        <div className="experience-page">
            <div className="experience-page__container">
                <h2 className="experience-page__heading">
                    {editing ? 'Edit Experience' : 'Add Experience'}
                </h2>

                <form className="experience-page__form" onSubmit={handleSubmit}>
                    {[
                        ['Company Name', 'company'],
                        ['Role Title', 'role'],
                        ['Location', 'location']
                    ].map(([label, key]) => (
                        <div key={key} className="experience-page__field">
                            <label className="experience-page__field-label">
                                {label}
                            </label>
                            <input
                                name={key}
                                value={form[key]}
                                onChange={handleChange}
                                className="experience-page__field-input"
                            />
                        </div>
                    ))}

                    <div className="experience-page__field">
                        <label className="experience-page__field-label">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            className="experience-page__field-textarea"
                        />
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <div className="experience-page__field" style={{ flex: 1 }}>
                            <label className="experience-page__field-label">
                                Start Month
                            </label>
                            <select
                                name="startMonth"
                                value={form.startMonth}
                                onChange={handleChange}
                                className="experience-page__field-select"
                            >
                                {MONTHS.map(m => <option key={m}>{m}</option>)}
                            </select>
                        </div>
                        <div className="experience-page__field" style={{ width: '6rem' }}>
                            <label className="experience-page__field-label">
                                Start Year
                            </label>
                            <input
                                name="startYear"
                                type="number"
                                value={form.startYear}
                                onChange={handleChange}
                                className="experience-page__field-input"
                            />
                        </div>

                        {!form.current && (
                            <>
                                <div className="experience-page__field" style={{ flex: 1 }}>
                                    <label className="experience-page__field-label">
                                        End Month
                                    </label>
                                    <select
                                        name="endMonth"
                                        value={form.endMonth}
                                        onChange={handleChange}
                                        className="experience-page__field-select"
                                    >
                                        {MONTHS.map(m => <option key={m}>{m}</option>)}
                                    </select>
                                </div>
                                <div className="experience-page__field" style={{ width: '6rem' }}>
                                    <label className="experience-page__field-label">
                                        End Year
                                    </label>
                                    <input
                                        name="endYear"
                                        type="number"
                                        value={form.endYear}
                                        onChange={handleChange}
                                        className="experience-page__field-input"
                                    />
                                </div>
                            </>
                        )}

                        <div className="experience-page__field" style={{ flexBasis: '100%' }}>
                            <label>
                                <input
                                    name="current"
                                    type="checkbox"
                                    checked={form.current}
                                    onChange={handleChange}
                                />
                                {' '}I am currently working here
                            </label>
                        </div>
                    </div>

                    <div className="experience-page__field">
                        <label className="experience-page__field-label">
                            Work Portfolio &amp; Achievements
                        </label>
                        <textarea
                            name="achievements"
                            value={form.achievements}
                            onChange={handleChange}
                            placeholder="One achievement per line"
                            className="experience-page__field-textarea"
                            rows={4}
                        />
                    </div>

                    <button type="submit" className="experience-page__button">
                        {editing ? 'Update' : 'Add'}
                    </button>
                </form>

                <ul className="experience-page__list">
                    {list.map(exp => (
                        <li key={exp.id} className="experience-page__list-item">
                            <div className="experience-page__actions">
                                <button
                                    className="experience-page__btn experience-page__btn--edit"
                                    onClick={() => handleEdit(exp)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="experience-page__btn experience-page__btn--delete"
                                    onClick={() => handleDelete(exp.id)}
                                >
                                    Delete
                                </button>
                            </div>
                            <h3>{exp.role} @ {exp.company}</h3>
                            <p>
                                {exp.startMonth} {exp.startYear}
                                {' — '}
                                {exp.current ? 'Present' : `${exp.endMonth} ${exp.endYear}`}
                            </p>
                            {exp.location && <p><em>{exp.location}</em></p>}
                            {exp.description && <p>{exp.description}</p>}

                            {exp.achievements && (
                                <ul style={{ marginTop: '0.5rem', paddingLeft: '1.25rem' }}>
                                    {exp.achievements
                                        .split('\n')
                                        .map(line => line.trim())
                                        .filter(line => line.length > 0)
                                        .map((line, i) => (
                                            <li key={i} style={{ marginBottom: '0.25rem' }}>
                                                {line}
                                            </li>
                                        ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
