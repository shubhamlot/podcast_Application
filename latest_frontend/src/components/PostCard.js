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
}));

export default function FeaturedPost({ post }) {
  const classes = useStyles();

   const [open, setOpen] = React.useState(false);
   const [id,setID] = React.useState(null)
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = (post) => {
    setID(post)
    setOpen(!open);
  };

  return (
    <React.Fragment>
    <Grid item xs={12} md={6}>
      <CardActionArea component="a" href="#">
        <Card className={classes.card} >
          <div className={classes.cardDetails}>
            <CardContent>
              <Typography component="h2" variant="h5">
                {post.channelname}
              </Typography>
              <Typography variant="subtitle1" paragraph>
                {post.discription}
              </Typography>
              <Button variant="text" className={classes.btn} onClick={()=>{handleToggle(post)}} >
              <HeadsetIcon />
                    Listen Now..
              </Button>
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
    <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
        <EpisodeList post={id}/>
      </Backdrop>
    </React.Fragment>
  );
}