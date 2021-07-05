import { Container, createMuiTheme, Grid, makeStyles, ThemeProvider } from "@material-ui/core";
import './App.css';
import FeaturedPost from "./components/FeaturedPost";
import PostCard from "./components/PostCard";
import Header from "./components/Header";
import { featuredPosts, sidebar } from "./data/data";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

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
    <Grid align="center" container spacing={1} className={classes.mainGrid}>
          <Sidebar
            title={sidebar.title}
            description={sidebar.description}
            archives={sidebar.archives}
            social={sidebar.social}
          />
    </Grid>
   </Container>
   <Footer
        title="Podcast App"
        description="All Rights Reserved"
      />
  </ThemeProvider>
  
  );
}

export default App;
