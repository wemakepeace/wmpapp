import React, { Component } from 'react';
import { connect } from 'react-redux';

import WMPHeader from './WMPHeader';
import SchoolForm from './SchoolForm';

class Profile extends Component {
    state = {
        showTab: 'class'
    }

    onViewChange = (showTab) => {
        this.setState({ showTab });
    }

    render() {
        const { showTab } = this.state;

        return (
            <div className='page-container profile'>
                <div className='page-content'>
                    <WMPHeader />
                    <div className='profile-column-container'>
                        <div className='profile-menu-column'>
                            <div
                                className='profile-menu-item'
                                onClick={() => this.onViewChange('class')}>
                                <h3>CLASS PROFILE</h3>
                            </div>
                            <div
                                className='profile-menu-item'
                                onClick={() => this.onViewChange('school')}>
                                <h3>SCHOOL DETAILS</h3>
                            </div>
                            <div
                                className='profile-menu-item'
                                onClick={() => this.onViewChange('match')}>
                                <h3>FIND A MATCH</h3>
                            </div>
                        </div>
                        <div className='profile-form-column'>
                        {showTab === 'class'
                            ? null // <ClassForm />
                            : showTab === 'school'
                            ? <SchoolForm />
                            : null // <Match />
                        }
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default Profile;

