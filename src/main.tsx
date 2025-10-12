/* @refresh reload */
import { render } from 'solid-js/web';
import App from './App.tsx';
import './index.css';
import { Route, Router } from '@solidjs/router';

const root = document.getElementById('root');

render(
	() => (
		<Router>
			<Route component={App} path="/" />
			<Route component={App} path="/create" />
		</Router>
	),
	root!,
);
