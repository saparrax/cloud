import React from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {Link } from "react-router-dom";

import { Container, Row, Col, Card, CardHeader, CardBody, Button } from "shards-react";
import PageTitle from "../../components/common/PageTitle";

import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react'

const User = () => {

const { id } = useParams()
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('/solicitud2/' + id)
      .then(res => res.json())
			.then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
					console.log(result)
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
      <PageTitle sm="4" title="Info Solicitud" className="text-sm-left" />
    </Row>
    <CRow>
      <CCol lg={6}>
        <CCard>
          <CCardHeader>
            Solicitud id: {id}
          </CCardHeader>
          <CCardBody>
              <table className="table table-striped table-hover">
								{
								items.map( (product) => (
                <tbody>
                   <tr>
                   		<td> Nombre de Contenidors: </td>
						  		 		<td> {product.nombreContenidor} </td>
                   </tr>  
										<tr>
                   		<td> Pes màxim: </td>
						  		 		<td> {product.pesContenidor} </td>
                   </tr>
										<tr>
                   		<td> Activada: </td>
						  		 		<td> {product.activada} </td>
                   </tr>
										<tr>
                   		<td> </td>
                   </tr>	
						<Link to="/recoAutomatica">					
						<Button style={{}} className="mb-2 mr-1">
				    	Modificar
				    </Button>
						</Link>
								</tbody> 
              
                ))}

              </table>
					
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
		</Container>
  )
}

export default User
