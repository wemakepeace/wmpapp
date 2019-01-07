import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Input, Menu, Segment } from 'semantic-ui-react'

const InstructionMenu = ({ content, match, location }) => {

    const isActive = (path) => location.pathname.indexOf(path) > -1;
    return (
        <Menu attached='top' tabular stackable>
            {
                content.map(({ name, component, path }) => (
                    <Menu.Item
                        name={name}
                        as={Link}
                        to={`${match.url}/${path}`}
                        active={isActive(path)}
                        key={name}
                    />
                ))
            }
        </Menu>
    );
}


export default InstructionMenu;
