import React from 'react';
import {  BrowserRouter, Route, Switch } from 'react-router-dom';

import Main from '../components/Main';
import FlexExamples from '../components/FlexExamples';
import MainMenu from '../components/MainMenu';
import Profile from '../components/Profile';
import Secret from '../components/Secret';

export default (props) => {

    const { match, history } = props;

    return (
        <div>
            <MainMenu history={history}/>
            <Switch>
                <Route exact path={match.url} render={(props) => <Main {...props} />} />
                <Route exact path={match.url + 'flex'} render={() => <FlexExamples />} />
                <Route exact path={match.url + 'profile'} render={() => <Profile />} />
                <Route exact path={match.url + 'secret'} render={() => <Secret />} />
                <Route exact path={match.url + 'public'} render={() => <Main />} />
            </Switch>
        </div>
    )
}
