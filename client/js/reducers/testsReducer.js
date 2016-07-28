
const test = (state, action) => {
    //state is a test
    switch (action.type) {
        case 'ADD_TEST':
            return {
                id: action.id,
                test: action.test
            };
        case 'RUN_TEST':
            if (state.id !== action.id) {
                return state
            }
            state.test.run(function (testPassed) {
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
            return [...state, test(undefined, action)];
        }
        default: {
            return state.map(t =>
                test(t, action)
            )
        }

    }
};

export default testsReducer;