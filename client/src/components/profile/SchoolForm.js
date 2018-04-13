import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Async } from 'react-select';
import countries from 'country-list';


const SchoolForm = ({ schoolData, onInputChange, onSelectOptionChange }) => {
    const { id, name, address1, address2, city, zip, state, country } = schoolData;

    const onLocalInputChange = (ev, key) => onInputChange(key, ev.target.value, 'school')

    const onLocalSelectOptionChange = (value, key) => onSelectOptionChange(key, value, 'school')

    const fetchCountries = () => {
        let options;
        return new Promise((resolve, reject) => {
            const list = countries().getData()

            options = list.map(el => {
                return {
                    label: el.name,
                    value: el.code
                }
            });

            options.length ? resolve() : reject();
        })
        .then(res => {
            return { options: options }
        })
    }


    return (
        <div>
            <h4> School Mailing Address</h4>
            <p>This address will be used when sending letters to your class.</p>
            <div className='form-row'>
                <label className='form-label'>School name</label>
                <span className='form-input-span'>
                    <input
                        value={name || ''}
                        className='form-input'
                        placeholder=''
                        name='name'
                        onChange={(ev)=> onLocalInputChange(ev, 'name')}/>
                </span>
            </div>

            <div className='form-row'>
                <label className='form-label'>Address</label>
                <span className='form-input-span'>
                    <input
                        value={address1 || ''}
                        className='form-input'
                        placeholder=''
                        name='address1'
                        onChange={(ev)=> onLocalInputChange(ev, 'address1')}/>
                </span>
            </div>
            <div className='form-row'>
                <label className='form-label'>Address</label>
                <span className='form-input-span'>
                    <input
                        value={address2 || ''}
                        className='form-input'
                        placeholder=''
                        name='address1'
                        onChange={(ev)=> onLocalInputChange(ev, 'address2')}/>
                </span>
            </div>
            <div className='form-row'>
                <label className='form-label'>City</label>
                <span className='form-input-span'>
                    <input
                        value={city || ''}
                        className='form-input'
                        placeholder=''
                        name='city'
                        onChange={(ev)=> onLocalInputChange(ev, 'city')}/>
                </span>
            </div>
            <div className='form-row'>
                <label className='form-label'>State</label>
                <span className='form-input-span'>
                    <input
                        value={state || ''}
                        className='form-input'
                        placeholder=''
                        name='state'
                        onChange={(ev)=> onLocalInputChange(ev, 'state')}/>
                </span>
            </div>
            <div className='form-row'>
                <label className='form-label'>Zip code</label>
                <span className='form-input-span'>
                    <input
                        value={zip || ''}
                        className='form-input'
                        placeholder=''
                        name='zip'
                        onChange={(ev)=> onLocalInputChange(ev, 'zip')}/>
                </span>
            </div>
            <div className='form-row'>
                <label className='form-label'>Country</label>
                <span className='form-input-span'>
                    {<Async
                        name='form-field-name'
                        value={country}
                        onChange={(select) => onLocalSelectOptionChange(select, 'country')}
                        loadOptions={fetchCountries}
                    />}
                </span>
            </div>
        </div>
    )
}

export default SchoolForm;
