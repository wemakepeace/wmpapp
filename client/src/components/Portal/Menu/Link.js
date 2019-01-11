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
        location: { pathname }
    } = props;

    const routeTo = defaultChildRoute ?
        `${url}/${path}/${defaultChildRoute}` :
        `${url}/${path}`;

    const getActiveClass = (_path) => pathname.indexOf(_path) > -1 ? 'active-profile' : '';

    let _class = `profile-menu-item ${getActiveClass(path)}`;

    if (name === 'Support') {
        _class += ' last-item';
    }

    if (!hidden) {
        return (
            <Link to={routeTo}>
                <div className={_class} >
                    <div className='portal-menu-item'>
                        { path === 'my-classes' || path === 'class' && (currentClass && currentClass.name) ?
                        <h3>{name} ( {currentClass.name} )</h3> :
                        <h3>{name}</h3>
                        }
                        <Icon name='long arrow right' />
                    </div>
                </div>
            </Link>
        );
    }
    return null;
}
