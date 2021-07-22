import {Redirect} from 'react-router-dom'
import React,{useState} from 'react';
import {Avatar,Button,CssBaseline,TextField,Link,Grid,
  Typography,makeStyles,ThemeProvider,Container} from '@material-ui/core';

import {LockOutlined} from '@material-ui/icons';
import { createMuiTheme } from '@material-ui/core/styles';
import { Checkbox, FormControlLabel } from '@material-ui/core';





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
  },
  submitCreator:{
    backgroundColor:"#00bcd4",
    color:"#000000",
    
  },
  link:{
    color:"#ffffff"
  }
}));





export default function Userlogin(){

    
  const[accepted,setAccepted] = React.useState(false)
  const handleChange = ()=>{
    if(accepted) setAccepted(false)
    else setAccepted(true)
  }
    
    const [state, setState] = useState({
    _issubmitted:false
    });

   

    const firstNameRef = React.useRef()
    const lastNameRef = React.useRef()
    const passwordRef = React.useRef()
    const emailRef = React.useRef()
 
    const handleSubmit=(e)=>{
       e.preventDefault()
        const firstName = firstNameRef.current.value
        const lastName = lastNameRef.current.value
        const password = passwordRef.current.value
        const email = emailRef.current.value
        const isGuest = false
        if(firstName.trim() === null ||
           lastName.trim()=== null ||
           password.trim() === null ||
           email.trim() === null){
                console.log("enter the data")
           }
        else{
            setState({_issubmitted:true})

            let requestBody = {
            query:`
                mutation{
                    createUser(userInput:{firstname:"${firstName}",lastname:"${lasttName}"
                     email:"${email}", password:"${password}"}){
                        _id
                        email
                    }
                }
            `
        }
         
            fetch('http://localhost:8080/graphQL',{
            method:"POST",
            body:JSON.stringify(requestBody),
            headers:{
                'Content-Type':'application/json'
            }
        }).then(res=>{
            if(res.status !==200 && res.status !== 201){
                throw new Error("Failed!")
            }
            return res.json()


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
  
  if(!state._issubmitted){
  return (
      <ThemeProvider theme={theme}>
   <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                inputRef={firstNameRef}
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                
                variant="outlined"
                inputRef={lastNameRef}
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
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
            name="submit"
            className={classes.submit}
          >
            Sign Up
          </Button>
          
          <Grid container justify="">
            <Grid item>
              <Link href="#" variant="body2" className={classes.link}>
                Already have an account? Sign in
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
    if(state._issubmitted) return <Redirect to='/login'/>
  }
}


