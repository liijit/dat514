import React, { Component } from 'react';
import { ReactComponent as Logo } from '../assets/planture.svg'

export default class UserLogin extends Component {
    render() {
        return (
        <div className="menucontainer">
            <div className="container nopad">
                <div className="flexy">
                    <div className="menu">
                        <div className="column">
                            <div className="row logo-c">
                                <Logo/>
                            </div>
                            <div className="column">
                                <form onSubmit= {this.onSubmit}>
                                    <div className="label1cont">
                                        <label className="label1" htmlFor="username"><p>USERNAME</p></label>
                                        <label className="label1res" htmlFor="res"><p>Username doesn't exist</p></label>
                                    </div>
                                    <input type="text" id="usernameField"/>
                                    <div className="label2cont">
                                        <label className="label2" htmlFor="password"><p>PASSWORD</p></label>
                                        <label className="label2res" htmlFor="res"><p>Incorrect password</p></label>
                                    </div>
                                    <input type="password" id="passwordField"/>
                                    <button className="buttonW b1" type="submit" value="login">Login</button>
                                    <button className="buttonW b2" type="submit" value="createUser">Create an account</button> 
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