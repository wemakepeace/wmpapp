import { HashRouter, BrowserRouter, Route, Switch } from 'react-router-dom';
import semantic from 'semantic-ui-react';
// import 'semantic-ui-css/semantic.min.css'; needs to be imported here on in base.css

import './css/scss/base.scss';
import React from 'react';
import { render } from 'react-dom';

import Routes from './routes';

const root = document.getElementById('root');

render(
    <HashRouter>
        <Route component={Routes} />
    </HashRouter>, root);

