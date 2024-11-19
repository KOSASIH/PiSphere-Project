import React from 'react';
import { Link } from 'react-router-dom';
import './components.css';

const Header = () => {
    return (
        <header className="header">
            <h1>PiSphere</h1>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/proposals">Proposals</Link>
                <Link to="/staking">Staking</Link>
            </nav>
        </header>
    );
};

export default Header;
