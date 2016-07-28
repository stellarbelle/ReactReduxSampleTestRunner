import React, { PropTypes } from 'react';

const RunningTest = (props) => {
    var test = props.test;
    return(
        <div>
            <p>{test.description} - <span className="running">running</span></p>
        </div>
    )
};

const PassedTest = (props) => {
    var test = props.test;
    return(
        <div>
            <p>{test.description} - <span className="passed">passed</span></p>
        </div>
    )
};

const FailedTest = (props) => {
    var test = props.test;
    return(
        <div>
            <p>{test.description} - <span className="failed">failed</span></p>
        </div>
    )
};


const AddingTest = (props) => {
    var test = props.test;
    return(
        <div>
            <p>{test.description} - <span className="waiting">not yet running</span></p>
        </div>
    )
};

const TestList = ({ list }) => {
    var tests = list.tests;
    var testsPassed = [];
    var testsFailed = [];
    var testsRunning = [];
    var testsWaiting = [];
    for(var i = 0; i < tests.length; i++) {
        var test = tests[i];
        if (test.status == 'passed') {
            testsPassed.push(<PassedTest key={test.id} test={test.test} />);
        } else if (test.status == 'failed') {
            testsFailed.push(<FailedTest key={test.id} test={test.test}/>);
        } else if (test.status == 'running') {
            testsRunning.push(<RunningTest key={test.id} test={test.test}/>);
        } else {
            testsWaiting.push(<AddingTest key={test.id} test={test.test}/>)
        }
    }
    return (
        <div>
            {testsWaiting}
            {testsRunning}
            {testsPassed}
            {testsFailed}
        </div>
    )
};

TestList.propTypes = {
    list: PropTypes.object.isRequired,
};


export default TestList;