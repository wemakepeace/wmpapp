import React from 'react';
import { MenuLink } from './Link';

export const Menu = ({ currentClass, ...props }) => {
    return (
        <div className='profile-menu-column'>
            <MenuLink name='overview' {...props} />
            <MenuLink name='teacher' {...props} />
            { currentClass && currentClass.id ?
                <div>
                    <MenuLink name='class' {...props} />
                    <MenuLink name='materials' {...props} />
                    <MenuLink name='messages' {...props} />
                </div> : null }
        </div>
    );
}
