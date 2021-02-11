import './App.css';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import AuthPage from "./pages/Auth";
import Homepage from "./pages/Home" ;

import AuthContext from "./context/auth-context";
import { Component } from 'react';
import SignupPage from './pages/Signup';

class App extends Component {

  state = {
    token:null,
    userId:null,
    username:null,
    tokenExpiration:null
  };

  login = (token, userId,username, tokenExpiration)=>{
    this.setState({token:token,userId:userId,username:username,tokenExpiration:tokenExpiration})
  };

  logout = ()=>{
    this.setState({ token:null, userId:null,username:null,tokenExpiration:null })
  };
render(){
  return (
   <BrowserRouter>
   <Switch>
     <AuthContext.Provider value={{token:this.state.token,
     userId:this.state.userId,username:this.state.username,
      login:this.login, logout:this.logout}}>
    <Redirect from="/" to="/auth" exact />
    <Route path="/auth" component={ AuthPage } />
    <Route path="/home" component={ Homepage }/>
    <Route path="/signup" component={ SignupPage }/>
    </AuthContext.Provider>
   </Switch> 
   </BrowserRouter>

  );
     }
}

export default App;
