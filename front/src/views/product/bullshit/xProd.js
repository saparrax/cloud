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
import { useParams } from "react-router-dom";

const ViewProduct=()=> {

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

    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="Productes" subtitle="Reutilització" className="text-sm-left" />
        </Row>

        <Row>
          {items.map((post, idx) => (
            <Col lg="20" sm="12" className="mb-4" key={idx}>
              <Card style={{ maxWidth: "300px"}} style={{ maxHeight: "900px"}} className="card-post card-post--aside card-post--1">
                <div
                  className="card-post__image"
                  style={{ backgroundImage: `url('${require("../../images/fotos/" + post.idImatge)}')` }}
                >
                  <Badge
                    pill
                    className={`card-post__category bg-${"info"}`}
                  >
                    {post.idCategoria}
                  </Badge>
                </div>
                <CardBody>
                  <h5 className="card-title">
                    <a className="text-fiord-blue" href="#">
                      {post.nom}
                    </a>
                  </h5>
                  <p className="card-text d-inline-block mb-3">{post.descripcio}</p>

								<p> <span className="text-muted">{post.pes}</span> </p>
      					<Button theme="primary" className="mb-2 mr-1">
        				Reutilitzar
      					</Button>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    );
}


export default ViewProduct;
