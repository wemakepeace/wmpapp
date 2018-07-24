import React from 'react';
import { Async } from 'react-select';

export const AsyncSelect = ({ label, value, name, objName, loadOptions, onChange, path }) => {
    return (
        <div className='form-row'>
            <label className='form-label-wide'>{label}</label>
            <span className='form-input-span'>
                <Async
                    value={value}
                    onChange={(ev) => onChange(ev, name, objName)}
                    loadOptions={() => loadOptions(path)}
                    clearable={false}
                    searchable={false}
                />
            </span>
        </div>
    );
}
