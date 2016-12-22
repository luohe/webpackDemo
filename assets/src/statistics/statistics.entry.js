import 'babel-polyfill';
import {AppContainer} from 'react-hot-loader';
import React from 'react';
import {render} from 'react-dom';
import {browserHistory} from 'react-router';
import Root from "./js/Root";
const RedBox = require('redbox-react').default;
const rootEl = document.getElementById('app');

try {
	render(
			<Root history={browserHistory} />,
		rootEl
	)
} catch (e) {
	render(
		<RedBox error={e}>
			<Root history={browserHistory} />
		</RedBox>,
		rootEl
	)
}