import React, { Component } from "react";
import Paging from "../Paging";

class Modele extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentModele: [], ///////
      currentPage: null,
      totalPages: null,
      totalItems: null,
      view: "list",
      allModele: [], ///////
      pageLimit:3,
      allMarque:[],
      allCategorie : []
    };
  }
  
  componentDidMount() {
    this.fetchModeleData(); ///////
    this.fetchMarqueData();
    this.fetchCategorieData();
  }

  fetchModeleData = () => { ///////
    fetch("http://localhost:8080/modeles") ///////
      .then((response) => response.json())
      .then((data) => {
        const tot = data.length;
        const resultat =Math.abs(Math.ceil(tot / this.state.pageLimit));
        this.setState({totalItems: tot});
        this.setState({ allModele: data, totalItems: tot }, () => { ///////
          this.onPageChanged({ currentPage: 1, pageLimit: this.state.pageLimit, totalPages: resultat , totalRecords:tot});
        });
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  };
  fetchMarqueData = () => { ///////
    fetch("http://localhost:8080/marques") ///////
      .then((response) => response.json())
      .then((data) => {
        this.setState({allMarque: data});
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  };
  fetchCategorieData = () => { ///////
    fetch("http://localhost:8080/categories") ///////
      .then((response) => response.json())
      .then((data) => {
        this.setState({allCategorie: data});
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  };
  

  onPageChanged = (page) => {

    const { currentPage, totalPages, pageLimit } = page;

    const offset = (currentPage - 1) * pageLimit;
    
    this.setState({totalItems: this.state.allModele.length}); ///////
 
    const currentModele /*///*/  = this.state.allModele.slice( ///////
      offset,
      offset + pageLimit
    );
    
    this.setState({ currentPage, currentModele, totalPages }); ///////
  };

  render() {
    return (
      <>
        <div className="insertion">
          <form className="crud-form">
            <label>Modele</label>
            <input name="nomModele" />
            <label>Marque</label>
            <select name="marque">
                {this.state.allMarque.map((marque)=> (
                    <option value={marque.idMarque}>{marque.nomMarque}</option>
                ))}
            </select>
            <label>Categorie</label>
            <select name="categorie">
                {this.state.allCategorie.map((categ)=> (
                    <option value={categ.idCategorie}>{categ.nomCategorie}</option>
                ))}
            </select>
            <button type="submit">Inserer</button>
          </form>
        </div>
        <div className="liste">
          <table className="table">
              <tr>
                <th>Modele</th>
                <th>Marque</th>
                <th>Categorie</th>
                <th>Actions</th>
              </tr>
              {this.state.currentModele.map((modele) => ( ///////
                <tr key={modele.idModele}>
                  <td>{modele.nomModele}</td>
                  <td>{modele.marque.nomMarque}</td>
                  <td>{modele.categorie.nomCategorie}</td>
                  <td className="actions">
                    <button className="btn btn-danger">Supprimer</button>
                    <button className="btn btn-warning">Modifier</button>
                  </td>
                </tr>
              ))}
          </table>
          
          {this.state.totalItems !== null && (
          <Paging
            totalRecords={this.state.totalItems}
            pageLimit={this.state.pageLimit}
            pageNeighbours={3}
            onPageChanged={this.onPageChanged}
            sizing=""
            alignment="justify-content-center"
          />
        )}
        </div>
      </>
    );
  }
}

export default Modele;
