/* eslint jsx-a11y/anchor-is-valid: 0 */

import React, { useState, useEffect } from 'react'
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardFooter,
  Badge,
  Button
} from "shards-react";

import PageTitle from "../../components/common/PageTitle";
import { checkCookies } from 'cookies-next';
import { Redirect } from "react-router-dom";

function checkUser(){
  return checkCookies('ctx', 'token');
}

const BlogPosts = ()=> {
      
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  let base=true

  useEffect(() => {
    fetch("/getProductesReutilitzar")
      .then(res => res.json())
      .then(
				(result) => {
					setIsLoaded(true);
					setItems(result);
			},
      (error) => {
				setIsLoaded(true);
				setError(error);
			}
			)
  }, []);

    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        {checkUser() ? console.log("x"):  <Redirect to='/signin'  />}
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="Productes" subtitle="Reutilització" className="text-sm-left" />
        </Row>
        	<Row>
          {items.map((post, idx) => (

            <Col lg="3" md="6" sm="12" className="mb-4" key={idx}>
              <Card small className="card-post h-100">
                <div
                  className="card-post__image"
                  style={{ backgroundImage: `url('${require("../../../../images/" + post.idImatge)}`}}
                />
                <CardBody>
                  <h5 className="card-title">
                    <a className="text-fiord-blue" href={'product/' + post.id}>
                      {post.nom}
                    </a>
                  </h5>
                  <p className="card-text">{post.descripcio}</p>
                </CardBody>
                <CardFooter className="text-muted border-top py-3">
                  <span className="d-inline-block">
                    Categoria: 
                    <a className="text-fiord-blue" >
                      {" "}{post.idCategoria}
                    </a>
                    , pes:
                    <a className="text-fiord-blue" >
                      {" "}{post.pes}{" kg"}
                    </a>
                  </span>
                </CardFooter>
              </Card>
            </Col>
          ))}
        </Row>

      </Container>
    );
}

export default BlogPosts;
