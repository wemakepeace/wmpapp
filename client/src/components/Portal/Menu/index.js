import React from 'react';
import { MenuLink } from './Link';
import content from './content';

export const Menu = ({ ...props }) => {
    return (
        <div className='profile-menu-column web-menu'>
            { content.mainMenuContent.map(({ name, path, hidden, defaultChildRoute }) => {
                return (
                    <MenuLink
                        name={name}
                        path={path}
                        defaultChildRoute={defaultChildRoute}
                        hidden={hidden}
                        key={name}
                        {...props}
                    />
                );
            })}
        </div>
    );
}
