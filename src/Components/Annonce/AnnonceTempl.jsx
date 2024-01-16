import React from "react";
import Annonce from "./Annonce";
import "../assets/Annonce/AnnonceTempl.css";

class AnnonceTempl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      annonces: [],
    };
  }

  componentDidMount() {
    this.fetchAnnonceDemandeData();
  }

  fetchAnnonceDemandeData = () => {
    fetch("http://localhost:8080/AnnoncesEnDemande")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ annonces: data });
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  };

  handleAccept = async (id) => { // Ajouter "async" ici
    let url ='http://localhost:8080/Annonce/validation?idAnnonce='+id;

    await fetch(url , {
        method:'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
      
    }).then(() => {
        let updated = [...this.state.annonces].filter(i => i.id !== id);
        this.setState({annonces: updated});
        window.location.reload();
    });
  };

  handleRefuse = async (id) => { // Ajouter "async" ici
    let url ='http://localhost:8080/Annonce/refuser?idAnnonce='+id;

    await fetch(url , {
        method:'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
      
    }).then(() => {
        let updated = [...this.state.annonces].filter(i => i.id !== id);
        this.setState({annonces: updated});
        window.location.reload();
    });
  };
  render() {
    const { annonces } = this.state;
    return (
      <>
        <div className="crud-container">
          <div className="crud-title">
            <a>
              <strong>Annonces>{this.props.title}</strong>
            </a>
          </div>
          <div className="allAnnonces">
            {annonces.map((annonce, index) => (
              <Annonce
                key={index}
                {...annonce}
                onAccept={() => this.handleAccept(annonce.idAnnonce)} // Utiliser une fonction fléchée ici
                onRefuse={() => this.handleRefuse(annonce.idAnnonce)}
              />
            ))}
          </div>
        </div>
      </>
    );
  }
}

export default AnnonceTempl;
