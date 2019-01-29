import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Menu, Dropdown, Icon, Segment } from 'semantic-ui-react'

class WPMenu extends Component {
    state = {
        showMobileMenu: false
    }

    handleItemClick = (e) => this.setState({ showMobileMenu: !this.state.showMobileMenu })

    render() {
        const { showMobileMenu } = this.state;
        const { loggedIn } = this.props;
        const menuClass = showMobileMenu ? 'wp-menu show' : 'wp-menu hide';

        return (
            <div>
                <Menu attached='top' inverted stackable className='hamburger'>
                    <Menu.Menu position='left'>
                        <Menu.Item className='mobile-menu'onClick={this.handleItemClick}>
                            <div>Menu</div><div className='mobile-title'>WE MAKE PEACE Letters</div>
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>
                <Menu attached='top' inverted className={menuClass} stackable>
                    <Menu.Menu position='left' className={menuClass}>
                        <Menu.Item className='close-mobile-menu' onClick={this.handleItemClick}>
                            <Icon name='close' />
                        </Menu.Item>
                        <Menu.Item>
                            <a href='//wemakepeace.org/'>Home</a>
                        </Menu.Item>
                    </Menu.Menu>
                    <Menu.Menu position='right' className='wp-menu'>
                        <Dropdown
                            className='dropdown'
                            item
                            text='Our Mission'>
                            <Dropdown.Menu>
                                <Dropdown.Item>
                                    <a href='//wemakepeace.org/about/#objectives'>Objectives</a>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <a href='//wemakepeace.org/about/#background'>Background</a>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <a href='//wemakepeace.org/about/#team'>Our Team</a>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown
                            className='dropdown'
                            item
                            text='Programs'>
                            <Dropdown.Menu>
                                <Dropdown.Item>
                                    <a href='//wemakepeace.org/about/learning-materials/'>Learning Materials</a>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <a href='//wemakepeace.org/peace-letter-program/'>Peace Letters</a>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <a href='//wemakepeace.org/about/learning-materials/past-projects'>Past Projects</a>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Menu.Item>
                            <a href='//wemakepeace.org/get-involved/'>Get Involved</a>
                        </Menu.Item>
                        <Menu.Item>
                            <a href='//wemakepeace.org/blog/'>Blog</a>
                        </Menu.Item>
                        <Menu.Item>
                            <a href='//wemakepeace.org/partners/'>Partners</a>
                        </Menu.Item>
                        <Menu.Item>
                            <a href='//wemakepeace.org/contact/'>Contact</a>
                        </Menu.Item>
                        <Menu.Item>
                            { loggedIn ?
                                <Link to='/portal/my-classes'>My Profile</Link> :
                                <Link to='/'>Login</Link>
                            }
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>
            </div>
        );
    }
}

export default WPMenu;
