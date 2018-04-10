import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import WMPHeader from '../WMPHeader';
import SchoolForm from './SchoolForm';
import ClassProfile from './ClassProfile';
import ClassForm from './ClassForm';
import TeacherInfo from './TeacherInfo';

class Main extends Component {
    state = { showTab: 'teacherinfo' }

    onViewChange = (showTab) => this.setState({ showTab })

    getActiveClass = (item) => this.state.showTab === item ? 'active-profile' : '';

    render() {
        const { className } = this.props;
        const { showTab } = this.state;

        return (
            <div className='page-container profile'>
                <div className='page-content'>
                    <WMPHeader />
                    <div className='profile-column-container'>
                        <div className='profile-menu-column'>
                            <div
                                className={`profile-menu-item ${this.getActiveClass('teacherinfo')}`}
                                onClick={() => this.onViewChange('teacherinfo')}>
                                <h3>TEACHER INFORMATION</h3>
                            </div>
                            <div
                                className={`profile-menu-item ${this.getActiveClass('classprofile')}`}
                                onClick={() => this.onViewChange('classprofile')}>
                                <h3>CLASS DETAILS {className} </h3>
                            </div>
                            <div
                                className={`profile-menu-item ${this.getActiveClass('teacher')}`}
                                onClick={() => this.onViewChange('teacher')}>
                                <h3>EXCHANGE</h3>
                            </div>
                            <div
                                className={`profile-menu-item ${this.getActiveClass('class')}`}
                                onClick={() => this.onViewChange('class')}>
                                <h3>MATERIALS</h3>
                            </div>
                            <div
                                className={`profile-menu-item ${this.getActiveClass('school')}`}
                                onClick={() => this.onViewChange('school')}>
                                <h3>MESSAGES</h3>
                            </div>
                        </div>
                        <div className='profile-form-column'>
                        {   showTab === 'teacherinfo'
                            ? <TeacherInfo onViewChange={this.onViewChange}/>
                            : showTab === 'classprofile'
                            ? <ClassProfile />
                            : null
                        }
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const className = state.classes && state.classes.currentClass
        ? state.classes.list[state.classes.currentClass].name
        : ''
    return {
        teacher: state.teacher,
        className
    }
}

export default connect(mapStateToProps)(Main);

