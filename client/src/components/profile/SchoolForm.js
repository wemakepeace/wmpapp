import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Async } from 'react-select';
import countries from 'country-list';
import WMPHeader from '../WMPHeader';


class SchoolForm extends Component {
    state = {
        name: '',
        address1: '',
        address2: '',
        city: '',
        zip: '',
        country: ''
    }

    fetchCountries() {
        let options;
        return new Promise((resolve, reject) => {
            const list = countries().getData()

            options = list.map(el => {
                return {
                    label: el.name,
                    value: el.code
                }
            })

            if(options.length) {
                resolve()
            } else {
                reject()
            }
        })
        .then(res => {
            console.log(options)
            return { options: options }
        })
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
                            {<Async
                                name='form-field-name'
                                value={'temp'}
                                onChange={(value) => console.log(value)}
                                loadOptions={this.fetchCountries}
                            />}
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}

// const mapStateToProps =
export default SchoolForm;
