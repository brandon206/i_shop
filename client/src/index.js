import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import think from './middleware/think';
import { createStore, applyMiddleware } from 'redux';

import App from './components/app';

const store = createStore(rootReducer, {}, applyMiddleware(think));

ReactDOM.render(
    <Provider store = {store}>
        <Router>
            <App />
        </Router>
    </Provider>,
    document.getElementById('root')
);
