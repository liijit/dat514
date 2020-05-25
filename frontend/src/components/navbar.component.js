import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
    render() {
  				// https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-is-valid.md
  				// Text is wrapped around a button tag to abide to the ARIA model 
        return (
            <nav className="navigation">
			    <ul className="navigation_list">
			        <li className="navigation_item">
			            <Link to="/login" className="nav-l"><button>Login</button></Link>
			        </li>
			        <li className="navigation_item">
			            <Link to="/register" className="nav-l"><button>Register</button></Link>
			        </li>
			        <li className="navigation_item">
			            <Link to="/" className="nav-l"><button>Dashboard</button></Link>
			        </li>
			        <li className="navigation_item">
			            <Link to="/add" className="nav-l"><button>Create</button></Link>
			        </li>
			    </ul>
			</nav>
        )
	}
}