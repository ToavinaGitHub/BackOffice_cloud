import React, { Component } from "react";
import Paging from "../Paging";

class Transmission extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTrans: [],
      currentPage: null,
      totalPages: null,
      totalItems: null,
      view: "list",
      allTrans: [],
      pageLimit:3,
    };
  }
  
  componentDidMount() {
    this.fetchTransmissionData();
  }

  fetchTransmissionData = () => {
    fetch("http://localhost:8080/transmissions")
      .then((response) => response.json())
      .then((data) => {
        const tot = data.length;
        const resultat =Math.abs(Math.ceil(tot / this.state.pageLimit));
        this.setState({totalItems: tot});
        this.setState({ allTrans: data, totalItems: tot }, () => {
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
    
    this.setState({totalItems: this.state.allTrans.length});
    console.log(page);
    const currentTrans = this.state.allTrans.slice(
      offset,
      offset + pageLimit
    );
    
    this.setState({ currentPage, currentTrans, totalPages });
  };

  render() {
    return (
      <>
        <div className="insertion">
          <form className="crud-form">
            <label>Transmission</label>
            <input name="nom" />
            <button type="submit">Inserer</button>
          </form>
        </div>
        <div className="liste">
          <table className="table">
              <tr>
                <th>Id</th>
                <th>Transmission</th>
                <th>Actions</th>
              </tr>
              {this.state.currentTrans.map((trans) => (
                <tr key={trans.idTransmission}>
                  <td>{trans.idTransmission}</td>
                  <td>{trans.nomTransmission}</td>
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

export default Transmission;
