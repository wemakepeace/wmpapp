import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Menu, Segment } from 'semantic-ui-react'

export default class ClassMenu extends Component {
    state = { activeItem: 'progress' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    componentWillReceiveProps(nextProps) {
        if ((nextProps && nextProps.match) && this.props.match.params.childpath !== nextProps.match.params.childpath) {
            this.setState({ activeItem: nextProps.match.params.childpath });
        }
    }

    componentDidMount() {
        this.setState({ activeItem: this.props.match.params.childpath });
    }

    render() {
        const { activeItem } = this.state

        return (
            <div>
                <Menu pointing secondary>
                    <Menu.Item
                        name='progress'
                        active={activeItem === 'progress'}
                        as={Link}
                        to='progress'
                       onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        name='exchange details'
                        active={activeItem === 'exchange-details'}
                        as={Link}
                        to='exchange-details'
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        name='class profile'
                        active={activeItem === 'class-profile'}
                        as={Link}
                        to='class-profile'
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        name='materials'
                        active={activeItem === 'materials'}
                        as={Link}
                        to='materials'
                        onClick={this.handleItemClick}
                    />
                </Menu>
            </div>
        );
    }
}
