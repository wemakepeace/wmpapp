import React, { Component } from 'react';
import HeaderContainer from '../containers/HeaderContainer';
import SignupLoginContainer from '../containers/SignupLoginContainer';

class SignupOrLogin extends Component {
    state = {
        form: 'login'
    }

    toggleForm = (form) => this.setState({ form })

    getActiveClass = (item) => this.state.form === item ? 'active-main' : '';

    render() {
        const { form } = this.state;
        const { history } = this.props;

        return (
            <div className='login-signup page-content'>
                <HeaderContainer history={history} />
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
                    <SignupLoginContainer form={form} />
                </div>
            </div>
        );
    };
};

export default SignupOrLogin;
