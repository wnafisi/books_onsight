import React, { Component } from 'react';

class Login extends Component {
    constructor(props){
        super(props)
        this.state={
            email: '',
            password: ''
        }
        this.handleChange=this.handleChange.bind(this);
        this.login=this.login.bind(this);
        //drop-down to login/ register
        // window.onclick = function(event) {
        // if ( !event.target.matches('.dropbtn')) {
        //     let dropdowns = document.getElementsByClassName("dropdown-content");
        //     let i;
        //     for (i = 0; i < dropdowns.length; i++) {
        //         let openDropdown = dropdowns[i];
        //         if (openDropdown.classList.contains('show')) {
        //         openDropdown.classList.remove('show');
        //         }
        //     }
        // }
        // } 
    }

    handleChange(e) {
        this.setState({
          [e.target.name]: e.target.value
        })
      }

    

    //login stuff
    login() {
        const BASE_URL = process.env.REACT_APP_API_URL;
        const url = `${BASE_URL}/user_token`;
        const body = {"auth": {"email": this.state.email, "password": this.state.password} }
        const init = { method: 'POST',
                    headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
                    mode: 'cors',
                    body:JSON.stringify(body),
                    }
        fetch(url, init)
        .then(res => res.json())
        .then(res => localStorage.setItem("jwt", res.jwt))
        .then(() => this.props.switchIsloggedIn())
        .then(() => this.props.setUserEmail(this.state.email))
        .catch(err => console.log(err))
    }

    showLogin() {
        if (this.props.isLoggedIn === false) {
            return(
                <div className="loginStart">
                    <form>
                    <label htmlFor="email"><h3>Email:</h3></label>
                    <input
                    name="email"
                    onChange={this.handleChange}
                    value={this.state.email.value}
                    type="email"
                    />
                    <br />
                    <label htmlFor="password"><h3>Password:</h3></label>
                    <input
                    name="password"
                    onChange={this.handleChange}
                    value={this.state.password.value}
                    type="password"
                    />
                    </form>
                    <br />
                    <button 
                    onClick={this.login}
                    className="loginButton"
                    >Login</button>
                </div>

            )
        } else {
            return(
                <div>
                    Logged in as {this.props.email}
                </div>
            )
        }
    }

    //leading to register page or not
    showRegisterButton(){
        if (this.props.isLoggedIn === false) {
            return(
                <div 
                    className="showRegisterFormButton"
                    onClick={()=>this.props.switchCurrentViewToRegister()}
                >
                    Sign up!
                </div>

            )
        }
    }

    render() {
        return(
            <div>
                {this.showLogin()}
                {this.showRegisterButton()}
            </div>
        )
    }

}

export default Login;