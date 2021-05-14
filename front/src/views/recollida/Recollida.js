import React from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { Container, Row, Col, Card, CardHeader, CardBody, Button } from "shards-react";
import PageTitle from "../../components/common/PageTitle";

import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react'
import {Link } from "react-router-dom";
import moment from 'moment';

const User = () => {
  /*const user = usersData.find( user => user.id.toString() === match.params.id)
  const userDetails = user ? Object.entries(user) : 
    [['id', (<span><CIcon className="text-muted" name="cui-icon-ban" /> Not found</span>)]]*/

const { id } = useParams()
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [dates, setDates] = useState();

  useEffect(() => {
    fetch('/Recollida/' + id)
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
			var id=items[0].id
			console.log(id)
	    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: id })
    };
    fetch('/deleteRecollida', requestOptions);
}

function addDay(date){
	var currentDate = new Date(date.slice(0,10))
	currentDate.setDate(currentDate.getDate() + 1)
	var isoDate = currentDate.toISOString().slice(0,10)
	return isoDate

}


  return (
		<Container fluid className="main-content-container px-4">
    {/* Page Header */}
    <Row noGutters className="page-header py-4">
      <PageTitle sm="4" title="Info Recollida" className="text-sm-left" />
    </Row>
    <CRow>
      <CCol lg={6}>
        <CCard>
          <CCardHeader>
            Recollida id: {id}
          </CCardHeader>
          <CCardBody>
              <table className="table table-striped table-hover">
								{
								items.map( (product) => (


	
			
                <tbody>
								
                   <tr>
                   		<td> Data: </td>
						  		 		<td> {addDay(product.date)} </td>
                   </tr>  
				   <tr>
                   		<td> Hora: </td>
						  		 		<td> {product.time} </td>
                   </tr>
										<tr>
                   		<td> Vehicle: </td>
						  		 		<td> {product.idVehicle} </td>
                   </tr>
										<tr>
                   		<td> Realitzada: </td>
						  		 		<td> {product.realitzada == 0? "pendent" : "completada"} </td>
                   </tr>
				</tbody> 
              
                ))}

              </table>
					<Link to="/Recollides">
					<Button onClick={handleClick} style={{}} theme="danger" className="mb-2 mr-1">
				    	Eliminar
				    </Button>
					</Link>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
		</Container>
  )
}

export default User
