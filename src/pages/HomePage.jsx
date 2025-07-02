import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/HomePage.scss';

export default function HomePage() {
    return (
        <div className="home-page">
            <nav className="home-page__nav">
                <NavLink to="/" end>Home</NavLink>
                <NavLink to="/login">Owner Login</NavLink>
            </nav>

            <div className="home-page__content">
                <h1 className="home-page__content-heading">Welcome to My Portfolio</h1>
                <p className="home-page__content-text">
                    Explore my projects, skills, and experience. Login to update details or continue as guest.
                </p>
            </div>

            <footer className="home-page__footer">
                © {new Date().getFullYear()} Hiroshi Romero
            </footer>
        </div>
    );
}
