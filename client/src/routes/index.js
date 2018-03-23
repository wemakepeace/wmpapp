import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  BrowserRouter, Route, Switch } from 'react-router-dom';

import { loadSession } from '../redux/actions/class';

import Main from '../components/Main';
import FlexExamples from '../components/FlexExamples';
import MainMenu from '../components/MainMenu';
import Profile from '../components/Profile';
import Secret from '../components/Secret';
import NoAccess from '../components/NoAccess';
import PrivateRoute from './PrivateRoute';

class Routes extends Component  {

    componentDidMount () {
        this.props.loadSession();
    }

    render() {
        const { match, history } = this.props;

        return (
            <div>
                <MainMenu history={history}/>
                <Switch>
                    <Route key={1} exact path={match.url} render={(props) => <Main {...this.props} />} />
                    <Route key={2} exact path={match.url + 'flex'} render={() => <FlexExamples />} />
                    <Route key={3} exact path={match.url + 'unauthorized'} render={() => <NoAccess {...this.props} />} />
                    <PrivateRoute key={4} exact path={match.url + 'profile'} component={Profile} />
                    <PrivateRoute key={5} exact path={match.url + 'secret'} component={Secret} />
                    <PrivateRoute key={6} exact path={match.url + 'protected'} component={Main} />
                </Switch>
            </div>
        )
    }
}

export default connect(null, { loadSession })(Routes);
