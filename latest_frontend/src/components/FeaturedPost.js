import { Button, Card, CardActions, CardContent, makeStyles, Typography } from "@material-ui/core";
import HeadsetIcon from '@material-ui/icons/Headset';


const useStyles=makeStyles({
    title:{
        fontSize:40,
        fontFamily:"montserrat",
    },
    cover:{
        backgroundImage: 'url(https://is1-ssl.mzstatic.com/image/thumb/Podcasts115/v4/c5/b0/13/c5b013d4-1c47-f5a0-67a1-20357e86ae2b/mza_12038582178417231024.png/1200x1200bb.jpg)',
        backgroundPosition:"center",
        backgroundSize:"justify",
        padding:"35px 25px",
    },
});

const FeaturedPost = () => {
    const classes =useStyles();
    return(
        <Card className={classes.cover}>
            <CardContent className={classes.textContainer}>
                <Typography className={classes.title}gutterBottom variant='h4'>
                    Shade
                </Typography>
                <Typography variant='h6'>
                Anti-racism campaigners, educators, academics and public figures talk about their work and 
                their lives, and how the two influence each other day to day. Recent guests have included 
                Trinidadian artist Richard Mark Rawlins, Shadow Lord Chancellor andShadow Justice Secretary David 
                Lammy,and Angelina Coronado, who curates The Menagerie Archive on Instagram.
                </Typography>
            </CardContent>

            <CardActions>
                <Button variant="text" className={classes.btn}>
                <HeadsetIcon />
                 Listen Now..
                </Button>
            </CardActions>
        </Card>

    );
};

export default FeaturedPost;