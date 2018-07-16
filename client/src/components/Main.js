import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { Container, Message } from 'semantic-ui-react';
import WMPHeader from './WMPHeader';
import SignupLoginContainer from '../containers/SignupLogin';


class Main extends Component {
    state = {
        showForm: 'login',
        message: ''
    }

    toggleForm = (form) => this.setState({ showForm: form })

    getActiveClass = (item) => this.state.showForm === item ? 'active-main' : '';

    render() {

        const { showForm } = this.state;
        const { history } = this.props;

        return (
            <div className='page-container login-signup'>
                <div className='page-content'>
                    <WMPHeader history={history} />
                    <div>
                        <div className='login-signup-container'>
                            <div className='signup-login-tabs'>
                                <div
                                    className={`login-tab ${this.getActiveClass('login')}`}
                                    onClick={()=> this.toggleForm('login')}>
                                    <h3>LOGIN</h3>
                                </div>
                                <div
                                    className={`signup-tab ${this.getActiveClass('signup')}`}
                                    onClick={()=> this.toggleForm('signup')}>
                                    <h3>SIGNUP</h3>
                                </div>
                            </div>
                            <div className='login-signup-form'>
                                <SignupLoginContainer showForm={showForm} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Main;
