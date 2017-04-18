/**
 * Created by Administrator on 2016/12/22.
 */
import React from 'react'
import { Route, IndexRoute } from 'react-router'

import {
	App,
	Home
} from './index'

export default (
	<Route path="/" component={App}>
		<IndexRoute component={Home}/>
	</Route>
)