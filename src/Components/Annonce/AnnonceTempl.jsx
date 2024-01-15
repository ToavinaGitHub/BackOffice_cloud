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

  handleAccept = () => {
    console.log("Accepted");
  };

  handleRefuse = () => {
    console.log("Refused");
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
                onAccept={this.handleAccept}
                onRefuse={this.handleRefuse}
              />
            ))}
          </div>
        </div>
      </>
    );
  }
}

export default AnnonceTempl;
