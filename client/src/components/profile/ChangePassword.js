import React from 'react';

export const ChangePassword = ({ onInputChange }) => {
    return (
        <div className=''>
            <p>Password must be at least 8 characters long.</p>
            <div className='form-row'>
                <label className='form-label'>Current password</label>
                <span className='form-input-span'>
                    <input
                        className='form-input'
                        type='password'
                        name='oldPassword'
                        onChange={(ev)=>onInputChange(ev, 'oldPassword')}/>
                </span>
            </div>
            <div className='form-row'>
                <label className='form-label'>New password</label>
                <span className='form-input-span'>
                    <input
                        className='form-input'
                        type='password'
                        name='password'
                        onChange={(ev)=>onInputChange(ev, 'password')}/>
                </span>
            </div>
            <div className='form-row'>
                <label className='form-label'>Confirm new password</label>
                <span className='form-input-span'>
                    <input
                        className='form-input'
                        type='password'
                        name='confirmPassword'
                        onChange={(ev)=>onInputChange(ev, 'confirmPassword')}/>
                </span>
            </div>
        </div>
    )
}
