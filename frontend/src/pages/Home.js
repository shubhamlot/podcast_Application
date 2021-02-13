import React from 'react';
import AuthContext from '../context/auth-context';
import './home.css';
import Navbar from './Navbar';


class Home extends React.Component {
   
    static contextType = AuthContext;

    

    // check=()=>{
    //     if(this.context.token === null){
    //         this.props.history.push('/auth/');
    //     }
    // }
    
    render(){
       // console.log(this.context.username)
       
        return<div className="home">
            <div>
                <Navbar user={ this.context.username }></Navbar>
                </div>
            <h1 className="inline">Home</h1>
            
            
        </div>

    }
}

export default Home