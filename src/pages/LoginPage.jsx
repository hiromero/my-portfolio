// src/pages/LoginPage.jsx
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.scss';

export default function LoginPage() {
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/login', form, {
                headers: { 'Content-Type': 'application/json' }
            });
            const { token, user } = res.data;
            localStorage.setItem('authToken', token);
            localStorage.setItem('user', JSON.stringify(user));
            navigate('/owner/dashboard');
        } catch (err) {
            setError(
                err.response?.data?.message ||
                'Login failed – please check your credentials.'
            );
        }
    };

    return (
        <div className="login-page">
            <form className="login-page__form" onSubmit={handleSubmit}>
                <h2 className="login-page__heading">Owner Login</h2>

                {error && <div className="login-page__error">{error}</div>}

                {/* Email Field */}
                <div className="login-page__field">
                    <label
                        htmlFor="email"
                        className="login-page__field-label"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="login-page__field-input"
                    />
                </div>

                {/* Password Field */}
                <div className="login-page__field">
                    <label
                        htmlFor="password"
                        className="login-page__field-label"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        className="login-page__field-input"
                    />
                </div>

                {/* Submit Button */}
                <button type="submit" className="login-page__button">
                    Login
                </button>

                <p className="login-page__guest">
                    Or <a href="/">continue as guest</a>
                </p>
            </form>
        </div>
    );
}
