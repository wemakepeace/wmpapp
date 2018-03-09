import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';


class MainMenu extends Component {
    state = {}

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state

        return (
            <Menu>
                <Menu.Item header>Our Company</Menu.Item>
                <Menu.Item
                    as={Link}
                    to='/flex'
                    name='flex'
                    active={activeItem === 'flex'}
                    onClick={this.handleItemClick}>Flex Examples</Menu.Item>
                <Menu.Item
                    as={Link}
                    to='/Q&A'
                    name='Q&A'
                    active={activeItem === 'Q&A'}
                    onClick={this.handleItemClick} >Q&A</Menu.Item>
                <Menu.Item
                    as={Link}
                    to='login'
                    name='login'
                    active={activeItem === 'login'}
                    onClick={this.handleItemClick} />
            </Menu>
        )
    }
}

export default MainMenu;
