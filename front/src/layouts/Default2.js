import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "shards-react";

import MainNavbar from "../components/layout/MainNavbar/MainNavbar";
import MainSidebar from "../components/layout/MainSidebar/MainSidebar";
import MainFooter from "../components/layout/MainFooter";

const DefaultLayout2 = ({ children, noNavbar, noFooter }) => (
  <Container fluid>

        
        {children}
        


  </Container>
);

DefaultLayout2.propTypes = {
  /**
   * Whether to display the navbar, or not.
   */
  noNavbar: PropTypes.bool,
  /**
   * Whether to display the footer, or not.
   */
  noFooter: PropTypes.bool
};

DefaultLayout2.defaultProps = {
  noNavbar: true,
  noFooter: true
};

export default DefaultLayout2;
