
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import AuthPage from "./pages/Auth";
import Homepage from "./pages/Home" ;

import AuthContext from "./context/auth-context";
import { Component ,React } from 'react';
import SignupPage from './pages/Signup';
import CreateChannel from './pages/Createchannel';

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
    {!this.state.token && <Redirect from="/" to="/auth" exact />}
    {this.state.token && <Redirect from="/" to="/home" exact />}
    {this.state.token && <Redirect from="/auth" to="/home" exact />}
    {!this.state.token &&<Route path="/auth" component={ AuthPage } />}
    {this.state.token &&<Route path="/home" component={ Homepage }/>}
    {!this.state.token && <Route path="/signup" component={ SignupPage }/>}
    {this.state.token &&<Route path="/createchannel" component={CreateChannel}/>}
    </AuthContext.Provider>
   </Switch> 
  
   </BrowserRouter>

  );
     }
}

export default App;
