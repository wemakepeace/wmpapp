import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { Container, Message } from 'semantic-ui-react';

import SignupForm from './SignupForm';
import LoginForm from './LoginForm';
import WMPHeader from './WMPHeader';

class Main extends Component {
    state = {
        showForm: 'signup',
        message: ''
    }

    toggleForm = (form) => this.setState({showForm: form})

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
                            <div className='second'>
                                <div
                                    className={`second-a ${this.getActiveClass('signup')}`}
                                    onClick={()=> this.toggleForm('signup')}>
                                    <h3>SIGNUP</h3>
                                </div>
                                <div
                                    className={`second-b ${this.getActiveClass('login')}`}
                                    onClick={()=> this.toggleForm('login')}>
                                    <h3>LOGIN</h3>
                                </div>
                            </div>
                            <div className='first'>
                            { showForm === 'signup' ? <SignupForm {...this.props}/> : <LoginForm {...this.props} /> }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Main;
