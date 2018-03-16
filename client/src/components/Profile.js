import React, { Component } from 'react';
import { connect } from 'react-redux';

import WMPHeader from './WMPHeader';


class Profile extends Component {
    state = {

    }

    render() {
        return (
            <div className='page-container profile'>
                <div className='page-content'>
                    <WMPHeader />

                    <div className='profile-column-container'>
                        <div className='profile-menu-column'>
                            <div className='profile-menu-item'>
                                <h3>Teacher</h3>
                            </div>
                            <div className='profile-menu-item'>
                                <h3>Teacher</h3>
                            </div>
                            <div className='profile-menu-item'>
                                <h3>Teacher</h3>
                            </div>
                        </div>
                        <div className='profile-form-column'>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default Profile;

