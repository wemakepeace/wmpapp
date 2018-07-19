import React from 'react';
import { Redirect } from 'react-router-dom';
import SelectClass from '../SelectClass';

const LoggedIn = ({ teacher, initiateNewClass, onLogout }) => {
    if (!teacher || !teacher.id) {
        return null;
    }

    return (
        <div className='logged-in'>
            <div className='logged-in-inner'>
                {teacher.classes && teacher.classes ?
                    <div>
                        <span
                            icon='arrow right'
                            className='header-menu-item no-border select-class-label'>Select Class</span>
                        <span className='header-menu-item select-class-item'>
                            <SelectClass />
                        </span>
                    </div>
                    : null
                }
                 <span
                    className='header-menu-item'
                    onClick={initiateNewClass}>Register New Class</span>
                 <span
                    className='header-menu-item no-border'
                    onClick={onLogout}>Log out</span>
            </div>
        </div>
    );
}

export default LoggedIn;
