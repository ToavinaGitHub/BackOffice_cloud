import React from "react";
import "../assets/Accounts/LoginForm.css";
import sary from "../assets/Accounts/images/log.jpg";
import config from "../../config.js";

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          email: "client@gmail.com",
          password: "toavina",
          baseUrl:config.baseUrl,
        }

        this.handleSubmit = this.handleSubmit.bind(this);
      }
      
      

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    async handleSubmit(event){
        event.preventDefault();
        const formData = new FormData(event.target);
        const email = formData.get("email");//
        const password = formData.get("password");//
        

        let url = this.state.baseUrl+'/api/v1/auth/authenticate';//

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });
            const data = await response.json();
            
            if (data) {
                localStorage.setItem("token", data.token);
                console.log(data);
                window.location.href = "/CrudCategorie";
                
            }
        } catch (error) {
            var err = document.getElementById("error");
            err.innerHTML = "Email ou mot de passe incorrect";
        }
    }
  render() {
    console.log(this.state.baseUrl);
    return (
      <>
        <div className="login-container">
          <div className="login-content">
            <img src={sary} alt="Login" className="login-image" />
            <div className="login-form">
              <h2>Login</h2>
              <form onSubmit={this.handleSubmit}>
                <label>Email</label>
                <input
                  type="text"
                  placeholder="Username"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleInputChange}
                  required
                />
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleInputChange}
                  required
                />
                <button type="submit">Login</button>
              </form>
              <p id="error">...</p>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default LoginForm;
