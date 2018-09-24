import React from 'react';
import { connect } from 'react-redux';
import Links from './Links';
import { logout } from '../../redux/actions/teacher';
import { removeCurrentClass, fetchClass } from '../../redux/actions/class';

const HeaderContainer = ({ teacher, history, logout, fetchClass, removeCurrentClass }) => {
    const onLogout = () => {
        logout(teacher.id);
        history.push('/');
    }

    const initiateNewClass = () => {
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
            <Links
                teacher={teacher}
                onLogout={onLogout}
                initiateNewClass={initiateNewClass}
                fetchClass={fetchClass}
                history={history}
            />
        </div>
    );
}

const mapStateToProps = ({ teacher }) => {
    return { teacher }
};

export default connect(mapStateToProps, { logout, removeCurrentClass, fetchClass })(HeaderContainer);
