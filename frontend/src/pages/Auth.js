import React, { Component } from 'react';
import './Auth.css'
import AuthContext from "../context/auth-context";
class AuthPage extends Component {

    
    static contextType = AuthContext;

    
    

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
            
            return;
        }
        
        let requestBody = {
            query:`
                query {
                    login(email:"${email}",password:"${password}"){
                        userId
                        username
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
                'Content-Type':'application/json',
               
            }
        }).then(
            res=>{
                if(res.status !==200 && res.status !== 201){
                    alert('email or password incorrect')
                    throw new Error("Failed!");
                }
                return res.json();
            }).then(resData => {
                // console.log(resData);
                if(resData.data.login.token){
                    this.context.login(resData.data.login.token, 
                        resData.data.login.userId,resData.data.login.username, resData.data.login.tokenExpiration)
                    
                    this.props.history.push('/home/');
                }
            }).catch(err=>{
                console.log(err)
            })
            

    }
    render(){
       
        return(
           <div className="coverauth">
               	<div className="container">
		<form onSubmit={ this.submitHandlerLogin }>
			<h2>LOGIN</h2><br></br>
            <input autoComplete="off" required 
            type="text" id="un"  placeholder="email" ref={ this.emailEL }/><br></br>
			<label for="un"></label>
            <input autoComplete="off" required 
            type="password" id="pwd" placeholder="password" ref={ this.passwordEL }/><br></br>
			<label for="pwd"></label>
			<button type="submit" >Login</button><br></br>
			<h4>Dont have an account? <button type="button" onClick={ this.switchHandler }> Register</button></h4>
		</form>
	    </div>
        </div>
    
	
               
            
        )
      
        

    }
}

    


export default AuthPage

