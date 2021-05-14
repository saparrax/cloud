import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import CustomFileUpload from "../../components/components-overview/CustomFileUpload";
import Editor from "../../components/add-new-post/Editor";

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import {Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { checkCookies } from 'cookies-next';
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
	Button
} from "shards-react";

function checkUser(){
	return checkCookies('ctx', 'token');
  }

export default function PaymentForm() {
  const history = useHistory();

  const [stateS1, setStateS1] = React.useState({
    checkedA: true,
  });

  const handleChangeS1 = (event) => {
    setStateS1({ ...stateS1, [event.target.name]: event.target.checked });
  };

  const [stateT1, setStateT1] = React.useState({
    textFieldValue: '',
  });

  const handleChangeT1 = (event) => {
    setStateT1({ ...stateT1, [event.target.name]: event.target.value });
  };

  const [stateT2, setStateT2] = React.useState({
    textFieldValue: '',
  });

  const handleChangeT2 = (event) => {
    setStateT2({ ...stateT2, [event.target.name]: event.target.value });
  };

function handleClick(p1,p2,p3){
  console.log(p1)
    if(!p1.textFieldValue || !p2.textFieldValue || !p3) return alert("existeixen camps obligatoris buits")
	  const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pes: p1.textFieldValue, num: p2.textFieldValue, activada:p3.checkedA })
    };
    fetch('/updateSolicitud', requestOptions)
    .then(response => {
      if(response.ok){
        history.push("/solicitudAutomatica" );
        return;
      }else{
        alert("camps obligatoris erronis")
        return;
      }
    });
}

  return (
    <React.Fragment>
      {checkUser() ? console.log("x"):  <Redirect to='/signin'  />}
      <Typography variant="h6" gutterBottom>
        Contenidors per la recollida
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField onChange={handleChangeT1} name="textFieldValue" required id="cardName" label="Pes màxim" fullWidth autoComplete="cc-name" />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
						defaultValue=""
						onChange={handleChangeT2}
						name="textFieldValue"
            required id="cardNumber"
            label="Nombre"
            fullWidth
            autoComplete="cc-number"
          />
        </Grid>
				<Grid item xs={12} md={6}>
      <FormControlLabel
        control={<Switch checked={stateS1.checkedA} onChange={handleChangeS1} name="checkedA" />}
        label="Activada"
      />
				<Button onClick={() => handleClick(stateT1,stateT2,stateS1)} style={{}} className="mb-2 mr-1">
				  	Guardar
				</Button>
        </Grid>
    </Grid>
    </React.Fragment>
  );
}
