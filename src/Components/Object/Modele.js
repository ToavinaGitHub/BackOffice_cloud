import React, { Component } from "react";
import Paging from "../Paging";
import config from "../../config.js";
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
      allCategorie : [],
      nomModele:'',
      marque:'',
      categorie:'',
      token: localStorage.getItem("token"),
      baseUrl: config.baseUrl,
    };
    this.handleSubmit = this.handleSubmit.bind(this);//
  }
  
  componentDidMount() {
    this.fetchModeleData(); ///////
    this.fetchMarqueData();
    this.fetchCategorieData();
  }

  fetchModeleData = () => { ///////
    fetch("http://localhost:8080/modeles",{
      headers: {
        'Authorization': `Bearer ${this.state.token}`,
      },
    }) ///////
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
    fetch("http://localhost:8080/marques",{
      headers: {
        'Authorization': `Bearer ${this.state.token}`,
      },
    }) ///////
      .then((response) => response.json())
      .then((data) => {
        this.setState({allMarque: data});
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  };
  fetchCategorieData = () => { ///////
    fetch("http://localhost:8080/categories",{
      headers: {
        'Authorization': `Bearer ${this.state.token}`,
      },
    }) ///////
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

    handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });//
    }
    async handleSubmit(event){
        event.preventDefault();
        const formData = new FormData(event.target);
        const nomM = formData.get("nomModele");//
        const marq = formData.get("marque");//
        const categ = formData.get("categorie");//
        

        let url ='http://localhost:8080/modele?nom='+nomM+'&idCategorie='+categ+'&idMarque='+marq

        await fetch(url , {
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.state.token}`,
                 
            },
            body: JSON.stringify({ nomM,marq,categ}) //
        }).then(()=>{
            const newItem = { nomM,marq,categ};//
            this.setState({ allMarque: [...this.state.allModele, newItem] });//
            window.location.reload();
        });
    }
    async remove(id){
        let url = 'http://localhost:8080/modele/'+id; //
        await fetch(url,{
            method:'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.state.token}`, 
            }
        }).then(()=>{
            let updated = [...this.state.allModele].filter(i => i.id !== id);//
            this.setState({allModele: updated}); //
            window.location.reload();
        });
    }


  render() {
    return (
      <>
        <div className="insertion">
          <form className="crud-form" onSubmit={this.handleSubmit}>
            <label>Modele</label>
            <input name="nomModele" onChange={this.handleChange} />
            <label>Marque</label>
            <select name="marque"  onChange={this.handleChange} >
                {this.state.allMarque.map((marque)=> (
                    <option value={marque.idMarque}>{marque.nomMarque}</option>
                ))}
            </select>
            <label>Categorie</label>
            <select name="categorie"  onChange={this.handleChange} >
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
                    <button className="btn btn-danger" onClick={()=>this.remove(modele.idModele)}>Supprimer</button>
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
