import React, { Children } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import SchoolIcon from '@material-ui/icons/School';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import TabletMacIcon from '@material-ui/icons/TabletMac';
import ApartmentIcon from '@material-ui/icons/Apartment';
import PublicIcon from '@material-ui/icons/Public';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function SideDrawer({children}) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem>CATEGORIES</ListItem>
      </List>
      <Divider />
      <List>
      <ListItem button>
        <ListItemIcon>
          <PeopleOutlineIcon />
        </ListItemIcon>
        <ListItemText primary="Interviews" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <SchoolIcon />
        </ListItemIcon>
        <ListItemText primary="Education" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
        <MusicNoteIcon/>
        </ListItemIcon>
        <ListItemText primary="Music" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <PublicIcon />
        </ListItemIcon>
        <ListItemText primary="News" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <TabletMacIcon />
        </ListItemIcon>
        <ListItemText primary="Technology" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <ApartmentIcon />
        </ListItemIcon>
        <ListItemText primary="Lifestyle" />
      </ListItem>
      </List>
    </div>
  );
 
  return (
    <div>
      <React.Fragment key={"left"}>
        <Button onClick={toggleDrawer("left", true)}>{children}</Button>
        <Drawer
          anchor={"left"}
          open={state["left"]}
          onClose={toggleDrawer("left", false)}
        >
          {list("left")}
        </Drawer>
      </React.Fragment>
    </div>
  );
}