import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import tests from './test.js';
import testApp from './reducers/index';
import App from './components/App'
require('../css/styles.scss');

const store = createStore(testApp);

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
        <App
            value={store.getState()}
            startTests={() => startTests(store.getState().tests)}
        />,
        document.getElementById('app')
    );
};

store.subscribe(renderPage);
renderPage();