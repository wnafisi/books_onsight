import React, { Component } from 'react';
import './App.css';
//component imports
import AddBook from './AddBook';
import MyProfile from './MyProfile';
import OurLibrary from './OurLibrary';
import Register from './Register';
import Users from './Users';
import BooksonSight from './BooksonSight';

//api-fetch imports
import { fetchUsers } from './services/userApi'; 


class App extends Component {
  constructor(props) {
    super(props)
    this.state={
      currentView: 'Register',
      isLoggedIn: false,
      email: '',
      users: ''
    }
    this.handleLinkClick=this.handleLinkClick.bind(this);
    this.switchIsloggedIn=this.switchIsloggedIn.bind(this);
    this.setUserEmail=this.setUserEmail.bind(this);
    this.callUsers=this.callUsers.bind(this);
    this.switchCurrentViewToRegister=this.switchCurrentViewToRegister.bind(this);
    this.userIdToName=this.userIdToName.bind(this);
  }
  componentDidMount(){
    fetchUsers()
      .then(data => this.setState({ users: data.message }))
  }

  //handling login
  switchIsloggedIn(){
    if (this.state.isLoggedIn === false) {
      this.setState({ isLoggedIn: true })
    } else {
      this.setState({ isLoggedIn: false })
    }
  }
  setUserEmail(userEmail) {
    this.setState({ email: userEmail})
  }
  //handling Register
  callUsers() {
    fetchUsers()
    .then(data => this.setState({ users: data.message }))
  }
  switchCurrentViewToRegister() {
    this.setState({ currentView: 'Register'})
  }
  //helper functions for key-object pair identification
  userIdToName(userId){
    const usersArr = this.state.users;
    const correctUser = usersArr.filter(user => (user.id === userId))
    console.log(correctUser)
    return(correctUser[0].email)
  }
  // bookIdToName(bookId){
  //   const usersArr = this.state.users;
  //   const correctUser = usersArr.filter(user => (user.id === userId))
  //   console.log(correctUser)
  //   return(correctUser[0].email)
  // }


  //this function is the navigation bar, will allow different components to render on same page
  determineWhichToRender() {
    const { currentView } = this.state;

    switch (currentView) {
      case 'Add a book':
        return <AddBook 
                
                />;
      case 'Our library':
        return <OurLibrary 
                  userIdToName={this.userIdToName}
                />;
      case 'Users':
        return <Users

                />;
      case 'Register':
        return <Register 
                  email={this.state.email}
                  callUsers={this.callUsers}
                  switchIsloggedIn={this.switchIsloggedIn}
                  setUserEmail={this.setUserEmail}
                  isLoggedIn={this.state.isLoggedIn}
                />;
      case 'My profile':
        return <MyProfile 
                  email={this.state.email}
                  setUserEmail={this.setUserEmail}
                  isLoggedIn={this.state.isLoggedIn}
                  switchIsloggedIn={this.switchIsloggedIn}
                  switchCurrentViewToRegister={this.switchCurrentViewToRegister}
                />;
      case 'Books onSight':
        return <BooksonSight 
                         
                />;
      default:
    }
  }

  handleLinkClick(links) {
    this.setState({ 
      currentView: links,
    })
  }


  render() {
    const links = [
      'Books onSight',
      'Register',
      'Our library',
      'Add a book',
      'Users',
      'My profile'
    ];


    return (
      <div className="container">
        <div className="container-nav">
            {links.map(link => {
              return(
                <div
                className="nav-links"
                  key={link}
                  onClick={()=>this.handleLinkClick(link)}
                >
                  <h2>{link}</h2>
                  <br></br><br></br>
                </div>
              )
            })
            }
          </div>
          <div className="container-display">
              {this.determineWhichToRender()}
           
          </div>
      </div>
    );
  }
}

export default App;
