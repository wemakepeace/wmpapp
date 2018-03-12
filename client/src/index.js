import semantic from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import './css/scss/base.scss';
import 'jquery';



$('.jquery').html('JQUEEERRRYYY')


import React from 'react';
import { render } from 'react-dom';
// import { BrowserRouter, Route, HashRouter } from 'react-router-dom';
// import { Provider } from 'react-redux';
import App from './components/App';

// import axios from 'axios';

// // import store from './redux/store';

const root = document.getElementById('root');

// const token = localStorage.getItem('token');

// if (token) {
//     axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
// }


render(<App />, root)
