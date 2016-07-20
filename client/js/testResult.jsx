import React from 'react';
import ReactDOM from 'react-dom';

export default class TestResult extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			test: props.test,
		};
	}


  _renderTest() {
  	var test = this.state.test;
  	if(test.testState) {
	  	return(
	  		<div>
	  			<p>{test.description} {test.testState}</p>
	  		</div>
	  	)
  	} else {
  		return(
	  		<div>
	  			<p>{test.description} not started yet</p>
	  		</div>
	  	)
  	}
  }


  render() {
    return (
    	<div>
    		{this._renderTest()}
    	</div>
    )
  }
}
 
