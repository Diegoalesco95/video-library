import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from '../../../app/Home';
import Login from '../../../app/containers/Login';
import Signup from '../../../app/containers/Signup';
import NotFound from '../../../app/containers/NotFound';
import Player from '../../../app/containers/Player';
import Layout from '../components/Layout.tsx';

const App = ({ isLogged }) => (
	<BrowserRouter>
		<Layout>
			<Switch>
				<Route exact path='/' component={isLogged ? Home : Login} />
				<Route exact path='/login' component={isLogged ? Home : Login} />
				<Route exact path='/signup' component={Signup} />
				<Route exact path='/player/:id' component={isLogged ? Player : Login} />
				<Route component={NotFound} />
			</Switch>
		</Layout>
	</BrowserRouter>
);

export default App;
