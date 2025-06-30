// src/pages/LoginPage.jsx
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
            const res = await axios.post('/api/login', form, {
                headers: { 'Content-Type': 'application/json' }
            });
            // assume response contains a token and user info
            const { token, user } = res.data;
            localStorage.setItem('authToken', token);
            localStorage.setItem('user', JSON.stringify(user));
            // redirect to owner dashboard
            navigate('/owner/dashboard');
        } catch (err) {
            console.error(err);
            setError(
                err.response?.data?.message ||
                'Login failed – please check your credentials.'
            );
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-sm bg-white shadow-md rounded-lg p-6"
            >
                <h2 className="text-2xl font-semibold mb-4 text-center">
                    Owner Login
                </h2>

                {error && (
                    <div className="mb-4 px-3 py-2 bg-red-100 text-red-700 rounded">
                        {error}
                    </div>
                )}

                <div className="mb-4">
                    <label
                        htmlFor="email"
                        className="block text-gray-700 mb-1"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
                    />
                </div>

                <div className="mb-6">
                    <label
                        htmlFor="password"
                        className="block text-gray-700 mb-1"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                    Login
                </button>

                <p className="mt-4 text-center text-sm text-gray-600">
                    Or{' '}
                    <button
                        type="button"
                        onClick={() => navigate('/')}
                        className="text-blue-600 hover:underline"
                    >
                        continue as guest
                    </button>
                </p>
            </form>
        </div>
    );
}
