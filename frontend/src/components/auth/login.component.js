import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as Logo } from '../../assets/planture.svg'

export default class UserLogin extends Component {
    render() {
        return (
        <div className="menucontainer">
            <div className="container nopad">
                <div className="flexy">
                    <div className="menu">
                        <div className="column">
                            <div className="row logo-c">
                                <Logo />
                            </div>
                            <div className="column">
                                <form>
                                    <div className="labelcont">
                                        <label className="label" htmlFor="username">
                                            <p>USERNAME</p>
                                        </label>
                                        <label className="labelres">
                                            <p>{}</p>
                                        </label>
                                    </div>
                                    <input type="text" id="usernameField"/>
                                    <div className="labelcont">
                                        <label className="label">
                                            <p>PASSWORD</p>
                                        </label>
                                    </div>
                                    <input type="password" id="retypepasswordField"/>
                                    <button className="buttonW b1" type="submit" value="login">LOGIN</button>

                                    <Link to="/register"> <button className="buttonW b2" type="submit" value="createUser">Create an account</button> </Link>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="background">
            </div>
        </div>
        )
    }
}