import React from 'react';
import "./libraries/milligram.min.css";
import "./styles/style.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/navbar.component";
import UserLogin from "./components/login.component";
import UserRegister from "./components/register.component";

function App() {
    return (
	<Router>
	<Navbar />
  		<Route path="/register" component={UserRegister} />
  		<Route path="/login" component={UserLogin} />
  	</Router>
    );
}

export default App;