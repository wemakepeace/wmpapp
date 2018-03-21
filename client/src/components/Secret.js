import React, { Component } from 'react';
import {  BrowserRouter, Route, Switch } from 'react-router-dom';
import axios from 'axios';

class Secret extends Component {
    state = {

    }

    componentWillMount() {
        return axios.get('/secret/test')
        .then(response => console.log(response))
    }

    render() {
        return (
            <div>
                SECRET
            </div>
        )
    }
}

export default Secret;
