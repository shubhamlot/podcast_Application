import React, { Component } from 'react';
import './Auth.css';


class SignupPage extends Component {

    
  
    constructor(props){
        super(props);
        
        this.emailEL = React.createRef();
        this.passwordEL = React.createRef();
        this.usernameEL = React.createRef();
    }

    switchHandler = ()=>{
        this.props.history.push("/auth");
    }
    submitHandlerRegister = (event)=>{
        event.preventDefault();
        let username = this.usernameEL.current.value;
        let email = this.emailEL.current.value;
        let password = this.passwordEL.current.value;

        if(email.trim().length === 0 || password.trim().length === 0){
            console.log("error enter the data");
            return;
        }
        let requestBody = {
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
            this.props.history.push('/auth/');
            return res.json()


        }).catch(err=>{
            console.log(err)
        })

    
    }

    
    render(){
       return(
            <div>
            <form onSubmit={ this.submitHandlerRegister }>
            <input type="text" placeholder="username" ref={ this.usernameEL } ></input><br></br>
         
                <input type="text" placeholder="email" ref={ this.emailEL } ></input><br></br>
                <input type="password" placeholder="password" ref={ this.passwordEL } ></input><br></br>
                <button type="submit">Submit</button>
            </form>
            <button type="button" on onClick={ this.switchHandler } >Switch</button>
        </div>
            )
        }

    }




export default SignupPage;

