import React from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {Link } from "react-router-dom";

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
    fetch('/ubicacio2/' + id)
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

function handleClick(e){
	 //window.open('/Reserves')
			var id=items[0].TAG
			{console.log(id)}
	    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: id })
    };
    fetch('/deleteUbicacio', requestOptions);
}

  return (

		<Container fluid className="main-content-container px-4">
    {/* Page Header */}
    <Row noGutters className="page-header py-4">
      <PageTitle sm="4" title="Info Ubicacio" className="text-sm-left" />
    </Row>
    <CRow>
      <CCol lg={6}>
        <CCard>
          <CCardBody>
              <table className="table table-striped table-hover">
								{
								items.map( (product) => (
                <tbody>
										<tr>
                   		<td> Ubicació: </td>
						  		 		<td> {product.TAG} </td>
                   </tr>
										<p> </p>	
						<Link to="/ubicacions">					
						<Button onClick={handleClick} style={{}} theme="danger" className="mb-2 mr-1">
				    	Eliminar
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
