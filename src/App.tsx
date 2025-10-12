import { createSignal } from 'solid-js';
import solidLogo from './assets/solid.svg';

import viteLogo from '/vite.svg';

function App() {
	const [count, setCount] = createSignal(0);

	return (
		<>
			<div>
				<a href="https://vite.dev" rel="noreferrer" target="_blank">
					<img alt="Vite logo" class="logo" src={viteLogo} />
				</a>
				<a href="https://solidjs.com" rel="noreferrer" target="_blank">
					<img alt="Solid logo" class="logo solid" src={solidLogo} />
				</a>
			</div>
			<h1>Vite + Solid</h1>
			<div class="card">
				<button onClick={() => setCount(count => count + 1)}>
					count is
					{count()}
				</button>
				<p>
					Edit
					{' '}
					<code>src/App.tsx</code>
					{' '}
					and save to test HMR
				</p>
			</div>
			<p class="read-the-docs">Click on the Vite and Solid logos to learn more</p>
		</>
	);
}

export default App;
