import React, { Component } from 'react'
import { Nav, Timer } from '../components'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as TimerActions from '../actions/TimerActions'

class Home extends Component {
	componentDidMount(){
		
	};
	render() {
		const { state, actions } = this.props;
		return (
      <div className="box">
        <Timer {...state} {...actions} />
        <Nav/>
      </div>
		)
	}
}

const mapStateToProps = state => ({
	state: state.timer
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(TimerActions, dispatch)
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Home)