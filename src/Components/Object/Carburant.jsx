import React, { Component } from "react";
import Paging from "../Paging";

class Carburant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCarburant: [], 
      currentPage: null,
      totalPages: null,
      totalItems: null,
      view: "list",
      allCarburant: [],
      pageLimit:3,
      nomCarburant:'',
      idCarburant:'',
      token: localStorage.getItem("token"),///////////////////
      isModif:0,//////////////////////////////////
      champButton:"Inserer"////////////////////////////////
    };
    this.handleSubmit = this.handleSubmit.bind(this);//
  }
  
  componentDidMount() {
    this.fetchCarburantData(); 
  }

  fetchCarburantData = () => { 
    fetch("http://localhost:8080/carburants",{
      headers: {
        'Authorization': `Bearer ${this.state.token}`,
      },
    }) 
      .then((response) => response.json())
      .then((data) => {
        const tot = data.length;
        const resultat =Math.abs(Math.ceil(tot / this.state.pageLimit));
        this.setState({totalItems: tot});
        this.setState({ allCarburant: data, totalItems: tot }, () => { 
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
    
    this.setState({totalItems: this.state.allCarburant.length}); ///////
 
    const currentCarburant = this.state.allCarburant.slice( ///////
      offset,
      offset + pageLimit
    );
    
    this.setState({ currentPage, currentCarburant, totalPages }); ///////
  };

    handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });//
    }
    async handleSubmit(event){
        event.preventDefault();
        const formData = new FormData(event.target);
        const nomCarb = formData.get("nomCarburant");//
        
        if(this.state.isModif == 0){
          let url ='http://localhost:8080/carburant?nom='+nomCarb;//


          await fetch(url , {
              method:'POST',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${this.state.token}`,
                  
              },
              body: JSON.stringify({ nomCarb }) //
          }).then(()=>{
              const newItem = {nomCarb};
              this.setState({ allCarburant: [...this.state.allCarburant, newItem] });//
              window.location.reload();
          });
        }else if(this.state.isModif == 1){
          let url ='http://localhost:8080/carburant/'+this.state.idCarburant+'?nom='+this.state.nomCarburant;//
          await fetch(url , {
              method:'PUT',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${this.state.token}`,
              },
              body: JSON.stringify({ nomCarb }) //
          }).then(()=>{
              const newItem = {nomCarb};
              this.setState({ allCarburant: [...this.state.allCarburant, newItem] });
              this.setState({ isModif:0,champButton:"Inserer",nomCarburant:'',idCarburant:'' });
              window.location.reload();
          });
        }
       
    }
    async remove(id){
        console.log("miditra");
        let url = 'http://localhost:8080/carburant/'+id; //
        await fetch(url,{
            method:'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.state.token}`,
            }
        }).then(()=>{
            let updated = [...this.state.allCarburant].filter(i => i.id !== id);//
            this.setState({allCarburant: updated}); //
            window.location.reload();
        });
    }
    handleIncrementClick = (item) => {
      this.setState({ isModif:1,champButton:"Modifier",nomCarburant:item.nomCarburant,idCarburant:item.idCarburant });
    }

  render() {
    return (
      <>
        <div className="insertion">
          <form className="crud-form" onSubmit={this.handleSubmit}>
            <label>Carburant</label>
            <input name="nomCarburant" value={this.state.nomCarburant} onChange={this.handleChange}/>
            <button type="submit">{this.state.champButton}</button>
          </form>
        </div>
        <div className="liste">
          <table className="table">
              <tr>
                <th>Id</th>
                <th>Carburant</th>
                <th>Actions</th>
              </tr>
              {this.state.currentCarburant.map((carburant) => ( ///////
                <tr key={carburant.idCarburant}>
                  <td>{carburant.idCarburant}</td>
                  <td>{carburant.nomCarburant}</td>
                  <td className="actions">
                    <button className="btn btn-danger" onClick={()=>this.remove(carburant.idCarburant)}>Supprimer</button>
                    <button className="btn btn-warning" onClick={() => this.handleIncrementClick(carburant)}>Modifier</button>
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

export default Carburant;
