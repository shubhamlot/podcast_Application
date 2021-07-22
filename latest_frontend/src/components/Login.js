import {Redirect} from 'react-router-dom'
import React,{useContext} from 'react';


import {LockOutlined} from '@material-ui/icons';

import { makeStyles, ThemeProvider, Avatar,Button,CssBaseline,
   TextField,Link,Grid,createMuiTheme,Container,Typography } from '@material-ui/core';


import AuthContext from '../context/auth-context'

import { useHistory } from "react-router";





const useStyles = makeStyles((theme) => ({


  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#ffffff",

  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: theme.palette.primary,
    color:"#00000",
    
  },
  link:{
    color:"#ffffff"
  }
}));


export default function Login(){

    const auth = useContext(AuthContext)
    const passwordRef = React.useRef()
    const emailRef = React.useRef()
 
    const [state,setState] = React.useState(false)
   
    const history = useHistory();
    


 
    
    const handleSubmit=(e)=>{
       e.preventDefault()
     
        const passwordG = passwordRef.current.value
        const emailG = emailRef.current.value

        if(passwordG.trim() === null ||
           emailG.trim() === null){
                console.log("enter the data")
           }
        else{
           
         
             let requestBody = {
            query:`
                query {
                    login(email:"${emailG}",password:"${passwordG}"){
                        userId
                        token
                        tokenExpiration
                    }
                }
            `
        }

        fetch('http://localhost:8080/graphQL',{
            method:"POST",
            body:JSON.stringify(requestBody),
            headers:{
                'Content-Type':'application/json',
               
            }
        }).then(
            res=>{
                if(res.status !==200 && res.status !== 201){
                    alert('email or password incorrect')
                    throw new Error("Failed!");
                }
                return res.json();
            }).then(resData => {
                console.log(resData);
                if(resData.data.login.token){
                    auth.login( 
                        resData.data.login.userId,resData.data.login.token,resData.data.login.tokenExpiration)
                    setState(true)
                    history.push('/home');
                }
            }).catch(err=>{
                console.log(err)
            })
            
            
        }

    }


    //this is all for themes
    const theme = createMuiTheme({
        palette: {
          type: 'dark'
        },
      });
  const classes = useStyles();
  console.log(state)
  
  if(!state){
  return (
      <ThemeProvider theme={theme}>
   <Container component="main" maxWidth="xs" >
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlined/>
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>

            <Grid item xs={12}>
              <TextField
               
                variant="outlined"
                inputRef={emailRef}
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                inputRef={passwordRef}
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                
              />
            </Grid>
            
            
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Login
          </Button>
          <Grid container justify="">
            <Grid item>
              <Link href="#" variant="body2" className={classes.link}>
                Dont have an account? Sign up
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      
    </Container>
    </ThemeProvider>
  );
  }
  else{
    // console.log(state)s
    return (<Redirect to='/home' />)
  }
}


