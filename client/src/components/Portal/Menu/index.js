import React from 'react';
import { MenuLink } from './Link';
import content from './content';

export const Menu = ({ ...props }) => {
    return (
        <div className='profile-menu-column web-menu'>
            { content.mainMenuContent.map(({ name, route, shouldDisplayAlways, defaultChildRoute }) => {
                return (
                    <MenuLink
                        name={name}
                        route={route}
                        defaultChildRoute={defaultChildRoute}
                        shouldDisplayAlways={shouldDisplayAlways}
                        key={name}
                        {...props}
                    />
                );
            })}
            { props.classIsSelected ?
                <div>
                    <div className='profile-menu-item '><label className='menu-label'>Class Menu</label></div>
                    { content.classMenuContent.map(({ name, route, shouldDisplayAlways, defaultChildRoute }) => {
                        return (
                            <MenuLink
                                name={name}
                                route={route}
                                defaultChildRoute={defaultChildRoute}
                                shouldDisplayAlways={shouldDisplayAlways}
                                key={name}
                                {...props}
                            />
                        );
                    })}

                </div> : null }
        </div>
    );
}
