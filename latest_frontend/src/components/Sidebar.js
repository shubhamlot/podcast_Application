import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
  sidebarAboutBox: {
    padding: theme.spacing(2),
  },
  sidebarSection: {
    marginTop: theme.spacing(3),
  },
}));

export default function Sidebar(props) {
  const classes = useStyles();
  const { archives, description, social, title } = props;

  return (
    <Grid item xs={12} md={12} >
      <Paper elevation={0} className={classes.sidebarAboutBox}>
        <Typography align="center" variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography>{description}</Typography>
      </Paper>

     {/* <Typography variant="h6" gutterBottom className={classes.sidebarSection}>
        Archives
      </Typography>
      {archives.map((archive) => (
        <Link
          display="block"
          variant="body1"
          href={archive.url}
          key={archive.title}
        >
          {archive.title}
        </Link>
      ))}
*/}
      {/*<Typography variant="h6" gutterBottom className={classes.sidebarSection}>
        Social
      </Typography>*/}
   {/*    <Grid container direction="row" spacing={1} alignItems="center">
      {social.map((network) => (
        
            <Grid item>
        <Link display="block" variant="body1" href="#" key={network.name}>
         
              <network.icon />{network.name}
             </Link>
            
            
            </Grid>
        
      ))}
      </Grid>*/}
    </Grid>
  );
}