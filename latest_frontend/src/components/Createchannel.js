import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AuthContext from '../context/auth-context'
import {Redirect} from 'react-router-dom'
import {createMuiTheme,ThemeProvider} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const [done,setDone] = React.useState(false)
  const auth = React.useContext(AuthContext)
  const RSSRef = React.useRef()
  const handleSubmit = (e)=>{
    e.preventDefault()
    let rssfeed = RSSRef.current.value
    let requestBody = {
            query:`
            mutation{
                createChannel(channelInput:{
                  author:"${auth.userId}",
                  rss:"${rssfeed}"
                }){
                  _id
                  channelname
                }
              }
            `
        }

        fetch('http://localhost:8080/graphQL',{
            method:"POST",
            body:JSON.stringify(requestBody),
            headers:{
                'Content-Type':'application/json',
                // Authorization: 'Bearer '+ auth.token,
            }
        }).then(res=>{
            setDone(true)
            return res.json()


        }).catch(err=>{
            console.log(err)
        })
  }

    const darkTheme = createMuiTheme({
    palette: {
      type: 'dark',
    },

  });


if(!done){
  return (
    <ThemeProvider theme={darkTheme}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          {/*<LockOutlinedIcon />*/}
        </Avatar>
        <Typography component="h1" variant="h5">
          Create Channel
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                autoComplete="channel"
                name="channelname"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                value={auth.userId}
                autoFocus
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                inputRef={RSSRef}
                id="lastName"
                label="RSS Link"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            
            
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Create
          </Button>
         
        </form>
      </div>

    </Container>
    </ThemeProvider>
  );
}
else{
  return <Redirect to="/home"/>
}
}