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
      nomMoteur:''
    };
    this.handleSubmit = this.handleSubmit.bind(this);//
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

  
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });//
    }
    async handleSubmit(event){
        event.preventDefault();
        const formData = new FormData(event.target);
        const nomMoteur = formData.get("nomMoteur");//
        

        let url ='http://localhost:8080/moteur?nom='+nomMoteur;//

        await fetch(url , {
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nomMoteur }) //
        }).then(()=>{
            const newItem = {nomMoteur};//
            this.setState({ allMoteur: [...this.state.allMoteur, newItem] });//
            window.location.reload();
        });
    }
    async remove(id){
        console.log("miditra");
        let url = 'http://localhost:8080/moteur/'+id; //
        await fetch(url,{
            method:'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(()=>{
            let updated = [...this.state.allMoteur].filter(i => i.id !== id);//
            this.setState({allMoteur: updated}); //
            window.location.reload();
        });
    }

  render() {
    return (
      <>
        <div className="insertion">
          <form className="crud-form" onSubmit={this.handleSubmit}>
            <label>Moteur</label>
            <input name="nomMoteur" onChange={this.handleChange}/>
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
                    <button className="btn btn-danger" onClick={()=>this.remove(moteur.idMoteur)}>Supprimer</button>
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
