import { store } from '../components/App';

export const ranTest = (id) => {
    return {
        type: 'RUN_TEST',
        id,
    };
};

export const failedTest = (id) => {
    store.dispatch({type: "FAILED"});
    return {
        type: 'FAILED_TEST',
        id,
    };
};

export const passedTest = (id) => {
    store.dispatch({type: "PASSED"});
    return {
        type: 'PASSED_TEST',
        id,
    };
};

