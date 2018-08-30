import React from 'react';
import { Link } from 'react-router-dom';

export const MenuLink = ({ name, route, defaultChildRoute, match: { url }, location: { pathname } }) => {
    const getActiveClass = (route) => pathname.indexOf(route) > -1 ? 'active-profile' : '';
    const routeTo = defaultChildRoute ?
        `${url}/${route}/${defaultChildRoute}` :
        `${url}/${route}`;

    return (
        <Link to={routeTo}>
            <div className={`profile-menu-item ${getActiveClass(route)}`} >
                <h3>{name.toUpperCase()}</h3>
            </div>
        </Link>
    );
}
