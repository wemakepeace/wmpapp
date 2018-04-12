import React from 'react';
import { fetchDataForSelectDropdown } from '../../utils/helpers';
import { Async } from 'react-select';

const ClassForm = ({ classData, onInputChange, onSelectOptionChange }) => {
    const { name, size, age_group, term } = classData;

    const onLocalInputChange = (ev, key) => onInputChange(key, ev.target.value)

    const onLocalSelectOptionChange = (value, key) => onSelectOptionChange(key, value);

    return (
        <div>
            <h4>Class Information</h4>
            <p>This information will be used to facilitate the Exchange.</p>
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
                <label className='form-label-wide'>When would you like to participate in the Exchange Program?</label>
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
        </div>
    )
}

export default ClassForm;
