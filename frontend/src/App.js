import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./libraries/milligram.min.css";
import "./styles/style.css";

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