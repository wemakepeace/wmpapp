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
        console.log('this.props Menu',this.props)
        this.setState({ activeItem: this.props.match.params.childpath });
    }

    render() {
        const { activeItem } = this.state;
        const id =  this.props.currentClass && this.props.currentClass.id;
        return (

                <Menu attached='top' tabular stackable>
                    <Menu.Item
                        name='progress'
                        active={activeItem === 'progress'}
                        as={Link}
                        to={`/portal/class/${id}/progress`}
                       onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        name='exchange details'
                        active={activeItem === 'exchange-details'}
                        as={Link}
                        to={`/portal/class/${id}/exchange-details`}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        name='class profile'
                        active={activeItem === 'class-profile'}
                        as={Link}
                        to={`/portal/class/${id}/class-profile`}
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
        );
    }
}
