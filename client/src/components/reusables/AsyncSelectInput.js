import React from 'react';
import { Async } from 'react-select';

export const AsyncSelectInput = ({ label, value, name, objName, loadOptions, onChange, path, clearable }) => {
    return (
        <div className='form-row'>
            <label className='form-label'>{label}</label>
            <span className='form-input-span'>
                <Async
                    value={value}
                    onChange={(ev) => onChange(ev, name, objName)}
                    loadOptions={() => loadOptions(path)}
                    clearable={clearable}
                    searchable={false}
                />
            </span>
        </div>
    );
}
