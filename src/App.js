import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './containers/Home';
import Beats from './containers/Beats';
import Board from './containers/Board';
import Faq from './containers/Faq';
import Add from './containers/Add';
import PageNotFound from './containers/PageNotFound';
import Layout from './hoc/Layout/Layout';

import './App.css';

const routes = [{
	component: Board,
	path: "/:userId/mon-compte",
},{
	component: Beats,
	path: "/beats",
},{
	component: Faq,
	path: "/faq",
},{
	component: Add,
	path: "/ajouter",
},{
	component: Add,
	path: "/editer",
}];

const App = () => {
	return (
		<Layout>
			<Switch>
				<Route exact path="/" component={Home} />

				{routes.map((route, i) => (
					<Route key={i} path={route.path} component={route.component} />
				))}

				<Route component={PageNotFound} />
			</Switch>
		</Layout>
	);
};

export default App;
