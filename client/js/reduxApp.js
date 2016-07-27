import React from 'react';
import { combineReducers, createStore } from 'redux';
import tests from './test.js';
import { render } from 'react-dom';
require('../css/styles.scss');

// const TestStatusTally = (testItems) => {
//     return (
//         <div>
//             <AllResults tests={testItems}
//                         /*passed={this.state.passed} */
//                         /*failed={this.state.failed}*/
//                         totalTests={testItems.length}/>
//         </div>
//     )
// };

const test = (state, action) => {
    //state is a test
    switch (action.type) {
        case 'ADD_TEST':
            console.log('adding test ', action.id);
            return {
                id: action.id,
                test: action.test
            };
        case 'RUN_TEST':
            if (state.id !== action.id) {
              return state
            }
            state.test.run(function (testPassed) {
                    console.log("test: ", state.test, " test result: ", testPassed);
                    if (testPassed) {
                        store.dispatch(passedTest(state.id));
                    } else {
                        store.dispatch(failedTest(state.id));
                    }
                }
            );
            return Object.assign({}, state, {
                status: 'running',
            });
        case 'FAILED_TEST':
            if (state.id !== action.id) {
                return state
            }
            return Object.assign({}, state, {
                status: 'failed'
            });
        case 'PASSED_TEST':
            if (state.id !== action.id) {
                return state
            }
            return Object.assign({}, state, {
                status: 'passed'
            });
        default:
            return state
    }
};

const  testsReducer = (state=[], action) => {
    switch(action.type) {
        case "ADD_TEST": {
            // var test = test(undefined, action);
            // console.log("action: ", action, " state: ", state);
            return [...state, test(undefined, action)];
        }
        default: {
            return state.map(t =>
                 test(t, action)
             )
        }

    }
};

const  testResultsReducer = (state={passed: 0, failed: 0}, action) => {
    switch(action.type) {
        case "PASSED": {
            return { ...state, passed: state.passed + 1 }
        }
        case "FAILED": {
            return { ...state, failed: state.failed + 1 }
        }
    }
    return state
};

const reducers = combineReducers({
    tests: testsReducer,
    testResultsTally: testResultsReducer,
});

const store = createStore(reducers);

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
    console.log("passed test: ", test);
    return(
        <div>
            <p>{test.description} - <span className="passed">passed</span></p>
        </div>
    )
};

const FailedTest = (props) => {
    var test = props.test;
    console.log("failed test: ", test);
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

const ranTest = (id) => {
    return {
        type: 'RUN_TEST',
        id,
    };
};

const failedTest = (id) => {
    console.log("test id: ", id);
    return {
        type: 'FAILED_TEST',
        id,
    };
};

const passedTest = (id) => {
    console.log("test id: ", id);
    return {
        type: 'PASSED_TEST',
        id,
    };
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

for (var x = 0; x < tests.length; x++) {
    var newTest = tests[x];
    store.dispatch({type: "ADD_TEST", test: newTest, id: 10 + x});
}

store.dispatch({type: "PASSED"});

const Page = ({
    value,
    startTests,
}) => (
    <div>
        <TestList list={value} />
        <button onClick={startTests}>Run Tests</button>
    </div>
);

const startTests = (testItems) => {
    for (var i = 0; i < testItems.length; i++) {
        var test = testItems[i];
        store.dispatch(ranTest(test.id));
    }
};


const renderPage = () => {
    render(
        <Page
            value={store.getState()}
            startTests={() => startTests(store.getState().tests)}
        />,
        document.getElementById('app')
    );
};

store.subscribe(renderPage);
renderPage();