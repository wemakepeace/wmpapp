import React from 'react';
import RegisterClass from '../reusables/RegisterClass';


const Links = ({ teacher, onLogout, history }) => {
    if (!teacher || !teacher.id) {
        return null;
    }

    return (
        <div className='logged-in'>
            <div className='logged-in-inner'>
                <RegisterClass history={history} />
                <span className='header-menu-item' onClick={onLogout}>
                    Log out
                </span>
            </div>
        </div>
    );
}

export default Links;
