import React from 'react';
import { Link } from 'react-router-dom';
import { ProfileMenuLink } from './ProfileMenuLink';

export const ProfileMenu = ({ currentClassDetails, ...props }) => {
    return (
        <div className='profile-menu-column'>
            <ProfileMenuLink name='overview' {...props} />
            <ProfileMenuLink name='teacher' {...props} />
            { currentClassDetails ?
                <div>
                    <ProfileMenuLink name='class' {...props} />
                    <ProfileMenuLink name='materials' {...props} />
                    <ProfileMenuLink name='messages' {...props} />
                </div> : null }
        </div>
    );
}
