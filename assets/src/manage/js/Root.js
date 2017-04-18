import React from 'react'
import { Provider } from 'react-redux'
import routes from './containers/routes'
import { Router } from 'react-router'
import '../css/normalize.scss'
import '../css/app.scss'
import '../css/antdStyleReset.scss'
import '../css/font.scss'
import '../css/animations.scss'
import 'moment/locale/zh-cn'


const Root = ({ store, history }) => (
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>
);

export default Root