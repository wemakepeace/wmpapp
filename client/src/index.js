import { HashRouter, Route } from 'react-router-dom';
import React from 'react';
import { render } from 'react-dom';

import 'normalize.css';
import './css/scss/index.scss';

import Routes from './routes';

const root = document.getElementById('root');

render(
    <HashRouter>
        <Route component={Routes} />
    </HashRouter>, root);

