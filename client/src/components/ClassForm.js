import React, { Component } from 'react';
import { connect } from 'react-redux';

import WMPHeader from './WMPHeader';

class ClassForm extends Component {
    state = {
        classId: '',
        size: '',
        age: '',
        requestedTerm: '',
        languageProficiency: '',
        language: ''
    }


    onInputChange = (ev, key) => {
        this.setState({ [key]: ev.target.value });
    }

    render() {
        return (
           <div className='profile-form'>
                <div className='profile-segment'>
                    <h4>Class Information</h4>
                    <p>This information will be used to facilitate the Exchange.</p>
                    <div className='form-row'>
                        <label className='form-label'>Class ID</label>
                        <span className='form-input-span'>
                            <input
                                className='form-input'
                                placeholder='. . . . . .'
                                name='classId'
                                onChange={(ev)=>this.onInputChange(ev, 'classId')}/>
                        </span>
                    </div>
                    <div className='form-row'>
                        <label className='form-label'>Class size</label>
                        <span className='form-input-span'>
                            <input
                                className='form-input'
                                placeholder='. . . . . .'
                                name='size'
                                onChange={(ev)=>this.onInputChange(ev, 'size')}/>
                        </span>
                    </div>
                    <div className='form-row'>
                        <label className='form-label'>Age of students</label>
                        <span className='form-input-span'>
                            <input
                                type='number'
                                className='form-input'
                                placeholder='. . . . . .'
                                name='age'
                                onChange={(ev)=>this.onInputChange(ev, 'age')}/>
                        </span>
                    </div>
                    <div className='form-row'>
                        <label className='form-label'>When would you like to participate in the Exchange Program?</label>
                        <span className='form-input-span'>
                            [DROPDOWN / CHECKBOXES]
                        </span>
                    </div>
                    <div className='form-row'>
                        <label className='form-label'>What language would you like your class to use in the Exchange?</label>
                        <span className='form-input-span'>
                            [DROPDOWN]
                        </span>
                    </div>
                    <div className='form-row'>
                        <label className='form-label'>How proficient are your students in the selected language?</label>
                        <span className='form-input-span'>
                            [SCALE]
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}

export default ClassForm;
