import {useParams} from 'react-router-dom'
import { Container, createMuiTheme, Grid, makeStyles, ThemeProvider } from "@material-ui/core";
import '../App.css';
import FeaturedEpisode from "./FeaturedEpisode";
import EpisodeCard from "./Episodedisplay";
import Header from "./Header";
// import { featuredPosts, sidebar } from "../data/data";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import LinearDeterminate from './PodcastPlay'
import React from 'react'
const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}));
export default function Episodeplay(){


const classes = useStyles();
const {channel} = useParams()
  React.useEffect(()=>{
    
    fetchEvents(channel)
  },[])
    const [state,setState]=React.useState({
    isdone:false,
    events:[]
  })
    const fetchEvents=(id)=>{
        
        const requestBody = {
          query: `
              query {
                getEpisode(id:"${id}") {
                  url
                  title
                  discription
                  img
                }
              }
            `
        };
       
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
            // console.log(resData.data.getEpisode)
            setState({isdone:true})
            const event = resData.data.getEpisode;
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

if(state.events!=undefined){
  let index=0
  console.log(state.events)
  return(<ThemeProvider theme={darkTheme}>
   <Container>
    <Header />
    <FeaturedEpisode post={state.events[index]} />
    <br />
   
    <Grid container spacing={4}>
          {state.events.map((post) => (
            
            <EpisodeCard key={post.channelname} post={post} />


          ))}
    </Grid>
    <Grid  container spacing={1} className={classes.mainGrid}>
          {/*<Sidebar
            title={sidebar.title}
            description={sidebar.description}
            archives={sidebar.archives}
            social={sidebar.social}
          />*/}
    </Grid>
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
  return <p>Nothing here</p>
}

}