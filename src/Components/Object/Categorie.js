import React, { Component } from "react";
import Paging from "../Paging";
import config from "../../config.js";
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
      nomCategorie:'',
      idCategorie:'',//////////////////////////////////////
      token: localStorage.getItem("token"),///////////////////
      isModif:0,//////////////////////////////////
      champButton:"Inserer",////////////////////////////////
      baseUrl: config.baseUrl,
      searchTerm: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);//

  }
  

  

  componentDidMount() {
    this.fetchCategorieData(); ///////
  }

  fetchCategorieData = () => { ///////

    console.log(this.state.token);
    fetch(this.state.baseUrl+"/categories" , {
      headers: {
        'Authorization': `Bearer ${this.state.token}`,
      },
    }) ///////
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
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value }, () => {
      this.handleSearch(); // Trigger search as the user types
    });
  };
  handleSearch = () => {
      const { allCategorie, searchTerm } = this.state;
      // Filter carburants based on search term
      const filteredCategorie = allCategorie.filter((categorie) =>
        categorie.nomCategorie.toLowerCase().includes(searchTerm.toLowerCase())
      );
  
      // Update the state with filtered carburants
      this.setState({
        currentCategorie: filteredCategorie,
        totalPages: Math.abs(Math.ceil(filteredCategorie.length / this.state.pageLimit)),
        currentPage: 1,
        totalItems: filteredCategorie.length,
      });
    };
  async handleSubmit(event){
        event.preventDefault();
        const formData = new FormData(event.target);
        const nomCateg = formData.get("nomCategorie");//
        
        console.log(this.state.isModif+"----------");

        if(this.state.isModif === 0){
          let url =this.state.baseUrl+'/categorie?nom='+nomCateg;//

          await fetch(url , {
              method:'POST',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${this.state.token}`,
              },
              body: JSON.stringify({ nomCateg }) //
          }).then(()=>{
              const newItem = {nomCateg};//
              this.setState({ allCategorie: [...this.state.allCategorie, newItem] });//
              window.location.reload();
          });
        }else if(this.state.isModif === 1){
            let url =this.state.baseUrl+'/categorie/'+this.state.idCategorie+'?nom='+this.state.nomCategorie;//
            await fetch(url , {
                method:'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.state.token}`,
                },
                body: JSON.stringify({ nomCateg }) //
            }).then(()=>{
                const newItem = {nomCateg};
                this.setState({ allCategorie: [...this.state.allCategorie, newItem] });
                this.setState({ isModif:0,champButton:"Inserer",nomCategorie:'',idCategorie:'' });
                window.location.reload();
            });
        }

       
    }
    async remove(id){
        console.log("miditra");
        let url = this.state.baseUrl+'/categorie/'+id; //
        await fetch(url,{
            method:'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.state.token}`,
            }
        }).then(()=>{
            let updated = [...this.state.allCategorie].filter(i => i.id !== id);//
            this.setState({allCategorie: updated}); //
            window.location.reload();
        });
    }

    handleIncrementClick = (item) => {
      this.setState({ isModif:1,champButton:"Modifier",nomCategorie:item.nomCategorie,idCategorie:item.idCategorie });
    }



  render() {
    return (
      <>
        <div className="insertion">
          <form className="crud-form" onSubmit={this.handleSubmit}>
            <label>Categorie</label>
            <input name="nomCategorie" value={this.state.nomCategorie} onChange={this.handleChange}/>
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
              placeholder="Recherche de categorie..."
            />
           
          </div>
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
                    <button className="btn btn-danger" onClick={()=>this.remove(categorie.idCategorie)}>Supprimer</button>
                    <button className="btn btn-warning" onClick={() => this.handleIncrementClick(categorie)}>Modifier</button>
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
