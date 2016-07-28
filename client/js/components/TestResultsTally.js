import React, { PropTypes } from 'react';

const TestResultsTally = ({ tallyValue }) => {
    var tally = tallyValue.testResultsTally;
    var totalTests = tallyValue.tests.length;
    var testsRemaining = totalTests - (tally.passed + tally.failed);
    return (
        <div>
            <h4><span className="waiting">Test Remaining:</span> {testsRemaining}</h4>
            <h4><span className="passed">Passed:</span> {tally.passed}</h4>
            <h4><span className="failed">Failed:</span> {tally.failed}</h4>
        </div>
    )
};

TestResultsTally.propTypes = {
    tallyValue: PropTypes.object.isRequired,
};

export default TestResultsTally;