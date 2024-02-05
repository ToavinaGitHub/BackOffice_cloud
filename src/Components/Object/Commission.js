import React, { Component } from "react";
import Paging from "../Paging";
import config from "../../config.js";

class Commission extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCommission: [], ///////
      currentPage: null,
      totalPages: null,
      totalItems: null,
      view: "list",
      allCommission: [], ///////
      pageLimit:3,
      valeurCommission:'',
      idCommission:'',//////////////////////////////////////
      token: sessionStorage.getItem("token"),///////////////////
      isModif:0,//////////////////////////////////
      champButton:"Inserer",////////////////////////////////
      baseUrl: config.baseUrl,
     
    };
    this.handleSubmit = this.handleSubmit.bind(this);//

  }
  
  componentDidMount() {
    this.fetchCommissionData(); ///////
  }

  fetchCommissionData = () => { ///////

    console.log(this.state.token);
    fetch(this.state.baseUrl+"/commissions" , {
      headers: {
        'Authorization': `Bearer ${this.state.token}`,
      },
    }) ///////
      .then((response) => response.json())
      .then((data) => {
        const tot = data.length;
        const resultat =Math.abs(Math.ceil(tot / this.state.pageLimit));
        this.setState({totalItems: tot});
        this.setState({ allCommission: data, totalItems: tot }, () => { ///////
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
    
    this.setState({totalItems: this.state.allCommission.length}); ///////
 
    const currentCommission = this.state.allCommission.slice( ///////
      offset,
      offset + pageLimit
    );
    
    this.setState({ currentPage, currentCommission, totalPages }); ///////
  };
  
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });//
    }
  async handleSubmit(event){
        event.preventDefault();
        const formData = new FormData(event.target);
        const valeur = formData.get("valeurCommission");
        
        let url =this.state.baseUrl+'/commission?valeur='+valeur;//

        await fetch(url , {
            method:'POST',
            headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${this.state.token}`,
              },
              body: JSON.stringify({ valeur }) //
          }).then(()=>{
              const newItem = {valeur};//
              this.setState({ allCommission: [...this.state.allCommission, newItem] });//
              window.location.reload();
          });
        }
  render() {
    return (
      <>
        <div className="insertion">
          <form className="crud-form" onSubmit={this.handleSubmit}>
            <label>Valeur</label>
            <input name="valeurCommission"  onChange={this.handleChange}/>
            <button type="submit">Ajouter</button>
          </form>
        </div>
        <div className="liste">
          <table className="table">
              <tr>
                <th>Id</th>
                <th>Date</th>
                <th>Valeur</th>
              </tr>
              {this.state.currentCommission.map((commission) => ( ///////
                <tr key={commission.idCommission}>
                  <td>{commission.idCommission}</td>
                  <td>{commission.dateCommission}</td>
                  <td>{commission.valeur}%</td>
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

export default Commission;
