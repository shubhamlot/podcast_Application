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
    <Home/>
  
  );
}

export default App;
