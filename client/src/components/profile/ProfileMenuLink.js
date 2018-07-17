import React from 'react';
import { Link } from 'react-router-dom';

export const ProfileMenuLink = ({ match, location, name }) => {
    const getActiveClass = (item) => {
        return location.pathname.indexOf(item) > -1 ? 'active-profile' : '';
    }

    return (
        <Link to={`${match.url}/${name}`}>
            <div className={`profile-menu-item ${getActiveClass(name)}`} >
                <h3>{name.toUpperCase()}</h3>
            </div>
        </Link>
    );
}
