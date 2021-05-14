import React from "react";
import { Container, Button } from "shards-react";
import { Redirect } from "react-router-dom";
import { checkCookies } from 'cookies-next';

function checkUser(){
	return checkCookies('ctx', 'token');
}

function checkAdmin(){
	return checkCookies('ctx', 'admin-gestor');
}

const Map = () => (
  <Container fluid className="main-content-container px-4 pb-4">

	{checkUser() ? console.log("x"):  <Redirect to='/signin'  />}
	{checkAdmin() ? console.log("x"):  <Redirect to='/blog-posts'  />}


		<div>
		<h1>Mapa</h1>
		<img src={require('./testbed.PNG')} alt="Workplace" usemap="#workmap" width="1483" height="1042"/>
		<map name="workmap">
		  <area shape="rect" coords="451,291,498,312" alt="Cont1" href="/Contenidor/8"/>
		  <area shape="rect" coords="295,559,320,597" alt="Cont2" href="/Contenidor/9"/>
		  <area shape="rect" coords="454,726,501,748" alt="Cont3" href="/Contenidor/10"/>
		  <area shape="rect" coords="627,610,657,649" alt="Cont4" href="/Contenidor/11"/>
		</map>
		</div>



  </Container>
);

export default Map;
