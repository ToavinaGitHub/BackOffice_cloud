import React, { Component } from "react";
import Paging from "../Paging";

class MoteurModele extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMoteurModele: [], ///////
      currentPage: null,
      totalPages: null,
      totalItems: null,
      view: "list",
      allMoteurModele: [], ///////
      pageLimit:3,
      allModele:[],
      allMoteur:[]
    };
  }
  
  componentDidMount() {
   // this.fetchMoteurModeleData(); ///////
    this.fetchMoteurData();
    this.fetchModeleData();
  }


  fetchMoteurModeleData = () => { ///////
    fetch("http://localhost:8080/moteursModele") ///////
      .then((response) => response.json())
      .then((data) => {
        const tot = data.length;
        const resultat =Math.abs(Math.ceil(tot / this.state.pageLimit));
        this.setState({totalItems: tot});
        this.setState({ allMoteurModele: data, totalItems: tot }, () => { ///////
          this.onPageChanged({ currentPage: 1, pageLimit: this.state.pageLimit, totalPages: resultat , totalRecords:tot});
        });
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  };
  fetchModeleData = () => { ///////
    fetch("http://localhost:8080/modeles") ///////
      .then((response) => response.json())
      .then((data) => {
            this.setState({allModele:data})
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  };
  fetchMoteurData = () => { ///////
    fetch("http://localhost:8080/moteurs") ///////
      .then((response) => response.json())
      .then((data) => {
            this.setState({allMoteur:data})
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  };
  

  onPageChanged = (page) => {

    const { currentPage, totalPages, pageLimit } = page;

    const offset = (currentPage - 1) * pageLimit;
    
    this.setState({totalItems: this.state.allMoteur.length}); ///////
 
    const currentMoteurModele /*///*/  = this.state.allMoteurModele.slice( ///////
      offset,
      offset + pageLimit
    );
    
    this.setState({ currentPage, currentMoteurModele, totalPages }); ///////
  };

  render() {
    return (
      <>
        <div className="insertion">
          <form className="crud-form">
          <label>Moteur</label>
            <select name="moteur">
                {this.state.allMoteur.map((moteur)=> (
                    <option value={moteur.idMoteur}>{moteur.nomMoteur}</option>
                ))}
            </select>
            <label>Modele</label>
            <select name="modele">
                {this.state.allModele.map((modele)=> (
                    <option value={modele.idModele}>{modele.nomModele}</option>
                ))}
            </select>
            <button type="submit">Inserer</button>
          </form>
        </div>
      </>
    );
  }
}

export default MoteurModele;
