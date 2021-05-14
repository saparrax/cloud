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

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';



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


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

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
const { id } = useParams()

	const [selectedDate, setSelectedDate] = React.useState(null);
	const [stateV, setStateV] = React.useState(null);
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
    fetch('/getUbicacio/')
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

function handleClickButton(p1,p2,p3){
  if(p1==null || p2==null || p3==null) return alert("camps obligatoris buits")
	var date
	date=p2.getFullYear() + '-' + (p2.getMonth() + 1) + '-' + p2.getDate();
	var time
	time=p2.getHours() + ':' + p2.getMinutes() + ':' + p2.getSeconds();
 
	var list=[]
	list: list.push({id})

{console.log(list)}

	console.log(date)
	console.log(time)
	 const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + getCookies('ctx', 'token') },
        body: JSON.stringify({ reserva: {date:date , time:time, idUbicacio:p1, idVehicle:p3.idVehicle}, producte:list })
    };
    fetch('/addReservaReutilitzar', requestOptions)
    .then(response => {
      if(response.ok){
         history.push("/blog-posts" );
         return;
      }else{
        alert("camps obligatoris erronis")
        return;
      }
    });
}

  const classes = useStyles();
  const [ubi, setUbi] = React.useState(null);

  const handleChange = (event) => {
    setUbi(event.target.value);
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Dates
      </Typography>
      <Grid container spacing={3}>

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

		<Grid item xs={12}>
			<div>
				<FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Ubicació</InputLabel>
        	<Select
		        labelId="demo-simple-select-label"
		        id="demo-simple-select"
		        value={ubi}
		        onChange={handleChange}
		      >
						{items.map((post) =>( 
		        <MenuItem value={post.value}> {post.value}</MenuItem>
						))}
        	</Select>

      	</FormControl>
			</div>


		</Grid>
		
				{/*<Button 
				onClick={() => handleClickButton(ubi,selectedDate)}
					>
				  	Reservar
        </Button>*/}
        <Button 
        variant="contained"
        color="primary"
        size="large"
        className={classesB.button}
        startIcon={<SaveIcon />}
				onClick={() => handleClickButton(ubi,selectedDate, stateV)}
					>
				  	Reservar
				</Button>

    </Grid>
{console.log(ubi)}
    </React.Fragment>
  );
}
