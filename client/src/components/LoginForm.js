import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { Container, Button } from 'semantic-ui-react';
import { login } from '../redux/actions/class';

class Login extends Component {
    state = {
        email: '',
        password: '',
    }

    onChange = (ev, key) => this.setState({ [key]: ev.target.value })

    onSubmit = () => {
        this.props.login({email: this.state.email, password: this.state.password});
    }

    render() {
        return (
            <div className='login-form'>
                <div className='form-row'>
                    <input
                        placeholder='USERNAME!!'
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
                    className='signup-login-btn'
                    size='large'
                    onClick={this.onSubmit}>LOGIN</Button>
            </div>
        )
    }
}

export default connect(null, { login })(Login);
