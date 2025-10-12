/* @refresh reload */
import { render } from 'solid-js/web';
import App from './App.tsx';
import './index.css';
import { Route, Router } from '@solidjs/router';
import Create from '@/pages/Create.tsx';
import '@unocss/reset/normalize.css';
import 'virtual:uno.css';

const root = document.getElementById('root');

if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register(new URL('/sw.js', import.meta.url), { type: 'module' });
}

render(
	() => (
		<Router>
			<Route component={App} path="/" />
			<Route component={Create} path="/create" />
		</Router>
	),
	root!,
);
