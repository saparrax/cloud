import React from "react";
import { Container, Row, Col } from "shards-react";

import PageTitle from "../components/common/PageTitle";
//import UserDetails from "../components/user-profile-lite/UserDetails";
import UserAccountDetails from "../components/user-profile-lite/UserAccountDetails";

import { Redirect } from "react-router-dom";
import { checkCookies } from 'cookies-next';

function checkUser(){
	return checkCookies('ctx', 'token');
  }

const UserProfileLite = () => (
  <Container fluid className="main-content-container px-4">
    {checkUser() ? console.log("x"):  <Redirect to='/signin'  />}
    <Row noGutters className="page-header py-4">
      <PageTitle title="Perfil del usuari" subtitle="Overview" md="12" className="ml-sm-auto mr-sm-auto" />
    </Row>
    <Row>
      {/*<Col lg="4">
        <UserDetails />
      </Col>*/}
      <Col lg="8">
        <UserAccountDetails />
      </Col>
    </Row>
  </Container>
);

export default UserProfileLite;
