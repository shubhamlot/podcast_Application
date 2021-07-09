import React from "react";
import { makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Hidden from "@material-ui/core/Hidden";
import {Button} from "@material-ui/core";
import HeadsetIcon from '@material-ui/icons/Headset';
import EpisodeList from './EpisodeList'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import {Link} from 'react-router-dom'

const useStyles = makeStyles((theme)=>({
  card: {
    display: "flex",
    cursor:"pointer"
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
   backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
   menu:{
    // backgroundColor:theme.palette.background.paper,
    color:"#ffffff",
    textDecoration:"none"
  }
}));

export default function FeaturedPost({ post }) {
  const classes = useStyles();

   const [open, setOpen] = React.useState(false);
   const [id,setID] = React.useState(null)
  const handleClose = () => {
    setOpen(false);
  };
  const handleClick = (post) => {
    console.log(post)
  };



  return (
    <React.Fragment>
    <Grid item xs={12} md={6}>
      <CardActionArea>
        <Card className={classes.card} >
          <div className={classes.cardDetails}>
            <CardContent>
              <Typography component="h2" variant="h5">
                {post.channelname}
              </Typography>
              <Typography variant="subtitle1" paragraph>
                {post.discription}
              </Typography>
              <Link to={`/channel/${post._id}`} className={classes.menu}> 
              <Button variant="text" className={classes.btn} onClick={()=>{handleClick(post)}} >
              <HeadsetIcon />
                    Listen Now..
              </Button>
              </Link>
            </CardContent>
          </div>
          <Hidden xsDown>
            <CardMedia
              className={classes.cardMedia}
              image={post.channel_img}
              title={post.imageTitle}
            />
          </Hidden>

        </Card>

      </CardActionArea>
    </Grid>
  
    </React.Fragment>
  );
}