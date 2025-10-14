/* @refresh reload */
import './index.css';
import { Route, Router } from '@solidjs/router';
import { render } from 'solid-js/web';
import App from './App.tsx';
import Race from './components/Race.tsx';
import ClassList from '~/components/ClassList.tsx';
import Create from '~/pages/Create.tsx';
import '~/stores/classes';
import '~/stores/races';

const root = document.getElementById('root');

if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register(new URL('/sw.js', import.meta.url), { type: 'module' });
}

render(
	() => (
		<>
			<Router>
				<Route component={App} path="/" />
				<Route component={Create} path="/create">
					<Route component={ClassList} path="/class" />
					<Route component={Race} path="/race" />
				</Route>
			</Router>
		</>
	),
	root!,
);
