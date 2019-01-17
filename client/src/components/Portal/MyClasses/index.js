import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Class from './Class';
import SelectClass from '../../reusables/SelectClassDropdown';
import RegisterClass from '../../reusables/RegisterClass';
import { fetchClass, removeCurrentClass } from '../../../redux/actions/class';

const Overview = ({ teacher, currentClass, fetchClass, history, match }) => {
     const onClassSelect = (selected) => {
        fetchClass(selected.value);
    }

    if (currentClass && currentClass.id) {
        return (
            <Redirect to={`${match.url}/${currentClass.id}/progress`} />
        );
    }

    return (
        <div>
            <div className='profile-segment'>
                <h3>{`Welcome, ${teacher.firstName}`}!</h3>
                <p>Here you can manage all your enrolled classes or register a new class.</p>
            </div>
            <div className='profile-segment'>
                <div className='exchange-actions'>
                    <div>
                        <React.Fragment>
                            <h4>Select class</h4>
                            <SelectClass onClassSelect={onClassSelect} />
                        </React.Fragment>
                    </div>
                    <div>
                        <button className='roll-button'>
                            <RegisterClass history={history}/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const MyClasses = ({ match, ...props }) => {
    return (
        <div className='my-classes'>
            <Route
                path={`${match.path}/:classId`}
                render={ (_props) => <Class {...props} {..._props} /> }
            />
            <Route
                exact path={`${match.path}`}
                render={(_props) => <Overview {...props} {..._props} /> }
            />
        </div>
    );
}

export default connect(null, { fetchClass, removeCurrentClass })(MyClasses);
