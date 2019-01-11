import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';

export const MenuLink = (props) => {
    const {
        name,
        currentClass,
        path,
        defaultChildRoute,
        classIsSelected,
        hidden,
        match: { url },
        location: { pathname },
        removeCurrentClass
    } = props;

    const getActiveClass = (_path) => pathname.indexOf(_path) > -1 ? 'active-profile' : '';
    const routeTo = `${url}/${path}`;
    const _class = `profile-menu-item ${getActiveClass(path)}`;

    if (!hidden) {
        return (
            <Link to={routeTo} onClick={removeCurrentClass}>
                <div className={_class} >
                    <div className='portal-menu-item'>
                        { path === 'my-classes' && (currentClass && currentClass.name) ?
                        <h3>{name} ({currentClass.name})</h3> :
                        <h3>{name}</h3> }
                        <Icon name='long arrow right' />
                    </div>
                </div>
            </Link>
        );
    }
    return null;
}
