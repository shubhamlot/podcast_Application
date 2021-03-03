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
            alert('your account sucessfully created login using ur credentials now');
            this.props.history.push('/auth');
            return res.json()


        }).catch(err=>{
            console.log(err)
        })

    
    }

    
    render(){
       return(
        <div className="coverauth">
        {/* this is start of root */}

 <div className="container">
 <form onSubmit={ this.submitHandlerRegister }>
     <h2>Register</h2><br></br>
     <input required type="text" id="un"  placeholder="username" ref={ this.usernameEL }
     required/><br></br>
     <label for="un"></label>
     <input required type="text" id="un"  placeholder="email" ref={ this.emailEL }
     required/><br></br>
     <label for="un"></label>
     <input required type="password" id="pwd" placeholder="password" ref={ this.passwordEL }
     required/><br></br>
     <label for="pwd"></label>
     <button type="submit" >Register</button><br></br>
     <h4>Already have an account? <button type="button" onClick={ this.switchHandler }> Login</button></h4>
 </form>
 </div>
 {/* this is end of root div}*/}
</div>
            )
        }

    }




export default SignupPage;

