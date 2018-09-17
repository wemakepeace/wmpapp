import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Menu, Dropdown, Icon, Segment } from 'semantic-ui-react'

class WPMenu extends Component {
    state = { showMobileMenu: false }

    handleItemClick = (e) => this.setState({ showMobileMenu: !this.state.showMobileMenu })

    render() {
        const { showMobileMenu } = this.state
        const collapsed = window.innerWidth < 768 ? true : false;
        console.log('showMobileMenu', showMobileMenu)
        return (
            <Segment inverted style={{borderRadius: '0'}}>
            { collapsed && !showMobileMenu
                ? <div onClick={this.handleItemClick}>Menu</div>
                : <Menu inverted className='wp-menu' stackable>
                    <Menu.Menu position='left' className='wp-menu' inverted>
                        { showMobileMenu
                            ? <Menu.Item onClick={this.handleItemClick}>
                                <Icon name='close' color='white' />
                            </Menu.Item>
                            : null }
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
                            <Link to='/profile/overview'>My Profile</Link>
                        </Menu.Item>
                    </Menu.Menu>
                </Menu> }
            </Segment>
        )
    }
}

export default WPMenu;
