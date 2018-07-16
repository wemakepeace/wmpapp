import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Link } from 'react-router-dom';
import { Container, Button } from 'semantic-ui-react';
import Feedback from './Feedback';

class Login extends Component {
    state = {
        email: '',
        password: '',
        redirectToReferrer: false,
        showFeedback: false
    }

    onChange = (ev, key) => this.setState({ [ key ]: ev.target.value })

    onSubmit = () => {
        const { action } = this.props;
        const { email, password } = this.state;
        action({
            email: email,
            password: password
        });
    }

    componentWillReceiveProps({ teacher, feedback }) {
        if((teacher && teacher.id) && localStorage.getItem('token')) {
            this.setState({ redirectToReferrer: true })
        }

        if (feedback && feedback.type) {
            this.setState({ showFeedback: true });
        }
    }


    render() {
        const { redirectToReferrer, showFeedback } = this.state;
        const { feedback, teacher } = this.props;
        const { from } = this.props.location && this.props.location.state || { from: { pathname: '/profile/overview' }};

        if (redirectToReferrer === true || teacher.id) {
            return ( <Redirect to={from} /> );
        }

        return (
            <div className='login-form'>
                <div className='form-row'>
                    <input
                        placeholder='USERNAME'
                        name='email'
                        onChange={(ev) => this.onChange(ev, 'email')}/>
                </div>
                <div className='form-row'>
                    <input
                        placeholder='PASSWORD'
                        name='password'
                        type='password'
                        onChange={(ev) => this.onChange(ev, 'password')}/>
                </div>
                <Link to='/reset'>Forgot password?</Link>
                <Button
                    className='large-custom-btn'
                    size='large'
                    onClick={this.onSubmit}>LOGIN</Button>

                { showFeedback && (feedback && feedback.type)
                    ? <Feedback {...feedback} />
                    : null }
            </div>
        );
    }
}

export default Login;
