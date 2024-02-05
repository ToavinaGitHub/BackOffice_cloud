import React, { Component } from "react";
import "../assets/Annonce/Annonce.css";

import bm from "../assets/Annonce/bm.jpg";

class Annonce extends Component {
  constructor(props) {
    super(props);
    if (props.saryAnnonces.length === 0) {
      this.state = {
        currentImage: bm,
      };
    } else {
      // Si saryAnnonces n'est pas vide, utilisez la première image de saryAnnonces
      this.state = {
        currentImage: props.saryAnnonces[0].sary,
      };
    }
  }

    handleImageClick = (newImage) => {
      this.setState({ currentImage: newImage });
    };

  render() {
    const {
      saryAnnonces,
      description,
      kilometrage,
      nbPorte,
      prixDemande,
      dateAnnonce,
      utilisateur,
      transmission,
      carburant,
      modele,
      anneeModele,
      onAccept,
      onRefuse,
    } = this.props;
    

  

    return (
      <div className="annonce-card">
        <div className="image-section">
          <img className="main-image" src={this.state.currentImage} alt="Main" />
          <div className="other-images">
            {saryAnnonces.map((image, index) => (
              <img
                key={index}
                className="other-image"
                src={image.sary}
                alt={`Other ${index}`}
                onClick={() => this.handleImageClick(image.sary)}
              />
            ))}
          </div>
        </div>
        <div className="info-section">
         <div className="modele">
            <strong> {modele.nomModele} ({modele.categorie.nomCategorie}, {modele.marque.nomMarque})</strong>
          </div>
          <div className="description">{description}</div>
          <div className="kilometrage">Kilometrage: {kilometrage} Km</div>
          <div className="nbPorte">{nbPorte} portes</div>
          <div className="transmission">Transmission: <strong>{transmission.nomTransmission}</strong></div>
          <div className="carburant">Carburant:<strong>{carburant.nomCarburant}</strong> </div>
          <div className="annee">Année:<strong>{anneeModele.annee}</strong> </div>
          
          {/* <div className="prixVente">Selling Price: {prixVente}</div> */}
          {/* <div className="etat">Status: {etat === 1 ? "Active" : "Inactive"}</div> */}
          <div className="dateAnnonce">Date: {new Date(dateAnnonce).toLocaleDateString()}</div>
          {/* <div className="commission">
            Commission: {commission.valeur} ({new Date(commission.dateCommission).toLocaleDateString()})
          </div> */}
          <div className="publisher">
            Publié par: {utilisateur.nomUtilisateur} {utilisateur.prenomUtilisateur}
          </div>
                  
          <div className="price"> {prixDemande} MGA</div>
          <div className="button-section">
            <button className="accept-button" onClick={onAccept}>
              Accept
            </button>
            <button className="refuse-button" onClick={onRefuse}>
              Refuse
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Annonce;
