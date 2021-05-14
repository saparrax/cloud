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
import { getCookies } from 'cookies-next';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';

import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import { useHistory } from 'react-router-dom';

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

function handleClickButton(p1){

	 const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ nom: p1.nom, ip: p1.ipVehicle})
    };
    fetch('/addVehicle', requestOptions)
    .then(response => {
      if(response.ok){
				setStateVehicle({nom:'', ipVehicle: ''})
         history.push("/gestionar" );
         return;
      }else{
        alert("camps obligatoris erronis")
        return;
      }
    });
}

  const [stateVehicle, setStateVehicle] = React.useState({nom: '', ipVehicle: ''});

  const handleChangeVehicle = (event) => {
    setStateVehicle({ ...stateVehicle, [event.target.name]: event.target.value });
  };

  return (
    <React.Fragment>

      <Typography variant="h6" gutterBottom>
        Crear vehicle
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <TextField onChange={handleChangeVehicle} name="nom" required id="cardName" label="Nom vehicle" fullWidth autoComplete="cc-name" />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
						defaultValue=""
						onChange={handleChangeVehicle}
						name="ipVehicle"
            required id="cardNumber"
            label="Ip vehicle"
            fullWidth
            autoComplete="cc-number"
          />
        </Grid>

		<Grid item xs={12} md={4}>

        <Button 
        variant="contained"
        color="primary"
        size="large"
        className={classesB.button}
        startIcon={<SaveIcon />}
				onClick={() => handleClickButton(stateVehicle)}
					>
				  	Crear
				</Button>
		</Grid>

    </Grid>
		{console.log(stateVehicle)}
    </React.Fragment>
  );
}
