import React, { Component } from "react";
import Paging from "../Paging";
import config from "../../config.js";
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
      nomTransmission:'',
      idTransmission:'',
      token: sessionStorage.getItem("token"),
      isModif:0,
      champButton:"Inserer",
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
      const { allTrans, searchTerm } = this.state;
    
      const filteredTrans = allTrans.filter((trans) =>
        trans.nomTransmission.toLowerCase().includes(searchTerm.toLowerCase())
      );
  
      // Update the state with filtered carburants
      this.setState({
        currentTrans: filteredTrans,
        totalPages: Math.abs(Math.ceil(filteredTrans.length / this.state.pageLimit)),
        currentPage: 1,
        totalItems: filteredTrans.length,
      });
    };
  
  componentDidMount() {
    this.fetchTransmissionData();
  }

  fetchTransmissionData = () => {
    fetch(this.state.baseUrl+"/transmissions",{
      headers: {
          'Authorization': `Bearer ${this.state.token}`,
        }
      })
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

  
  
 
    async handleSubmit(event){
        event.preventDefault();
        const formData = new FormData(event.target);
        const nomTransmission = formData.get("nomTransmission");//
        


        if(this.state.isModif === 0){
          let url =this.state.baseUrl+'/transmission?nom='+nomTransmission;//

          await fetch(url , {
              method:'POST',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${this.state.token}`
              },
              body: JSON.stringify({ nomTransmission }) //
          }).then(()=>{
              const newItem = {nomTransmission};//
              this.setState({ allMoteur: [...this.state.allTrans, newItem] });//
              window.location.reload();
          });
        }else if(this.state.isModif === 1){
           let url =this.state.baseUrl+'/transmission/'+this.state.idTransmission+'?nom='+this.state.nomTransmission;//
            await fetch(url , {
                method:'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.state.token}`,
                },
                body: JSON.stringify({ nomTransmission }) //
            }).then(()=>{
                const newItem = {nomTransmission};
                this.setState({ allTrans: [...this.state.allTrans, newItem] });
                this.setState({ isModif:0,champButton:"Inserer",nomTransmission:'',idTransmission:'' });
                window.location.reload();
            });
        }
    }
    async remove(id){
        console.log("miditra");
        let url = this.state.baseUrl+'/transmission/'+id; //
        await fetch(url,{
            method:'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.state.token}`
            }
        }).then(()=>{
            let updated = [...this.state.allTrans].filter(i => i.id !== id);//
            this.setState({allTrans: updated}); //
            window.location.reload();
        });
    }

    handleIncrementClick = (item) => {
      this.setState({ isModif:1,champButton:"Modifier",nomTransmission:item.nomTransmission,idTransmission:item.idTransmission });
    }
  render() {
    return (
      <>
        <div className="insertion">
          <form className="crud-form" onSubmit={this.handleSubmit}>
            <label>Transmission</label>
            <input name="nomTransmission" value={this.state.nomTransmission} onChange={this.handleChange}/>
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
              placeholder="Recherche de transmission..."
            />
           
          </div>
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
                    <button className="btn btn-danger" onClick={()=>this.remove(trans.idTransmission)}>Supprimer</button>
                    <button className="btn btn-warning" onClick={() => this.handleIncrementClick(trans)}>Modifier</button>
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
