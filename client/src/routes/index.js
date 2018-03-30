import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  BrowserRouter, Route, Switch } from 'react-router-dom';

import { loadSession } from '../redux/actions/teacher';

import Main from '../components/Main';
import FlexExamples from '../components/FlexExamples';
import MainMenu from '../components/MainMenu';
import Profile from '../components/profile/Profile';
import Secret from '../components/Secret';
import PrivateRoute from './PrivateRoute';

class Routes extends Component  {
    state = { loading: true }

    componentWillMount () {
        /* Checks to see if active session */
        const classId = localStorage.getItem('classId');
        // return this.props.loadSession(classId)
        return this.props.loadSession()
        .then(() => this.setState({ loading: false }))
    }

    render() {
        const { match, history } = this.props;

        return (
            <div>
                <MainMenu history={history} />
                <Switch>
                    <Route key={1} exact path={match.url} render={(props) => <Main {...this.props} />} />
                    <Route key={2} exact path={match.url + 'flex'} render={() => <FlexExamples />} />
                    <PrivateRoute
                        loading={this.state.loading}
                        key={4}
                        exact path={match.url + 'profile'}
                        component={Profile} />
                    <PrivateRoute
                        loading={this.state.loading}
                        key={5}
                        exact path={match.url + 'secret'}
                        component={Secret} />
                    <PrivateRoute
                        loading={this.state.loading}
                        key={6}
                        exact path={match.url + 'protected'}
                        component={Main} />
                </Switch>
            </div>
        )
    }
}


export default connect(null, { loadSession })(Routes);
