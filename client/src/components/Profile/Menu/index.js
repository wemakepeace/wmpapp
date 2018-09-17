import React from 'react';
import { MenuLink } from './Link';

export const Menu = ({ content, currentClass, status, ...props }) => {
    return (
        <div className='profile-menu-column'>
            { content.map(({ name, route, defaultChildRoute }) => {
                // do not create class/materials links if exchange status is not confirmed
                if ((route === 'class' || route === 'materials') && status !== 'confirmed') return
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
