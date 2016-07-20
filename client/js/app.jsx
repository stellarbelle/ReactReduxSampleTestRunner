import React from 'react';
import ReactDOM from 'react-dom';
import Button from './button.jsx';
import TestResult from './testResult.jsx';
import AllResults from './allResults.jsx';
require('../css/styles.scss');

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			tests: props.tests,
			passed: 0,
			failed: 0,
			totalTests: props.tests.length
		};
	}

  onClick() {
  	var self = this;
  	var tests = this.state.tests;
  	tests.forEach(function (test) {
  		test.testState = 'running';
  		test.run(function(testPassed) {
			if(testPassed) {
			  	test.testState = 'passed'
				self.setState ({
					passed: self.state.passed + 1
				})
			} else {
				test.testState = 'failed'
				self.setState ({
					failed: self.state.failed + 1
				})
			}
  		});
  	});

  	this.setState({tests: tests});
  }

  _renderTestStatus() {
	var testsPassed = [];
	var testsFailed = [];
	var testsRunning = [];
	var tests = this.state.tests;
	for (var index in tests) {
		if(tests[index].testState == 'passed') {
	  		testsPassed.push(<TestResult key={index} test={tests[index]}/>);
		} else if (tests[index].testState == 'failed'){
			testsFailed.push(<TestResult key={index} test={tests[index]}/>);
		} else {
			testsRunning.push(<TestResult key={index} test={tests[index]}/>);
		}
	}
	return(
  		<div>
  			{testsRunning}
  			{testsPassed}
  			{testsFailed}
  		</div>
  	)
  }

  _renderAllResults() {
  	return(
  		<div>
  			<AllResults tests={tests} passed={this.state.passed} failed={this.state.failed} totalTests={this.state.totalTests}/>
  		</div>
  	)
  }

  render() {
    return (
    	<div>
    		<Button onClick={this.onClick.bind(this)}/>
    		{this._renderTestStatus()}
    		{this._renderAllResults()}
    	</div>
    )
  }
}
 
ReactDOM.render(<App tests={tests}/>, document.getElementById('app'));
