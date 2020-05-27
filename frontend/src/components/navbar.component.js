import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as Logo } from '../assets/logo.svg'


export default class Navbar extends Component {
    render() {
  				// https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-is-valid.md
  				// Text is wrapped around a button tag to abide to the ARIA model 
        return (
        	<div className="navCont">
            <div className="navigation">
			    <ul className="navigation_list">
			    <div className="flexy2">
            <div className="logo">
        	<Logo />
			</div>
			<div className="linkCont flexy3">
			        <li className="navigation_item">
			            <Link to="/login" className="nav-l"><button>Login</button></Link>
			        </li>
			        <li className="navigation_item">
			            <Link to="/register" className="nav-l"><button>Register</button></Link>
			        </li>
			        <li className="navigation_item">
			            <Link to="/" className="nav-l"><button>Dashboard</button></Link>
			        </li>
			        </div>
			        </div>
			    </ul>
			</div>
			</div>
        )
	}
}