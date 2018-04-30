import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  BrowserRouter, Route, Switch } from 'react-router-dom';

import { fetchTeacher } from '../redux/actions/teacher';
import { fetchClass } from '../redux/actions/class';

import Main from '../components/Main';
import FlexExamples from '../components/FlexExamples';
import MainMenu from '../components/MainMenu';
import Exchange from '../components/profile';
import Secret from '../components/Secret';
import ForgotPasswordForm from '../components/ForgotPasswordForm';
import ResetPasswordForm from '../components/ResetPasswordForm';
import PrivateRoute from './PrivateRoute';

class Routes extends Component  {
    state = { loading: true }

    componentWillMount () {
        return this.props.fetchTeacher()
        .then(res => {
            if (res.type === 'LOGIN_SUCCESS') {
                const currentClass = localStorage.getItem('currentClass');
                if (currentClass) {
                    return this.props.fetchClass(currentClass, true)
                    .then(res => this.setState({ loading: false }))
                }
            }
            this.setState({ loading: false });
        });
    };

    render() {
        const { match, history } = this.props;

        return (
            <div>
                <MainMenu history={history} />
                <Switch>
                    <Route key={1} exact path={match.url} render={(props) => <Main {...this.props} />} />
                    <Route key={2} exact path={match.url + 'flex'} render={() => <FlexExamples />} />
                    <Route key={2.1} exact path={match.url + 'reset'} render={() => <ForgotPasswordForm />} />
                    <Route key={2.2} path={match.url + 'reset/:token'} component={ResetPasswordForm} />
                    <PrivateRoute
                        loading={this.state.loading}
                        key={4}
                        path={match.url + 'exchange'}
                        component={Exchange} />
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
    };
};

export default connect(null, { fetchTeacher, fetchClass })(Routes);
