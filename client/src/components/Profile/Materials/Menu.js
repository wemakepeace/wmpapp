import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Input, Menu, Segment } from 'semantic-ui-react'

const InstructionMenu = ({ content, match, location }) => {

    const isActive = (route) => location.pathname.indexOf(route) > -1;
    return (
        <Menu attached='top' tabular stackable>
            {
                content.map(({ name, component, route }) => (
                    <Menu.Item
                        name={name}
                        as={Link}
                        to={`${match.url}/${route}`}
                        active={isActive(route)}
                        key={name}
                    />
                ))
            }
        </Menu>
    );
}


export default InstructionMenu;
