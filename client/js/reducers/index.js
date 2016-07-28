import { combineReducers } from 'redux';
import testResultsReducer from './testResultsReducer';
import testsReducer from './testsReducer';


const testApp = combineReducers({
    tests: testsReducer,
    testResultsTally: testResultsReducer,
});

export default testApp;