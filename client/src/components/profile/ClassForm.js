import React from 'react';
import { fetchDataForSelectDropdown } from '../../utils/helpers';
import { Async } from 'react-select';
import countries from 'country-list';

import SchoolAddressDropdown from './SchoolAddressDropdown';


const ClassForm = ({ classData, onInputChange, onSelectOptionChange, autoFillForm }) => {
    const { name, size, age_group, term, schoolId } = classData;
    const { id, schoolName, address1, address2, city, zip, state, country } = classData.school;

    const onLocalInputChange = (ev, key, objName) => onInputChange(key, ev.target.value, objName)

    const onLocalSelectOptionChange = (value, key, objName) => onSelectOptionChange(key, value, objName);

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
            <p>Please fill in information about your class.</p>
            <div className='form-row'>
                <label className='form-label'>Class name</label>
                <span className='form-input-span'>
                    <input
                        value={name || ''}
                        className='form-input'
                        placeholder='. . . . . .'
                        name='name'
                        onChange={(ev)=>onLocalInputChange(ev, 'name')}/>
                </span>
            </div>
            <div className='form-row'>
                <label className='form-label'>Class size</label>
                <span className='form-input-span'>
                    <input
                        value={size || ''}
                        className='form-input'
                        placeholder='. . . . . .'
                        name='size'
                        onChange={(ev)=>onLocalInputChange(ev, 'size')}/>
                </span>
            </div>
            <div className='form-row'>
                <label className='form-label'>Age Group</label>
                <span className='form-input-span'>
                    <Async
                        name='form-field-name'
                        value={age_group && age_group.value}
                        onChange={(select) => onLocalSelectOptionChange(select, 'age_group')}
                        loadOptions={() => fetchDataForSelectDropdown('agegroups')}
                    />
                </span>
            </div>
            <div className='form-row'>
                <label className='form-label-wide'>When would you like your class to participate in the Exchange Program?</label>
                <span className='form-input-span'>
                    <Async
                        className='select-country'
                        name='form-field-name'
                        value={term && term.value}
                        onChange={(value) => onLocalSelectOptionChange(value, 'term')}
                        loadOptions={() => fetchDataForSelectDropdown('terms')}
                    />
                </span>
            </div>

            <div>
                <h2> School Mailing Address</h2>
                <p>This address will be used when sending letters to your class.</p>
                <SchoolAddressDropdown schoolId={id} autoFillForm={autoFillForm}/>
                <div className='form-row'>
                    <label className='form-label'>School name</label>
                    <span className='form-input-span'>
                        <input
                            value={schoolName || ''}
                            className='form-input'
                            placeholder=''
                            name='schoolName'
                            onChange={(ev)=> onLocalInputChange(ev, 'schoolName', 'school')}/>
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
                            onChange={(ev)=> onLocalInputChange(ev, 'address1', 'school')}/>
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
                            onChange={(ev)=> onLocalInputChange(ev, 'address2', 'school')}/>
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
                            onChange={(ev)=> onLocalInputChange(ev, 'city', 'school')}/>
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
                            onChange={(ev)=> onLocalInputChange(ev, 'state', 'school')}/>
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
                            onChange={(ev)=> onLocalInputChange(ev, 'zip', 'school')}/>
                    </span>
                </div>
                <div className='form-row'>
                    <label className='form-label'>Country</label>
                    <span className='form-input-span'>
                        {<Async
                            name='form-field-name'
                            value={country}
                            onChange={(select) => onLocalSelectOptionChange(select, 'country', 'school')}
                            loadOptions={fetchCountries}
                        />}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default ClassForm;
