import React from 'react';
import { Async } from 'react-select';
import countries from 'country-list';
import AsyncSelect from '../AsyncSelect';
import { fetchSchools, fetchCountries } from '../../utils/fetchConstantData'

const SchoolForm = ({ school, teacherId, onInputChange, fetchSchool }) => {
    const {
        id,
        schoolName,
        address1,
        address2,
        city,
        zip,
        state,
        country
    } = school;

    return (
        <div>
            <h2> School Mailing Address</h2>
            <p>This address will be used when sending letters to your class.</p>
            <AsyncSelect
                value={{ label: schoolName, value: id }}
                asyncFetch={() => fetchSchools(teacherId)}
                name='school'
                handleAddValues={fetchSchool}
            />
            <div className='form-row'>
                <label className='form-label'>School name</label>
                <span className='form-input-span'>
                    <input
                        value={schoolName || ''}
                        className='form-input'
                        placeholder=''
                        name='schoolName'
                        onChange={(ev) => onInputChange(ev.target.value, 'schoolName', 'school')}
                    />
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
                        onChange={(ev) => onInputChange(ev.target.value, 'address1', 'school')}
                    />
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
                        onChange={(ev) => onInputChange(ev.target.value, 'address2', 'school')}
                    />
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
                        onChange={(ev) => onInputChange(ev.target.value, 'city', 'school')}
                    />
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
                        onChange={(ev) => onInputChange(ev.target.value, 'state', 'school')}
                    />
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
                        onChange={(ev) => onInputChange(ev.target.value, 'zip', 'school')}
                    />
                </span>
            </div>
            <div className='form-row'>
                <label className='form-label'>Country</label>
                <span className='form-input-span'>
                    <Async
                        name='form-field-name'
                        value={country}
                        onChange={(ev) => onInputChange(ev, 'country', 'school')}
                        loadOptions={fetchCountries}
                    />
                </span>
            </div>
        </div>
    );
};

export default SchoolForm;
