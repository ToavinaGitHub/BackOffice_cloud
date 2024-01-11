import React from "react";
class Marque extends React.Component{
    constructor(props){
        super(props);
    }

    render (){
        return (
            <>
                <div className="insertion">
                    <form className="crud-form">
                        <label>Nom Marque</label>
                        <input name="nom"/>
                        <button type="submit">Inserer</button>
                    </form>
                </div>
                <div className="liste">
                    <table className="table">
                        <tr>
                            <th>Id</th>
                            <th>Nom Marque</th>
                            <th>Actions</th>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>Hyundai</td>
                            <td className="actions">
                                <button className="btn btn-danger">Supprimer</button>
                                <button className="btn btn-warning">Modifier</button>
                            </td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>BMW</td>
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
export default Marque;