import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { Container, Button } from 'semantic-ui-react';

export default class Login extends Component {
    state = {
        email: '',
        password: '',
    }

    onChange = (ev, key) => this.setState({ [key]: ev.target.value })

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
                <Button className='signup-login-btn' size='large'>LOGIN</Button>
            </div>
        )
    }
}
