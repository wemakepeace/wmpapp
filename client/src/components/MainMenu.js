import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

import { logout } from '../redux/actions/class';

class MainMenu extends Component {
    state = {}

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    componentDidUpdate() {
        if (!localStorage.getItem('token')) {
            return this.props.logout();
        }
    }

    render() {
        const { activeItem } = this.state

        return (
            <Menu>
                <Menu.Item
                    header
                    as={Link}
                    to='/'
                    name='/'
                    active={activeItem === '/'}
                    onClick={this.handleItemClick}>WE MAKE PEACE</Menu.Item>
                <Menu.Item
                    as={Link}
                    to='/flex'
                    name='flex'
                    active={activeItem === 'flex'}
                    onClick={this.handleItemClick}>Flex Examples</Menu.Item>
                <Menu.Item
                    as={Link}
                    to='/profile'
                    name='profile'
                    active={activeItem === 'profile'}
                    onClick={this.handleItemClick} >Profile</Menu.Item>
                <Menu.Item
                    as={Link}
                    to='secret'
                    name='secret'
                    active={activeItem === 'secret'}
                    onClick={this.handleItemClick} />
            </Menu>
        )
    }
}

export default connect(null, { logout })(MainMenu);
