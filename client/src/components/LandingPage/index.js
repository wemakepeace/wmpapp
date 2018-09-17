import React, { Component } from 'react';
import Header from '../Header';
import Login from '../Login';
import Signup from '../Signup';
import Feedback from '../Feedback';

import { map } from '../../../../assets/images/map.jpg';

class SignupOrLogin extends Component {

    state = { form: 'login' }

    toggleForm = (form) => this.setState({ form })

    getActiveClass = (item) => this.state.form === item ? 'active-main' : '';

    render() {
        const { form } = this.state;
        const { history, feedback } = this.props;
        const Form = form === 'login' ? Login : Signup;

        return (
            <div className='centered-outer-div'>
                <div className='centered-inner-div login-signup-container'>
                    <Header history={history} />
                    <div className='login-signup'>
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
                        <Form history={history} />
                    </div>
                    <div className='landing-page-feedback'>
                        <Feedback {...feedback} />
                    </div>
                </div>
            </div>
        );
    };
};

export default SignupOrLogin;
