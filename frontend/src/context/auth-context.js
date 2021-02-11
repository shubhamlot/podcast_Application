import React from 'react'


export default React.createContext({
    token:null,
    userId:null,
    username:null,
    login:(token,userId,username,tokenExpiration)=>{},
    logout:()=>{}
})