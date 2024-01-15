import React, { Component } from "react";
import Paging from "../Paging";

class Moteur extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMoteur: [], ///////
      currentPage: null,
      totalPages: null,
      totalItems: null,
      view: "list",
      allMoteur: [], ///////
      pageLimit:3,
    };
  }
  
  componentDidMount() {
    this.fetchMoteurData(); ///////
  }

  fetchMoteurData = () => { ///////
    fetch("http://localhost:8080/moteurs") ///////
      .then((response) => response.json())
      .then((data) => {
        const tot = data.length;
        const resultat =Math.abs(Math.ceil(tot / this.state.pageLimit));
        this.setState({totalItems: tot});
        this.setState({ allMoteur: data, totalItems: tot }, () => { ///////
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
            <label>Moteur</label>
            <input name="nom" />
            <button type="submit">Inserer</button>
          </form>
        </div>
        <div className="liste">
          <table className="table">
              <tr>
                <th>Id</th>
                <th>Moteur</th>
                <th>Actions</th>
              </tr>
              {this.state.currentMoteur.map((moteur) => ( ///////
                <tr key={moteur.idMoteur}>
                  <td>{moteur.idMoteur}</td>
                  <td>{moteur.nomMoteur}</td>
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

export default Moteur;
