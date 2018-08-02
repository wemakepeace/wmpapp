import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import Header from '../Header';
import TabContent from './TabContent';
import { Menu } from './Menu';
import { removeCurrentClass } from '../../redux/actions/class';

const Profile = ({ ...props, currentClass }) => {
    return (
        <div className='page-content'>
            <Header {...props} />
            <div className='profile-column-container'>
                <div className='profile-menu-column'>
                    <Menu currentClass={currentClass} {...props} />
                </div>
                <div className='profile-form-column'>
                    <Route
                        path={`${props.match.path}/:tab`}
                        component={TabContent}
                        {...props} />
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = ({ currentClass }) => {
    return { currentClass };
};

export default connect(mapStateToProps, { removeCurrentClass })(Profile);

