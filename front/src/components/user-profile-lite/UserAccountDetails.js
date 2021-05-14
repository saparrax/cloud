import PropTypes from "prop-types";
import React, { useState, useEffect } from 'react'
import {
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormGroup,
  FormInput,
  FormSelect,
  FormTextarea,
  Button
} from "shards-react";
import { checkCookies, getCookies } from 'cookies-next';

const UserAccountDetails = ({ title }) => {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + getCookies('ctx', 'token') }
};

  useEffect(() => {
    fetch('/getUsuari/', requestOptions)
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

  return (
  <Card small className="mb-4">
    <CardHeader className="border-bottom">
      <h6 className="m-0">{title}</h6>
    </CardHeader>
    <ListGroup flush>
      <ListGroupItem className="p-3">
        <Row>
          <Col>
          {items.map((post)=> (
            <Form>
              

              <Row form>
                {/* First Name */}
                <Col md="6" className="form-group">
                  <label htmlFor="feFirstName">Nom</label>
                  <FormInput
                    id="feFirstName"
                    placeholder="First Name"
                    value={post.nom}
                    onChange={() => {}}
                  />
                </Col>
                {/* Last Name */}
                <Col md="6" className="form-group">
                  <label htmlFor="feLastName">Cognom</label>
                  <FormInput
                    id="feLastName"
                    placeholder="Last Name"
                    value={post.cognom}
                    onChange={() => {}}
                  />
                </Col>
              </Row>
              <Row form>
                {/* Email */}
                <Col md="6" className="form-group">
                  <label htmlFor="feEmail">Email</label>
                  <FormInput
                    type="email"
                    id="feEmail"
                    placeholder="Email Address"
                    value={post.mail}
                    onChange={() => {}}
                    autoComplete="email"
                  />
                </Col>
                {/* Password */}
                <Col md="6" className="form-group">
                  <label htmlFor="fePhone">Mòbil</label>
                  <FormInput
                    id="fePhone"
                    placeholder="telefon"
                    value={post.telefon}
                    onChange={() => {}}
                  />
                </Col>
              </Row>
              <FormGroup>
                <label htmlFor="feAddress">Data de registre</label>
                <FormInput
                  id="feAddress"
                  placeholder="Address"
                  value={post.dataRegistre.slice(0,10)}
                  onChange={() => {}}
                />
              </FormGroup>
              
              {/*<Button theme="accent">Update Account</Button>*/}

            </Form>
            ))}
          </Col>
        </Row>
      </ListGroupItem>
    </ListGroup>
  </Card>
);
}

UserAccountDetails.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string
};

UserAccountDetails.defaultProps = {
  title: "Dades del compte"
};

export default UserAccountDetails;
