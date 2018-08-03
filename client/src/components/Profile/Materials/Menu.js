import React, { Component } from 'react'
import { Input, Menu, Segment } from 'semantic-ui-react'

const InstructionMenu = ({ handleItemClick, activeItem }) => {
    return (
        <Menu attached='top' tabular>
            <Menu.Item
                name='Overview'
                component='Overview'
                active={activeItem === 'Overview'}
                onClick={handleItemClick} />
            <Menu.Item
                name='Letter 1'
                component='Letter1'
                active={activeItem === 'Letter1'}
                onClick={handleItemClick}
            />
            <Menu.Item
                name='Letter 2'
                component='Letter2'
                active={activeItem === 'Letter2'}
                onClick={handleItemClick}
            />
            <Menu.Item
                name='Letter 3'
                component='Letter3'
                active={activeItem === 'Letter3'}
                onClick={handleItemClick}
            />
        </Menu>
    );
}

export default InstructionMenu;
