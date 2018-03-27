import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import WMPHeader from './WMPHeader';
import SchoolForm from './SchoolForm';
import ClassForm from './ClassForm';
import TeacherForm from './TeacherForm';
import Intro from './Intro';

class Profile extends Component {
    state = { showTab: 'intro' }

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
                                className={`profile-menu-item ${this.getActiveClass('intro')}`}
                                onClick={() => this.onViewChange('intro')}>
                                <h3>INTRO</h3>
                            </div>
                            <div
                                className={`profile-menu-item ${this.getActiveClass('teacher')}`}
                                onClick={() => this.onViewChange('teacher')}>
                                <h3>TEACHER DETAILS</h3>
                            </div>
                            <div
                                className={`profile-menu-item ${this.getActiveClass('class')}`}
                                onClick={() => this.onViewChange('class')}>
                                <h3>CLASS DETAILS</h3>
                            </div>
                            <div
                                className={`profile-menu-item ${this.getActiveClass('school')}`}
                                onClick={() => this.onViewChange('school')}>
                                <h3>SCHOOL DETAILS</h3>
                            </div>
                        </div>
                        <div className='profile-form-column'>
                        {   showTab === 'intro'
                            ? <Intro />
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

export default Profile;

