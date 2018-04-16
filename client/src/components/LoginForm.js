import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { Container, Button } from 'semantic-ui-react';

import Feedback from './Feedback';

import { login, logout } from '../redux/actions/teacher';


class Login extends Component {
    state = {
        redirectToReferrer: false,
        email: '',
        password: '',
        showFeedback: false
    }

    onChange = (ev, key) => this.setState({ [key]: ev.target.value })

    onSubmit = () => {
        this.props.login({email: this.state.email, password: this.state.password });
    }

    componentWillReceiveProps(nextProps) {
        if((nextProps.teacher && nextProps.teacher.id) && localStorage.getItem('token')) {
            this.setState({redirectToReferrer: true })
        }

        if (nextProps.feedback && nextProps.feedback.type) {
            this.setState({ showFeedback: true });
        }
    }


    render() {
        const { redirectToReferrer, showFeedback } = this.state;
        const { feedback } = this.props;

        const { from } = this.props.location && this.props.location.state || { from: { pathname: '/exchange' }};

        if (redirectToReferrer === true || this.props.teacher.id) {
            return (
                <Redirect
                    to={from} />
            )
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
                <Button
                    className='large-custom-btn'
                    size='large'
                    onClick={this.onSubmit}>LOGIN</Button>

                { showFeedback && (feedback && feedback.type)
                    ? <Feedback {...feedback} />
                    : null }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        teacher: state.teacher,
        feedback: state.feedback
    }
}

export default connect(mapStateToProps, { login })(Login);
