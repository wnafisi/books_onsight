import React, { Component } from 'react';
import './App.css';
//component imports
import AddBook from './underAddBook/AddBook';
import SplashPage from './underSplashPage/SplashPage';
import Register from './underSplashPage/Register';
import OurLibrary from './underLibrary/OurLibrary';
import Users from './underUsers/Users';
import MyLibrary from './underMyLibrary/MyLibrary';
import Login from './underSplashPage/Login';
//api-fetch imports
import { fetchUsers } from './services/userApi'; 

class App extends Component {
  constructor(props) {
    super(props)
    this.state={
      currentView: 'Books onSight',
      isLoggedIn: false,
      email: '',
      users: ''
    }
    this.handleLinkClick=this.handleLinkClick.bind(this);
    this.switchIsloggedIn=this.switchIsloggedIn.bind(this);
    this.setUserEmail=this.setUserEmail.bind(this);
    this.callUsers=this.callUsers.bind(this);
    this.switchCurrentViewToRegister=this.switchCurrentViewToRegister.bind(this);
    this.switchCurrentViewToLibrary=this.switchCurrentViewToLibrary.bind(this);
    this.switchCurrentViewToMyLibrary=this.switchCurrentViewToMyLibrary.bind(this);
    this.userIdToName=this.userIdToName.bind(this);
    this.nameToUserId=this.nameToUserId.bind(this);
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
      this.setState({ isLoggedIn: false, email: '', currentView: 'Books onSight' })
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
  switchCurrentViewToLibrary() {
    this.setState({ currentView: 'Collective Library'})
  }
  switchCurrentViewToMyLibrary() {
    this.setState({ currentView: 'My library'})
  }
  //helper functions for key-object pair identification
  userIdToName(userId){
    const usersArr = this.state.users;
    const correctUser = usersArr.filter(user => (user.id === userId))
    return(correctUser[0].email)
  }
  nameToUserId(){
    if (this.state.email !== '') {
      const usersArr = this.state.users;
      const correctUser = usersArr.filter(user => (user.email === this.state.email))
      console.log(correctUser)
      return(correctUser[0].id)
    }
  }
  //this function is the navigation bar, will allow different components to render on same page
  determineWhichToRender() {
    const { currentView } = this.state;
    switch (currentView) {
      case 'Add a book':
        return <AddBook 
                userIdToName={this.userIdToName}
                nameToUserId={this.nameToUserId}
                switchCurrentViewToLibrary={this.switchCurrentViewToLibrary}
                />;
      case 'Collective Library':
        return <OurLibrary 
                  userIdToName={this.userIdToName}
                  nameToUserId={this.nameToUserId}
                />;
      case 'Users':
        return <Users
                  userIdToName={this.userIdToName}
                  users={this.state.users}
                />;
      case 'Register':
        return <Register 
                  email={this.state.email}
                  callUsers={this.callUsers}
                  switchIsloggedIn={this.switchIsloggedIn}
                  setUserEmail={this.setUserEmail}
                  isLoggedIn={this.state.isLoggedIn}
                  switchCurrentViewToLibrary={this.switchCurrentViewToLibrary}
                  switchCurrentViewToMyLibrary={this.switchCurrentViewToMyLibrary}
                />;
      case 'Books onSight':
        return <SplashPage 
                  switchCurrentViewToRegister={this.switchCurrentViewToRegister}
                  switchCurrentViewToLibrary={this.switchCurrentViewToLibrary}
                />;
      case 'My library':
        return <MyLibrary 
                  nameToUserId={this.nameToUserId}
                  userIdToName={this.userIdToName}
                  switchCurrentViewToLibrary={this.switchCurrentViewToLibrary}
                />;
      default:
    }
  }
  handleLinkClick(links) {
    this.setState({
      currentView: links,
    })
  }
  showMyLibrary(){
    if (this.state.isLoggedIn === false) {
      return [
        'Collective Library',
        'Add a book',
        'Users',
        'Books onSight'
      ];
    } else {
      return [
        'Collective Library',
        'My library',
        'Users',
        'Books onSight'
      ];
    }
  }
  render() {
    const links = this.showMyLibrary()
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
            <div className="container-displayEverythingElse">
              {this.determineWhichToRender()}
            </div>
            <div className="container-displayLogin">
              <Login 
                email={this.state.email}
                setUserEmail={this.setUserEmail}
                isLoggedIn={this.state.isLoggedIn}
                switchIsloggedIn={this.switchIsloggedIn}
              />
            </div>
          </div>
      </div>
    );
  }
}
export default App;
