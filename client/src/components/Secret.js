import React, { Component } from 'react';
import {  BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';

class Secret extends Component {

    // componentWillMount() {
    //     return axios.get('/auth')
    //     .then(response => response.data)
    //     .then(authorized => {
    //         if (authorized === true) {
    //             this.setState({isAuthenticated: true})
    //         }
    //     })
    // }

    render() {
        return (
            <div>
                SECRET
            </div>
        )
    }
}

export default Secret;
