import React from "react";

class Categorie extends React.Component{
    constructor(props){
        super(props);
    }

    render (){
        return (
            <>
                <div className="insertion">
                    <form className="crud-form">
                        <label>Nom Modele</label>
                        <input name="nom"/>
                        <label>Categorie</label>                       
                        <select>
                            <option>Sport</option>
                            <option>SUV</option>
                        </select>
                        <button type="submit">Inserer</button>
                    </form>
                </div>
                <div className="liste">
                    <table className="table">
                        <tr>
                            <th>Id</th>
                            <th>Categorie</th>
                            <th>Actions</th>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>Sport</td>
                            <td className="actions">
                                <button className="btn btn-danger">Supprimer</button>
                                <button className="btn btn-warning">Modifier</button>
                            </td>
                        </tr>
                    </table>
                </div>
            </>
        );
    }
}
export default Categorie;