import React from 'react';
import AuthContext from '../context/auth-context';


class Home extends React.Component {
   
    static contextType = AuthContext;

    logout=()=>{
        this.context.logout();
        this.props.history.push('/auth/');
    }

    check=()=>{
        console.log(this.context.tokenExpiration)
        if(this.context.token === null){
            this.props.history.push('/auth/');
        }
    }
    
    render(){
       // console.log(this.context.username)
       console.log(this.context.tokenExpiration)
        return<div onLoad={ this.check }>
            <h1>Home</h1>
            <h2>hello {this.context.username}</h2>
            <button onClick={ this.logout }>Logout</button>
        </div>

    }
}

export default Home