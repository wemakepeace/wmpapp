import React from 'react';
import { MenuLink } from './Link';

export const Menu = ({  content, status, ...props }) => {

    return (
        <div className='profile-menu-column web-menu'>
            { content.map(({ name, route, defaultChildRoute }) => {
                // do not create class/materials links if exchange status is not confirmed
                if ((route === 'materials') && status !== 'confirmed') return
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
