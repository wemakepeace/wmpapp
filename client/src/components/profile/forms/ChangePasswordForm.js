import React from 'react';
import { Button } from 'semantic-ui-react'

export const ChangePasswordForm = ({ onInputChange, onChangePassword }) => {
    return (
        <div>
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
                <Button
                    className='large-custom-btn'
                    size='large'
                    fluid
                    onClick={onChangePassword}>
                    Change Password
                </Button>
            </div>
        </div>
    );
};
