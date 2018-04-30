import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link, Route } from 'react-router-dom';

import WMPHeader from '../WMPHeader';
import TabContent from './TabContent';
import Overview from './Overview'

import { removeCurrentClass } from '../../redux/actions/class';


class Main extends Component {
    state = {
        newClass: false
    }

    createNewClass = () => {
        this.props.removeCurrentClass();
        localStorage.removeItem('currentClass');
        this.setState({ newClass: true})
    }

    getActiveClass = (item) => {
        return this.props.location.pathname.indexOf(item) > -1 ? 'active-profile' : '';
    }

    render() {
        console.log('here')
        const { className, history, match } = this.props;
        const currentClass = this.props.classes.currentClass;
        const { newClass } = this.state;

        return (
            <div className='page-container profile'>
                <div className='page-content'>
                    <WMPHeader
                        history={history}
                        onViewChange={this.onViewChange} />
                    <div className='profile-column-container'>
                        <div className='profile-menu-column'>
                            <Link to={`${match.url}/overview`}>
                                <div
                                    className={`profile-menu-item ${this.getActiveClass('')}`}
                                    >
                                    <h3>OVERVIEW</h3>
                                </div>
                            </Link>
                            <Link to={`${match.url}/teacher`}>
                                <div
                                    className={`profile-menu-item ${this.getActiveClass('teacher')}`}>
                                    <h3>TEACHER</h3>
                                </div>
                            </Link>
                            { newClass || currentClass
                                ? <div>
                                    <Link to={`${match.url}/class`}>
                                        <div
                                            className={`profile-menu-item ${this.getActiveClass('classforms')}`}>
                                            <h3>CLASS</h3>
                                        </div>
                                    </Link>
                                    { currentClass
                                        ? <div>
                                            <Link to={`${match.url}/exchange`}>
                                                <div
                                                    className={`profile-menu-item ${this.getActiveClass('exchange')}`}>
                                                    <h3>EXCHANGE</h3>
                                                </div>
                                            </Link>
                                            <Link to={`${match.url}/materials`}>
                                                <div
                                                    className={`profile-menu-item ${this.getActiveClass('materials')}`}>
                                                    <h3>MATERIALS</h3>
                                                </div>
                                            </Link>
                                            <Link to={`${match.url}/messages`}>
                                                <div
                                                    className={`profile-menu-item ${this.getActiveClass('messages')}`}>
                                                    <h3>MESSAGES</h3>
                                                </div>
                                            </Link>
                                        </div>
                                        : null }
                                </div>
                                : '' }
                        </div>
                        <div className='profile-form-column'>
                            <Route exact path={`${match.path}`} component={Overview} />
                            <Route
                                path={`${match.path}/:tab`}
                                component={TabContent}/>
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
        className,
        classes: state.classes
    }
}

export default connect(mapStateToProps, { removeCurrentClass })(Main);

