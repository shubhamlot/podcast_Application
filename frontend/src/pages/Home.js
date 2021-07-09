import { Collection } from 'mongoose';
import React from 'react';
import AuthContext from '../context/auth-context';
import './home.css';
import Navbar from './Navbar';
import ChannelList from './ChannelList';


class Home extends React.Component {
   
    static contextType = AuthContext;

    state={
        isdone:false,
        events:[]
    };
    

    fetchEvents=()=>{
        
        const requestBody = {
          query: `
              query {
                channels {
                  channelname
                  channel_img
                }
              }
            `
        };
        if(this.state.isdone===true){
          return
        }
        fetch('http://localhost:8080/graphql', {
          method: 'POST',
          body: JSON.stringify(requestBody),
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(res => {
            
            if (res.status !== 200 && res.status !== 201) {
              throw new Error('Failed!');
            }
            
            return res.json()
          })
          .then(resData => {
            // console.log(resData.data.channels)
            this.setState({isdone:true})
            const event = resData.data.channels;
            this.setState({ events: event });
            console.log(this.state)
            
          })
          .catch(err => {
            console.log(err);
            
          });
      }

    // check=()=>{
    //     if(this.context.token === null){
    //         this.props.history.push('/auth/');
    //     }
    // }

   
    

    
    render(){
       // console.log(this.context.username)
      //  console.log(this.state)
        return(<div className="home" onLoad={this.fetchEvents()}>
            <div>
                <Navbar user={ this.context.username }></Navbar>
                </div>
            <h1 className="inline" >Home</h1>
           
            <div>
            {/* there is one problem over here */}
           {this.state.events.map((event) => (
              <div>
                <div className="displaychannel">{event.channelname}</div>
                <img src={event.channel_img}/>
              {/* <div className="displaychannel">by {event.author.username}</div> */}
              </div>
            ))}
     
          </div>
            
            
            
        </div>
        )

    }
}

export default Home