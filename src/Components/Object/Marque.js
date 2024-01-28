import React, { Component } from "react";
import Paging from "../Paging";
import config from "../../config.js";
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
      nomMarque:'',
      idMarque:'',
      token: localStorage.getItem("token"),///////////////////
      isModif:0,//////////////////////////////////
      champButton:"Inserer",////////////////////////////////
      baseUrl: config.baseUrl,
      searchTerm:""
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
      const { allMarque, searchTerm } = this.state;
      // Filter carburants based on search term
      const filteredMarque = allMarque.filter((marque) =>
        marque.nomMarque.toLowerCase().includes(searchTerm.toLowerCase())
      );
  
      // Update the state with filtered carburants
      this.setState({
        currentMarque: filteredMarque,
        totalPages: Math.abs(Math.ceil(filteredMarque.length / this.state.pageLimit)),
        currentPage: 1,
        totalItems: filteredMarque.length,
      });
    };

  componentDidMount() {
    this.fetchMarqueData(); ///////
  }

  fetchMarqueData = () => { ///////
    fetch(this.state.baseUrl+"/marques",{
       headers: {
      'Authorization': `Bearer ${this.state.token}`,
      }
  }) ///////
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

    async handleSubmit(event){
        event.preventDefault();
        const formData = new FormData(event.target);
        const nomMarque = formData.get("nomMarque");//
        

        if(this.state.isModif === 0){
          let url =this.state.baseUrl+'/marque?nom='+nomMarque;//

          await fetch(url , {
              method:'POST',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${this.state.token}`
              },
              body: JSON.stringify({ nomMarque }) //
          }).then(()=>{
              const newItem = {nomMarque};//
              this.setState({ allMarque: [...this.state.allMarque, newItem] });//
              window.location.reload();
          });
        }else if(this.state.isModif === 1){
          let url =this.state.baseUrl+'/marque/'+this.state.idMarque+'?nom='+this.state.nomMarque;//
            await fetch(url , {
                method:'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.state.token}`,
                },
                body: JSON.stringify({ nomMarque }) //
            }).then(()=>{
                const newItem = {nomMarque};
                this.setState({ allMarque: [...this.state.allMarque, newItem] });
                this.setState({ isModif:0,champButton:"Inserer",nomMarque:'',idMarque:'' });
                window.location.reload();
            });
        }

    }
    async remove(id){
        console.log("miditra");
        let url = this.state.baseUrl+'/marque/'+id; //
        await fetch(url,{
            method:'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.state.token}`,
            }
        }).then(()=>{
            let updated = [...this.state.allMarque].filter(i => i.id !== id);//
            this.setState({allMarque: updated}); //
            window.location.reload();
        });
    }

    
    handleIncrementClick = (item) => {
      this.setState({ isModif:1,champButton:"Modifier",nomMarque:item.nomMarque,idMarque:item.idMarque });
    }


  render() {
    return (
      <>
        <div className="insertion">
          <form className="crud-form" onSubmit={this.handleSubmit}>
            <label>Marque</label>
            <input name="nomMarque" value={this.state.nomMarque} onChange={this.handleChange}/>
            <button type="submit">{this.state.champButton}</button>
          </form>
        </div>
        <div className="liste">
          <input
              type="text"
              value={this.state.searchTerm}
              onChange={this.handleChange}
              name="searchTerm"
              placeholder="Recherche de marque..."
            />
           
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
                    <button className="btn btn-warning" onClick={() => this.handleIncrementClick(marque)}>Modifier</button>
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
