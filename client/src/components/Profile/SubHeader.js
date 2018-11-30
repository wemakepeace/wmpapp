import React from 'react';
import { connect } from 'react-redux';
import RegisterClass from '../reusables/RegisterClass';
import { logout } from '../../redux/actions/teacher';

const SubHeader = ({ teacher, currentClass, logout, history }) => {

    const onLogout = () => {
        logout(teacher.id);
        history.push('/');
    }

    return (
        <div className='subheader'>
            <div className='user-details'>Logged in as {teacher.firstName} { currentClass && currentClass.name ? <span>for Class {currentClass.name}</span> : null }</div>
            <div className='subheader-menu-item'>
                <RegisterClass history={history} />
            </div>
            <div className='subheader-menu-item' onClick={onLogout}>Log out</div>
        </div>
    )
}

export default connect(null, { logout })(SubHeader);
