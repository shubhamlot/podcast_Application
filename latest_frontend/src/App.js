import { Container, createMuiTheme, Grid, makeStyles, ThemeProvider } from "@material-ui/core";
import './App.css';
import FeaturedPost from "./components/FeaturedPost";
import PostCard from "./components/PostCard";
import Header from "./components/Header";
import { featuredPosts, sidebar } from "./data/data";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Home from './components/Home'
import PlayPodcast from './components/PodcastPlay'
import React from 'react'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import {AuthProvider} from './context/auth-context'
import EpisodeList from './components/EpisodeList'
const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}));

function App() {

  const darkTheme = createMuiTheme({
    palette: {
      type: 'dark',
    },
  });

  const [state,setState]=React.useState({
    userId:'',
    isGuest:true,
    token:null,
    tokenExpiration:null
  })
    const login =(userId,isGuest,token,tokenExpiration)=>{

    setState({token:token,tokenExpiration:tokenExpiration,userId:userId,isGuest:isGuest})
    
  }
  const logout =()=>{
   setState({userId:null,isGuest:true,token:null,tokenExpiration:null })

  }

  const classes = useStyles();

  return ( 
    <BrowserRouter>
    <AuthProvider value={{userId:state.userId,isGuest:state.isGuest,login:login,token:state.token,tokenExpiration:state.tokenExpiration,logout:logout}}> 
      <Switch>
        <Route path="/Home" component={Home}/>
        <Route path="/episode" component={EpisodeList}/>
      </Switch>
    </AuthProvider>
    </BrowserRouter>
    
  
  );
}

export default App;
