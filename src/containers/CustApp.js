import React, { Component } from 'react'
import {HashRouter, Route, Switch,Redirect} from 'react-router-dom';
import Register from '../views/Pages/Register/Register';
import Page404 from '../views/Pages/Page404/Page404';
import Page500 from '../views/Pages/Page500/Page500';
import Full from './Full/Full';
import Login from '../views/Pages/Login/Login';
import PrivateRoute from '../util/PrivateRoute';

export default class CustApp extends Component {
    constructor(props){
        super(props);
    this.state = {
        loggedIn:false
      }
      this.handler = this.handler.bind(this)
    }

    handler() {
      this.setState({
        loggedIn: true
      })

     console.log("path setted");
    }
  
      

  render() {
    return (
       < HashRouter>
        <Switch>
        
          {// <Route exact path="/" name="Login Page"  component={Login} logIn={this.state.loggedIn} handler = {this.handler}/>
          } 
          <Route exact path="/" name="Login Page"  render={() => (this.state.loggedIn ? (<Full/>) :(<Login  logIn={this.state.loggedIn}  handler = {this.handler}/>) ) }/>
          
          <Route exact path="/register" name="Register Page" component={Register}/>
          <Route exact path="/404" name="Page 404" component={Page404}/>
          <Route exact path="/500" name="Page 500" component={Page500}/>
        {//  <Route path="/" name="Home" component={Full}/> 
        }
      
        
      <PrivateRoute authenticated={true} path="/" component={Full} ></PrivateRoute>        
        
          
        </Switch>
      </HashRouter>
    

    )
  }
}


