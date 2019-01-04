import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import LandingPage from '../components/LandingPage';
import Portal from '../components/Portal';
import RequestResetPassword from '../components/RequestResetPassword'
import NotFoundPage from '../components/error_pages/NotFoundPage';
import ResetPassword from '../components/ResetPassword';
import WPMenu from '../components/Menu';
import { LoaderWithText } from '../components/reusables/LoaderWithText';
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
        const { match, history, teacher, location } = this.props;
        const { loading } = this.state;
        const containerClass = location.pathname === '/' ? 'background page-container' : 'page-container';

        return (
            <div>
                <WPMenu loggedIn={teacher && teacher.id ? true : false } />
                <LoaderWithText
                    loading={loading}
                    text='Loading..'
                />
                <div className={containerClass}>
                    <Switch>
                        <Route
                            key={1}
                            exact path={match.url + 'test'}
                            component={ResetPassword}
                        />
                        <Route
                            key={2}
                            exact path={match.url}
                            render={() => {
                                if (teacher && teacher.id) {
                                    return <Redirect to='/portal/overview' />;
                                }
                                return (<LandingPage {...this.props} />)
                            }}
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
                            path={match.url + 'portal'}
                            component={Portal}
                        />
                        <Route component={NotFoundPage} />
                    </Switch>
                </div>
            </div>
        );
    };
};

const mapStateToProps = ({ feedback, teacher }) => {
    return {
        feedback,
        teacher
    }
}

export default connect(mapStateToProps, { fetchTeacher, fetchClass })(Routes);
