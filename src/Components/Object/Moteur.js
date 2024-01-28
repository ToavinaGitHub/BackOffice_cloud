import React, { Component } from "react";
import Paging from "../Paging";
import config from "../../config.js";
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
      nomMoteur:'',
      idMoteur:'',
      token: sessionStorage.getItem("token"),///////////////////
      isModif:0,//////////////////////////////////
      champButton:"Inserer",////////////////////////////////
      baseUrl: config.baseUrl,
      searchTerm: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);//
  }
  
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value }, () => {
      this.handleSearch(); // Trigger search as the user types
    });
  };
  handleSearch = () => {
      const { allMoteur, searchTerm } = this.state;
    
      const filteredMoteur = allMoteur.filter((moteur) =>
        moteur.nomMoteur.toLowerCase().includes(searchTerm.toLowerCase())
      );
  
      // Update the state with filtered carburants
      this.setState({
        currentMoteur: filteredMoteur,
        totalPages: Math.abs(Math.ceil(filteredMoteur.length / this.state.pageLimit)),
        currentPage: 1,
        totalItems: filteredMoteur.length,
      });
    };

  componentDidMount() {
    this.fetchMoteurData(); ///////
  }

  fetchMoteurData = () => { ///////
    fetch(this.state.baseUrl+"/moteurs",{
      headers: {
          'Authorization': `Bearer ${this.state.token}`,
        }
      }) 
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
    async handleSubmit(event){
        event.preventDefault();
        const formData = new FormData(event.target);
        const nomMoteur = formData.get("nomMoteur");//
        

        if(this.state.isModif === 0){ 
          let url =this.state.baseUrl+'/moteur?nom='+nomMoteur;//

          await fetch(url , {
              method:'POST',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${this.state.token}`,
              },
              body: JSON.stringify({ nomMoteur }) //
          }).then(()=>{
              const newItem = {nomMoteur};//
              this.setState({ allMoteur: [...this.state.allMoteur, newItem] });//
              window.location.reload();
          });
        }
        else if(this.state.isModif === 1){
          let url =this.state.baseUrl+'/moteur/'+this.state.idMoteur+'?nom='+this.state.nomMoteur;//
            await fetch(url , {
                method:'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.state.token}`,
                },
                body: JSON.stringify({ nomMoteur }) //
            }).then(()=>{
                const newItem = {nomMoteur};
                this.setState({ allMoteur: [...this.state.allMoteur, newItem] });
                this.setState({ isModif:0,champButton:"Inserer",nomMoteur:'',idMoteur:'' });
                window.location.reload();
            });
        }
    }
    async remove(id){
        console.log("miditra");
        let url =this.state.baseUrl+'/moteur/'+id; //
        await fetch(url,{
            method:'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.state.token}`
            }
        }).then(()=>{
            let updated = [...this.state.allMoteur].filter(i => i.id !== id);//
            this.setState({allMoteur: updated}); //
            window.location.reload();
        });
    }
    handleIncrementClick = (item) => {
      this.setState({ isModif:1,champButton:"Modifier",nomMoteur:item.nomMoteur,idMoteur:item.idMoteur });
    }

  render() {
    return (
      <>
        <div className="insertion">
          <form className="crud-form" onSubmit={this.handleSubmit}>
            <label>Moteur</label>
            <input name="nomMoteur" value={this.state.nomMoteur} onChange={this.handleChange}/>
            <button type="submit">{this.state.champButton}</button>
          </form>
        </div>
        <div className="liste">
        <div className="search-bar">
            <label>Search:</label>
            <input
              type="text"
              value={this.state.searchTerm}
              onChange={this.handleChange}
              name="searchTerm"
              placeholder="Recherche de moteur..."
            />
           
          </div>
          <table className="table">
              <tr>
                <th>Id</th>
                <th>Moteur</th>
                <th>Actions</th>
              </tr>
              {this.state.currentMoteur.map((moteur) => ( 
                <tr key={moteur.idMoteur}>
                  <td>{moteur.idMoteur}</td>
                  <td>{moteur.nomMoteur}</td>
                  <td className="actions">
                    <button className="btn btn-danger" onClick={()=>this.remove(moteur.idMoteur)}>Supprimer</button>
                    <button className="btn btn-warning" onClick={() => this.handleIncrementClick(moteur)} >Modifier</button>
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
