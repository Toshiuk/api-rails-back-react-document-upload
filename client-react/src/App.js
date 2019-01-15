import React, { Component } from 'react';
import './App.css';

import {BrowserRouter as Router, Link, Redirect, Route} from  'react-router-dom';
import Auth from './modules/Auth';
import DocumentList from './components/DocumentList';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Paper from '@material-ui/core/Paper';

class App extends Component {
  constructor(){
    super();
    this.state = {
      auth: Auth.isUserAuthenticated(),
    }
    this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleRegisterSubmit(e, data){
    e.preventDefault();
    fetch('https://dry-harbor-76275.herokuapp.com/users',{
      method: 'POST',
      body: JSON.stringify({
        user: data,
      }),
      headers: {
        'Content-Type' : 'application/json',
      }
    }).then(res => res.json())
    .then(res => {
      Auth.authenticateToken(res.token);
      this.setState({
        auth: Auth.isUserAuthenticated(),
      })
    }).catch(err =>{
      console.log(err);
    })
  }


  handleLoginSubmit(e, data){
    e.preventDefault();
    fetch('https://dry-harbor-76275.herokuapp.com/login',{
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type' : 'application/json',
      }
    }).then(res => res.json())
    .then(res => {
      Auth.authenticateToken(res.token);
      this.setState({
        auth: Auth.isUserAuthenticated(),
      })
    }).catch(err =>{
      console.log(err);
    })
  }

  handleLogout(){
    fetch('https://dry-harbor-76275.herokuapp.com/logout',{
      method: 'DELETE',
      headers: {
          token: Auth.getToken(),
          'Authorization': `Token ${Auth.getToken()}`,
      }
    }).then(res => {
      Auth.deauthenticateToken();
      this.setState({
        auth: Auth.isUserAuthenticated(),
      })
    }).catch(err => console.log(err));
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Paper>
          <MenuList>
          <Link to="/documents"><MenuItem>Documents</MenuItem></Link>
            {this.state.auth ? (
              [<Link to="/dash" key="dash"><MenuItem>Dashboard</MenuItem></Link>,
              <Link to="/documents" key="logout"><span key="logout" onClick={this.handleLogout}><MenuItem>Logout</MenuItem></span></Link>]
            ) : (
              [<Link  key="login" to="/login"><MenuItem>Login</MenuItem></Link>,
              <Link key="register" to="/register"><MenuItem>Register</MenuItem></Link>]
            )}
            </MenuList>
          </Paper>
          <Route exact path="/documents" render={() => <DocumentList />}/>
          <Route exact path="/register" render={() => (this.state.auth) 
            ? <Redirect to ="/dash" />
            :<RegisterForm handleRegisterSubmit = {this.handleRegisterSubmit} />}/>
          <Route exact path="/login" render={() => (this.state.auth) 
            ? <Redirect to ="/dash" />
            :<LoginForm handleLoginSubmit = {this.handleLoginSubmit} />}/>
          <Route exact path="/dash" render={() => <Dashboard />}/>
        </div>
      </Router>
    );
  }
}

export default App;
