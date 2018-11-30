import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { Image } from 'semantic-ui-react';
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
import SubHeader from './SubHeader';


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
        const { match, history, currentClass, status, feedback, teacher } = this.props;
        return (
            <div className='page-content'>
                <Header />
                <div className='profile-column-container'>
                    <Menu
                        content={content}
                        status={status}
                        {...this.props}
                    />
                    <div className='profile-form-column'>
                        <SubHeader
                            teacher={teacher}
                            currentClass={currentClass}
                            history={history} />
                        <Image className='profile-logo' src='../../../../assets/logos/WMPlogo_transparent.png' />
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

const mapStateToProps = ({ currentClass, feedback, exchange: { status }, teacher }) => {
    return { currentClass, feedback, status, teacher };
};

export default connect(mapStateToProps, { clearFeedback })(Profile);

