// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
// import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
// import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import PauseIcon from '@material-ui/icons/Pause';
import logo from '../logo.png'
// import Paper from '@material-ui/core/Paper';
// import Fab from '@material-ui/core/Fab';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemAvatar from '@material-ui/core/ListItemAvatar';
// import ListItemText from '@material-ui/core/ListItemText';
// import ListSubheader from '@material-ui/core/ListSubheader';
// import Avatar from '@material-ui/core/Avatar';
// import MenuIcon from '@material-ui/icons/Menu';
// import AddIcon from '@material-ui/icons/Add';
// import SearchIcon from '@material-ui/icons/Search';
// import MoreIcon from '@material-ui/icons/MoreVert';
// import {ThemeProvider,createMuiTheme} from '@material-ui/core'
// import '../App.css';




// export default function BottomAppBar() {
//   const classes = useStyles();
//   const theme = createMuiTheme({
//     palette: {
//       type: 'dark',
//     },
//   });
//   return (
//     <React.Fragment>
//       <ThemeProvider theme={theme}>
    
//       <AppBar position="fixed" color="primary" className={classes.appBar}>
//         <Toolbar>

//         </Toolbar>
//       </AppBar>
//       </ThemeProvider>
//     </React.Fragment>
//   );
// }
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

// const useStyles = makeStyles((theme) =>{
  
//     appBar:{
//     top: 'auto',
//     bottom: 0,
//     backgroundColor:theme.palette.background.default,
//   },
// });
const useStyles = makeStyles((theme) => ({

  appBar: {
    top: 'auto',
    bottom: 0,
    backgroundColor:theme.palette.background.default,
  },
  box:{
  	width:50,
  	height:50,
  	
  },
  img:{
  	width:"100%",
  	height:"100%"
  },
  container:{
  	display:"flex"
  },
  controles:{
  	
  },
  name:{
  	flex:1,
  	padding:5,
  	marginLeft:20
  }
 
}));


export default function LinearDeterminate() {
  const classes = useStyles();
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
  	<React.Fragment>
  	
  	<AppBar position="fixed" color="primary" className={classes.appBar}>
  	<LinearProgress variant="determinate" color="secondary" value={progress} />
  	<Toolbar className={classes.container}>
  		<div className={classes.box}>
  		<img className={classes.img} src={logo}/>
  		</div>
  		<div className={classes.name}>
  			<h4>Podcast Name</h4>
  		</div>
  		<div className={classes.controls}>
  		<IconButton>
  			<PlayCircleOutlineIcon/>
  		</IconButton>
  		<IconButton>
  			<PauseIcon/>
  		</IconButton>
  		</div>
  	</Toolbar>
  	</AppBar>
  	</React.Fragment>

  );
}