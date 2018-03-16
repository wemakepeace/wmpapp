import React, { Component } from 'react';
import { connect } from 'react-redux';

import WMPHeader from './WMPHeader';


class TeacherForm extends Component {
    state = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: ''
    }

    onInputChange = (ev, key) => this.setState({ [key]: ev.target.value })

    render() {
        return (
           <div className='profile-form'>
                <div className='profile-segment'>
                    <h4>Teacher Information</h4>
                    <p>All information you give will be kept safe and secure for your privacy.</p>
                    <div className='form-row'>
                        <label className='form-label'>First name</label>
                        <span className='form-input-span'>
                            <input
                                className='form-input'
                                placeholder='. . . . . .'
                                name='firstName'
                                onChange={(ev)=>this.onInputChange(ev, 'firstName')}/>
                        </span>
                    </div>
                    <div className='form-row'>
                        <label className='form-label'>Last name</label>
                        <span className='form-input-span'>
                            <input
                                className='form-input'
                                placeholder='. . . . . .'
                                name='lastName'
                                onChange={(ev)=>this.onInputChange(ev, 'lastName')}/>
                        </span>
                    </div>
                    <div className='form-row'>
                        <label className='form-label'>Email</label>
                        <span className='form-input-span'>
                            <input
                                className='form-input'
                                placeholder='. . . . . .'
                                name='email'
                                onChange={(ev)=>this.onInputChange(ev, 'email')}/>
                        </span>
                    </div>
                    <div className='form-row'>
                        <label className='form-label'>Phone</label>
                        <span className='form-input-span'>
                            <input
                                className='form-input'
                                placeholder='. . . . . .'
                                name='phone'
                                onChange={(ev)=>this.onInputChange(ev, 'phone')}/>
                        </span>
                    </div>
                    <div className='form-row'>
                        <label className='form-label'>Password</label>
                        <span className='form-input-span'>
                            <input
                                type='password'
                                className='form-input'
                                placeholder='. . . . . .'
                                name='password'
                                onChange={(ev)=>this.onInputChange(ev, 'password')}/>
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}

export default TeacherForm;
