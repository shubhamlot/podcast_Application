import React, { Component } from 'react';
import './Auth.css';
import AuthContext from "../context/auth-context";
import {Redirect} from 'react-router-dom';
class AuthPage extends Component {

    
    static contextType = AuthContext
    constructor(props){
        super(props);
        
        this.emailEL = React.createRef();
        this.passwordEL = React.createRef();
      
    }

    switchHandler = ()=>{
      this.props.history.push("/signup");
    }
    

    submitHandlerLogin = (event)=>{
        event.preventDefault();
       // let username;
        let email = this.emailEL.current.value;
        let password = this.passwordEL.current.value;
        //console.log(email+" "+password);
        if(email.trim().length === 0 || password.trim().length === 0){
            console.log("error enter the data");
            return;
        }
        
        let requestBody = {
            query:`
                query {
                    login(email:"${email}",password:"${password}"){
                        userId
                        token
                        tokenExpiration
                    }
                }
            `
        }

        fetch('http://localhost:8080/graphQL',{
            method:"POST",
            body:JSON.stringify(requestBody),
            headers:{
                'Content-Type':'application/json'
            }
        }).then(
            res=>{
                if(res.status !==200 && res.status !== 201){
                    throw new Error("Failed!");
                }
                return res.json();
            }).then(resData => {
                //console.log(resData);
                if(resData.data.login.token){
                    this.context.login(resData.data.login.token, 
                        resData.data.login.userId, resData.data.login.tokenExpiration)
                    
                    this.props.history.push('/home/');
                }
            }).catch(err=>{
                console.log(err)
            })
            

    }
    render(){
       
        return(
            <div>
                <form onSubmit={ this.submitHandlerLogin }>
                    <input type="text" placeholder="email" ref={ this.emailEL } ></input><br></br>
                    <input type="password" placeholder="password" ref={ this.passwordEL } ></input><br></br>
                    <button type="submit">Submit</button>
                </form>
                <button type="button" onClick={ this.switchHandler }>Switch</button>
            </div>
            
        )
      
        

    }
}

    


export default AuthPage

