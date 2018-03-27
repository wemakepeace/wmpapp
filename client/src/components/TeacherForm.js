import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';

import WMPHeader from './WMPHeader';

import { updateTeacher } from '../redux/actions/session';

class TeacherForm extends Component {
    state = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: ''
    }

    onInputChange = (ev, key) => this.setState({ [key]: ev.target.value })

    onSubmit = () => {
        const data = this.state;
        this.props.updateTeacher(data)
        // send data to action creator

    }

    componentDidMount() {
        this.setState(this.props.session)
    }

    render() {
        const { firstName, lastName, email, phone, password } = this.state;
        console.log('this.state', this.state)
        return (
           <div className='profile-form'>
                <div className='profile-segment'>
                    <h4>Teacher Information</h4>
                    <p>All information you give will be kept safe and secure for your privacy.</p>
                    <div className='form-row'>
                        <label className='form-label'>First name</label>
                        <span className='form-input-span'>
                            <input
                                value={firstName}
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
                                value={lastName}
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
                                value={email}
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
                                value={phone}
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
                                value={password}
                                type='password'
                                className='form-input'
                                placeholder='. . . . . .'
                                name='password'
                                onChange={(ev)=>this.onInputChange(ev, 'password')}/>
                        </span>
                    </div>
                    <div className='form-row'>
                        <Button
                            className='large-custom-btn'
                            size='large'
                            onClick={()=>this.onSubmit()}>SAVE</Button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        session: state.session
    }
}

export default connect(mapStateToProps, { updateTeacher })(TeacherForm);
