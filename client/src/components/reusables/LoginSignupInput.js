import React from 'react';

export const LoginSignupInput = ({ label, name, type, value, onInputChange  }) => {
    return (
        <div className='form-row'>
            <input
                value={value || ''}
                placeholder={label}
                name={name}
                type={type}
                onChange={(ev) => onInputChange(ev.target.value, name)}/>
        </div>
    );
}
