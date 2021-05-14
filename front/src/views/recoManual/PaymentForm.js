import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import CustomFileUpload from "../../components/components-overview/CustomFileUpload";
import Editor from "../../components/add-new-post/Editor";
import Toggle from "./toggle";

import Switch from '@material-ui/core/Switch';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import {Link } from "react-router-dom";

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';



import { useState, useEffect } from 'react'

import {
  Row,
  Col,
  Form,
  FormInput,
	Button,
  FormSelect,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
	FormCheckbox
} from "shards-react";

import { Redirect } from "react-router-dom";
import { checkCookies, getCookies } from 'cookies-next';
import { useHistory } from 'react-router-dom';

function checkUser(){
	return checkCookies('ctx', 'token');
}
function checkAdmin(){
	return checkCookies('ctx', 'admin-gestor');
}



export default function PaymentForm() {
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  const [state, setState] = React.useState(null);
  const [stateV, setStateV] = React.useState(null);

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

	const [selectedDate, setSelectedDate] = React.useState(null);
  const handleDateChange = (date) => {
    setSelectedDate(date);

    var data
    data=date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    var hora
    hora=date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    //console.log(data+" "+hora)


    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date: data, time:hora })
  };
  fetch('/checkHorari', requestOptions)
  .then(response => response.json())
  .then(data => {
    if(data.status==0){
       setStateV({idVehicle: data.vehicle})
       return;
    }else{
      setStateV(null)
      alert("hora ocupada")
      return;
    }
  });


  };

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('/getContenidors/')
      .then(res => res.json())
			.then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        (error) => {
        setIsLoaded(true);
        setError(error);
        });
  }, []);

{/*console.log(items)*/}

function handleClickButton(p1,p2,p3){
  //console.log(p3.idVehicle)
  if(p1==null || p2==null || p3==null) return alert("camps obligatoris buits")

  var list=[]
	Object.keys(p1).forEach(function(key, keyIndex) {
		//console.log("index:",keyIndex,"key:",key,"value:",p1[key]);
    if(p1[key]) list: list.push({id :key})
  });

	if(list.length ==0) return alert("No has seleccionat cap contenidor")

	//console.log(list)
	var date
	date=p2.getFullYear() + '-' + (p2.getMonth() + 1) + '-' + p2.getDate();
	var time
	time=p2.getHours() + ':' + p2.getMinutes() + ':' + p2.getSeconds();
 
	//console.log(date)
	//console.log(time)
	 const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + getCookies('ctx', 'token') },
        body: JSON.stringify({ recollida: {date:date , time:time, idVehicle:p3.idVehicle}, contenidor:list })
    };
    fetch('/addRecollida', requestOptions)
    .then(response => {
      if(response.ok){
         history.push("/recollides" );
         return;
      }else{
        alert("camps obligatoris erronis")
        return;
      }
    });


};

/*
  var b= new Boolean(false);
  if(p1==null || p2==null) return alert("camps obligatoris buits")
  Object.keys(p1).map((key, keyIndex) =>{
    //if(p1[key]==true) b=true
    console.log(p1[key])
  });
  if(!b) return alert("camps obligatoris buits")*/

 
	//console.log(date)
	//console.log(time)
	 


  return (
    <React.Fragment>
      {checkUser() ? console.log("x"):  <Redirect to='/signin'  />}
      {checkAdmin() ? console.log("x"):  <Redirect to='/blog-posts'  />}
      <Typography variant="h6" gutterBottom>
        Contenidors per la recollida
      </Typography>
      <Grid container spacing={3}>

    <Grid item xs={12}>
		
		<FormControl component="fieldset">
      <FormLabel component="legend">Contenidors</FormLabel>
      <FormGroup>
				{
				items.map((contenidor) => (
        <FormControlLabel
          control={<Switch onChange={handleChange} name={contenidor.id} />}
          label={contenidor.nom}
        />
				))}
      </FormGroup>
    </FormControl>

		</Grid>

		<MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Data"
          format="dd/MM/yyyy"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <KeyboardTimePicker
          margin="normal"
          id="time-picker"
          label="Hora"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
		
				<Button 
				onClick={() => handleClickButton(state, selectedDate, stateV)}
					>
				  	Guardar
				</Button>

    </Grid>
		{/*console.log((state))*/}
		{console.log(state, stateV, selectedDate)}
    </React.Fragment>
  );
}

