import { Container, createMuiTheme, Grid, makeStyles, ThemeProvider } from "@material-ui/core";
import '../App.css';
import FeaturedPost from "./FeaturedPost";
import PostCard from "./PostCard";
import Header from "./Header";
// import { featuredPosts, sidebar } from "../data/data";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import LinearDeterminate from './PodcastPlay'
import React from 'react'

import AuthContext from '../context/auth-context'

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },

}));

function Home() {

  const auth = React.useContext(AuthContext)
  console.log(auth)
  const [state,setState]=React.useState({
    isdone:false,
    events:[]
  })
  let index=0
  React.useEffect(()=>{
    fetchEvents()
    // console.log(state.events)

    
    
  },[])

  if(state.events !== undefined){
     index= Math.floor(Math.random() * state.events.length)
     console.log(index)
    }
  const fetchEvents=()=>{
        
        const requestBody = {
          query: `
              query {
                channels {
                  _id
                  channelname
                  channel_img
                  discription
                  rss
                }
              }
            `
        };
        if(state.isdone===true){
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
            console.log(resData.data.channels)
            setState({isdone:true})
            const event = resData.data.channels;
            setState({ events: event });
            
            
          })
          .catch(err => {
            console.log(err);
            
          });
      }


  const darkTheme = createMuiTheme({
    palette: {
      type: 'dark',
    },

  });

  const classes = useStyles();

  
  if(state.events!=undefined){
   
  return ( 
  <ThemeProvider theme={darkTheme}>
   <Container>
    <Header />
    <FeaturedPost post={state.events[index]} />
    <br />
   
    <Grid container spacing={4}>
          {state.events.map((post) => (
            // <p>{post.channelname}</p>
            <PostCard key={post.channelname} post={post} />
          ))}
    </Grid>
   {/* <Grid  container spacing={1} className={classes.mainGrid}>
          <Sidebar
            title={sidebar.title}
            description={sidebar.description}
            archives={sidebar.archives}
            social={sidebar.social}
          />
    </Grid>*/}
    {/*<LinearDeterminate/>*/}
   </Container>
   <Footer
        title="Podcast App"
        description="All Rights Reserved"
      />
      
  </ThemeProvider>
  
  );
}
else{
  return <p>nothing</p>
}
}

export default Home;
