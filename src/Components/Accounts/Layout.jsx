import React from 'react';
import LeftNavBar from '../Accueil/LeftNavBar';
import '../assets/Accueil/Layout.css';

const Layout = ({ children }) => {
    return (
        <div className="app-container">
            <LeftNavBar />
            <div className="main-content">
                {children}
            </div>
        </div>
    );
};

export default Layout;
