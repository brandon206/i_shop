import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import "./nav.scss";

import Sidenav from './side_nav';

class Nav extends Component {
    state = {
        common: [
            {
                text: "Home",
                to: '/'
            },
            {
                text: "Shop",
                to: "/products"
            }
        ],
        auth : [
            {
                text: "Orders",
                to: "/account/orders"
            },
            {
                text: "Profile",
                to: "/account"
            }
        ],
        nonAuth: [
            {
                text: "Sign In",
                to: "/account/sign-in"
            },
            {
                text: "Sign Up",
                to: "/account/sign-up"
            }
        ]
    }

    componentDidMount () {
        this.sideNav = M.Sidenav.init(this.sideNav);
    }

    setSideNavRef = (element) => {
        this.sideNav = element;
    }

    renderSignOut () {
        return <button className = "btn red lighten-1" onClick = { ()=> console.log("Sign out clicked") } >Sign Out</button>
    }

    handleLinkClick = () => {
        if(this.sideNav.isOpen){
            this.sideNav.close();
        }
    }

    buildLink(link) {
        return (
            <li key = {link.to}>
                <Link to = {link.to}>{link.text}</Link>
            </li>
        );
    }

    renderLinks = () => {
        const auth = true;
        let authLinks = [];

        const { auth: navAuth, common, nonAuth } = this.state;

        const commonLinks = common.map(this.buildLink);

        if(auth){
            authLinks = navAuth.map(this.buildLink);
            authLinks.push(<li className = "sign-out" key = "/sign-out">{this.renderSignOut()}</li>);
            } else {
                authLinks = nonAuth.map(this.buildLink);
            }
            //concatenates the two arrays together
            return [...commonLinks, ...authLinks];
    }


    render () {
        return (
            <Fragment>
                <nav className = "green lighten-1">
                    <div className="nav-wrapper">
                        <Link className = "brand-logo" to ="/">iShop</Link>
                        <Link to="#" data-target = "side-nav" className = "sidenav-trigger">
                            <i className="material-icons">menu</i>
                        </Link>
                        <ul className = "right hide-on-med-and-down">
                            {this.renderLinks()}
                        </ul>
                    </div>
                </nav>

                <Sidenav setRef = {this.setSideNavRef} renderLinks = {this.renderLinks}/>
            </Fragment>
        );
    }
}

export default Nav;