import React, { Component } from "react";
import Paging from "../Paging";

class Marque extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMarque: [], ///////
      currentPage: null,
      totalPages: null,
      totalItems: null,
      view: "list",
      allMarque: [], ///////
      pageLimit:3,
    };
  }
  
  componentDidMount() {
    this.fetchMarqueData(); ///////
  }

  fetchMarqueData = () => { ///////
    fetch("http://localhost:8080/marques") ///////
      .then((response) => response.json())
      .then((data) => {
        const tot = data.length;
        const resultat =Math.abs(Math.ceil(tot / this.state.pageLimit));
        this.setState({totalItems: tot});
        this.setState({ allMarque: data, totalItems: tot }, () => { ///////
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
    
    this.setState({totalItems: this.state.allMarque.length}); ///////
 
    const currentMarque = this.state.allMarque.slice( ///////
      offset,
      offset + pageLimit
    );
    
    this.setState({ currentPage, currentMarque, totalPages }); ///////
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
                <th>Marque</th>
                <th>Actions</th>
              </tr>
              {this.state.currentMarque.map((marque) => ( ///////
                <tr key={marque.idMarque}>
                  <td>{marque.idMarque}</td>
                  <td>{marque.nomMarque}</td>
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

export default Marque;
