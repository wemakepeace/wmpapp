import { Provider } from 'react-redux';
import { HashRouter, Route } from 'react-router-dom';
import React from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import 'normalize.css';
import './css/scss/index.scss';
import Routes from './routes';
import store from './redux/store';

const token = localStorage.getItem('token');
const root = document.createElement('div');
document.body.appendChild(root);

if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

const renderApp = () => {
    render(
        <Provider store={store}>
            <HashRouter>
                <Route component={Routes} />
            </HashRouter>
        </Provider>, root
    );
};

renderApp();

if (process.env.NODE_ENV === 'development') {
    if (module.hot) {
        module.hot.accept('./routes', renderApp);
    }
}
