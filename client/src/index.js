import semantic from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import './css/scss/base.scss';
import React from 'react';
import { render } from 'react-dom';

import App from './components/App';

const root = document.getElementById('root');

render(<App />, root);

