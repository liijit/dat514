import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as Logo } from '../assets/logo.svg'
import options from './auth/options.components'

export default class Navbar extends Component {
    render() {
        return (
            <div className="navigation">
			    <ul className="navigation_list">
			    <div className="flexy2">
            <div className="logo">
        	<Logo />
			</div>
			<div className="linkCont flexy3">
			        <li className="navigation_item">
			            <Link to="/" className="nav-l"><button>Dashboard</button></Link>
			        </li>
			        <li className="navigation_item">
			            <Link to="/login" className="nav-l"><button>Login</button></Link>
			        </li>
			        </div>
			        </div>
			    </ul>
			</div>
        )
	}
}