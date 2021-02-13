import React, { Component } from 'react';
import Navbar from './Navbar';
import './createchannel.css';
import AuthContext from '../context/auth-context';

class Createchannel extends Component{
    static contextType = AuthContext;

    constructor(props){
        super(props);
        
        this.categoryEL = React.createRef();
        this.rssfeedEL = React.createRef();
        this.channelnameEL = React.createRef();
    }
    submitHandlerCreateChannel=(event)=>{
        
        
        if(this.context.token===null){
            return;
        }

            event.preventDefault();
        let channelname = this.channelnameEL.current.value;
        let rssfeed = this.rssfeedEL.current.value;
        
        let category = this.categoryEL.current.value;
        // console.log(channelname+rssfeed+category+this.context.userId)

        if(channelname.trim().length === 0 || rssfeed.trim().length === 0){
            console.log("error enter the data");
            return;
        }
        let requestBody = {
            query:`
            mutation{
                createChannel(channelInput:{
                  channelname:"${channelname}",
                  author:"${this.context.userId}",
                  rss:"${rssfeed}",
                  channel_type:"${category}"
                }){
                  _id
                  channelname
                }
              }
            `
        }
        const token = this.context.token;
        console.log(token)
        fetch('http://localhost:8080/graphQL',{
            method:"POST",
            body:JSON.stringify(requestBody),
            headers:{
                'Content-Type':'application/json',
                Authorization: 'Bearer '+token
            }
        }).then(res=>{
            
            console.log(res)
            // this.props.history.push('/auth');
            return res.json()


        }).catch(err=>{
            console.log(err)
        })

        
    }

    render(){
        return(
            <div className="channelcreate">
                <div>
            <Navbar user={this.context.username}></Navbar>
            </div>
            <div>
            <h1>Create your Channel</h1>
            </div>
            <div className="collection">
            <form onSubmit={ this.submitHandlerCreateChannel }>

            <input type="text"  name="userid" value={this.context.username} disabled/>

               
                 <input type="text"  name="channelname" placeholder="Channel name.." 
                 ref={ this.channelnameEL } required/>
                
                <input type="text"  name="RSSfeed" placeholder="Channel RSSfeed.."
                ref={ this.rssfeedEL } required/>

                <input type="text"  name="category" placeholder="category"
                ref={ this.categoryEL } required/>
                
                <button type="submit" >submit</button>
                <button type="reset">cancle</button>
            </form>
            </div>
            </div>
        )
    }

}

export default Createchannel;