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
      nomCategorie:'',
      idCategorie:'',//////////////////////////////////////
      token: localStorage.getItem("token"),///////////////////
      isModif:0,//////////////////////////////////
      champButton:"Inserer"////////////////////////////////
    };
    this.handleSubmit = this.handleSubmit.bind(this);//

  }
  
  componentDidMount() {
    this.fetchCategorieData(); ///////
  }

  fetchCategorieData = () => { ///////

    console.log(this.state.token);
    fetch("http://localhost:8080/categories" , {
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
    this.setState({ [e.target.name]: e.target.value });//
    }
  async handleSubmit(event){
        event.preventDefault();
        const formData = new FormData(event.target);
        const nomCateg = formData.get("nomCategorie");//
        
        console.log(this.state.isModif+"----------");

        if(this.state.isModif === 0){
          let url ='http://localhost:8080/categorie?nom='+nomCateg;//

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
            let url ='http://localhost:8080/categorie/'+this.state.idCategorie+'?nom='+this.state.nomCategorie;//
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
        let url = 'http://localhost:8080/categorie/'+id; //
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
            <label>Ctegorie</label>
            <input name="nomCategorie" value={this.state.nomCategorie} onChange={this.handleChange}/>
            <button type="submit">{this.state.champButton}</button>
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
