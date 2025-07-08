import axios from 'axios';
import React, { useEffect, useState } from 'react';

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
        <div className="details-form" style={{ padding: '2rem' }}>
            <h2>My Details</h2>
            <form onSubmit={handleSubmit}>
                {Object.entries(form).map(([key, val]) => (
                    <div key={key} style={{ marginBottom: '1rem' }}>
                        <label>{key.charAt(0).toUpperCase() + key.slice(1)}:</label><br />
                        {key === 'bio' ? (
                            <textarea
                                name={key}
                                value={val}
                                onChange={handleChange}
                                rows="3"
                                style={{ width: '100%' }}
                            />
                        ) : (
                            <input
                                type="text"
                                name={key}
                                value={val}
                                onChange={handleChange}
                                style={{ width: '100%' }}
                            />
                        )}
                    </div>
                ))}
                <button type="submit">Save</button>
            </form>
        </div>
    );
}
