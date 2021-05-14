import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {Link } from "react-router-dom";
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';


import React, { useState, useEffect } from 'react'
import {
  Container,
  Row,
  Col,
  CardBody,
  CardFooter,
  Badge
} from "shards-react";

import PageTitle from "../../components/common/PageTitle";
import { useParams } from "react-router-dom";


const useStyles = makeStyles({
  root: {
    maxWidth: 1920,
  },
});

const useStylesB = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(2),
    //position: 'absolute',
    //bottom:0,
    //left: 600,
    //alignSelf: 'flex-end',
  },
}));

export default function ImgMediaCard() {

const classesB = useStylesB();
const { id } = useParams()
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('/getProducte/' + id)
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
  const classes = useStyles();

  return (

      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="Productes" subtitle="Reutilització" className="text-sm-left" />
        </Row>
				<Row>
				{items.map((post, idx) => (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="500"
          image={require("../../../../images/"+post.idImatge)}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {post.nom}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {post.descripcio}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
			<Link to={"/reutilitzacio/" + post.id}>
        {/*<Button size="small" color="primary">
          Reutilitzar
        </Button>*/}
         <Button 
        variant="contained"
        color="primary"
        size="large"
        className={classesB.button}
        endIcon={<Icon>send</Icon>}
					>
				  	Reutilitzar
				</Button>
			</Link>
      </CardActions>
    </Card>

		))}
		</Row>
    </Container>
  );
}
