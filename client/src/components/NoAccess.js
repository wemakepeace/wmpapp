import React, { Component } from 'react';
import {  BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';

const NoAccess = (props) => {
    const redirectToHome = () => props.history.push('/')

    return (
        <div className='page-container login-signup'>
            <div className='page-content'>
                <h1>You must be logged in to access this page</h1>
                <button onClick={redirectToHome}>Go to home</button>
            </div>
        </div>
    )
};

export default NoAccess;
