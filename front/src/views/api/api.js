/*import React, { useState, useEffect } from "react";
import { Container, Button } from "shards-react";

function Errors() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/users")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="App">
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h5>{product.id} {product.nom} {product.edat}</h5> <br />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Errors;*/







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

const getBadge = status => {
  switch (status) {
    case 'Automàtica': return 'success'
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
    fetch("/Usuari")
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
    currentPage !== newPage && history.push(`/api?page=${newPage}`)
  }

  useEffect(() => {
    currentPage !== page && setPage(currentPage)
  }, [currentPage, page])

  return (
		<Container fluid className="main-content-container px-4">
    {/* Page Header */}
    <Row noGutters className="page-header py-4">
      <PageTitle sm="4" title="Usuaris" subtitle="Usuari" className="text-sm-left" />
    </Row>

    <CRow>
      <CCol xl={12}>
        <CCard>
          <CCardBody>
          <CDataTable
            items={items}
            fields={[
              { key: 'id', _classes: 'font-weight-bold' },
              'nom', 'cognom', 'mail', 'telefon', 'contrasenya'
            ]}
            hover
            striped
            itemsPerPage={10}
            activePage={page}
            clickableRows
            onRowClick={(item) => history.push(`/apiview/${item.id}`)}
            scopedSlots = {{
              'status':
                (item)=>(
                  <td>
                    <CBadge color={getBadge(item.status)}>
                      {item.status}
                    </CBadge>
                  </td>
                )
            }}
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
