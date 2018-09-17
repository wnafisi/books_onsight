import React, { Component } from 'react';
import { registerUser } from './services/userApi';


class Register extends Component{
    constructor(props) {
        super(props)
        this.state={
            email: '',
            password: ''
        }
        this.handleChange=this.handleChange.bind(this);
        this.register=this.register.bind(this);
    }
    handleChange(e) {
        this.setState({
          [e.target.name]: e.target.value
        })
      }

    //register function
    register() {
        registerUser(this.state.email, this.state.password)
        .then(res => res.json())
        .catch(err => err.message)
        .then(() => this.props.callUsers())
        .then(res => {
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
        })
    }
    //register hide once registered and logged in 
    hideRegisterOnceLoggedIn(){
        if(this.props.isLoggedIn === false){
            return (
                <div className="registerForm">
                    <form>
                        <label htmlFor="email">Email: </label>
                        <br />
                        <input
                        name="email"
                        onChange={this.handleChange}
                        value={this.state.email.value}
                        type="email"
                        />
                        <br /><br />
                        <label htmlFor="password">Password:</label>
                        <br />
                        <input
                        name="password"
                        onChange={this.handleChange}
                        value={this.state.password.value}
                        type="password"
                        />
                        </form>
                        <br />
                    <div 
                        onClick={()=>this.register()}
                        className="registerButton"
                    >register
                    </div>
                </div>
            )
        } else {
            return(
                <div>
                    Successful registration, {this.props.email}
                </div>
            )
        }
    }

    render() {
        return(
            <div>
                <p>register page</p>
                <br></br>
                {this.hideRegisterOnceLoggedIn()}
            </div>
        )
    }
}


export default Register;