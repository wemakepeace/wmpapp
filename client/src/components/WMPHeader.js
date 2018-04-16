import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import SelectClass from './SelectClass';

import { logout } from '../redux/actions/teacher';
import { removeCurrentClass } from '../redux/actions/class';

const WMPHeader = ({ teacher, classes, logout, history, onViewChange, removeCurrentClass }) => {

    const onLogout = () => {
        logout();
        history.push('/');
    }

    const initiateNewClass = () => {
        const newClass = true;
        removeCurrentClass();
        return onViewChange('classforms', newClass);
    }

    const showDropDown = false;

    return (
        <div className='title-container'>
            <div className='heading'>
                <div className='title'><h1>WE</h1></div>
                <div className='title'><h1>MAKE</h1></div>
                <div className='title'>
                    <h1><span className='title-span'>PEACE LETTERS</span></h1>
                </div>
            </div>
            <div className='logged-in'>
                {teacher && teacher.id
                    ? <div className='logged-in-inner'>
                        {teacher.classes
                            ? <span className='header-menu-item'>
                                <SelectClass />
                            </span>
                            : null}
                         <span
                            className='header-menu-item'
                            onClick={initiateNewClass}>Register New Class</span>
                         <span
                            className='header-menu-item logout'
                            onClick={onLogout}>Log out</span>
                    </div>
                    : null}
            </div>
        </div>
    );
}


const mapStateToProps = state => {
    return {
        teacher: state.teacher,
        classes: state.classes
    }
}

export default connect(mapStateToProps, { logout, removeCurrentClass })(WMPHeader);

