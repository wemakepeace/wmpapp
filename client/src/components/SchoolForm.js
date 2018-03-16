import React, { Component } from 'react';
import { connect } from 'react-redux';

import WMPHeader from './WMPHeader';


class SchoolForm extends Component {
    state = {

    }

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
                                name='school'
                                onChange={(ev)=>this.onChange(ev, 'school')}/>
                        </span>
                    </div>

                    <div className='form-row'>
                        <label className='form-label'>Address line 1</label>
                        <span className='form-input-span'>
                            <input
                                className='form-input'
                                placeholder='. . . . . .'
                                name='address1'
                                onChange={(ev)=>this.onChange(ev, 'address1')}/>
                        </span>
                    </div>
                    <div className='form-row'>
                        <label className='form-label'>Address line 2</label>
                        <span className='form-input-span'>
                            <input
                                className='form-input'
                                placeholder='. . . . . .'
                                name='address1'
                                onChange={(ev)=>this.onChange(ev, 'address2')}/>
                        </span>
                    </div>
                    <div className='form-row'>
                        <label className='form-label'>City / Town </label>
                        <span className='form-input-span'>
                            <input
                                className='form-input'
                                placeholder='. . . . . .'
                                name='city'
                                onChange={(ev)=>this.onChange(ev, 'city')}/>
                        </span>
                        <label className='form-label'>Zip code </label>
                        <span className='form-input-span'>
                            <input
                                className='form-input'
                                placeholder='. . . . . .'
                                name='zip'
                                onChange={(ev)=>this.onChange(ev, 'zip')}/>
                        </span>
                    </div>
                    <div className='form-row'>
                        <label className='form-label'>Country</label>
                        <span className='form-input-span'>
                            <input
                                className='form-input'
                                placeholder='. . . . . .'
                                name='country'
                                onChange={(ev)=>this.onChange(ev, 'country')}/>
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}

export default SchoolForm;
