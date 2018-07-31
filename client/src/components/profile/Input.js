import React from 'react';

export const Input = ({ label, value, name, onInputChange, objName, type }) => {
    return (
        <div className='form-row'>
            <label className='form-label'>{label}</label>
            <span className='form-input-span'>
                <input
                    value={value || ''}
                    className='form-input'
                    placeholder=''
                    type={type}
                    name={name}
                    onChange={(ev) => onInputChange(ev.target.value, name, objName)}
                />
            </span>
        </div>
    );
}

