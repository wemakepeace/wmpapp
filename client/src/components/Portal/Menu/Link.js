import React from 'react';
import { Link } from 'react-router-dom';

export const MenuLink = (props) => {

    const {
        name,
        path,
        defaultChildRoute,
        classIsSelected,
        hidden,
        match: { url },
        location: { pathname }
    } = props;

    const routeTo = defaultChildRoute ?
        `${url}/${path}/${defaultChildRoute}` :
        `${url}/${path}`;

    const getActiveClass = (_path) => {
        return pathname.indexOf(_path) > -1 ? 'active-profile' : '';
    }

    let _class = `profile-menu-item ${getActiveClass(path)}`;

    if (name === 'Support') {
        _class += ' last-item';
    }

    if (!hidden) {
        return (
            <Link to={routeTo}>
                <div className={_class} >
                    <h3>{name}</h3>
                </div>
            </Link>
        );
    }
    return null;
}
