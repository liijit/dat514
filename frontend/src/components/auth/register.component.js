import React, { Component } from 'react';
import { ReactComponent as Logo } from '../../assets/planture.svg'
import axios from 'axios';

export default class UserRegister extends Component {
	constructor(props) {
		super(props);

		//binds methods to the user interaction
		this.onChangeUsername = this.onChangeUsername.bind(this);
		this.onChangeEmail = this.onChangeEmail.bind(this);
		this.onChangePassword = this.onChangePassword.bind(this);
		this.onChangeRetypePassword = this.onChangeRetypePassword.bind(this);
		this.onChangeRes = this.onChangeRes.bind(this);
		this.onSubmit = this.onSubmit.bind(this);

		//initialise variables
		this.state = {
			username: '',
			email: '',
			password: '',
			retypepassword: '',
			res: '',
			date: new Date(),
		}
	}

	//life cycle method to runs before anything is rendered
	//example data to test
	componentDidMount() {
		this.setState({
			users: ['test'],
			username: 'test',
			email: 'example@gmail.com',
			password: 'password'
		})
	}

	//update following variables to user input values
	onChangeUsername = e => {
		this.setState({
			username: e.target.value
		});
	}
	onChangeEmail = e => {
		this.setState({
			email: e.target.value
		});
	}
	onChangePassword = e => {
		this.setState({
			password: e.target.value
		});
	}
	onChangeRetypePassword = e => {
		this.setState({
			res: e.target.value
		});
	}
	onChangeRes = e => {
		this.setState({
			res: e.target.value
		});
	}

	onSubmit = e => {
		//ignore HTML defaulted interaction with the form
		e.preventDefault();

		//creates an object formulated for the backend api post request with form data parsed in
		const user = {
			username: this.state.username,
			email: this.state.email,
			password: this.state.password,
		}

		//attempt a post request and parse 'user' object
		axios.post('http://localhost:8008/register', user)
			.then(res => this.setState((state, props) => {
				//after a successful post request, clear each state and update the res with the promise response
				return {
					username: '',
					email: '',
					password:'',
					retypepassword:'',
					res: res.data,
				}
			}))
			.catch(res => this.setState((state, props) => {
				//return the error message and update the res field with error message
				return{res: res.toJSON().message}
			}))
	}
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
		                        <form onSubmit={this.onSubmit}>
		                            <div className="labelcont">
		                                <label className="label" htmlFor="username">
		                                    <p>USERNAME</p>
		                                </label>
		                                <label className="labelres" onChange={this.onChangeRes}>
		                                    <p>{this.state.res}</p>
		                                </label>
		                            </div>
		                            <input type="text" id="usernameField" value={this.state.username} onChange={this.onChangeUsername} />
		                            <div className="labelcont">
		                                <label className="label">
		                                    <p>EMAIL</p>
		                                </label>
		                            </div>
		                            <input type="text" id="emailField" value={this.state.email} onChange={this.onChangeEmail} />
		                            <div className="labelcont">
		                                <label className="label">
		                                    <p>PASSWORD</p>
		                                </label>
		                            </div>
		                            <input type="password" id="passwordField" value={this.state.password} onChange={this.onChangePassword} />
		                            <div className="labelcont">
		                                <label className="label">
		                                    <p>RETYPE PASSWORD</p>
		                                </label>
		                            </div>
		                            <input type="password" id="retypepasswordField" value={this.state.retypepassword} onChange={this.onChangeRetypePassword} />
		                            <button className="buttonW b1" type="submit" value="login">Create an Account</button>
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