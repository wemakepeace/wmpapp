import React, { Component } from 'react';
import ChangePasswordForm from '../ChangePasswordForm';
import { Link } from 'react-router-dom';

const Settings = ({ onChangePasswordClick, showChangePwForm }) => {
    return (
        <div className='profile-segment'>
            <h2>Security Settings</h2>
            <div className='form-row'>
                <h4 onClick={onChangePasswordClick}>Change password</h4>
            { showChangePwForm ?
                <ChangePasswordForm /> : null }
            </div>
            <div className='form-row'>
                <Link to='/delete'>Delete Account</Link>
            </div>
        </div>
    );
}

export default Settings;
