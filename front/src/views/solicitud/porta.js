import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CPagination
} from '@coreui/react'

import { Container, Row, Col, Card, CardHeader, CardBody } from "shards-react";
import PageTitle from "../../components/common/PageTitle";


import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';


import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import {Link } from "react-router-dom";
import SaveIcon from '@material-ui/icons/Save';

import { Redirect } from "react-router-dom";
import { checkCookies, getCookies } from 'cookies-next';
import "./styles.css";
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function checkUser(){
  return checkCookies('ctx', 'token');
}


var list=[]
var cont=1

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});


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

const useStylesI = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
}));

const useStyles2 = makeStyles((theme) => ({
  root: {
    width: '50%',
    maxWidth: 180,
    backgroundColor: theme.palette.background.paper,
  },
}));

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);





const Porta = () => {
  const history = useHistory();

  const classesB = useStylesB();
  const classesI = useStylesI();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setState({})
  };


	function handleSave(p1){
    //console.log(list)
    var i =list.findIndex(obj =>obj.id ==p1.id)
    //console.log(i)
    if(!p1.nom || !p1.pes || !p1.descripcio || !p1.idCategoria || !p1.idImatge || !p1.file) return alert("camps obligatoris incomplerts")
    if(i != "-1"){
      list[i]={ id : p1.id, nom:p1.nom, pes:p1.pes, descripcio:p1.descripcio, idCategoria:p1.idCategoria, idImatge: p1.idImatge, file:p1.file}
      
    } 
    else {
      
      list : list.push({ id : cont, nom:p1.nom, pes:p1.pes, descripcio:p1.descripcio, idCategoria:p1.idCategoria, idImatge: p1.idImatge, file: p1.file})
      cont=cont+1
    }
    setState({});
		setOpen(false);
  }
  
  function handleDelete(p1){
    var i = list.findIndex(obj =>obj.id ==p1)
    //console.log(i)
    list.splice(i, 1)
    setOpen(false);
    setState({})
	}

	const [state, setState] = React.useState({ nom: '', descripcio: '', pes: '', idCategoria :'', idImatge: '', file:''
  });

	const [stateR, setStateR] = React.useState({ idUbicacio: ''
  });

  const [stateD, setStateD] = React.useState(null);
	const [stateV, setStateV] = React.useState(null);

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleChangeR = (event) => {
    setStateR({ ...stateR, [event.target.name]: event.target.value });
  };

  const handleDateChange = (date) => {
    setStateD(date);

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

  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const handleListItemClick = (event, p1) => {

    //state = list[list.findIndex(obj =>obj.id ==p1)]
    setState(list[list.findIndex(obj =>obj.id ==p1)])
    //setSelectedFile(list[list.findIndex(obj =>obj.id ==p1)].selected)

    setOpen(true);
    

  };

  function getBase64(file, cb) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        cb(reader.result)
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
}

  function handleClickButton(p1,p2,p3,p4){
    //console.log(p1)
    //console.log(p2)
    if(!p1.idUbicacio || p2==null || p3.length==0 || p4==null) return alert("camps obligatoris incomplerts")

    
    /*const data=''

    p3.map((post) =>(
    data = new FormData();
    data.append('file', post.file);
    axios.post('/saveImage', data);
    //console.log(post)
      
    ));*/

    var data=''
    Object.keys(p3).forEach(function(key, keyIndex) {
      data = new FormData();
      data.append('file', p3[key].file);
      axios.post('/saveImage', data);
      //console.log(p3[key].file)
    });
      
    
    //setear name a idImatge
    Object.keys(p3).forEach(function(key, keyIndex) {
     p3[key].idImatge=p3[key].file.name
    });
    //console.log(p3)

  
    list=[]
    var date
    date=p2.getFullYear() + '-' + (p2.getMonth() + 1) + '-' + p2.getDate();
    var time
    time=p2.getHours() + ':' + p2.getMinutes() + ':' + p2.getSeconds();
	  const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + getCookies('ctx', 'token') },
        body: JSON.stringify({ reserva: {date:date , time:time, idUbicacio:p1.idUbicacio, idVehicle:p4.idVehicle}, producte:p3 })
    };
    fetch('/addReservaPorta', requestOptions)
     .then(response => {
      if(response.ok){
         history.push("/blog-posts" );
         return;
      }else{
        alert("error")
        return;
      }
    });
  }


  const [selectedFile, setSelectedFile] = useState()
  const [preview, setPreview] = useState()

  useEffect(() => {
    if (!selectedFile) {
        setPreview(undefined)
        return
    }

    const objectUrl = URL.createObjectURL(selectedFile)
    setPreview(objectUrl)

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl)
}, [selectedFile])

  const onSelectFile = e => {
    if (!e.target.files || e.target.files.length === 0) {
        setSelectedFile(undefined)
        return
    }

    console.log(e.target.files[0])
    setSelectedFile(e.target.files[0])
    setState({ ...state, [e.target.name]: URL.createObjectURL(e.target.files[0]), file: e.target.files[0]});
    //setState({ ...state, file: e.target.files[0]});

}

  const classes = useStyles();

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('/getCategories/')
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


  const [error2, setError2] = useState(null);
  const [isLoaded2, setIsLoaded2] = useState(false);
  const [items2, setItems2] = useState([]);

  useEffect(() => {
    fetch('/getUbicacio/')
      .then(res => res.json())
			.then(
        (result) => {
          setIsLoaded2(true);
          setItems2(result);
        },
        (error) => {
        setIsLoaded2(true);
        setError2(error);
        });
  }, []);

  const classes2 = useStyles2();

  return (
		<React.Fragment>
    {/* Page Header */}
    {checkUser() ? console.log("x"):  <Redirect to='/signin'  />}
    {/*<Row noGutters className="page-header py-4">
      <PageTitle sm="4" title="Sol·licitud de servei" subtitle="Porta a porta" className="text-sm-left" />
    </Row>
		
		<CRow>
			<CCol xl={12}>
				 <CCard>
          <CCardBody>*/}



				<div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Nou producte
      </Button>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Producte
        </DialogTitle>
        <DialogContent dividers>
          
          
          <TextField onChange={handleChange} defaultValue={state.nom} name="nom" required id="cardName" label="Nom" fullWidth autoComplete="cc-name" />
        
          <TextField
						defaultValue={state.descripcio}
						
						onChange={handleChange}
						name="descripcio"
            required id="cardNumber"
            label="Descripció"
            fullWidth
            autoComplete="cc-number"
          />
					
          <TextField onChange={handleChange} defaultValue={state.pes} name="pes" required id="cardName" label="Pes" fullWidth autoComplete="cc-name" />


		<Grid item xs={12}>
			<div>
				<FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Categories</InputLabel>
        	<Select
		        labelId="demo-simple-select-label"
		        id="demo-simple-select"
						name="idCategoria"
		        defaultValue={state.idCategoria}
		        onChange={handleChange}
		      >
						{items.map((post) =>( 
		        <MenuItem value={post.value}> {post.value}</MenuItem>
						))}
        	</Select>

      	</FormControl>
			</div>

		</Grid>


    <Grid item xs={12}>
<div>
  <input
        accept="image/*"
        className={classesI.input}
        id="contained-button-file"
        type="file"
        name="idImatge"
        onChange={onSelectFile}
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary" component="span">
          Upload
        </Button>
        {(state.idImatge) && <img className="photo" src={state.idImatge} />}
      </label>


</div>

</Grid>

        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => handleSave(state)} color="primary">
            Guardar els canvis
          </Button>

          <Button autoFocus onClick={() => handleDelete(state.id)} color="primary">
            Esborrar
          </Button>
        </DialogActions>
      </Dialog>

    



      <div className={classes2.root}>
      <List>
        {list.map((post) => (
        <ListItem
          button
          selected={selectedIndex}
          onClick={(event) => handleListItemClick(event, post.id)}
        >
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText primary={post.nom} />
        </ListItem>
        
        ))}
        
      </List>
    </div>




	<Typography variant="h6" gutterBottom>
        Dates
      </Typography>




		<MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Data"
          format="dd/MM/yyyy"
          value={stateD}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <KeyboardTimePicker
          margin="normal"
          id="time-picker"
          hiddenLabel
          label="Hora"
          value={stateD}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>

        <Typography variant="h6" gutterBottom>
        Ubicacio
      </Typography>



		<Grid item xs={12}>
			<div>
				<FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Ubicació</InputLabel>
        	<Select
		        labelId="demo-simple-select-label"
		        id="demo-simple-select"
            //value={stateR.ubi}
            name='idUbicacio'
		        onChange={handleChangeR}
		      >
						{items2.map((post) =>( 
		        <MenuItem value={post.value}> {post.value}</MenuItem>
						))}
        	</Select>

      	</FormControl>

      
			</div>

      
		</Grid>
        <Button 
        variant="contained"
        color="primary"
        size="large"
        className={classesB.button}
        startIcon={<SaveIcon />}
				onClick={() => handleClickButton(stateR,stateD,list, stateV)}
					>
				  	Reservar
				</Button>

    </div>
		{/*
          </CCardBody>
        </CCard>
			</CCol>
		</CRow>*/}
              {/*console.log(state)*/}
              {console.log(list)}
              {/*console.log(stateD)*/}
              {console.log(state)}
		</React.Fragment>
		
  )
}

export default Porta
