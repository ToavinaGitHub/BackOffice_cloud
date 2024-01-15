import React, { Component } from "react";
import Paging from "../Paging";

class Categorie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCategorie: [], ///////
      currentPage: null,
      totalPages: null,
      totalItems: null,
      view: "list",
      allCategorie: [], ///////
      pageLimit:3,
    };
  }
  
  componentDidMount() {
    this.fetchCategorieData(); ///////
  }

  fetchCategorieData = () => { ///////
    fetch("http://localhost:8080/categories") ///////
      .then((response) => response.json())
      .then((data) => {
        const tot = data.length;
        const resultat =Math.abs(Math.ceil(tot / this.state.pageLimit));
        this.setState({totalItems: tot});
        this.setState({ allCategorie: data, totalItems: tot }, () => { ///////
          this.onPageChanged({ currentPage: 1, pageLimit: this.state.pageLimit, totalPages: resultat , totalRecords:tot});
        });
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  };
  

  onPageChanged = (page) => {

    const { currentPage, totalPages, pageLimit } = page;

    const offset = (currentPage - 1) * pageLimit;
    
    this.setState({totalItems: this.state.allCategorie.length}); ///////
 
    const currentCategorie = this.state.allCategorie.slice( ///////
      offset,
      offset + pageLimit
    );
    
    this.setState({ currentPage, currentCategorie, totalPages }); ///////
  };

  render() {
    return (
      <>
        <div className="insertion">
          <form className="crud-form">
            <label>Marque</label>
            <input name="nom" />
            <button type="submit">Inserer</button>
          </form>
        </div>
        <div className="liste">
          <table className="table">
              <tr>
                <th>Id</th>
                <th>Categorie</th>
                <th>Actions</th>
              </tr>
              {this.state.currentCategorie.map((categorie) => ( ///////
                <tr key={categorie.idCategorie}>
                  <td>{categorie.idCategorie}</td>
                  <td>{categorie.nomCategorie}</td>
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

export default Categorie;
