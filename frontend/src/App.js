import React from 'react';
import "./libraries/milligram.min.css";
import "./styles/style.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./components/navbar.component";
import UserLogin from "./components/auth/login.component";
import UserRegister from "./components/auth/register.component";

function App() {
    return (
	<Router>
		<Navbar />
		<Switch>
  			<Route path="/register" component={UserRegister} />
  			<Route path="/login" component={UserLogin} />
  		</Switch>
  	</Router>
    );
}

export default App;