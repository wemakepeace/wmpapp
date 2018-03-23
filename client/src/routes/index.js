import React, { Component } from 'react';
import {  BrowserRouter, Route, Switch } from 'react-router-dom';


import Main from '../components/Main';
import FlexExamples from '../components/FlexExamples';
import MainMenu from '../components/MainMenu';
import Profile from '../components/Profile';
import Secret from '../components/Secret';
import PrivateRoute from './PrivateRoute';

const Routes = (props) => {

    const { match, history } = props;

    return (
        <div>
            <MainMenu history={history}/>
            <Switch>
                <Route key={1} exact path={match.url} render={(props) => <Main {...props} />} />
                <Route key={2} exact path={match.url + 'flex'} render={() => <FlexExamples />} />
                <PrivateRoute key={3} exact path={match.url + 'profile'} component={Profile} />
                <PrivateRoute key={4} exact path={match.url + 'secret'} component={Secret} />
                <PrivateRoute key={5} exact path={match.url + 'protected'} component={Main} />
            </Switch>
        </div>
    )
}

export default Routes;
