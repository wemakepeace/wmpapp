import React from 'react';
import { Link } from 'react-router-dom';

export const MenuLink = ({ name, route, defaultChildRoute, match: { url }, location: { pathname } }) => {
    const getActiveClass = (_route) => pathname.indexOf(_route) > -1 ? 'active-profile' : '';
    const routeTo = defaultChildRoute ?
        `${url}/${route}/${defaultChildRoute}` :
        `${url}/${route}`;

    let _class = `profile-menu-item ${getActiveClass(route)}`;
    if (name === 'Support') {
        _class += ' last-item';
    }

    return (
        <Link to={routeTo}>
            <div className={_class} >
                <h3>{name.toUpperCase()}</h3>
            </div>
        </Link>
    );
}
