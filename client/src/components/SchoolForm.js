import React, { Component } from 'react';
import { connect } from 'react-redux';

import WMPHeader from './WMPHeader';


class SchoolForm extends Component {
    state = {
        name: '',
        address1: '',
        address2: '',
        city: '',
        zip: '',
        country: ''
    }

    onInputChange = (ev, key) => this.setState({ [key]: ev.target.value })

    render() {
        return (
           <div className='profile-form'>
                <div className='profile-segment'>
                    <h4> School Address</h4>
                    <p>This is the address that will be used in the Exchange for sending letters.</p>
                    <div className='form-row'>
                        <label className='form-label'>School name</label>
                        <span className='form-input-span'>
                            <input
                                className='form-input'
                                placeholder='. . . . . .'
                                name='name'
                                onChange={(ev)=>this.onInputChange(ev, 'name')}/>
                        </span>
                    </div>

                    <div className='form-row'>
                        <label className='form-label'>Address</label>
                        <span className='form-input-span'>
                            <input
                                className='form-input'
                                placeholder='. . . . . .'
                                name='address1'
                                onChange={(ev)=>this.onInputChange(ev, 'address1')}/>
                        </span>
                    </div>
                    <div className='form-row'>
                        <label className='form-label'>Address</label>
                        <span className='form-input-span'>
                            <input
                                className='form-input'
                                placeholder='. . . . . .'
                                name='address1'
                                onChange={(ev)=>this.onInputChange(ev, 'address2')}/>
                        </span>
                    </div>
                    <div className='form-row'>
                        <label className='form-label'>City</label>
                        <span className='form-input-span'>
                            <input
                                className='form-input'
                                placeholder='. . . . . .'
                                name='city'
                                onChange={(ev)=>this.onInputChange(ev, 'city')}/>
                        </span>
                    </div>
                    <div className='form-row'>
                        <label className='form-label'>Zip code </label>
                        <span className='form-input-span'>
                            <input
                                className='form-input'
                                placeholder='. . . . . .'
                                name='zip'
                                onChange={(ev)=>this.onInputChange(ev, 'zip')}/>
                        </span>
                    </div>
                    <div className='form-row'>
                        <label className='form-label'>Country</label>
                        <span className='form-input-span'>
                            <input
                                className='form-input'
                                placeholder='. . . . . .'
                                name='country'
                                onChange={(ev)=>this.onInputChange(ev, 'country')}/>
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}

export default SchoolForm;
