import React from 'react';
import { Link } from 'react-router-dom';

export const MenuLink = (props) => {

    const {
        name,
        route,
        defaultChildRoute,
        classIsSelected,
        shouldDisplayAlways,
        match: { url },
        location: { pathname }
    } = props;

    console.log('classIsSelected', classIsSelected)
    const routeTo = defaultChildRoute ?
        `${url}/${route}/${defaultChildRoute}` :
        `${url}/${route}`;

    const getActiveClass = (_route) => {
        return pathname.indexOf(_route) > -1 ? 'active-profile' : '';
    }

    let _class = `profile-menu-item ${getActiveClass(route)}`;

    if (name === 'Support') {
        _class += ' last-item';
    }

    if (classIsSelected || shouldDisplayAlways) {
        return (
            <Link to={routeTo}>
                <div className={_class} >
                    <h3>{name.toUpperCase()}</h3>
                </div>
            </Link>
        );
    }
    return null;
}
