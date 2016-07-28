import React from 'react';
import TestResultsTally from './TestResultsTally';
import TestList from './TestList';

const App = ({
    value,
    startTests,
}) => (
    <div>
        <TestList list={value} />
        <button onClick={startTests}>Run Tests</button>
        <TestResultsTally tallyValue={value} />
    </div>
);

export default App;