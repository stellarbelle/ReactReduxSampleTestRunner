import React from 'react';
import TestResultsTally from './TestResultsTally';
import TestList from './TestList';
import testApp from '../reducers/index';
import { createStore } from 'redux';

export const store = createStore(testApp);

const App = ({
    value,
    startTests,
    store
}) => (
    <div>
        <TestList list={value} store={store}/>
        <button onClick={startTests} >Run Tests</button>
        <TestResultsTally tallyValue={value} />
    </div>
);

export default App;