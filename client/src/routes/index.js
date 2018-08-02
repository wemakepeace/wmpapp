import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import LandingPage from '../components/LandingPage';
import Profile from '../components/Profile';
import RequestResetPassword from '../components/RequestResetPassword';
import ResetPassword from '../components/ResetPassword';
import { fetchTeacher } from '../redux/actions/teacher';
import { fetchClass } from '../redux/actions/class';


class Routes extends Component  {
    state = { loading: true }

    componentWillMount () {
        return this.props.fetchTeacher()
        .then(({ type }) => {
            if (type === 'LOGIN_SUCCESS') {
                const currentClass = localStorage.getItem('currentClass');
                if (currentClass) {
                    return this.props.fetchClass(currentClass, true)
                    .then(() => this.setState({ loading: false }))
                }
            }
            this.setState({ loading: false });
        });
    };

    render() {
        const { match, history } = this.props;

        return (
            <div className='page-container'>
                <Switch>
                    <Route
                        key={1}
                        exact path={match.url + 'test'}
                        render={() => <ResetPassword />}
                    />
                    <Route
                        key={2}
                        exact path={match.url}
                        render={(props) => <LandingPage {...this.props} />}
                    />
                    <Route
                        key={3}
                        exact path={match.url + 'reset'}
                        component={RequestResetPassword}
                    />
                    <Route
                        key={4}
                        path={match.url + 'reset/:token'}
                        component={ResetPassword}
                    />
                    <PrivateRoute
                        loading={this.state.loading}
                        key={5}
                        path={match.url + 'profile'}
                        component={Profile}
                    />
                </Switch>
            </div>
        );
    };
};

export default connect(null, { fetchTeacher, fetchClass })(Routes);
