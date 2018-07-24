import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import LoggedIn from './LoggedIn';
import { logout } from '../../redux/actions/teacher';
import { removeCurrentClass } from '../../redux/actions/class';

const HeaderContainer = ({ teacher, history, removeCurrentClass, logout }) => {
    const onLogout = () => {
        logout(teacher.id);
        history.push('/');
    }

    const initiateNewClass = () => {
        const newClass = true;
        removeCurrentClass();
        history.push('/profile/class');
    }

    return (
        <div className='title-container'>
            <div className='heading'>
                <div className='title'><h1>WE</h1></div>
                <div className='title'><h1>MAKE</h1></div>
                <div className='title'>
                    <h1><span className='title-span'>PEACE LETTERS</span></h1>
                </div>
            </div>
            <LoggedIn
                teacher={teacher}
                onLogout={onLogout}
                initiateNewClass={initiateNewClass}
            />
        </div>
    );
}


const mapStateToProps = ({ teacher }) => {
    return { teacher }
};

export default connect(mapStateToProps, { logout, removeCurrentClass })(HeaderContainer);
