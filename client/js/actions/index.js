
const ranTest = (id) => {
    return {
        type: 'RUN_TEST',
        id,
    };
};

const failedTest = (id) => {
    store.dispatch({type: "FAILED"});
    return {
        type: 'FAILED_TEST',
        id,
    };
};

const passedTest = (id) => {
    store.dispatch({type: "PASSED"});
    return {
        type: 'PASSED_TEST',
        id,
    };
};