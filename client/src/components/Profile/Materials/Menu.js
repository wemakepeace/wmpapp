import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Input, Menu, Segment } from 'semantic-ui-react'

const InstructionMenu = ({ materials, handleItemClick, activeItem, match }) => {
    return (
        <Menu attached='top' tabular>
            {
                materials.map(({ name, component, sub }) => (
                    <Menu.Item
                        name={name}
                        as={Link}
                        to={`${match.url}/${sub}`}
                        active={activeItem === name }
                        onClick={handleItemClick}
                        key={name}
                    />
                ))
            }
        </Menu>
    );
}


export default InstructionMenu;
