import React  from "react";

import "../assets/Accounts/LoginForm.css";

import sary from "../assets/Accounts/images/log.jpg";
class LoginForm extends React.Component{
    constructor(props){
        super(props);
    }
    render (){
        return (
            <>
            <div className="login-container">
                <div className="login-content">
                    <img src={sary} alt="Login" className="login-image" />
                    <div className="login-form">
                        <h2>Login</h2>
                        <form action="/Accueil" method="get">
                            <label>Email</label>
                            <input type="text" placeholder="Username" value="client@gmail.com" required />
                            <label>Password</label>
                            <input type="password" placeholder="Password"  value="client" required />
                            <button type="submit">Login</button>
                        </form>
                    </div>
                </div>
            </div>
            </>
        );
    }
}
export default LoginForm;