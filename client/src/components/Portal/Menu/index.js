import React from 'react';
import { MenuLink } from './Link';
import content from './content';

export const Menu = ({ ...props }) => {
    return (
        <div className='profile-menu-column web-menu'>
            { content.mainMenuContent.map(({ name, path, shouldDisplayAlways, defaultChildRoute }) => {
                return (
                    <MenuLink
                        name={name}
                        path={path}
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
                    { content.classMenuContent.map(({ name, path, shouldDisplayAlways, defaultChildRoute }) => {
                        return (
                            <MenuLink
                                name={name}
                                path={path}
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
