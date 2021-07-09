import { Badge, Divider, IconButton, makeStyles, Toolbar, Typography,Menu,MenuItem,Button } from "@material-ui/core"
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SideDrawer from "./SideDrawer";
import React from 'react'
import AuthContext from '../context/auth-context'
import {Link} from 'react-router-dom'

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
      menu:{
    // backgroundColor:theme.palette.background.paper,
    color:"#ffffff",
    textDecoration:"none"
  }
}));

const Header = () => {
    
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
    const auth = React.useContext(AuthContext)
    const logout=()=>{
    auth.logout()
  }

  const handleChange = (event) => {
    // setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
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
           
            <IconButton onClick={handleMenu}><AccountCircleIcon /></IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}><Button >
                  <Link className={classes.menu} to="/createchannel" >Create Channel</Link>
                  </Button></MenuItem>
                <MenuItem onClick={handleClose}><Button onClick={logout} >
                  <Link className={classes.menu} to="/login" >Logout</Link>
                  </Button></MenuItem>
              </Menu>
        </Toolbar>

        <Divider></Divider>

        <Toolbar className={classes.tagline}>Listening Is Everything</Toolbar>
        </>
    );  
}

export default Header;