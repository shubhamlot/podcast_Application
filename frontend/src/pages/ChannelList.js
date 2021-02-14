import React, { Component } from 'react'
import "./home.css"

const ChannelList = (props) => {
  
  return (
    <div>
      
      {props.channels.map((event) => (
        <div className="displaychannel">{event.channelname}</div>
      ))}
     
    </div>
  );
      
}

export default ChannelList