/**
 * Created by Administrator on 2017/1/17.
 */
import React from 'react'
import { Route, IndexRoute } from 'react-router'

import {
	App,
	Home,
	NotFoundPage,
} from './index'

export default (
	<Route path="/" component={App}>
		<IndexRoute component={Home}/>
		<Route path="*" component={NotFoundPage}/>
	</Route>
);