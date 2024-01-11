import React from "react";
class NavBar extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="navbar">
                <div className="navbar__logo">
                    <img src="https://www.docplanner.com/img/logo-default-group-en.svg?v=1" alt="Docplanner Group"/>
                </div>    
                <div className="navbar__menu">
                    <ul>
                        <li><a href="#">Statistique</a></li>
                        <li><a href="#">CRUD</a></li>
                        <li><a href="#">Departments</a></li>
                    </ul>
                </div>
            </div>
        );  
    }
}
export default NavBar;