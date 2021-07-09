  
import React from 'react'


const AuthContext = React.createContext({
    token:null,
    userId:null,
    tokenEpiration:null,
    login:(userId,token,tokenEpiration)=>{},
    logout:()=>{},
   
})

export const AuthProvider = AuthContext.Provider
export default AuthContext 