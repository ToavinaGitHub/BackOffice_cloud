import React from "react";
import Annonce from "./Annonce";
import "../assets/Annonce/AnnonceTempl.css";
import config from "../../config.js";
import ClipLoader from "react-spinners/ClipLoader";

class AnnonceTempl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      annonces: [],
      token: localStorage.getItem("token"),
      baseUrl:config.baseUrl,
      loading: true
    };
  }

  componentDidMount() {
    this.fetchAnnonceDemandeData();
  }

  fetchAnnonceDemandeData = () => {
    fetch(this.state.baseUrl+"/AnnoncesEnDemande",{
      headers: {
        'Authorization': `Bearer ${this.state.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({ annonces: data,loading: false });
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        this.setState({ loading: false });
      });
  };

  handleAccept = async (id) => { // Ajouter "async" ici
    let url =this.state.baseUrl+'/Annonce/validation?idAnnonce='+id;

    await fetch(url , {
        method:'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.state.token}`,
        },
      
    }).then(() => {
        let updated = [...this.state.annonces].filter(i => i.id !== id);
        this.setState({annonces: updated});
        window.location.reload();
    });
  };

  handleRefuse = async (id) => { // Ajouter "async" ici
    let url =this.state.baseUrl+'/Annonce/refuser?idAnnonce='+id;

    await fetch(url , {
        method:'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.state.token}`,
        },
      
    }).then(() => {
        let updated = [...this.state.annonces].filter(i => i.id !== id);
        this.setState({annonces: updated});
        window.location.reload();
    });
  };
  render() {
    const { annonces,loading } = this.state;
    return (
      <>
        <div className="crud-container">
          <div className="crud-title">
            <strong>Annonces/{this.props.title}</strong>
          </div>
          {loading ? (
             <ClipLoader
               color={'#182d56'}
               loading={loading}
               size={100}
               id="loader"
             />
          ) : (
            <div className="allAnnonces">
              {annonces.map((annonce, index) => (
                <Annonce
                  key={index}
                  {...annonce}
                  onAccept={() => this.handleAccept(annonce.idAnnonce)}
                  onRefuse={() => this.handleRefuse(annonce.idAnnonce)}
                />
              ))}
            </div>
          )}
        </div>
      </>
    );
  }
}

export default AnnonceTempl;
