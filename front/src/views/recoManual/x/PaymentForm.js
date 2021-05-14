import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';



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
        <Grid item xs={12} md={6}>
          <TextField required id="expDate" label="Descripció" fullWidth autoComplete="cc-exp" />
        </Grid>

		<div>
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
		</Menu>
		</div>

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
