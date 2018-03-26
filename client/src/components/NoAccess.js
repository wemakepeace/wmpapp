import React, { Component } from 'react';
import {  BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';

const NoAccess = (props) => {
    return (
        <div>
            <h1>You must be logged in to access this page</h1>
            NoAccess
        </div>
    )

}

export default NoAccess;
