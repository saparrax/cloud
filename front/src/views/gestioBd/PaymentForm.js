import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Menu from '@material-ui/core/Menu';
import CustomFileUpload from "../../components/components-overview/CustomFileUpload";
import Editor from "../../components/add-new-post/Editor";

import Switch from '@material-ui/core/Switch';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {Link } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';

import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import { checkCookies, getCookies } from 'cookies-next';
import { Redirect } from "react-router-dom";

import {
  Row,
  Col,
  Form,
  FormInput,
  FormSelect,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
	FormCheckbox
} from "shards-react";

function checkUser(){
	return checkCookies('ctx', 'token');
}
function checkAdmin(){
	return checkCookies('ctx', 'admin-gestor');
}

const useStylesB = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(2),
    //position: 'absolute',
    //bottom:0,
    //left: 600,
    //alignSelf: 'flex-end',
  },
}));

export default function PaymentForm() {
const classesB = useStylesB();
const history = useHistory();

  const [stateVehicle, setStateVehicle] = React.useState({nom: '', ipVehicle: ''});

  const handleChangeVehicle = (event) => {
    setStateVehicle({ ...stateVehicle, [event.target.name]: event.target.value });
  };

  return (
    <React.Fragment>
			{checkUser() ? console.log("x"):  <Redirect to='/signin'  />}
      {checkAdmin() ? console.log("x"):  <Redirect to='/blog-posts'  />}
      <Typography variant="h6" gutterBottom>
        Crear vehicle
      </Typography>
      
				<Link to="/crearVehicle">
        <Button 
        variant="contained"
        color="primary"
        size="large"
        className={classesB.button}
        startIcon={<SaveIcon />}
					>
				  	Crear
				</Button>
				</Link>

 			<Typography variant="h6" gutterBottom>
        Crear categoria
      </Typography>

			<Link to="/crearCategoria">
			<Button 
        variant="contained"
        color="primary"
        size="large"
        className={classesB.button}
        startIcon={<SaveIcon />}
					>
				  	Crear
				</Button>
				</Link>

			<Typography variant="h6" gutterBottom>
        Crear ubicació
      </Typography>

			<Link to="/crearUbicacio">
			<Button 
        variant="contained"
        color="primary"
        size="large"
        className={classesB.button}
        startIcon={<SaveIcon />}
					>
				  	Crear
				</Button>
			</Link>

			<Typography variant="h6" gutterBottom>
        Crear contenidor
      </Typography>
		
			<Link to="/crearContenidor">
			<Button 
        variant="contained"
        color="primary"
        size="large"
        className={classesB.button}
        startIcon={<SaveIcon />}
					>
				  	Crear
				</Button>
			</Link>

   {/*</Grid>*/}
		{console.log(stateVehicle)}
    </React.Fragment>
  );
}
