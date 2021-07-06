import { Badge, Divider, IconButton, makeStyles, Toolbar, Typography } from "@material-ui/core"
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SideDrawer from "./SideDrawer";
/*import classes from "*.module.css";*/

const useStyles=makeStyles((theme) =>({
    title: {
        flexGrow: 1,
        color:"#ffffff"
    },
    tagline: {
        fontSize: 20,
        textTransform: "uppercase",
        justifyContent:"center",
        color:"#ffffff"
    },
}));

const Header = () => {
    const classes=useStyles();
    return(
        <>
        <Toolbar>
         <SideDrawer>
          <IconButton color="inherit">
          <MenuIcon />
          </IconButton>
         </SideDrawer>
         <Typography variant='h6'className={classes.title}>PODCAST APP</Typography>
           
            <IconButton ><AccountCircleIcon /></IconButton>
        </Toolbar>

        <Divider></Divider>

        <Toolbar className={classes.tagline}>Listening Is Everything</Toolbar>
        </>
    );  
}

export default Header;