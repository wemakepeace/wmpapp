import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect, Button } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

import { logout } from '../redux/actions/session';

class MainMenu extends Component {
    state = {}

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    onLogout = () => {
        this.props.logout();
        this.props.history.push('/');
        this.setState({ activeItem: '/' });
    }

    render() {
        const { activeItem } = this.state;
        const { auth } = this.props;

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
                { auth === true
                ? <Menu.Item
                    as={Button}
                    name='Log out'
                    position='right'
                    onClick={this.onLogout} />
                    : null}
            </Menu>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, { logout })(MainMenu);
