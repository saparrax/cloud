import React from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { Container, Row, Col, Card, CardHeader, CardBody, Button } from "shards-react";
import PageTitle from "../../components/common/PageTitle";

import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react'

const User = () => {
  /*const user = usersData.find( user => user.id.toString() === match.params.id)
  const userDetails = user ? Object.entries(user) : 
    [['id', (<span><CIcon className="text-muted" name="cui-icon-ban" /> Not found</span>)]]*/

const { id } = useParams()
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('/Usuari/' + id)
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
      <PageTitle sm="4" title="Info Usuari" className="text-sm-left" />
    </Row>
    <CRow>
      <CCol lg={6}>
        <CCard>
          <CCardHeader>
            Contenidor id: {id}
          </CCardHeader>
          <CCardBody>
              <table className="table table-striped table-hover">
								{
								items.map( (product) => (
                <tbody>
                   <tr>
                   		<td> Nom: </td>
						  		 		<td> {product.nom} </td>
                   </tr>  
										<tr>
                   		<td> Cognom: </td>
						  		 		<td> {product.cognom} </td>
                   </tr>
								</tbody> 
              
                ))}

              </table>
					<Button style={{}} theme="danger" className="mb-2 mr-1">
				    	Eliminar
				    </Button>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
		</Container>
  )
}

export default User
