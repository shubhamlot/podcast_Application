import { Button, Card, CardActions, CardContent, makeStyles, Typography } from "@material-ui/core";
import HeadsetIcon from '@material-ui/icons/Headset';


const useStyles=makeStyles({
    title:{
        fontSize:40,
        fontFamily:"montserrat",
    },
    cover:{
        // backgroundImage: 'url(https://is1-ssl.mzstatic.com/image/thumb/Podcasts115/v4/c5/b0/13/c5b013d4-1c47-f5a0-67a1-20357e86ae2b/mza_12038582178417231024.png/1200x1200bb.jpg)',
        backgroundPosition:"center",
        backgroundSize:"justify",
        padding:"35px 25px",
        cursor:"pointer"

    },
    top:{
        color:"#ffffff",
        mixBlendMode:"difference"
    }
});

const FeaturedPost = ({post}) => {
    const classes =useStyles();
    // console.log(post.channel)
    if(post!=undefined){
    return(
        <Card className={classes.cover} style={{
            backgroundImage: `url(${post.channel_img})`
        }}>
            <CardContent className={classes.top}>
                <Typography className={classes.title}gutterBottom variant='h4'>
                    {post.channelname}
                </Typography>
                <Typography variant='h6'>
                {post.discription}
                </Typography>
                <CardActions>
                <Button variant="text" className={classes.btn}>
                <HeadsetIcon />
                 Listen Now..
                </Button>
            </CardActions>
            </CardContent>

            
        </Card>

    );
}
else{
    return<p>nothing</p>
}
};

export default FeaturedPost;