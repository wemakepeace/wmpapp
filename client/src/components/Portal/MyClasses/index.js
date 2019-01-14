import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import SelectClass from '../../reusables/SelectClassDropdown';
import RegisterClass from '../../reusables/RegisterClass';
import Class from './Class';
import { fetchClass, removeCurrentClass } from '../../../redux/actions/class';

const Overview = ({ teacher, fetchClass, history, match }) => {
     const onClassSelect = (selected) => {
        fetchClass(selected.value);
        history.push(`${match.url}/${selected.value}/progress`);
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

const mapStateToProps = ({ teacher, currentClass, exchange }) => {
    return {
        teacher,
        currentClass,
        exchange
    };
};

export default connect(mapStateToProps, { fetchClass, removeCurrentClass })(MyClasses);
