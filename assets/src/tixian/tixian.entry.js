/**
 * Created by Administrator on 2017/1/17.
 */
import 'babel-polyfill'
import React from 'react'
//import 'react-fastclick'  // 这个需要放到react下方才行
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { browserHistory } from 'react-router'
import Root from './js/Root'
import configureStore from './js/store/configureStore'
import rootSage from './js/sagas'

const RedBox = require('redbox-react').default;
const rootEl = document.getElementById('app');
const store = configureStore(window.__INITIAL_STATE__);
store.runSaga(rootSage);
try {
	render(
		<Root store={store} history={browserHistory}/>
		,
		rootEl
	)
} catch (e) {
	render(
		<RedBox error={e}>
			<Root store={store} history={browserHistory} />
		</RedBox>,
		rootEl
	)
}