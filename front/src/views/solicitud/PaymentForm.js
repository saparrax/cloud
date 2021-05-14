import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import CustomFileUpload from "../../components/components-overview/CustomFileUpload";
import Editor from "../../components/add-new-post/Editor";

import {
  Row,
  Col,
  Form,
  FormInput,
  FormSelect,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from "shards-react";



export default function PaymentForm() {

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Dades del producte
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField required id="cardName" label="Pes" fullWidth autoComplete="cc-name" />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardNumber"
            label="Volum"
            fullWidth
            autoComplete="cc-number"
          />
        </Grid>
		

			<div> {/*
        <Grid item xs={12} md={12}>
          <TextField required id="expDate" label="Descripció" fullWidth autoComplete="cc-exp" />
        </Grid>

    <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
  		Categoria
		</Button>
		<Menu
  			id="simple-menu"
  			anchorEl={anchorEl}
  			keepMounted
  			open={Boolean(anchorEl)}
  			onClose={handleClose}
		>
  		<MenuItem onClick={handleClose}>Moble</MenuItem>
  		<MenuItem onClick={handleClose}>Deixalles</MenuItem>
  		<MenuItem onClick={handleClose}>Electrodomèstic</MenuItem>
		</Menu>*/}
		</div>

		  {/* Editor */}
      <Col lg="19" md="12">
        <Editor />
      </Col>
		

		<Grid item xs={12} md={6}>
			<div>
        <Col md="16" className="form-group">
        <FormSelect>
            <option>Categoria ...</option>
            <option>C1</option>
						<option>C2</option>
						<option>C3</option>
						<option>C4</option>
						<option>C5</option>
        </FormSelect>
        </Col>
			</div>
		</Grid>
		<Grid item xs={12} md={6}>
			<CustomFileUpload />
		</Grid>

    <Grid item xs={12}>
			<FormControlLabel
	      control={<Checkbox color="secondary" name="saveCard" value="yes" />}
        label="Reutilització"
      />
		</Grid>
    </Grid>
    </React.Fragment>
  );
}
