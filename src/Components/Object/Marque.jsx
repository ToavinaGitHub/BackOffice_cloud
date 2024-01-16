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
      nomMarque:''
    };
    this.handleSubmit = this.handleSubmit.bind(this);//
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

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });//
    }
    async handleSubmit(event){
        event.preventDefault();
        const formData = new FormData(event.target);
        const nomMarque = formData.get("nomMarque");//
        

        let url ='http://localhost:8080/marque?nom='+nomMarque;//

        await fetch(url , {
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nomMarque }) //
        }).then(()=>{
            const newItem = {nomMarque};//
            this.setState({ allMarque: [...this.state.allMarque, newItem] });//
            window.location.reload();
        });
    }
    async remove(id){
        console.log("miditra");
        let url = 'http://localhost:8080/marque/'+id; //
        await fetch(url,{
            method:'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(()=>{
            let updated = [...this.state.allMarque].filter(i => i.id !== id);//
            this.setState({allMarque: updated}); //
            window.location.reload();
        });
    }

  render() {
    return (
      <>
        <div className="insertion">
          <form className="crud-form" onSubmit={this.handleSubmit}>
            <label>Marque</label>
            <input name="nomMarque" onChange={this.handleChange}/>
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
                    <button className="btn btn-danger" onClick={()=>this.remove(marque.idMarque)}>Supprimer</button>
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
