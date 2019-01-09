import React from 'react';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react';
import RegisterClass from '../reusables/RegisterClass';
import { logout } from '../../redux/actions/teacher';

const SubHeader = ({ teacher, currentClass, className, logout, history, location }) => {

    const onLogout = () => {
        logout(teacher.id);
        history.push('/');
    }

    const activeItem = () => {
        if (location && location.pathname === '/portal/new-class') {
            return 'active-profile'
        }
        return '';
    }

    if (!teacher || !teacher.id) {
        return null;
    }

    return (
        <div className={`subheader ${className}`}>
            <div className='user-details'>
                <Icon name='user' />
                Logged in as {teacher && teacher.firstName} {currentClass && currentClass.name ? <span>for Class {currentClass && currentClass.name}</span> : null}
            </div>
            <div className={`subheader-menu-item ${activeItem()}`} >
                <h3><RegisterClass history={history} /></h3>
            </div>
            <div className='subheader-menu-item' onClick={onLogout}><h3>Log out</h3></div>
        </div>
    )
}

export default connect(null, { logout })(SubHeader);
