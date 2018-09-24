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
import Support from './Support';


import { clearFeedback } from '../../redux/actions/shared';

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
    },
    {
        name: 'Support',
        component: Support,
        route: 'support'
    }
];


class Profile extends Component {
    state = {}

    componentWillReceiveProps({ feedback }) {
        if (this.props.feedback === feedback ) {
            this.props.clearFeedback();
        }
    }

    render() {
        const { match, currentClass, status, feedback } = this.props;
        return (
            <div className='page-content'>
                <Header {...this.props} />
                <div className='profile-column-container'>
                    <div className='profile-menu-column'>
                        <Menu
                            content={content}
                            currentClass={currentClass}
                            status={status}
                            {...this.props}
                        />
                    </div>
                    <div className='profile-form-column'>
                        <div className='profile-form'>
                            <Route
                                path={`${match.path}/:route`}
                                render={(props) => <TabContent content={content} {...props} feedback={feedback} />}
                                {...this.props} />

                            <Feedback {...feedback} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ currentClass, feedback, exchange: { status } }) => {
    return { currentClass, feedback, status };
};

export default connect(mapStateToProps, { clearFeedback })(Profile);

