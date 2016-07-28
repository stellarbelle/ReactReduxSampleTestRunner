
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

export default testResultsReducer;