import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import Header from '../Header';
import TabContent from './TabContent';
import { Menu } from './Menu';
import { removeCurrentClass } from '../../redux/actions/class';
import Feedback from '../Feedback';
import Overview from './Overview';
import Class from './Class';
import Teacher from './Teacher';
import Materials from './Materials';


const content = [
    {
        name: 'Overview',
        component: Overview,
        route: 'overview'
    },
    {
        name: 'Teacher',
        component: Teacher,
        route: 'teacher'
    },
    {
        name: 'Class',
        component: Class,
        route: 'class'
    },
    {
        name: 'Materials',
        component: Materials,
        route: 'materials',
        defaultChildRoute: 'instructions'
    }
];


const Profile = ({ ...props, currentClass, status, feedback }) => {
    return (
        <div className='page-content'>
            <Header {...props} />
            <div className='profile-column-container'>
                <div className='profile-menu-column'>
                    <Menu
                        content={content}
                        currentClass={currentClass}
                        status={status}
                        {...props}
                    />
                </div>
                <div className='profile-form-column'>
                    <div className='profile-form'>
                        <Route
                            path={`${props.match.path}/:route`}
                            render={(props) => <TabContent content={content} {...props} />}
                            {...props} />
                        <Feedback {...feedback} />
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = ({ currentClass, feedback, exchange: { status } }) => {
    return { currentClass, feedback, status };
};

export default connect(mapStateToProps, { removeCurrentClass })(Profile);

