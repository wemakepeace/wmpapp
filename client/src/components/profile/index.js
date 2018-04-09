import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import WMPHeader from '../WMPHeader';
import SchoolForm from './SchoolForm';
import Profile from './Profile';
import ClassForm from './ClassForm';
import TeacherForm from './TeacherForm';
import Overview from './Overview';

class Main extends Component {
    state = { showTab: 'overview' }

    onViewChange = (showTab) => this.setState({ showTab })

    getActiveClass = (item) => this.state.showTab === item ? 'active-profile' : '';

    render() {

        const { showTab } = this.state;

        return (
            <div className='page-container profile'>
                <div className='page-content'>
                    <WMPHeader />
                    <div className='profile-column-container'>
                        <div className='profile-menu-column'>
                            <div
                                className={`profile-menu-item ${this.getActiveClass('overview')}`}
                                onClick={() => this.onViewChange('overview')}>
                                <h3>OVERVIEW</h3>
                            </div>
                            <div
                                className={`profile-menu-item ${this.getActiveClass('profile')}`}
                                onClick={() => this.onViewChange('profile')}>
                                <h3>PROFILE & SETTINGS</h3>
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
                        {   showTab === 'overview'
                            ? <Overview onViewChange={this.onViewChange}/>
                            : showTab === 'profile'
                            ? <Profile />
                            : showTab === 'class'
                            ? <ClassForm />
                            : showTab === 'school'
                            ? <SchoolForm />
                            : <TeacherForm />
                        }
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        teacher: state.teacher
    }
}

export default Main;

