import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../styles/EducationPage.scss';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const LEVELS = ['High School', 'Associate', 'Bachelor', 'Master', 'Doctorate'];

export default function EducationPage() {
    const [list, setList] = useState([]);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState({
        school: '',
        location: '',
        startMonth: 'Jan',
        startYear: new Date().getFullYear().toString(),
        graduationMonth: 'Dec',
        graduationYear: new Date().getFullYear().toString(),
        level: 'Bachelor',
        description: '',
        gpa: '',
        maxGpa: '',
        activities: ''
    });
    const token = localStorage.getItem('authToken');

    useEffect(() => {
        axios.get('http://localhost:5000/api/education', {
            headers: { Authorization: `Bearer ${token}` }
        }).then(res => setList(res.data))
            .catch(console.error);
    }, [token]);

    const resetForm = () => {
        setEditing(null);
        setForm({
            school: '',
            location: '',
            startMonth: 'Jan',
            startYear: new Date().getFullYear().toString(),
            graduationMonth: 'Dec',
            graduationYear: new Date().getFullYear().toString(),
            level: 'Bachelor',
            description: '',
            gpa: '',
            maxGpa: '',
            activities: ''
        });
    };

    const handleChange = e => {
        const { name, value } = e.target;
        setForm(f => ({ ...f, [name]: value }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        const url = editing
            ? `http://localhost:5000/api/education/${editing.id}`
            : 'http://localhost:5000/api/education';
        const method = editing ? 'put' : 'post';
        try {
            const res = await axios[method](url, form, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (editing) {
                setList(l => l.map(x => x.id === editing.id ? res.data : x));
            } else {
                setList(l => [res.data, ...l]);
            }
            resetForm();
        } catch {
            alert('Error saving entry');
        }
    };

    const handleEdit = entry => {
        setEditing(entry);
        setForm(entry);
    };

    const handleDelete = async id => {
        if (!window.confirm('Delete this entry?')) return;
        await axios.delete(`http://localhost:5000/api/education/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        setList(l => l.filter(x => x.id !== id));
    };

    return (
        <div className="education-page">
            <div className="education-page__container">
                <h2 className="education-page__heading">
                    {editing ? 'Edit Education' : 'Add Education'}
                </h2>

                <form className="education-page__form" onSubmit={handleSubmit}>
                    {/* School & Location */}
                    <div className="education-page__field">
                        <label className="education-page__field-label">School Name</label>
                        <input
                            name="school"
                            value={form.school}
                            onChange={handleChange}
                            className="education-page__field-input"
                        />
                    </div>
                    <div className="education-page__field">
                        <label className="education-page__field-label">Location</label>
                        <input
                            name="location"
                            value={form.location}
                            onChange={handleChange}
                            className="education-page__field-input"
                        />
                    </div>

                    {/* Dates */}
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        {['start', 'graduation'].map(pref => (
                            <React.Fragment key={pref}>
                                <div className="education-page__field" style={{ flex: 1 }}>
                                    <label className="education-page__field-label">
                                        {pref === 'start' ? 'Start Month' : 'Grad Month'}
                                    </label>
                                    <select
                                        name={`${pref}Month`}
                                        value={form[`${pref}Month`]}
                                        onChange={handleChange}
                                        className="education-page__field-select"
                                    >
                                        {MONTHS.map(m => <option key={m}>{m}</option>)}
                                    </select>
                                </div>
                                <div className="education-page__field" style={{ width: '6rem' }}>
                                    <label className="education-page__field-label">
                                        {pref === 'start' ? 'Start Year' : 'Grad Year'}
                                    </label>
                                    <input
                                        name={`${pref}Year`}
                                        type="number"
                                        value={form[`${pref}Year`]}
                                        onChange={handleChange}
                                        className="education-page__field-input"
                                    />
                                </div>
                            </React.Fragment>
                        ))}
                    </div>

                    {/* Level & Description */}
                    <div className="education-page__field" style={{ display: 'flex', gap: '1rem' }}>
                        <div style={{ flex: 1 }}>
                            <label className="education-page__field-label">Education Level</label>
                            <select
                                name="level"
                                value={form.level}
                                onChange={handleChange}
                                className="education-page__field-select"
                            >
                                {LEVELS.map(l => <option key={l}>{l}</option>)}
                            </select>
                        </div>
                        <div style={{ flex: 1 }}>
                            <label className="education-page__field-label">Description</label>
                            <input
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                className="education-page__field-input"
                            />
                        </div>
                    </div>

                    {/* GPA & Max GPA */}
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        {['gpa', 'maxGpa'].map(key => (
                            <div key={key} className="education-page__field" style={{ flex: 1 }}>
                                <label className="education-page__field-label">
                                    {key === 'gpa' ? 'GPA' : 'Max GPA'}
                                </label>
                                <input
                                    name={key}
                                    type="text"
                                    value={form[key]}
                                    onChange={handleChange}
                                    className="education-page__field-input"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Activities & Achievements */}
                    <div className="education-page__field">
                        <label className="education-page__field-label">
                            Activities & Achievements
                        </label>
                        <textarea
                            name="activities"
                            value={form.activities}
                            onChange={handleChange}
                            placeholder="One per line"
                            className="education-page__field-textarea"
                        />
                    </div>

                    <button type="submit" className="education-page__button">
                        {editing ? 'Update' : 'Add'}
                    </button>
                </form>

                {/* List */}
                {list.map(entry => (
                    <div key={entry.id} className="education-page__list-item">
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <strong>
                                {entry.level} in {entry.description} @ {entry.school}
                            </strong>
                            <span>
                                <button
                                    className="education-page__btn education-page__btn--edit"
                                    onClick={() => handleEdit(entry)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="education-page__btn education-page__btn--delete"
                                    onClick={() => handleDelete(entry.id)}
                                >
                                    Delete
                                </button>
                            </span>
                        </div>

                        <p style={{ fontStyle: 'italic', margin: '.5rem 0' }}>
                            {entry.startMonth} {entry.startYear} — {entry.graduationMonth} {entry.graduationYear}
                        </p>
                        <p><em>{entry.location}</em></p>
                        {entry.gpa && (
                            <p>GPA: {entry.gpa}{entry.maxGpa ? ` / ${entry.maxGpa}` : ''}</p>
                        )}
                        {entry.activities && (
                            <ul>
                                {entry.activities
                                    .split('\n')
                                    .map((l, i) => l.trim())
                                    .filter(l => l)
                                    .map((l, i) => <li key={i}>{l}</li>)}
                            </ul>
                        )}
                    </div>
                ))}

            </div>
        </div>
    );
}
