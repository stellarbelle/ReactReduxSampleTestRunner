import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import tests from './test.js';
import { store } from './components/App';
import App from './components/App'
import { ranTest } from './actions/index';
require('../css/styles.scss');

for (var x = 0; x < tests.length; x++) {
    var newTest = tests[x];
    store.dispatch({type: "ADD_TEST", test: newTest, id: 10 + x});
}

const startTests = (testItems) => {
    for (var i = 0; i < testItems.length; i++) {
        var test = testItems[i];
        store.dispatch(ranTest(test.id));
    }
};

const renderPage = () => {
    render(
        <Provider store={store}>
            <App
                value={store.getState()}
                startTests={() => startTests(store.getState().tests)}
            />
        </Provider>,
        document.getElementById('app')
    );
};

store.subscribe(renderPage);
renderPage();
