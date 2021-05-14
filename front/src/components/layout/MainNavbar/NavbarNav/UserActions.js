import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react'
import { checkCookies, getCookies } from 'cookies-next';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  NavItem,
  NavLink
} from "shards-react";

export default class UserActions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
			isLoaded: false,
			items: []
    };

    this.toggleUserActions = this.toggleUserActions.bind(this);
  }

  toggleUserActions() {
    this.setState({
      visible: !this.state.visible
    });
  }

	componentDidMount() {
    // Simple GET request using fetch

		const requestOptions = {
    	method: 'GET',
    	headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + getCookies('ctx', 'token') }
		};
    fetch('/getUsuari',requestOptions)
        .then(response => response.json())
        .then((result) => this.setState({ isLoaded: true,items: result }));
	}


  

  render() {
    return (
      <NavItem tag={Dropdown} caret toggle={this.toggleUserActions}>
        <DropdownToggle caret tag={NavLink} className="text-nowrap px-3">
          <img
            className="user-avatar rounded-circle mr-2"
            src={require("./../../../../images/avatars/iconç.png")}
            alt="User Avatar"
          />{" "}
					{this.state.items.map(item => (
          <span className="d-none d-md-inline-block">{item.nom}</span>
					))}
        </DropdownToggle>
        <Collapse tag={DropdownMenu} right small open={this.state.visible}>
          <DropdownItem tag={Link} to="/user-profile-lite">
            <i className="material-icons">&#xE7FD;</i> Profile
          </DropdownItem>
          {/*<DropdownItem tag={Link} to="edit-user-profile">
            <i className="material-icons">&#xE8B8;</i> Edit Profile
          </DropdownItem>*/}
          {/*<DropdownItem tag={Link} to="file-manager-list">
            <i className="material-icons">&#xE2C7;</i> Files
          </DropdownItem>
          <DropdownItem tag={Link} to="transaction-history">
            <i className="material-icons">&#xE896;</i> Transactions
          </DropdownItem>*/}
          <DropdownItem divider />
          <DropdownItem tag={Link} to="/signin" className="text-danger">
            <i className="material-icons text-danger">&#xE879;</i> Logout
          </DropdownItem>
        </Collapse>
      </NavItem>
    );
  }
}
