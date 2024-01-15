import React, { Component } from "react";
import Paging from "../Paging";

class AnneeModele extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentAnneeModele: [], ///////
      currentPage: null,
      totalPages: null,
      totalItems: null,
      view: "list",
      allAnneeModele: [], ///////
      pageLimit:3,
      allModele:[],
    };
  }
  
  componentDidMount() {
    this.fetchModeleData();
  }


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
  

  onPageChanged = (page) => {

    const { currentPage, totalPages, pageLimit } = page;

    const offset = (currentPage - 1) * pageLimit;
    
    this.setState({totalItems: this.state.allMoteur.length}); ///////
 
    const currentMoteur /*///*/  = this.state.allMoteur.slice( ///////
      offset,
      offset + pageLimit
    );
    
    this.setState({ currentPage, currentMoteur, totalPages }); ///////
  };

  render() {
    return (
      <>
        <div className="insertion">
          <form className="crud-form">
            <label>Année</label>
            <select>
            {Array.from({ length: 124 }, (_, index) => (
                <option key={index} value={index + 1900}>
                {index + 1900}
                </option>
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

export default AnneeModele;
