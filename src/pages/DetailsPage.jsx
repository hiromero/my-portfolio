import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../styles/DetailsPage.scss';

export default function DetailsPage() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        linkedin: '',
        portfolio: '',
        address: '',
        bio: '',
    });

    const token = localStorage.getItem('authToken');

    // 🧠 Load existing details
    useEffect(() => {
        axios.get('http://localhost:5000/api/details')
            .then(res => setForm(res.data))
            .catch(err => console.log('No existing details'));
    }, []);

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/details', form, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
            alert('Details saved successfully!');
        } catch (err) {
            alert('Error saving details.');
        }
    };

    return (
        <div className="details-page">
            <div className="details-page__container">
                <h2 className="details-page__heading">My Details</h2>
                <form onSubmit={handleSubmit}>
                    {Object.entries(form).map(([key, val]) => (
                        <div key={key} className="details-page__field">
                            <label
                                htmlFor={key}
                                className="details-page__field-label"
                            >
                                {key.charAt(0).toUpperCase() + key.slice(1)}
                            </label>
                            {key === 'bio' ? (
                                <textarea
                                    id={key}
                                    name={key}
                                    value={val}
                                    onChange={handleChange}
                                    className="details-page__field-textarea"
                                />
                            ) : (
                                <input
                                    type="text"
                                    id={key}
                                    name={key}
                                    value={val}
                                    onChange={handleChange}
                                    className="details-page__field-input"
                                />
                            )}
                        </div>
                    ))}
                    <button type="submit" className="details-page__button">
                        Save
                    </button>
                </form>
            </div>
        </div>
    );
}
