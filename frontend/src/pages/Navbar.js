import React, { Component } from 'react';
import { NavLink, Redirect, Route, Switch } from 'react-router-dom';
import Createchannel from './Createchannel';
import './navbar.css';
import AuthContext from '../context/auth-context';

class Navbar extends Component{
    static contextType = AuthContext;
    logout=()=>{
        this.context.logout();
    }
    
    render(){
        return(
            <ul>
                <li><NavLink to="/home">Home</NavLink></li>
                <li><a href="#home">Subscription</a></li>
                <li><NavLink to="/createchannel">Create Channel</NavLink></li>
                <li onClick={ this.logout }>
                    <NavLink to="/auth">Logout</NavLink></li>
                <li><a className="active" href="#about">Welcome { this.props.user } !!</a></li>
            </ul>
        )
    }
}

export default Navbar