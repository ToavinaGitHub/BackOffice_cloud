import React, { useState } from 'react';

import '../assets/Accueil/LeftNavBar.css';
import "../assets/bootstrap.min.css";

import sary from "../assets/Accounts/images/log.jpg";

const LeftNavBar = () => {
    const [activeDropdown, setActiveDropdown] = useState(null);

  
    const handleToggleDropdown = (dropdownId) => {
        setActiveDropdown(activeDropdown === dropdownId ? null : dropdownId);
    };

    const handleLogout = () => {

        localStorage.removeItem("token");
        window.location.href = "/"; 
      };


    return (
        <div className="left-bar">
            <ul>
                <li className='li-head logo'>
                        <div >
                            <i className="fas fa-scroll"></i>
                            <span><img src={sary} className="logo-img"></img></span>
                            <span>Bônôkany</span>
                        </div>
                </li>
                <li className='li-head'>
                    <div
                        className={`nav-link ${activeDropdown === 'crud' ? 'active' : ''}`}
                        onClick={() => handleToggleDropdown('crud')}
                    >
                        <i className="fas fa-scroll"></i>
                        <span>CRUD</span>
                    </div>
                    {activeDropdown === 'crud' && (
                        <ul className="sub-menu">
                            <a href="/CrudCategorie"><li>Categorie</li></a>
                            <a href="/CrudMarque"><li>Marque</li></a>
                            <a href="/CrudMoteur"><li>Moteur</li></a>
                            <a href="/anneeModele"><li>Année Modele</li></a>
                            <a href="/modele"><li>Modele</li></a>
                            <a href="/CrudTransmission"><li>Transmission</li></a>
                            <a href="/CrudCarburant"><li>Carburant</li></a>
                            <a href="/moteurModele"><li>Moteur Modele</li></a>
                        </ul>
                    )}
                </li>
                <li className='li-head'>
                    <div
                        className={`nav-link ${activeDropdown === 'annonces' ? 'active' : ''}`}
                        onClick={() => handleToggleDropdown('annonces')}
                    >
                        <i className="fas fa-scroll"></i>
                        <span>Annonces</span>
                    </div>
                    {activeDropdown === 'annonces' && (
                        <ul className="sub-menu">
                            <a href="/ValiderAnnonce"><li>Valider Annonce</li></a>
                        </ul>
                    )}
                </li>
                <li className='li-head'>
                    <div
                        className={`nav-link ${activeDropdown === 'stats' ? 'active' : ''}`}
                        onClick={() => handleToggleDropdown('stats')}
                    >
                        <i className="fas fa-scroll"></i>
                        <span>Statistiques</span>
                    </div>
                    
                    {activeDropdown === 'stats' && (
                        <ul className="sub-menu">
                            <a href="/venteParAns"><li>Vente par Ans</li></a>
                            <a href="/annonceParAns"><li>Annonce par Ans</li></a>
                            <a href="/bestMarqueParAns"><li>Marque par ans</li></a>
                            <a href="/prixParAns"><li>Prix par ans</li></a>
                        </ul>
                    )}
                    
                   

                </li>
                <button className="logout-button" onClick={() => handleLogout()}>
                        Déconnexion
                    </button>
            </ul>
        </div>
    );
};

export default LeftNavBar;
