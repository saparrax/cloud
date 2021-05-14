import React, { useState, useEffect } from 'react'
import { NavItem, NavLink, Badge, Collapse, DropdownItem } from "shards-react";


export default class Notifications extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
			items: [],
			items2:[]
    };

    this.toggleNotifications = this.toggleNotifications.bind(this);
  }

	componentDidMount() {
    // Simple GET request using fetch

		const requestOptions = {
    	method: 'GET',
    	headers: { 'Content-Type': 'application/json' }
		};


    fetch('/productesMensuals',requestOptions)
        .then(response => response.json())
        .then((result) => this.setState({ items: result }));

		fetch('/reutilitzacioMensuals',requestOptions)
        .then(response => response.json())
        .then((result) => this.setState({ items2: result }));
	}

  toggleNotifications() {
    this.setState({
      visible: !this.state.visible
    });
  }

  render() {
    return (
      <NavItem className="border-right dropdown notifications">
			{console.log(this.state.items)}
        <NavLink
          className="nav-link-icon text-center"
          onClick={this.toggleNotifications}
        >
          <div className="nav-link-icon__wrapper">
            <i className="material-icons">&#xE7F4;</i>
            {/*<Badge pill theme="danger">
              2
            </Badge>*/}
          </div>
        </NavLink>
        <Collapse
          open={this.state.visible}
          className="dropdown-menu dropdown-menu-small"
        >
          <DropdownItem>
            <div className="notification__icon-wrapper">
              <div className="notification__icon">
                <i className="material-icons">&#xE6E1;</i>
              </div>
            </div>
            <div className="notification__content">
              <span className="notification__category">Analisi</span>
							{this.state.items.map(item => (
              <p>
                Aquest mes hi han hagut{" "}
                <span className="text-success text-semibold">{item.num}</span> nous productes per reutilitzar
              </p>
							))}
            </div>
          </DropdownItem>
          <DropdownItem>
            <div className="notification__icon-wrapper">
              <div className="notification__icon">
                <i className="material-icons">&#xE8D1;</i>
              </div>
            </div>
            <div className="notification__content">
              <span className="notification__category">Gestió productes</span>
						{this.state.items2.map(item => (
              <p>
                Aquest mes hi han hagut {" "}
                <span className="text-success text-semibold"> {item.num}</span> productes reutilitzats
              </p>
						))}
            </div>
          </DropdownItem>
          <DropdownItem className="notification__all text-center">
            View all Notifications
          </DropdownItem>
        </Collapse>
      </NavItem>
    );
  }
}
