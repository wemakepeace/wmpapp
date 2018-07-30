import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Main from '../components/Main';
import Profile from '../components/profile';
import ChangePasswordContainer from '../containers/profile/ChangePasswordContainer';
import ResetPasswordRequestContainer from '../containers/ResetPWRequestContainer';
import PrivateRoute from './PrivateRoute';
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
            <div>
                <Switch>
                    <Route key={1} exact path={match.url} render={(props) => <Main {...this.props} />} />
                    <Route key={2.1} exact path={match.url + 'reset'} render={() => <ResetPasswordRequestContainer />} />
                    <Route key={2.2} path={match.url + 'reset/:token'} component={ChangePasswordContainer} />
                    <PrivateRoute
                        loading={this.state.loading}
                        key={4}
                        path={match.url + 'profile'}
                        component={Profile} />
                    <PrivateRoute
                        loading={this.state.loading}
                        key={6}
                        exact path={match.url + 'protected'}
                        component={Main} />
                </Switch>
            </div>
        );
    };
};

export default connect(null, { fetchTeacher, fetchClass })(Routes);
