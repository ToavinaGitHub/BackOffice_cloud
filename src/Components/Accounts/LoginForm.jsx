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
                        <form>
                            <label>Email</label>
                            <input type="text" placeholder="Username" required />
                            <label>Password</label>
                            <input type="password" placeholder="Password" required />
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