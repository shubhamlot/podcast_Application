import { Container, createMuiTheme, Grid, makeStyles, ThemeProvider } from "@material-ui/core";
import '../App.css';
import FeaturedPost from "./FeaturedPost";
import PostCard from "./PostCard";
import Header from "./Header";
import { featuredPosts, sidebar } from "../data/data";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import LinearDeterminate from './PodcastPlay'
const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}));

function Home() {

  const darkTheme = createMuiTheme({
    palette: {
      type: 'dark',
    },
  });

  const classes = useStyles();

  return ( 
  <ThemeProvider theme={darkTheme}>
   <Container>
    <Header />
    <FeaturedPost />
    <br />
   
    <Grid container spacing={4}>
          {featuredPosts.map((post) => (
            <PostCard key={post.title} post={post} />
          ))}
    </Grid>
    <Grid  container spacing={1} className={classes.mainGrid}>
          <Sidebar
            title={sidebar.title}
            description={sidebar.description}
            archives={sidebar.archives}
            social={sidebar.social}
          />
    </Grid>
    <LinearDeterminate/>
   </Container>
   <Footer
        title="Podcast App"
        description="All Rights Reserved"
      />
      
  </ThemeProvider>
  
  );
}

export default Home;
