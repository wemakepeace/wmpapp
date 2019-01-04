import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { Image } from 'semantic-ui-react';
import Header from '../Header';
import SubHeader from '../Header/SubHeader';
import TabContent from './TabContent';
import { Menu } from './Menu';
import Feedback from '../Feedback';
import { removeCurrentClass } from '../../redux/actions/class';
import { logout } from '../../redux/actions/teacher';
import { clearFeedback } from '../../redux/actions/shared';

class Profile extends Component {
    state = {}

    componentWillReceiveProps({ feedback }) {
        if (this.props.feedback === feedback ) {
            this.props.clearFeedback();
        }
    }

    render() {
        const {
            match,
            history,
            currentClass,
            status,
            feedback,
            teacher,
            logout
        } = this.props;

        return (
            <div className='page-content'>
                <Header {...this.props} />
                <div className='profile-column-container'>
                    <Menu status={status} {...this.props} />
                    <div className='profile-form-column'>
                        <SubHeader
                            className='web-subheader'
                            currentClass={currentClass}
                            teacher={teacher}
                            history={history}
                            {...this.props}
                        />
                        <Image
                            className='profile-logo'
                            src='../../../../assets/logos/WMPlogo_transparent.png'
                        />
                        <div className='profile-form'>
                            <Route
                                path={`${match.path}/:route`}
                                render={(props) => (
                                        <TabContent feedback={feedback} {...props} />
                                    )}
                                {...this.props}
                            />
                            <Feedback {...feedback} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ currentClass, feedback, exchange: { status }, teacher }) => {
    return {
        currentClass,
        feedback,
        status,
        teacher
    };
};

export default connect(mapStateToProps, { clearFeedback, logout })(Profile);

