import React from 'react';
import { fetchDataForSelectDropdown } from '../../utils/helpers';
import { Async } from 'react-select';

const ClassForm = ({ classData, onInputChange, onSelectOptionChange }) => {
    const {
        name,
        size,
        age_group,
        term,
        schoolId
    } = classData;

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
                        onChange={(ev) => onInputChange(ev.target.value, 'name')}/>
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
                        onChange={(ev) => onInputChange(ev.target.value, 'size')}/>
                </span>
            </div>
            <div className='form-row'>
                <label className='form-label'>Age Group</label>
                <span className='form-input-span'>
                    <Async
                        name='form-field-name'
                        value={age_group && age_group.value}
                        onChange={(ev) => onSelectOptionChange(ev, 'age_group')}
                        loadOptions={() => fetchDataForSelectDropdown('agegroups')}
                        clearable={false}
                        searchable={false}
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
                        onChange={(ev) => onSelectOptionChange(ev, 'term')}
                        loadOptions={() => fetchDataForSelectDropdown('terms')}
                        clearable={false}
                        searchable={false}
                    />
                </span>
            </div>
        </div>
    );
};

export default ClassForm;
