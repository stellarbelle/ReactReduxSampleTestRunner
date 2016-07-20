import React from 'react';
import ReactDOM from 'react-dom';

export default class AllResults extends React.Component {

  _renderResults() {
	return(
		<div>
			<h3>Test Passed: {this.props.passed}, Tests Failed: {this.props.failed}</h3>
		</div>
	)
  }

  _renderRemainingTests() {
  	var passed = this.props.passed;
  	var failed = this.props.failed;
  	var totalTests = this.props.totalTests;
  	var testsLeft = totalTests - (passed + failed);
	if(testsLeft === 0) {
		return(
			<div>
				<h1>FINISHED!</h1>
			</div>
		)
	} else {
		return(
			<div>
				<h1>{testsLeft} remaining!</h1>
			</div>
		)
	}
  }

  render() {
    return (
    	<div>
    		{this._renderResults()}
    		{this._renderRemainingTests()}
    	</div>
    )
  }
}