import React from 'react';
import './App.css';

function App() {
    return (
        <div className="app-wrapper">
            <header className="header">
                <img alt="nike"
                     src="https://1000logos.net/wp-content/uploads/2021/11/Nike-Logo.png"
                />
            </header>
            <nav className="nav">
                <div>Profile</div>
                <div>Messages</div>
            </nav>
            <div className="content">
                Main content
            </div>
        </div>
    );
}

export default App;
