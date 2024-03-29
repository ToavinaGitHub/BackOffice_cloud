import React, { Component } from "react";
import Paging from "../Paging";

class MoteurModele extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMoteurModele: [], ///////
      currentPage: null,
      totalPages: null,
      totalItems: null,
      view: "list",
      allMoteurModele: [], ///////
      pageLimit:3,
      allModele:[],
      allMoteur:[],
      moteur:'',
      modele:'',
      currentModele:'',
      MoteurCurrentModele:[],
      token: localStorage.getItem("token")
    };
    this.handleSubmit = this.handleSubmit.bind(this);//
  }
  
  componentDidMount() {
   // this.fetchMoteurModeleData(); ///////
    this.fetchMoteurData();
    this.fetchModeleData();
  }


  fetchMoteurModeleData = () => { ///////
    fetch("http://localhost:8080/moteursModele",{
      headers: {
        'Authorization': `Bearer ${this.state.token}`,
      },
    }) ///////
      .then((response) => response.json())
      .then((data) => {
        const tot = data.length;
        const resultat =Math.abs(Math.ceil(tot / this.state.pageLimit));
        this.setState({totalItems: tot});
        this.setState({ allMoteurModele: data, totalItems: tot }, () => { ///////
          this.onPageChanged({ currentPage: 1, pageLimit: this.state.pageLimit, totalPages: resultat , totalRecords:tot});
        });
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  };
  fetchModeleData = () => { ///////
    fetch("http://localhost:8080/modeles",{
      headers: {
        'Authorization': `Bearer ${this.state.token}`,
      },
    }) ///////
      .then((response) => response.json())
      .then((data) => {
            this.setState({allModele:data})
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  };
  fetchMoteurData = () => { ///////
    fetch("http://localhost:8080/moteurs",{
      headers: {
        'Authorization': `Bearer ${this.state.token}`,
      },
    }) ///////
      .then((response) => response.json())
      .then((data) => {
            this.setState({allMoteur:data})
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  };

  fetchMoteurDataByIdModele = (idModele) => { ///////
    fetch("http://localhost:8080/moteurModeles?idModele="+idModele,{
      headers: {
        'Authorization': `Bearer ${this.state.token}`,
      },
    }) ///////
      .then((response) => response.json())
      .then((data) => {
            console.log(data)
            this.setState({MoteurCurrentModele:data})
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  };

  
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value }, () => {
        console.log(this.state.currentModele + "---------------------------------");
        this.fetchMoteurDataByIdModele(this.state.currentModele);
    });
}
    async handleSubmit(event){
        event.preventDefault();
        const formData = new FormData(event.target);
        const mot = formData.get("moteur");//
        const mod = formData.get("modele");
        

        let url ='http://localhost:8080/moteurModele?idMoteur='+mot+'&idModele='+mod

        await fetch(url , {
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',               
                'Authorization': `Bearer ${this.state.token}`, 
            },
            body: JSON.stringify({ mot,mod }) //
        }).then(()=>{
            const newItem = {mot,mod};//
            this.setState({ allMoteurModele: [...this.state.allMoteurModele, newItem] });//
            window.location.reload();
        });
    }
  

  render() {
    return (
      <>
        <div className="insertion">
          <form className="crud-form" onSubmit={this.handleSubmit}>
          <label>Moteur</label>
            <select name="moteur" onChange={this.handleChange}>
                {this.state.allMoteur.map((moteur)=> (
                    <option value={moteur.idMoteur}>{moteur.nomMoteur}</option>
                ))}
            </select>
            <label>Modele</label>
            <select name="modele" onChange={this.handleChange}>
                {this.state.allModele.map((modele)=> (
                    <option value={modele.idModele}>{modele.nomModele}</option>
                ))}
            </select>
            <button type="submit">Inserer</button>
          </form>
        </div>

        
        <div className="liste">
            <h2>Liste Moteur par modele</h2>
            <label>Modele</label>
                <select name="currentModele" onChange={this.handleChange}>
                    {this.state.allModele.map((modele)=> (
                        <option value={modele.idModele}>{modele.nomModele}</option>
                    ))}
            </select>        
          <table className="table">
              <tr>
                <th>Id</th>
                <th>Année</th>
                {/* <th>Actions</th> */}
              </tr>
              {this.state.MoteurCurrentModele.map((moteur) => ( ///////
                <tr key={moteur.idMoteurModele}>
                  <td>{moteur.idMoteurModele}</td>
                  <td>{moteur.moteur.nomMoteur}</td>
                  <td className="actions">
                    {/* <button className="btn btn-danger" onClick={()=>this.remove(carburant.idCarburant)}>Supprimer</button> */}
                    {/* <button className="btn btn-warning">Modifier</button> */}
                  </td>
                </tr>
              ))}
          </table>
        </div>
      </>
    );
  }
}

export default MoteurModele;
