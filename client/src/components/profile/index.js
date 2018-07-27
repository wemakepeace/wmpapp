import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import HeaderContainer from '../../containers/HeaderContainer';
import TabContent from './TabContent';
import { ProfileMenu } from './ProfileMenu';
import { removeCurrentClass } from '../../redux/actions/class';

const Main = ({ ...props, currentClass }) => {
    return (
        <div className='page-container profile'>
            <div className='page-content'>
                <HeaderContainer {...props} />
                <div className='profile-column-container'>
                    <div className='profile-menu-column'>
                        <ProfileMenu
                            currentClass={currentClass}
                            {...props}
                        />
                    </div>
                    <div className='profile-form-column'>
                        <Route
                            path={`${props.match.path}/:tab`}
                            component={TabContent}
                            {...props} />
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = ({ currentClass }) => {
    return { currentClass };
};

export default connect(mapStateToProps, { removeCurrentClass })(Main);

