import React from 'react';
// import SelectClass from './SelectClass';
import SelectClass from '../reusables/SelectClassDropdown';




const Links = ({ teacher, initiateNewClass, onLogout, history, fetchClass }) => {
    if (!teacher || !teacher.id) {
        return null;
    }

    function onClassSelect(selected){
        fetchClass(selected.value);

        if (history.location.pathname !== '/profile/overview') {
            history.push('/profile/overview');
        }
    }


    return (
        <div className='logged-in'>
            <div className='logged-in-inner'>
                {teacher.classes ?
                    <span className='header-menu-item select-class-item'>
                        <SelectClass
                            onClassSelect={onClassSelect}
                            history={history}
                        />
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
