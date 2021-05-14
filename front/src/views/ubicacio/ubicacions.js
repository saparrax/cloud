import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CPagination
} from '@coreui/react'

import { Container, Row, Col, Card, CardHeader, CardBody } from "shards-react";
import PageTitle from "../../components/common/PageTitle";
import { Redirect } from "react-router-dom";
import { checkCookies } from 'cookies-next';

function checkUser(){
	return checkCookies('ctx', 'token');
}

function checkAdmin(){
	return checkCookies('ctx', 'admin-gestor');
}


const getBadge = status => {
  switch (status) {
    case '0': return 'success'
    case 'Manual': return 'secondary'
    default: return 'primary'
  }
}

const Users = () => {
  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)


  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("/getUbicacions")
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




  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/ubicacions?page=${newPage}`)
  }

  useEffect(() => {
    currentPage !== page && setPage(currentPage)
  }, [currentPage, page])

  return (
		<Container fluid className="main-content-container px-4">
    {/* Page Header */}
    {checkUser() ? console.log("x"):  <Redirect to='/signin'  />}
    {checkAdmin() ? console.log("x"):  <Redirect to='/blog-posts'  />}
    <Row noGutters className="page-header py-4">
      <PageTitle sm="4" title="Ubicacions" subtitle="Ubicacio" className="text-sm-left" />
    </Row>

    <CRow>
      <CCol xl={12}>
        <CCard>
          <CCardBody>
          <CDataTable
            items={items}
            fields={[
              { key: 'TAG', _classes: 'font-weight-bold' }
            ]}
            hover
            striped
            itemsPerPage={10}
            activePage={page}
            clickableRows
            onRowClick={(item) => history.push(`/ubicacio/${item.TAG}`)}
            /*scopedSlots = {{
              'realitzada':
                (item)=>(
                  <td>
                    <CBadge color={getBadge(item.status)}>
                      {item.realitzada}
                    </CBadge>
                  </td>
                )
            }}*/
          />
          <CPagination
            activePage={page}
            onActivePageChange={pageChange}
            pages={5}
            doubleArrows={false} 
            align="center"
          />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
		</Container>
  )
}

export default Users
