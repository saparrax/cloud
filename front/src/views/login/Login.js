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
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { checkCookies, setCookies } from 'cookies-next';
import { Redirect } from "react-router-dom";
import { removeCookies } from 'cookies-next';
import logo from './drawer.png'
import "./styles.css";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        CRAAX
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function updateUser(){
  if(checkCookies('ctx','token')) removeCookies('ctx','token')
  if(checkCookies('ctx','admin-gestor')) removeCookies('ctx','admin-gestor')
}



export default function SignIn() {
  const classes = useStyles();
  const history = useHistory();

  let result=null

  const [state, setState] = React.useState({ email: '', password: ''
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  //const [error, setError] = useState(null);
  //const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  

  function getStatus(p1){
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mail: p1.email, password:p1.password})
  };
  fetch('/login', requestOptions)
  .then(response => response.json())
  .then(data => {
    if(data.status==0){
      if(data.admin)  setCookies('ctx','admin-gestor', true)
       setCookies('ctx','token', data.token)
       history.push("/blog-posts" );
    }else{
      alert(data.message)
      return;
    }
  });
  
  }




  function handleClickButton(e,p1){
    e.preventDefault();
    getStatus(p1)
/*
  const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mail: p1.email, password:p1.password})
  };
  fetch('/login', requestOptions)
  .then(response => response.json())
  .then(data => setItems(data));
  console.log(items.status)
  if(items.status != 0) {
    alert("Contrasenya incorrecta")
    return;
  }
  
  setCookies('ctx','token', items.token)
  history.push("/blog-posts" );*/

  };

  return (
    <Container component="main" maxWidth="xs">
      {updateUser()}
      <CssBaseline />
      <div className={classes.paper}>
				<img src={logo} alt="Logo" className="photo"/>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            onChange={handleChange}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contrasenya"
            type="password"
            id="password"
            //autoComplete="current-password"
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e) => handleClickButton(e,state)}
          >
            Entra
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/register" variant="body2">
                {"No tens cap compte? Registra't!"}
              </Link>
            </Grid>
          </Grid>
					
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>

      
    </Container>
  );
}
