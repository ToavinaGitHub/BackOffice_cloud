import React from "react";

import "../assets/Object/CrudObject.css";

class CrudObject extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            title: this.props.title,
            
        };
    }

    render(){
        return (
            <>
                <div className="crud-container">
                    <div className="crud-title">
                        <strong>CRUD/Object/{this.state.title}</strong>
                    </div>
                    <div>
                        {this.props.obj}
                    </div>
                </div>
            </>
        );
    }
}
export default CrudObject;