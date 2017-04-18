/**
 * Created by Administrator on 2016/12/22.
 */
import React, { Component } from 'react'
import routes from './containers/routes'
import { Router } from 'react-router'
import '../css/normalize.scss'
import '../css/app.scss'
import '../css/antdStyleReset.scss'
import '../css/font.scss'
import '../css/animations.scss'
export default class Root extends Component{
	render(){
		const {history} = this.props;
		return (
			<Router history={history} routes={routes}/>
		)
	}
}