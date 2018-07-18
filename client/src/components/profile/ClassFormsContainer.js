import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { Async } from 'react-select';
import { Redirect } from 'react-router-dom';

import Feedback from '../Feedback';
import ClassForm from './ClassForm';

import { saveClass, removeCurrentClass } from '../../redux/actions/class';
import { fetchTeacher } from '../../redux/actions/teacher';

class ClassFormsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = this.getDefaultStateOrProps(props.classes, props.schools);
    }

    getDefaultStateOrProps = (classes, schools) => {
        let defaultState = {
            id: null,
            name: '',
            size: '',
            age_group: null,
            term: '',
            languageProficiency: '',
            language: '',
            school: {
                id: null,
                schoolName: '',
                address1: '',
                address2: '',
                city: '',
                zip: '',
                state: '',
                country: ''
            },
            showFeedback: false
        }

        if (classes && classes.currentClassDetails && classes.currentClassDetails.id) {
            defaultState = {
                ...classes.currentClassDetails,
                showFeedback: false
            };

            // [TODO]
            // if (schools && classes.currentClassDetails) {
            //     defaultState.schools = classes.list[classes.currentClass].schoolId;
            //     console.log('defaultState.schools', defaultState.schools)
            // }
        }
        return defaultState;
    }

    onInputChange = (key, value, objName) => {
        if (objName === 'school') {
            this.setState({
                school: {
                    ...this.state.school,
                    [key]: value
                }
            });
        } else {
            this.setState({[key]: value});
        }
    }

    onSelectOptionChange = (key, value, objName) => {
        if (objName === 'school') {
            this.setState({
                school: {
                    ...this.state.school,
                    [key]: value
                }
            });
        } else {
            this.setState({ [key] : value });
        }
    }

    submitData = () => {
        let classData = this.state;
        classData.teacherId = this.props.teacher.id;

        this.props.saveClass(classData);
    }

    autoFillForm = (id) => {
        if (id === 'newaddress') {
            this.setState({ school: { id: null } });
        } else {
            const school = this.props.teacher.schools[id];
            this.setState({ school });
        }
    }


    componentWillReceiveProps({ feedback, classes, schools }) {
        if (feedback && feedback.type) {
            this.setState({ showFeedback: true });
        }
        const newState = this.getDefaultStateOrProps(classes, schools);

        /* do not update state if feedback type is error type */
        if (feedback && feedback.type !== 'error') {
            this.setState({...newState, showFeedback: true});
        }

    }

    render() {
        const { feedback, classes, showComponent, teacher, exchange } = this.props;
        const currentClassDetails  = classes && classes.currentClassDetails || {};
        const { showFeedback } = this.state;
        const exchangeStatus = exchange && exchange.status;


        return (
            <div className='profile-form'>
                <div className='profile-segment'>
                    <div>
                        {currentClassDetails ?
                            <h2>Information and Settings for Class {currentClassDetails.name}</h2> :
                            <h2> Register New Class </h2>}
                            <ClassForm
                                classData={this.state}
                                onInputChange={this.onInputChange.bind(this)}
                                onSelectOptionChange={this.onSelectOptionChange}
                                autoFillForm={this.autoFillForm}
                                exchangeStatus={exchangeStatus}
                            />
                            <div className='form-row'>
                                <Button
                                    className='large-custom-btn'
                                    size='large'
                                    onClick={this.submitData}>SAVE</Button>
                            </div>
                        { showFeedback && (feedback && feedback.type)
                            ? <Feedback {...feedback} />
                            : null }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        teacher: state.teacher,
        schools: state.teacher.schools,
        classes: state.classes,
        feedback: state.feedback,
        exchange: state.exchange
    }
}

const toBeDispatched = {
    saveClass, removeCurrentClass, fetchTeacher
}

export default connect(mapStateToProps, toBeDispatched )(ClassFormsContainer);


