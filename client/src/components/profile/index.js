import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import WMPHeader from '../WMPHeader';
import Overview from './Overview'
import SchoolForm from './SchoolForm';
import ClassFormsContainer from './ClassFormsContainer';
import TeacherForm from './TeacherForm';

import { removeCurrentClass } from '../../redux/actions/class';


class Main extends Component {
    state = {
        showTab: 'overview',
        newClass: false
    }

    onViewChange = (showTab, newClass) => {
        if (showTab === 'classforms' && newClass) {
            this.createNewClass();
        }

        this.setState({ showTab });
    }

    createNewClass = () => {
        this.props.removeCurrentClass();
        localStorage.removeItem('currentClass');
        this.setState({ newClass: true})
    }


    getActiveClass = (item) => this.state.showTab === item ? 'active-profile' : '';

    render() {
        const { className, history } = this.props;
        const { showTab, newClass } = this.state;

        return (
            <div className='page-container profile'>
                <div className='page-content'>
                    <WMPHeader
                        history={history}
                        onViewChange={this.onViewChange} />
                    <div className='profile-column-container'>
                        <div className='profile-menu-column'>
                            <div
                                className={`profile-menu-item ${this.getActiveClass('overview')}`}
                                onClick={() => this.onViewChange('overview')}>
                                <h3>OVERVIEW</h3>
                            </div>
                            <div
                                className={`profile-menu-item ${this.getActiveClass('teacher')}`}
                                onClick={() => this.onViewChange('teacher')}>
                                <h3>TEACHER</h3>
                            </div>
                            { newClass || className
                                ? <div>
                                    <div
                                        className={`profile-menu-item ${this.getActiveClass('classprofile')}`}
                                        onClick={() => this.onViewChange('classforms')}>
                                        <h3>CLASS</h3>
                                    </div>
                                    <div
                                        className={`profile-menu-item ${this.getActiveClass('exchange')}`}
                                        onClick={() => this.onViewChange('exchange')}>
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
                                : '' }
                        </div>
                        <div className='profile-form-column'>
                        {   showTab === 'overview'
                            ? <Overview redirectTo={this.onViewChange} />
                            : showTab === 'teacher'
                            ? <TeacherForm />
                            : showTab === 'classforms'
                            ? <ClassFormsContainer
                                showComponent={newClass}
                                redirectTo={this.onViewChange} />
                            : null
                        }
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const className = state.classes && state.classes.currentClass
        ? state.classes.list[state.classes.currentClass].name
        : '';
    return {
        teacher: state.teacher,
        className
    }
}

export default connect(mapStateToProps, { removeCurrentClass })(Main);

