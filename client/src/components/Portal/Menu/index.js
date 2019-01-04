import React from 'react';
import { MenuLink } from './Link';
import content from './content';

export const Menu = ({ ...props }) => {

    return (
        <div className='profile-menu-column web-menu'>
            { content.map(({ name, route, defaultChildRoute }) => {
                return (
                    <MenuLink
                        name={name}
                        route={route}
                        defaultChildRoute={defaultChildRoute}
                        key={name} {...props}
                    />
                )
            })}
        </div>
    );
}
