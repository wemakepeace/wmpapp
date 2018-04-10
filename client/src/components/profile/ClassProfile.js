import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Menu } from 'semantic-ui-react';
import { Async } from 'react-select';


import { updateClass } from '../../redux/actions/class';
import { fetchDataForSelectDropdown } from '../../utils/helpers';

import WMPHeader from '../WMPHeader';
import SchoolForm from './SchoolForm';
import ClassForm from './ClassForm';


class ClassProfile extends Component {
    state = {
        activeItem: 'class'
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {

        const { classes } = this.props;
        const { activeItem } = this.state;
        let currentClass;

        if (classes && classes.list && classes.currentClass) {
            currentClass = classes.list[classes.currentClass];
        }

        return (
            <div className='profile-form'>
                <div className='profile-segment'>
                    <Menu pointing secondary className='profile-page-menu'>
                          <Menu.Item name='class' active={activeItem === 'class'} onClick={this.handleItemClick} />
                          <Menu.Item name='school address' active={activeItem === 'school address'} onClick={this.handleItemClick} />
                        </Menu>
                        {
                            activeItem === 'school address'
                            ? <SchoolForm />
                            : activeItem === 'class'
                            ? <ClassForm />
                            : null
                            }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        teacher: state.teacher,
        feedback: state.feedback,
        classes: state.classes
    }
}

export default connect(mapStateToProps, { updateClass })(ClassProfile);
