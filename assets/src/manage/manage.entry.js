import 'babel-polyfill'
import React from 'react'
//import 'react-fastclick'  // 这个需要放到react下方才行
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { browserHistory } from 'react-router'
import Root from './js/containers/Root'
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
if (module.hot) {
  /**
   * Warning from React Router, caused by react-hot-loader.
   * The warning can be safely ignored, so filter it from the console.
   * Otherwise you'll see it every time something changes.
   * See https://github.com/gaearon/react-hot-loader/issues/298
   */
  const orgError = console.error; // eslint-disable-line no-console
  console.error = (message) => { // eslint-disable-line no-console
    if (message && message.indexOf('You cannot change <Router routes>;') === -1) {
      // Log the error as normally
      orgError.apply(console, [message]);
    }
  };
  module.hot.accept('./js/containers/Root', () => {
    // If you use Webpack 2 in ES modules mode, you can
    // use <App /> here rather than require() a <NextApp />.
    const NextApp = require('./js/containers/Root').default;
    try {
      render(
          <NextApp store={store} history={browserHistory} />
        ,
        rootEl
      )
    } catch (e) {
      render(
        <RedBox error={e}>
          
            <NextApp store={store} history={browserHistory} />
          
        </RedBox>,
        rootEl
      )
    }
  });
}