import { Provider } from 'react-redux';
import { HashRouter, Route } from 'react-router-dom';
import React from 'react';
import { render } from 'react-dom';
import axios from 'axios';

import 'normalize.css';
import './css/scss/index.scss';

import Routes from './routes';

import store from './redux/store';

// for hot reloading
if (module.hot) {
    module.hot.accept();
}

const token = localStorage.getItem('token');

if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}


const root = document.getElementById('root');

render(
    <Provider store={store}>
        <HashRouter>
            <Route component={Routes} />
        </HashRouter>
    </Provider>, root);

