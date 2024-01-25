import React, { Component } from "react";
import config from "../../config.js";

class AnneeModele extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentAnneeModele: [], ///////
      currentPage: null,
      totalPages: null,
      totalItems: null,
      view: "list",
      allAnneeModele: [], ///////
      pageLimit:3,
      allModele:[],
      annee:'',
      modele:'',
      currentModele:'',
      anneeCurrentModele:[],
      token: localStorage.getItem("token"),
      baseUrl: config.baseUrl,
    };
    this.handleSubmit = this.handleSubmit.bind(this);//
  }
  
  componentDidMount() {
    this.fetchModeleData();
  }


  fetchModeleData = () => { ///////
    fetch(this.state.baseUrl+"/modeles",{
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

  fetchAnneDataByIdModele = (idModele) => { ///////
    fetch(this.state.baseUrl+"/anneeModeles?idModele="+idModele,{
      headers: {
        'Authorization': `Bearer ${this.state.token}`,
      },
    }) ///////
      .then((response) => response.json())
      .then((data) => {
            console.log(data)
            this.setState({anneeCurrentModele:data})
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  };
  

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value }, () => {
            console.log(this.state.currentModele + "---------------------------------");
            this.fetchAnneDataByIdModele(this.state.currentModele);
        });
    }
    async handleSubmit(event){
        event.preventDefault();
        const formData = new FormData(event.target);
        const annee = formData.get("annee");//
        const modele = formData.get("modele");//
        

        let url =this.state.baseUrl+'/anneeModele?annee='+annee+'&idModele='+modele

        await fetch(url , {
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.state.token}`,
            },
            body: JSON.stringify({ annee,modele }) //
        }).then(()=>{
            const newItem = {annee,modele};
            this.setState({ allAnneeModele: [...this.state.allAnneeModele, newItem] });//
            window.location.reload();
        });
    }

  render() {
    return (
      <>
        <div className="insertion">
          <form className="crud-form" onSubmit={this.handleSubmit}>
            <label>Année</label>
            <select name="annee" onChange={this.handleChange}>
            {Array.from({ length: 124 }, (_, index) => (
                <option key={index} value={index + 1900}>
                {index + 1900}
                </option>
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
            <h2>Liste Année de sortie par modele</h2>
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
              {this.state.anneeCurrentModele.map((annee) => ( ///////
                <tr key={annee.idAnneeModele}>
                  <td>{annee.idAnneeModele}</td>
                  <td>{annee.annee}</td>
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

export default AnneeModele;
