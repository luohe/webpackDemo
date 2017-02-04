import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as countActions from '../actions/CounterActions'

class Home extends Component {
	componentDidMount(){
		
	};
	render() {
		const { state, actions } = this.props;
		return (
      <div className="box">
	      <span>{state.counter}</span><br/>
	      <button className="btn" onClick={actions.increment}>增加1</button>
      </div>
		)
	}
}

const mapStateToProps = state => ({
	state: state
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(countActions, dispatch)
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Home)