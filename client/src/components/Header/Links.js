import React from 'react';
import SelectClass from './SelectClass';

const Links = ({ teacher, initiateNewClass, onLogout, history }) => {
    if (!teacher || !teacher.id) {
        return null;
    }


    return (
        <div className='logged-in'>
            <div className='logged-in-inner'>
                {teacher.classes ?
                    <span className='header-menu-item select-class-item'>
                        <SelectClass history={history} />
                    </span>
                    : null }
                 <span className='header-menu-item' onClick={initiateNewClass}>
                    Register Class
                </span>
                 <span className='header-menu-item' onClick={onLogout}>
                    Log out
                </span>
            </div>
        </div>
    );
}

export default Links;
