import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./libraries/milligram.min.css";
//theme provider provides a theme to all react components
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './styles/js/global';
import { theme } from './styles/js/themes';
import { Burger, Menu } from './styles/js/components/index';

import UserLogin from "./components/auth/login.component";
import UserRegister from "./components/auth/register.component";
import UserDashboard from "./components/dashboard.component";

function App() {
	//create state that handles if the menu is activated
	const [open, setOpen] = useState(false)

    return (
	<Router>
		<ThemeProvider theme={theme}>
			<GlobalStyles />
				<Menu open={open} setOpen={setOpen}/>
					<Burger open={open} setOpen={setOpen}/>
						<Switch>
				  			<Route path="/register" component={UserRegister} />
				  			<Route path="/login" component={UserLogin} />
				  			<Route path="/dashboard" component={UserDashboard} />
				  		</Switch>
	  	</ThemeProvider>
  	</Router>
    );
}

export default App;