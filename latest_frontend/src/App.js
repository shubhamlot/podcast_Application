import { Container, createMuiTheme, Grid, makeStyles, ThemeProvider } from "@material-ui/core";
import './App.css';
import FeaturedPost from "./components/FeaturedPost";
import PostCard from "./components/PostCard";
import Header from "./components/Header";
// import { featuredPosts, sidebar } from "./data/data";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Home from './components/Home'
import PlayPodcast from './components/PodcastPlay'
import React from 'react'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import {AuthProvider} from './context/auth-context'
import EpisodeList from './components/EpisodeList'
import Signup from './components/Signup'
import Login from './components/Login'
import Createchannel from './components/Createchannel'

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
    token:null,
    tokenExpiration:null
  })
    const login =(userId,token,tokenExpiration)=>{

    setState({token:token,tokenExpiration:tokenExpiration,userId:userId})
    
  }
  const logout =()=>{
   setState({userId:null,token:null,tokenExpiration:null })

  }

  const classes = useStyles();
 // console.log(state)
  return ( 
    <BrowserRouter>
    <AuthProvider value={{userId:state.userId,login:login,token:state.token,tokenExpiration:state.tokenExpiration,logout:logout}}> 
    
      <Switch>
        {state.token && <Route path="/home" component={Home}/>}
        {state.token && <Route path="/channel/:channel" component={EpisodeList}/>}
        {!state.token && <Route path="/login" component={Login}/>}
        {state.token && <Route path="/createchannel" component={Createchannel}/>}
        {!state.token && <Route component={Signup}/>}
      </Switch>

    </AuthProvider>
    </BrowserRouter>
    
  
  );
}

export default App;
