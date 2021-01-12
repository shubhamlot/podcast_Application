import React, { Component } from 'react';
import './Auth.css';
import AuthContext from "../context/auth-context"
class AuthPage extends Component {

   
    state = {
        islogin:true
    }

    static contextType = AuthContext

    constructor(props){
        super(props);
        this.emailEl = React.createRef()
        this.passwordEl = React.createRef()
        this.usernameEL = React.createRef()
    }

    switchModeHandler = ()=>{
        this.setState(prevState => {
            return {islogin: !prevState.islogin}
        })
    }
    submitHandler = (event) =>{
        event.preventDefault();
        let username
        const email = this.emailEl.current.value;
        const password = this.passwordEl.current.value;
        if (!this.state.islogin){
        username = this.usernameEL.current.value;
        }

        if(email.trim().length === 0 || password.trim().length ===0){
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

        if (!this.state.islogin){
            requestBody = {
                query:`
                    mutation{
                        createUser(userInput:{username:"${username}",
                         email:"${email}", password:"${password}"}){
                            _id
                            email
                        }
                    }
                `
            }
        }
        

        fetch('http://localhost:8080/graphQL',{
            method:"POST",
            body:JSON.stringify(requestBody),
            headers:{
                'Content-Type':'application/json'
            }
        }).then(res=>{
            if(res.status !==200 && res.status !== 201){
                throw new Error("Failed!")
            }
            return res.json()
        }).then(resData => {
            if(resData.data.login.token){
                this.context.login(resData.data.login.token, resData.data.login.userId, resData.data.login.tokenExpiration)
            }
        }).catch(err=>{
            console.log(err)
        })
    }

    render(){

        if(this.state.islogin){

        return <div>
            <div id="container-login">
                <div id="title">
                     Login
                </div>
        
                <form onSubmit={this.submitHandler}>
                    <div className="input">
                       
                        <input id="email" placeholder="Email" type="email" required 
                        className="validate" autoComplete="off" ref={this.emailEl}/>
                    </div>
        
        
                    <div className="input">
                        
                        <input id="password" placeholder="Password" type="password" 
                        required className="validate" autoComplete="off" ref={this.passwordEl}/>
                    </div>
        
                    <br></br>
                    <button type="submit" className="submit">
                    Log In</button>
                </form>
                
        
                <div className="register">
                    Don't have an account yet?
                    <button id="register-link" onClick={this.switchModeHandler}>Register here</button>
                </div>
            </div>
        </div>
        }
        else{
            return <div>
            <div id="container-login">
                <div id="title">
                    Register
                </div>
        
                <form onSubmit={this.submitHandler}>

                <div className="input">
                       
                       <input id="username" placeholder="Username" type="text" required 
                       className="validate" autoComplete="off" ref={this.usernameEl}/>
                   </div>

                    <div className="input">
                       
                        <input id="email" placeholder="Email" type="email" required 
                        className="validate" autoComplete="off" ref={this.emailEl}/>
                    </div>
        
        
                    <div className="input">
                        
                        <input id="password" placeholder="Password" type="password" 
                        required className="validate" autoComplete="off" ref={this.passwordEl}/>
                    </div>

                    
        
                    <br></br>
                    <button type="submit" className="submit">
                    Signup</button>
                </form>
                
        
                <div className="register">
                    Already have an account ?
                    <button id="register-link" onClick={this.switchModeHandler}>Login here</button>
                </div>
            </div>
        </div>

        }
        }
    
}

export default AuthPage

